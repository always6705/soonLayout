import React, {Component, Fragment} from 'react';
import {Alert, Button, Card, Col, DatePicker, Form, Icon, Input, InputNumber, Row, Select, Table} from "antd";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import styles from './style.less';
import {connect} from "dva";

const {Column} = Table;
const status = ['关闭', '运行中', '已上线', '异常'];
const FormItem = Form.Item;
const {Option} = Select;

@connect(({soon, loading}) => ({
  soon,
  loading: loading.models.soon,
}))

class Soon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableList: []
    }
  }

  columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      align: 'center',
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      filters: [
        {
          text: status[0],
          value: '0',
        },
        {
          text: status[1],
          value: '1',
        },
        {
          text: status[2],
          value: '2',
        },
        {
          text: status[3],
          value: '3',
        },
      ],

      // render(val) {
      //   return <Badge status={statusMap[val]} text={status[val]}/>;
      // },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      // render: (text, record) => (
      //   <Fragment>
      //     <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
      //     <Divider type="vertical"/>
      //     <a href="">订阅警报</a>
      //   </Fragment>
      // ),
    },
  ];

  handleFormReset = () => {
    const {form, dispatch} = this.props;
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
      form: {getFieldDecorator},
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
              {getFieldDecorator('createDate')(<Input placeholder="请输入日期，如 '2019-10-10'"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="期数">
              {getFieldDecorator('orderNumber')(<Input placeholder="请输入期数，如'168'"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div
              style={{
                float: 'right',
                marginBottom: 24,
              }}
            >
              <Button type="primary" onClick={this.soonTest.bind(this)}>
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset.bind(this)}
              >
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  soonTest = () => {
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      console.info(err);
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        // type: 'searchResult/fetch',
        type: 'soon/test',
        payload: values,
      });
    });
  };

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/*查询条件*/}
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>

            <div className={styles.tableAlert}>
              <Alert
                message={
                  <Fragment>
                    在该 年/月份，情况{' '}
                    <a
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      111
                    </a>{' '}
                    项&nbsp;&nbsp;
                  </Fragment>
                }
                type="info"
                showIcon
              />
            </div>

            {/*表格*/}
            <Table
              rowKey={'key'}
              dataSource={this.state.tableList}
              // size="small"
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Soon);
;
