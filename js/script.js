document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    const addAppointmentBtn = document.getElementById('add-appointment-btn');
    const modal = document.getElementById('appointment-modal');
    const closeBtn = document.querySelector('.close-btn');
    const appointmentForm = document.getElementById('appointment-form');
    const currentDateElem = document.createElement('div');

    let currentDate = new Date();

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
                    html += `<td>${day}</td>`;
                    day++;
                }
            }
            html += '</tr>';
        }

        html += '</tbody></table>';
        calendarContainer.innerHTML = html;
    }

    function updateCurrentDate() {
        currentDateElem.innerHTML = `Today: ${currentDate.toDateString()}`;
        document.querySelector('header').appendChild(currentDateElem);
    }

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function saveAppointment(event) {
        event.preventDefault();
        // Handle appointment saving logic here
        closeModal();
    }

    addAppointmentBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    appointmentForm.addEventListener('submit', saveAppointment);

    generateCalendar();
    updateCurrentDate();
});
