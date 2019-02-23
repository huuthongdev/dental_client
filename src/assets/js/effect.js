export function effect() {
    // TOGGLE COLLAPSE SIDEBAR
    const body = document.getElementsByTagName('body')[0];

    const check = localStorage.getItem("COLLAPSE_STATUS");
    if (check) body.classList.add('sidebar-collapse-active');
    else body.classList.remove('sidebar-collapse-active');

    // TOGGLE COLLAPSE SIDEBAR
    const btnToggleCollapse = document.getElementById('toggle-extend-sidebar');
    if (btnToggleCollapse && body) {
        btnToggleCollapse.addEventListener('click', function () {
            body.classList.toggle('sidebar-collapse-active');
            const check = body.classList.value;
            if (check) localStorage.setItem("COLLAPSE_STATUS", 'true');
            if (!check) localStorage.removeItem("COLLAPSE_STATUS", 'true');
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