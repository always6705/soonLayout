import React, { Component, Fragment } from 'react';
import { Alert, Button, Card, Col, Form, Input, Row, Select, Table, Tooltip } from 'antd';
import styles from './style.less';
import { connect } from 'dva';
import Month from '../../../public/Month'; // 月份json

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loading, soonModel }) => ({
  soonModel,
  loading: loading.models.soonModel,
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
    this.queryResult();
    this.getYearList();
  }

  columns = [
    {
      title: '系统',
      dataIndex: 'contentSystem',
      align: 'left',
      width: '450px',
      fixed: true,
      render: contentSystem => {
        return (
          <div
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
              // maxWidth: "450px"
            }}
          >
            <Tooltip placement="top" title={contentSystem}>
              {contentSystem}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: '实际',
      dataIndex: 'contentActual',
      align: 'left',
      width: '450px',
      fixed: true,
      render: contentActual => {
        return (
          <div
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
              // maxWidth: "450px"
            }}
          >
            <Tooltip placement="top" title={contentActual}>
              {contentActual}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: '个数',
      dataIndex: 'resultTotal',
      align: 'center',
      render: (resultTotal, record) => {
        let text = `实际${record.countActual}个 | 系统${record.countSystem}个`;
        return (
          <Tooltip placement="top" title={text}>
            {resultTotal}
          </Tooltip>
        );
      },
    },
    {
      title: '金额',
      dataIndex: 'resultMoney',
      align: 'center',
    },
    // {
    //   title: '日期',
    //   dataIndex: 'createDate',
    //   align: 'center',
    // },
    {
      title: '期数',
      dataIndex: 'orderNumber',
      align: 'center',
      render: (orderNumber, record) => {
        // const text = `${record.createDate}（${record.orderNumber}）`;
        if (null == record.eachResult) {
          return <span>{`${record.createDate}（${record.orderNumber}）| x `}</span>;
        } else {
          return (
            <Tooltip
              placement="top"
              title={record.eachResult.rs7}
            >{`${record.createDate}（${record.orderNumber}）| ${record.eachResult.rs7}`}</Tooltip>
          );
        }
      },
    },
  ];

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
      soonModel: { yearList },
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
          <Col md={5} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('createDate')(<Input placeholder="请输入日期，如 '2019-10-10'" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="期数">
              {getFieldDecorator('orderNumber')(<Input placeholder="请输入期数，如'168'" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="年份">
              {getFieldDecorator('year')(
                <Select placeholder="请选择年份" allowClear={true}>
                  {yearList.map(item => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="月份">
              {getFieldDecorator('month')(
                <Select placeholder="请选择月份" allowClear={true}>
                  {this.monthList.map(item => {
                    return <Option key={item.key}>{item.value}</Option>;
                  })}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <div style={{ float: 'left' }}>
              <Button type="primary" onClick={this.queryResult.bind(this)}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset.bind(this)}>
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  queryResult = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        console.info('queryResult-->error');
        return;
      }

      this.setState({
        formValues: fieldsValue,
      });

      dispatch({
        type: 'soonModel/queryResult',
        payload: fieldsValue,
      });
    });
  };

  getYearList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'soonModel/getYearList',
    });
  };

  render() {
    const {
      soonModel: { data },
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

          {/*表格*/}
          <Table
            rowKey={'id'}
            bordered={true}
            size={'small'}
            dataSource={data}
            loading={loading}
            columns={this.columns}
          />
        </div>
      </Card>
    );
  }
}

export default Form.create()(SoonPage);
