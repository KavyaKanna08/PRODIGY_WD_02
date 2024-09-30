var timerInterval;
var totalSeconds = 0;
var isPaused = false;

function startTimer() {
    if (isPaused) {
        // Resume the timer if it was paused
        timerInterval = setInterval(updateTimer, 1000);
        isPaused = false;
    } else {
        // Start a new timer
        var hours = parseInt(document.getElementById("hours").value || 0);
        var minutes = parseInt(document.getElementById("minutes").value || 0);
        var seconds = parseInt(document.getElementById("seconds").value || 0);

        totalSeconds = hours * 3600 + minutes * 60 + seconds;

        updateTimerDisplay();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Disable and enable appropriate buttons
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").disabled = false;
    document.getElementById("stopButton").disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    document.getElementById("startButton").disabled = false;  // Enable Start to resume
    document.getElementById("pauseButton").disabled = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;

    updateTimerDisplay();

    // Disable and enable appropriate buttons
    document.getElementById("startButton").disabled = false;
    document.getElementById("pauseButton").disabled = true;
    document.getElementById("stopButton").disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isPaused = false;

    // Reset timer display
    updateTimerDisplay();

    // Reset input fields to empty
    document.getElementById("hours").value = '';
    document.getElementById("minutes").value = '';
    document.getElementById("seconds").value = '';

    // Disable Pause and Stop, enable Start
    document.getElementById("startButton").disabled = false;
    document.getElementById("pauseButton").disabled = true;
    document.getElementById("stopButton").disabled = true;
}

function updateTimer() {
    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        showModal(); // Show modal when timer completes

        // Reset the buttons to their initial states
        document.getElementById("startButton").disabled = false;
        document.getElementById("pauseButton").disabled = true;
        document.getElementById("stopButton").disabled = true;
        return;
    }

    totalSeconds--;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    document.getElementById("timer").innerText = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

// Modal functions
function showModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
