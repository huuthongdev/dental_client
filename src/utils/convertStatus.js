export function convertStatus(status) {
    if (status === 'PENDING') return 'Đang đợi...';
    if (status === 'WORKING') return 'Đang điều trị';
    if (status === 'DONE') return 'Hoành thành';
    if (status === 'OUT_OF_DATE') return 'Hết hạn';
    return '--';
}