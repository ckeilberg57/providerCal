const currentMonthDisplay = document.getElementById('calendar-month-name');
const calendarContainer = document.getElementById('searchable-calendar');
const previousMonthButton = document.getElementById('previous-month');
const nextMonthButton = document.getElementById('next-month');
const appointmentList = document.getElementById('appointment-list');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let appointments = {};

function displayCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarContainer.innerHTML = '';

    // Header Row for days of the week
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.innerText = day;
        dayDiv.className = 'header';
        calendarContainer.appendChild(dayDiv);
    });

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarContainer.appendChild(emptyDiv);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.innerText = day;
        dayDiv.className = 'day';

        // Check if there are appointments on this day
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (appointments[dateStr]) {
            const dot = document.createElement('span');
            dot.className = 'appointment-dot';
            dayDiv.appendChild(dot);
        }

        dayDiv.addEventListener('click', () => {
            displayAppointments(dateStr);
        });

        calendarContainer.appendChild(dayDiv);
    }

    currentMonthDisplay.innerText = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
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

function displaySearchableCalendar(month, year) {
    displayCalendar(month, year);
}

function changeMonth(increment) {
    currentMonth += increment;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displaySearchableCalendar(currentMonth, currentYear);
}

previousMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));

displaySearchableCalendar(currentMonth, currentYear);

// Expose addAppointmentToCalendar function globally
window.addAppointmentToCalendar = function(date, time, details, url) {
    const dateStr = `${date}`;
    if (!appointments[dateStr]) {
        appointments[dateStr] = [];
    }
    appointments[dateStr].push({ time, details, url });
    
    // Update calendar and appointment list
    displaySearchableCalendar(currentMonth, currentYear);
    displayAppointments(dateStr);
};

// Add this function to the existing calendar script
window.removeAppointmentFromCalendar = function(date, time) {
    const dateStr = `${date}T${time}`;
    if (appointments[dateStr]) {
        // Remove the appointment from the appointments object
        appointments[dateStr] = appointments[dateStr].filter(app => app.time !== time);
        if (appointments[dateStr].length === 0) {
            delete appointments[dateStr];
        }
        // Re-render the appointments and calendar
        displayAppointments(dateStr);
        displaySearchableCalendar(currentMonth, currentYear);
    }
};

function cancelAppointment(dateStr, index) {
    // Remove appointment from calendar and currentAppointments
    if (window.parent && typeof window.parent.removeAppointmentFromCalendar === 'function') {
        window.parent.removeAppointmentFromCalendar(dateStr, currentAppointments[dateStr][index].time);
    }
    
    // Remove the appointment from currentAppointments
    currentAppointments[dateStr].splice(index, 1);
    if (currentAppointments[dateStr].length === 0) {
        delete currentAppointments[dateStr];
    }
    
    // Update the calendar icon
    if (window.parent && typeof window.parent.updateCalendarIcon === 'function') {
        window.parent.updateCalendarIcon(dateStr);
    }
    
    // Display confirmation
    displayMessage('Appointment canceled.');
    chatOutput.innerHTML = ''; // Clear chat output
}

function updateCalendarIcon(dateStr) {
    const appointments = window.parent.appointments[dateStr] || [];
    
    // Find the icon element for the specific date
    const dateElement = document.querySelector(`[data-date='${dateStr}']`);
    
    if (dateElement) {
        if (appointments.length > 0) {
            dateElement.classList.add('has-appointments');
        } else {
            dateElement.classList.remove('has-appointments');
        }
    }
}
