import request from '../../utils/request';

// method 默认'GET'

export async function makeMoney(params) {
  const url = `/soon/makeMoney`;
  return request(url, {
    method: 'POST',
    data: params,
  });
}

export async function test() {
  const url = `/soon/test`;
  return request(url, {
    method: 'POST',
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
