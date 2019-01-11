export function convertTicketStatus(status) {
    if (status === 'WORKING') return 'Đang điều trị';
    if (status === 'DONE') return 'Hoàn thành';
    if (status === 'PENDING') return 'Tạm ngưng...';
}