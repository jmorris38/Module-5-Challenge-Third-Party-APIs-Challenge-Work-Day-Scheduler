document.addEventListener("DOMContentLoaded", function () {
    // Function to update time block colors
    function updateTimeBlocks() {
        const currentHour = dayjs().hour();
        const schedulerBody = document.getElementById("scheduler-body");
        schedulerBody.innerHTML = "";

        const timeSlots = [
            { hour: 1, label: "1 AM" },
            { hour: 2, label: "2 AM" },
            { hour: 2, label: "2 AM" },
            { hour: 3, label: "3 AM" },
            { hour: 4, label: "4 AM" },
            { hour: 5, label: "5 AM" },
            { hour: 6, label: "6 AM" },
            { hour: 7, label: "7 AM" },
            { hour: 8, label: "8 AM" },
            { hour: 9, label: "9 AM" },
            { hour: 10, label: "10 AM" },
            { hour:11 , label: "11 AM" },
            { hour:12, label: "12 AM" },
            { hour: 13, label: "1 PM" },
            { hour: 14, label: "2 PM" },
            { hour: 15, label: "3 PM" },
            { hour: 16, label: "4 PM" },
            { hour: 17, label: "5 PM" },
            { hour: 18, label: "6 PM" },
            { hour: 19, label: "7 PM" },
            { hour: 20, label: "8 PM" },
            { hour: 21, label: "9 PM" },
            { hour: 22, label: "10 PM" },
            { hour: 23, label: "11 PM" },
            { hour: 24, label: "12 AM" },
            
        ];

        timeSlots.forEach(function (slot) {
            const row = document.createElement("tr");
            row.className = "hour-row";

            const hourCell = document.createElement("td");

            if (slot.hour === currentHour) {
                hourCell.textContent = slot.label + " (Current Hour)";
                row.classList.add("present");
            } else {
                hourCell.textContent = slot.label;
                if (slot.hour < currentHour) {
                    row.classList.add("past");
                } else {
                    row.classList.add("future");
                }
            }

            const descriptionCell = document.createElement("td");
            const descriptionTextArea = document.createElement("textarea");
            descriptionTextArea.className = "description";

            const actionCell = document.createElement("td");
            const saveButton = document.createElement("button");
            saveButton.className = "save-btn";
            saveButton.textContent = "Save";

            row.appendChild(hourCell);
            row.appendChild(descriptionCell);
            descriptionCell.appendChild(descriptionTextArea);
            row.appendChild(actionCell);
            actionCell.appendChild(saveButton);

            schedulerBody.appendChild(row);
        });

        // Attach event listeners for save buttons
        attachSaveButtonListeners();
    }

    // Load saved events from local storage
    function loadEvents() {
        const descriptionElements = document.querySelectorAll(".description");

        descriptionElements.forEach(function (description) {
            const blockHour = parseInt(description.closest("tr").querySelector("td:first-child").textContent);
            const savedEvent = localStorage.getItem(`event-${blockHour}`);

            if (savedEvent) {
                description.value = savedEvent;
            }
        });
    }

    // Attach event listeners for save buttons
    function attachSaveButtonListeners() {
        const saveButtons = document.querySelectorAll(".save-btn");

        saveButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const blockHour = parseInt(button.closest("tr").querySelector("td:first-child").textContent);
                const eventText = button.closest("tr").querySelector(".description").value;
                localStorage.setItem(`event-${blockHour}`, eventText);
            });
        });
    }

    // Display the current date and time
    function updateCurrentDate() {
        const currentDate = dayjs().format("MMMM DD, YYYY hh:mm A");
        document.getElementById("currentDay").textContent = currentDate;
    }

    // Update time blocks, current date, and display "Current Hour" every minute
    setInterval(function () {
        updateTimeBlocks();
        updateCurrentDate();
    }, 60000);

    // Initial setup
    updateTimeBlocks();
    loadEvents();
    updateCurrentDate();
});
