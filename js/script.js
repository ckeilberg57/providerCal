document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    const addAppointmentBtn = document.getElementById('add-appointment-btn');
    const modal = document.getElementById('appointment-modal');
    const closeBtn = document.querySelector('.close-btn');
    const appointmentForm = document.getElementById('appointment-form');

    // Generate a simple calendar (for demonstration purposes)
    function generateCalendar() {
        let html = '<table><thead><tr>';
        html += '<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>';
        html += '</tr></thead><tbody>';

        // Just a simple example, you can improve this to show the real dates
        for (let i = 0; i < 5; i++) {
            html += '<tr>';
            for (let j = 0; j < 7; j++) {
                html += '<td></td>';
            }
            html += '</tr>';
        }

        html += '</tbody></table>';
        calendarContainer.innerHTML = html;
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
});
