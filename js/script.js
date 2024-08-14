document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    const addAppointmentBtn = document.getElementById('add-appointment-btn');
    const modal = document.getElementById('appointment-modal');
    const closeBtn = document.querySelector('.close-btn');
    const appointmentForm = document.getElementById('appointment-form');
    const currentDateElem = document.getElementById('current-date');
    const appointmentsContainer = document.getElementById('appointments');

    let currentDate = new Date();
    let appointments = {};

    function generateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        let html = `<h2>${currentDate.toLocaleString('default', { month: 'long' })} ${year}</h2>`;
        html += '<table><thead><tr>';
        html += '<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>';
        html += '</tr></thead><tbody>';

        let day = 1;

        for (let i = 0; i < 6; i++) {
            html += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    html += '<td></td>';
                } else if (day > lastDate) {
                    break;
                } else {
                    html += `<td data-date="${year}-${month + 1}-${day}">${day}</td>`;
                    day++;
                }
            }
            html += '</tr>';
        }

        html += '</tbody></table>';
        calendarContainer.innerHTML = html;
        attachDateClickListeners();
    }

    function attachDateClickListeners() {
        const dates = calendarContainer.querySelectorAll('td[data-date]');
        dates.forEach(date => {
            date.addEventListener('click', function() {
                const selectedDate = this.getAttribute('data-date');
                displayAppointments(selectedDate);
            });
        });
    }

    function updateCurrentDate() {
        currentDateElem.innerHTML = `Today: ${currentDate.toDateString()}`;
    }

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function saveAppointment(event) {
        event.preventDefault();
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        const details = document.getElementById('appointment-details').value;

        if (!appointments[date]) {
            appointments[date] = [];
        }
        appointments[date].push({ time, details });
        closeModal();
        displayAppointments(date);
    }

    function displayAppointments(date) {
        const dateFormatted = new Date(date).toDateString();
        const appointmentsForDate = appointments[date] || [];
        let html = `<h2>Appointments for ${dateFormatted}</h2>`;
        if (appointmentsForDate.length === 0) {
            html += '<p>No appointments scheduled.</p>';
        } else {
            html += '<ul>';
            appointmentsForDate.forEach(appt => {
                html += `<li><strong>${appt.time}</strong>: ${appt.details}</li>`;
            });
            html += '</ul>';
        }
        appointmentsContainer.innerHTML = html;
    }

    addAppointmentBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    appointmentForm.addEventListener('submit', saveAppointment);

    generateCalendar();
    updateCurrentDate();
});
