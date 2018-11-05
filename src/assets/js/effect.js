export function effect() {
    // TOGGLE COLLAPSE SIDEBAR
    const body = document.getElementsByTagName('body')[0];
    const btnToggleCollapse = document.getElementById('toggle-extend-sidebar');
    if (btnToggleCollapse && body) {
        btnToggleCollapse.addEventListener('click', function () {
            body.classList.toggle('sidebar-collapse-active');
        });
    }
    // CLOCK
    const clockHoursEl = document.getElementById('clock-hours');
    const clockMinutesEl = document.getElementById('clock-minutes');
    const clockDayEl = document.getElementById('clock-day');
    const clockDateEl = document.getElementById('clock-date');
    const clockMonthEl = document.getElementById('clock-month');
    const clockYearEl = document.getElementById('clock-year');
    if (clockHoursEl && clockMinutesEl && clockDayEl) {
        let now = new Date();
        clockHoursEl.innerHTML = now.getHours();
        clockMinutesEl.innerHTML = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        clockDayEl.innerHTML = now.getDay() === 0 ? 'Chủ nhật' : `Thứ ${now.getDay() + 1}`;
        clockDateEl.innerHTML = now.getDate();
        clockMonthEl.innerHTML = now.getMonth() + 1;
        clockYearEl.innerHTML = now.getFullYear();

        setInterval(function () {
            now = new Date();
            clockHoursEl.innerHTML = now.getHours();
            clockMinutesEl.innerHTML = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
            clockDayEl.innerHTML = now.getDay() === 0 ? 'Chủ nhật' : `Thứ ${now.getDay() + 1}`;
            clockDateEl.innerHTML = now.getDate();
            clockMonthEl.innerHTML = now.getMonth() + 1;
            clockYearEl.innerHTML = now.getFullYear();
        }, 30000);
    }

}