import { makeMoney, test } from './service';

const Model = {
  namespace: 'soonBuyModel',

  state: {
    data: [],
    yearList: [],
  },

  effects: {
    *makeMoney({ payload }, { call, put }) {
      const response = yield call(makeMoney, payload);
      console.info(response);
      yield call(test);
      console.info('test');
      // yield put({
      //   type: 'makeMoney',
      //   payload: response,
      // });
    },

    *getYearList({ payload }, { call, put }) {
      const response = yield call(getYearList, payload);
      console.info(response);
      yield put({
        type: 'yearList',
        payload: response,
      });
    },

    *query({ payload, callback }, { call, put }) {
      const response = yield call(queryEachResult, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    queryData(state, action) {
      return { ...state, data: action.payload };
    },
    yearList(state, action) {
      return { ...state, yearList: action.payload };
    },
  },
};
export default Model;
