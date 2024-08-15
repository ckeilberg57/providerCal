document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const appointmentList = document.getElementById('appointment-list');
    const searchableCalendar = document.getElementById('searchable-calendar');
    const calendarMonthName = document.getElementById('calendar-month-name');
    const appointments = {};

    function displayCalendar() {
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const day = now.getDate();

        calendarMonthName.textContent = `${month} ${year}`;
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
                appDiv.innerHTML = `<p><strong>${app.time}</strong>: ${app.details} <a href="${app.url}" class="download-link">Join</a></p>`;
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
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            let daysHtml = '<div class="header">Sun</div><div class="header">Mon</div><div class="header">Tue</div><div class="header">Wed</div><div class="header">Thu</div><div class="header">Fri</div><div class="header">Sat</div>';

            for (let i = 0; i < firstDay; i++) {
                daysHtml += '<div></div>';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                daysHtml += `<div class="day" data-date="${year}-${month + 1}-${day}">${day}</div>`;
            }

            searchableCalendar.innerHTML = daysHtml;

            const dayElements = searchableCalendar.getElementsByClassName('day');
            Array.from(dayElements).forEach(dayElement => {
                dayElement.addEventListener('click', () => {
                    const dateStr = dayElement.getAttribute('data-date');
                    displayAppointments(dateStr);
                });
            });
        }

        renderCalendar(currentMonth, currentYear);

        // Add navigation buttons
        const navButtons = document.createElement('div');
        navButtons.innerHTML = `
            <button onclick="changeMonth(-1)">Previous</button>
            <button onclick="changeMonth(1)">Next</button>
        `;
        searchableCalendar.appendChild(navButtons);

        window.changeMonth = function(offset) {
            currentMonth += offset;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            } else if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
            calendarMonthName.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
        };
    }

    window.addAppointmentToCalendar = function(date, time, details, url) {
        const dateStr = `${date}T${time}`;
        if (!appointments[dateStr]) {
            appointments[dateStr] = [];
        }
        appointments[dateStr].push({ time, details, url });
        displayAppointments(dateStr.split('T')[0]);
        displaySearchableCalendar();
    };

    displayCalendar();
    displaySearchableCalendar();
});
