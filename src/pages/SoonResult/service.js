import request from '../../utils/request';

// method 默认'GET'

// 预测: data[date, orderNumber]
export async function calculate(params) {
  return request('/SoonResult/calculate', {
    method: 'POST',
    data: params,
  });
}

export async function queryResult(params) {
  // console.info("queryResult请求参数: ", params);
  const createDate = typeof params['createDate'] == 'undefined' ? '' : params['createDate'];
  const orderNumber = typeof params['orderNumber'] == 'undefined' ? '' : params['orderNumber'];
  const url = `/soon/queryResult?createDate=${createDate}&orderNumber=${orderNumber}`;
  // console.info("url: ", url);
  return request(url, {
    method: 'GET',
  });
}

// 查询 年list
export async function getYearList() {
  const url = `/soon/getYearList`;
  return request(url, {
    method: 'GET',
  });
}

// 获取每期数据
export async function queryEachResult() {
  return request('/soon/queryEachResult');
}
