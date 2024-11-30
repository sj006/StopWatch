// Stopwatch Variables
let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let lapStartTime = 0;  // To track lap start time
let lastLapTime = 0;   // To store last lap time, used to calculate new lap
let intervalList = [];

// DOM Elements
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const startPauseBtn = document.getElementById('startPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const lapBtn = document.getElementById('lapBtn');
const intervalListElement = document.getElementById('intervalList');

// Start/Pause Button Functionality
startPauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(tInterval);
        running = false;
        paused = true;
        startPauseBtn.innerText = 'Resume';
    } else {
        if (paused) {
            paused = false;
            startTime = Date.now() - lastLapTime; // Keep the lap time when resuming
            tInterval = setInterval(start, 10);
            startPauseBtn.innerText = 'Pause';
        } else {
            startTime = Date.now();
            lapStartTime = 0;  // Reset lap start time when starting a new stopwatch
            tInterval = setInterval(start, 10);
            startPauseBtn.innerText = 'Pause';
        }
        running = true;
    }
    stopBtn.disabled = false;
    lapBtn.disabled = false;
});

// Stop Button Functionality
stopBtn.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    startPauseBtn.innerText = 'Start';
    stopBtn.disabled = true;
    lapBtn.disabled = true;

    // Add the final time interval
    const finalTime = formatTime(minutes) + ":" + formatTime(seconds) + "." + formatTime(milliseconds);
    intervalList.push(`Final Time: ${finalTime}`);
    displayIntervals();
});

// Lap Button Functionality
lapBtn.addEventListener('click', () => {
    // Calculate lap time by comparing current time and last lap time
    const lapTime = formatTime(minutes) + ":" + formatTime(seconds) + "." + formatTime(milliseconds);

    // Record the lap time
    intervalList.push(`Lap: ${lapTime}`);

    // Add lap time to the list
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    intervalListElement.appendChild(lapItem);

    // Update the last lap time
    lastLapTime = Date.now() - startTime;  // This will store the time for the next lap calculation
});

// Start the stopwatch function
function start() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;

    // Calculate minutes, seconds, and milliseconds
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    milliseconds = Math.floor((difference % 1000) / 10);

    // Update the display with the calculated time
    displayMinutes.innerText = formatTime(minutes);
    displaySeconds.innerText = formatTime(seconds);
    displayMilliseconds.innerText = formatTime(milliseconds);
}

// Format Time Function (pads single digits with leading zeros for seconds and milliseconds)
function formatTime(time) {
    return time < 10 ? '0' + time : time; // This ensures time is always two digits
}

// Display Time Intervals (laps)
function displayIntervals() {
    intervalListElement.innerHTML = ''; // Clear previous list
    intervalList.forEach(interval => {
        const li = document.createElement('li');
        li.textContent = interval;
        intervalListElement.appendChild(li);
    });
}
