function converErrorMessage(errorMessage) {
    // Client Related
    if (errorMessage === 'PHONE_IS_EXISTED') return 'Số điện thoại đã tồn tại';
    if (errorMessage === 'EMAIL_IS_EXISTED') return 'Email đã tồn tại';
    console.log(errorMessage);
    return 'Lỗi chưa xác định!';
}

export default converErrorMessage;