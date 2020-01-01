import React, { Component, Fragment } from 'react';
import { Alert, Button, Card, Col, Divider, Form, Input, message, Row, Select } from 'antd';
import styles from './style.less';
import { connect } from 'dva';
import Month from '../../../public/Month'; // 月份json

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loading, soonBuyModel }) => ({
  soonBuyModel,
  loading: loading.models.soonBuyModel,
}))
class SoonPage extends Component {
  constructor(props) {
    super(props);

    this.monthList = Month.monthList;

    this.state = {
      tableList: [],
      yearList: [], // 年list
    };
  }

  componentDidMount() {
    // this.queryResult();
    // this.getYearList();
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'searchResult/fetch',
      payload: {},
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
      soonBuyModel: { yearList },
    } = this.props;
    return (
      <Form layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('createDate')(<Input placeholder="请输入日期，如 '2019-10-10'" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="期数">
              {getFieldDecorator('orderNumber')(<Input placeholder="请输入期数，如'168'" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ float: 'left' }}>
              <Button type="primary" onClick={this.makeMoney.bind(this, 1)}>
                预测
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset.bind(this)}>
                重置
              </Button>
            </div>
          </Col>
        </Row>

        <Divider style={{ marginTop: 0 }} />

        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={11} sm={24}>
            <FormItem label="Actual Content">
              {getFieldDecorator('contentActual')(<Input placeholder="请输入内容，如 '16,18'" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="Unit Price">
              {getFieldDecorator('unitPrice')(<Input placeholder="price" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <div style={{ float: 'left' }}>
              <Button type="primary" onClick={this.makeMoney.bind(this, 2)}>
                Buy Num
              </Button>
            </div>
          </Col>
        </Row>

        <Divider style={{ marginTop: 0 }} />

        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={4} sm={24}>
            <FormItem label="Rs1">{getFieldDecorator('rs1')(<Input placeholder="Rs1" />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="Rs2">{getFieldDecorator('rs2')(<Input placeholder="Rs2" />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="Rs3">{getFieldDecorator('rs3')(<Input placeholder="Rs3" />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="Rs4">{getFieldDecorator('rs4')(<Input placeholder="Rs4" />)}</FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={4} sm={24}>
            <FormItem label="Rs5">{getFieldDecorator('rs5')(<Input placeholder="Rs5" />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="Rs6">{getFieldDecorator('rs6')(<Input placeholder="Rs6" />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="Rs7">{getFieldDecorator('rs7')(<Input placeholder="Rs7" />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="Odds">
              {getFieldDecorator('odds')(<Input placeholder="Odds" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ float: 'left' }}>
              <Button type="primary" onClick={this.makeMoney.bind(this, 3)}>
                Calculate
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 8 }}
                onClick={this.queryResult.bind(this)}
              >
                查询
              </Button>
            </div>
          </Col>
        </Row>

        <Divider style={{ marginTop: 0 }} />
      </Form>
    );
  }

  makeMoney = step => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      message.destroy();

      // TODO 将判空写成一个公共的方法

      let data = {};
      if (
        typeof fieldsValue.createDate == 'undefined' ||
        fieldsValue.createDate.trim() === '' ||
        typeof fieldsValue.orderNumber == 'undefined' ||
        fieldsValue.orderNumber.trim() === ''
      ) {
        message.error(`日期或期数不能为空!`);
        return;
      }

      data.createDate = fieldsValue.createDate;
      data.orderNumber = fieldsValue.orderNumber;

      if (2 === step) {
        if (
          typeof fieldsValue.contentActual == 'undefined' ||
          fieldsValue.contentActual.trim() === '' ||
          typeof fieldsValue.unitPrice == 'undefined' ||
          fieldsValue.unitPrice.trim() === ''
        ) {
          message.error(`Actual Content或Unit Price不能为空!`);
          return;
        }
        data.contentActual = fieldsValue.contentActual;
        data.unitPrice = fieldsValue.unitPrice;
      }

      if (3 === step) {
        data = { ...fieldsValue, eachResult: fieldsValue };
      }

      dispatch({
        type: 'soonBuyModel/makeMoney',
        payload: data,
      });
    });
  };

  queryResult = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        message.error('queryResult-->error');
        return;
      }

      this.setState({
        formValues: fieldsValue,
      });

      dispatch({
        type: 'soonBuyModel/queryResult',
        payload: fieldsValue,
      });
    });
  };

  getYearList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'soonBuyModel/getYearList',
    });
  };

  render() {
    const {
      soonBuyModel: { data },
      loading,
    } = this.props;

    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          {/*查询条件*/}
          <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>

          <div className={styles.standardTable}>
            <div className={styles.tableAlert}>
              <Alert
                message={
                  <Fragment>
                    &nbsp;&nbsp; ，情况 <a style={{ fontWeight: 600 }}>111</a> 项&nbsp;&nbsp;
                  </Fragment>
                }
                type="info"
                showIcon
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default Form.create()(SoonPage);
