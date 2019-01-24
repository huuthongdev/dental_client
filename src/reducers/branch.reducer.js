import { LOG_OUT } from "./user.reducer";

export const SET_BRANCH = 'SET_BRANCH';
export const CREATE_BRANCH = 'CREATE_BRANCH';
export const UPDATE_BRANCH = 'UPDATE_BRANCH';
export const REMOVE_BRANCH = 'REMOVE_BRANCH';
export const SET_BRANCH_DETAIL = 'SET_BRANCH_DETAIL';

const defaultState = [];
export const branchReducer = (state = defaultState, action) => {
  const { type } = action;
  if (type === SET_BRANCH) return action.result;
  if (type === SET_BRANCH_DETAIL) return state.map(v => (v._id === action.result._id ? action.result : v));
  if (type === CREATE_BRANCH) return [action.result, ...state];
  if (type === UPDATE_BRANCH) return state.map((v, i) => (v._id === action.result._id ? { ...action.result, detail: state[i].detail } : v));
  if (type === REMOVE_BRANCH) return state.filter(v => v._id !== action.result._id);
  if (type === LOG_OUT) return defaultState;
  return state;
};
