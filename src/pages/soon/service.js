import request from '@/utils/request';

// method 默认'GET'

// 预测: data[date, orderNumber]
export async function calculate(params) {
  return request('/soon/calculate', {
    method: 'POST',
    data: params
  });
}

// 获取每期数据
export async function queryEachResult() {
  return request('/soon/queryEachResult');
}
