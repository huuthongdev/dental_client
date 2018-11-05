import { RequestService } from '../refs';

export const SET_BRANCH = 'SET_BRANCH';
export const setBranch = () => dispath => {
    return RequestService.get('/branch')
    .then(result => dispath({ type: SET_BRANCH, result }))
    .catch(error => console.log(error));
}