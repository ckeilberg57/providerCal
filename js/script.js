// JavaScript for calendar and appointments
const calendarContainer = document.getElementById('searchable-calendar');
const monthNameElement = document.getElementById('calendar-month-name');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const meetingsList = document.getElementById('meetings-list');

let currentDate = new Date();

function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    calendarContainer.innerHTML = '';
    
    // Fill calendar header
    const header = document.createElement('div');
    header.className = 'header';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.innerText = day;
        header.appendChild(dayCell);
    });
    calendarContainer.appendChild(header);
    
    // Fill calendar days
    let day = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            if (i === 0 && j < startDay || day > daysInMonth) {
                cell.className = 'empty';
            } else {
                cell.className = 'day';
                cell.innerText = day;
                cell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                cell.addEventListener('click', (e) => showAppointments(e.target.dataset.date));
                day++;
            }
            row.appendChild(cell);
        }
        calendarContainer.appendChild(row);
    }

    monthNameElement.innerText = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;
}

function showAppointments(date) {
    // Load and show appointments for the selected date
    // Example:
    // const appointments = getAppointmentsForDate(date);
    // meetingsList.innerHTML = appointments.map(appt => `<li>${appt}</li>`).join('');
}

function updateCalendar() {
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();

// Add this function to handle adding an appointment
function addAppointmentToCalendar(date, time, description, url) {
    const appointment = `${date} ${time} - ${description} (${url})`;
    const listItem = document.createElement('li');
    listItem.innerText = appointment;
    meetingsList.appendChild(listItem);
}
