let appointments = {};

document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('previous-month');
    const nextBtn = document.getElementById('next-month');
    const monthNameElem = document.getElementById('calendar-month-name');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function displaySearchableCalendar(month, year) {
        const calendarElement = document.getElementById('searchable-calendar');
        calendarElement.innerHTML = ''; // Clear the current calendar content

        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);
        const daysInMonth = monthEnd.getDate();
        const startDay = monthStart.getDay();

        // Fill in the days of the current month
        for (let i = 0; i < startDay; i++) {
            calendarElement.innerHTML += '<div class="day"></div>'; // Empty cells for days of the previous month
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.innerText = day;

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (appointments[dateStr] && appointments[dateStr].length > 0) {
                const dotElement = document.createElement('span');
                dotElement.className = 'appointment-dot';
                dayElement.appendChild(dotElement);
            }

            dayElement.addEventListener('click', () => displayAppointments(dateStr));

            calendarElement.appendChild(dayElement);
        }

        monthNameElem.innerText = monthStart.toLocaleString('default', { month: 'long' }) + ' ' + year;
    }

    function displayAppointments(dateStr) {
        const appointmentListElement = document.getElementById('appointment-list');
        appointmentListElement.innerHTML = '';

        if (appointments[dateStr] && appointments[dateStr].length > 0) {
            appointments[dateStr].forEach(appointment => {
                const appointmentElement = document.createElement('div');
                appointmentElement.innerText = `${appointment.time} - ${appointment.details}`;
                appointmentListElement.appendChild(appointmentElement);
            });
        } else {
            appointmentListElement.innerText = 'No appointments.';
        }
    }

    window.addAppointmentToCalendar = function(appointment) {
        const dateStr = appointment.date;
        if (!appointments[dateStr]) {
            appointments[dateStr] = [];
        }
        appointments[dateStr].push(appointment);
        displaySearchableCalendar(currentMonth, currentYear);
    };

    window.removeAppointmentFromCalendar = function(date, time) {
        const dateStr = `${date}`;
        if (appointments[dateStr]) {
            const appointmentIndex = appointments[dateStr].findIndex(app => app.time === time);
            if (appointmentIndex !== -1) {
                appointments[dateStr].splice(appointmentIndex, 1);
                if (appointments[dateStr].length === 0) {
                    delete appointments[dateStr];
                    removeGreenDotFromCalendar(dateStr);
                }
                displaySearchableCalendar(currentMonth, currentYear);
                displayAppointments(dateStr);
            }
        }
    };

    window.removeGreenDotFromCalendar = function(dateStr) {
        const dayElements = document.querySelectorAll('.day');
        dayElements.forEach(dayElem => {
            const dayDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayElem.innerText).padStart(2, '0')}`;
            if (dayDate === dateStr) {
                const dot = dayElem.querySelector('.appointment-dot');
                if (dot) {
                    dayElem.removeChild(dot);
                }
            }
        });
    };

    prevBtn.addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        displaySearchableCalendar(currentMonth, currentYear);
    });

    nextBtn.addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        displaySearchableCalendar(currentMonth, currentYear);
    });

    displaySearchableCalendar(currentMonth, currentYear);
});
