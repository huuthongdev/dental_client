const GetRoleName = (role) => {
    if (role === 'CHAIRMAN') return 'Chủ tịch HĐQT';
    if (role === 'DIRECTOR') return 'Giám đốc chi nhánh';
    if (role === 'CUSTOMER_CARE_MANAGER') return 'Trưởng phòng chăm sóc khách hàng';
    if (role === 'CUSTOMER_CARE') return 'NV Chăm sóc khách hàng';
    if (role === 'ACCOUNTING_MANAGER') return 'Trưởng phòng kế toán';
    if (role === 'ACCOUNTANT') return 'NV Kế toán';
    if (role === 'X_RAY') return 'NV chụp X Quang';
    if (role === 'DENTISTS_MANAGER') return 'Trưởng phòng nha sĩ';
    if (role === 'DENTIST') return 'Nha sĩ';
}

export default GetRoleName;