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
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            let daysHtml = '<div style="display: grid; grid-template-columns: repeat(7, 1fr);">';
            daysHtml += '<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>';

            for (let i = 0; i < firstDay; i++) {
                daysHtml += '<div></div>';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                daysHtml += `<div class="day" data-date="${year}-${month + 1}-${day}">${day}</div>`;
            }

            daysHtml += '</div>';
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

        // Add navigation buttons (optional)
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
