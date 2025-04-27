const daysEl = document.getElementById('days');
const monthYearEl = document.getElementById('monthYear');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');
const holidayInfoEl = document.getElementById('holidayInfo');

const dayNames = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
let date = new Date();
let holidays = [];

async function fetchHolidays(year) {
    try {
        const response = await fetch(`https://www.hebcal.com/hebcal?v=1&year=${year}&cfg=json&maj=on&mod=on&ss=on&mf=on&c=on&geo=none&lg=he`);
        const data = await response.json();
        holidays = data.items.filter(item => item.category === 'holiday').map(item => ({
            date: new Date(item.date),
            title: item.title
        }));
    } catch (error) {
        console.error('Failed to fetch holidays', error);
    }
}

function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1).getDay()+1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

    monthYearEl.textContent = `${monthNames[month]} ${year}`;
    daysEl.innerHTML = '';
    holidayInfoEl.textContent = '';

    dayNames.forEach(d => {
        const div = document.createElement('div');
        div.classList.add('day', 'day-name');
        div.textContent = d;
        daysEl.appendChild(div);
    });

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const div = document.createElement('div');
        daysEl.appendChild(div);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        const div = document.createElement('div');
        div.classList.add('day', 'day-number');
        div.textContent = i;

        if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            div.classList.add('today');
        }

        const holiday = holidays.find(h => h.date.getFullYear() === year && h.date.getMonth() === month && h.date.getDate() === i);
        if (holiday) {
            div.classList.add('holiday');
            div.dataset.holiday = holiday.title;
        }

        div.addEventListener('click', () => {
            if (holiday) {
                holidayInfoEl.textContent = `${holiday.title}`;
            } else {
                holidayInfoEl.textContent = '';
            }
        });

        daysEl.appendChild(div);
    }
}

prevBtn.onclick = async () => {
    date.setMonth(date.getMonth() - 1);
    await fetchHolidays(date.getFullYear());
    renderCalendar();
};

nextBtn.onclick = async () => {
    date.setMonth(date.getMonth() + 1);
    await fetchHolidays(date.getFullYear());
    renderCalendar();
};

(async function init() {
    await fetchHolidays(date.getFullYear());
    renderCalendar();
})();


fetch('https://www.hebcal.com/shabbat?cfg=i2&geonameid=281184&ue=off&M=on&lg=he&tgt=_top')
    .then(response => response.text())
    .then(data => document.getElementById('hebcal-shabbat').innerHTML = data);