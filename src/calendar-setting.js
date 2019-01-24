export const calendarSetting = {
    className: "time-table",
    culture: "vi",
    eventPropGetter: event => {
        if (event.isAdded) return { className: 'isAdded' }
        if (new Date(event.end) < Date.now()) return { className: 'out-off-date' };
        if (event.status === 'PENDING') return { className: 'pending' };
        if (event.status === 'DONE') return { className: 'done' };
        if (event.status === 'WORKING') return { className: 'working' };
        return {};
    },
    dayPropGetter: (date) => {
        // return { className: 'test' }
    },
    min: new Date(2019, 0, 1, 9, 0, 0),
    max: new Date(2019, 0, 1, 22, 0, 0),
    views: ["week", "day", "agenda"],
    messages: {
        allDay: 'Tất cả',
        previous: '<',
        next: '>',
        today: 'Hôm nay',
        month: 'Tháng',
        week: 'Tuần',
        day: 'Ngày',
        agenda: 'Danh sách',
        date: 'Date',
        time: 'Thời gian',
        event: 'Nội dung',
        noEventsInRange: 'Không có lịch hẹn nào vào khung thời gian này'
    },
    formats: {
        dateFormat: 'dd',
        dayRangeHeaderFormat: ({ start, end }) => {
            const startTime = new Date(start).toLocaleDateString('en-GB');
            const endTime = new Date(end).toLocaleDateString('en-GB');
            return `${startTime} - ${endTime}`;
        },
        dayHeaderFormat: (day) => {
            let nameDay;
            const dayNum = new Date(day).getDay() + 1;
            if (dayNum === 1) nameDay = 'Chủ nhật';
            if (dayNum !== 1) nameDay = `Thứ ${dayNum}`;
            return `${nameDay} - ${new Date(day).toLocaleDateString('en-GB')}`;
        },
        agendaDateFormat: (day) => {
            let nameDay;
            const dayNum = new Date(day).getDay() + 1;
            if (dayNum === 1) nameDay = 'Chủ nhật';
            if (dayNum !== 1) nameDay = `Thứ ${dayNum}`;
            return `${nameDay} - ${new Date(day).toLocaleDateString('en-GB')}`;
        },
        eventTimeRangeFormat: ({ start, end }) => {
            const startTime = new Date(start);
            const endTime = new Date(end);
            return `${startTime.getHours()}:${startTime.getMinutes()} — ${endTime.getHours()}:${endTime.getMinutes()} (${endTime.toLocaleDateString('en-GB')})`
        }
    }
}