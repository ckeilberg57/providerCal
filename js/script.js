document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const appointmentList = document.getElementById('appointment-list');
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

    window.addAppointmentToCalendar = function(date, time, details, url) {
        if (!appointments[date]) {
            appointments[date] = [];
        }
        appointments[date].push({ time, details, url });
        displayAppointments(date);
    };

    displayCalendar();
});
