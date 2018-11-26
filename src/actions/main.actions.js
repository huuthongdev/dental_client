import Axios from 'axios';
import { setBranch, setEmployee, setService, setProduct, setClient } from '../refs';

export function loadData(dispatch, user) {
    const token = localStorage.getItem("TOKEN");
    const currentBranch = localStorage.getItem("BRANCH");
    if (!token || !currentBranch) return;
    if (!user._id) return;
    dispatch(fetchTemp());
    dispatch(setBranch());
    dispatch(setEmployee());
    dispatch(setService());
    dispatch(setProduct());
    dispatch(setClient());
}

export const FETCH_TEMP = 'FETCH_TEMP';
export const fetchTemp = () => dispatch => {
    Axios.get('https://api.openweathermap.org/data/2.5/weather?q=Saigon&units=metric&appid=8d4f36fa4f4b9967bf5ce741f8bf789c')
        .then(result => {
            const { temp } = result.data.main;
            dispatch({ type: FETCH_TEMP, temp });
        });
}