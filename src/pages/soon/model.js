import {calculate, queryEachResult} from './service';

const Model = {
  namespace: 'soon',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(calculate, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * query({payload, callback}, {call, put}) {
      const response = yield call(queryEachResult, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return {...state, data: action.payload};
    },
  },
};
export default Model;
