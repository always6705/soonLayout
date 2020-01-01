import { queryEachResult, queryResult, getYearList } from './service';

const Model = {
  namespace: 'soonModel',

  state: {
    data: [],
    yearList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(test, payload);
      console.info(response);
      yield put({
        type: 'queryData',
        payload: response,
      });
    },

    *queryResult({ payload }, { call, put }) {
      const response = yield call(queryResult, payload);
      console.info(response);
      yield put({
        type: 'queryData',
        payload: response,
      });
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
