import { RequestService } from '../refs';

export const SET_BRANCH = 'SET_BRANCH';
export const setBranch = () => dispath => {
    return RequestService.get('/branch')
    .then(result => dispath({ type: SET_BRANCH, result }))
    .catch(error => console.log(error));
}

export const ADD_BRANCH = 'ADD_BRANCH';
export const addBranch = (result) => {
    return {
        type: ADD_BRANCH,
        result
    }
}