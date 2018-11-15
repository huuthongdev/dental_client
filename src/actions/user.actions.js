export const SET_USER_INFO = 'SET_USER_INFO';
export const setUserInfo = (result) => {
    localStorage.setItem("TOKEN", result.token);
    if (result.roleInBranchs.length === 1) localStorage.setItem("BRANCH", result.roleInBranchs[0].branch._id);
    return {
        type: SET_USER_INFO,
        result
    }
}

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("BRANCH");
    return {
        type: LOG_OUT
    }
}