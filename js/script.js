document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const appointmentList = document.getElementById('appointment-list');
    const searchableCalendar = document.getElementById('searchable-calendar');
    const appointments = {};

    function displayCalendar() {
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const day = now.getDate();

        calendar.innerHTML = `<h2>${month} ${year}</h2>`;
        appointmentList.innerHTML = `<h3>Appointments for ${month} ${day}, ${year}:</h3>`;
        displayAppointments(now.toISOString().split('T')[0]);
    }

    function displayAppointments(dateStr) {
        appointmentList.innerHTML = `<h3>Appointments for ${dateStr}:</h3>`;
        const appointmentDetails = appointments[dateStr];
        if (appointmentDetails && appointmentDetails.length > 0) {
            appointmentDetails.forEach(app => {
                const appDiv = document.createElement('div');
                appDiv.innerHTML = `<p><strong>${app.time}</strong>: ${app.details} <a href="${app.url}">Join</a></p>`;
                appointmentList.appendChild(appDiv);
            });
        } else {
            appointmentList.innerHTML += `<p>No appointments scheduled for this day.</p>`;
        }
    }

    function displaySearchableCalendar() {
        const now = new Date();
        let currentMonth = now.getMonth();
        let currentYear = now.getFullYear();

        function renderCalendar(month, year) {
            searchableCalendar.innerHTML = `<h4>${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}</h4>`;
            // Placeholder for rendering days (if needed, add a day grid and clickable days)
        }

        renderCalendar(currentMonth, currentYear);

        // You can add buttons
