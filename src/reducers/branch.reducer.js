import { LOG_OUT } from "../actions/user.actions";
import {
  SET_BRANCH,
  ADD_BRANCH,
  UPDATE_BRANCH,
  REMOVE_BRANCH,
  SET_BRANCH_DETAIL
} from "../actions/branch.actions";

const defaultState = [];
export const branchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BRANCH:
      return action.result;
    case SET_BRANCH_DETAIL:
      return state.map(v => (v._id === action.result._id ? action.result : v));
    case ADD_BRANCH:
      return [action.result, ...state];
    case UPDATE_BRANCH:
      return state.map(v => (v._id === action.result._id ? action.result : v));
    case REMOVE_BRANCH:
      return state.filter(v => v._id !== action.result._id);
    case LOG_OUT:
      return defaultState;
    default:
      return state;
  }
};
