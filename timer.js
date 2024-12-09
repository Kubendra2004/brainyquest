// timer.js
let timerDuration = 20 * 60; // 20 minutes in seconds
let timerDisplay = document.getElementById('timerDisplay');

function startTimer() {
    // Check if there's a saved time in localStorage
    const savedTime = localStorage.getItem('remainingTime');
    const expirationTime = localStorage.getItem('expirationTime');

    // Check if the current time is past the expiration time
    if (expirationTime && new Date().getTime() < expirationTime) {
        disableAccess(true); // Block access if still within the blocked period
        return;
    }

    if (savedTime) {
        timerDuration = parseInt(savedTime);
    }

    const interval = setInterval(() => {
        if (timerDuration <= 0) {
            clearInterval(interval);
            timerDisplay.innerText = "Time's up!";
            localStorage.removeItem('remainingTime'); // Clear saved time

            // Set expiration time for the next day
            const now = new Date();
            const nextDay = new Date();
            nextDay.setDate(now.getDate() + 1);
            nextDay.setHours(0, 0, 0, 0); // Set to midnight of the next day
            localStorage.setItem('expirationTime', nextDay.getTime());

            disableAccess(); // Disable access to the website
            return;
        }

        timerDuration--;
        localStorage.setItem('remainingTime', timerDuration); // Save remaining time

        const minutes = Math.floor(timerDuration / 60);
        const seconds = timerDuration % 60;
        timerDisplay.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function disableAccess(blocked = false) {
    if (blocked) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: rgba(255, 255, 255, 0.9);">
                <div style="text-align: center;">
                    <h1 style="color: #ff6347;">Access Blocked!</h1>
                    <p style="font-size: 20px;">You cannot access the game until the next day.</p>
                </div>
            </div>
        `;
    } else {
        // Create a Game Over display
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: rgba(255, 255, 255, 0.9);">
                <div style="text-align: center;">
                    <h1 style="color: #ff6347;">Game Over!</h1>
                    <p style="font-size: 20px;">Your time has expired. You cannot access the game anymore.</p>
                    <button id="exitButton" style="padding: 10px 20px; font-size: 18px; background-color: #ff6347; color: white; border: none; border-radius: 5px; cursor: pointer;">Exit</button>
                </div>
            </div>
        `;

        // Add event listener to the exit button
        document.getElementById('exitButton').addEventListener('click', () => {
            window.close(); // Attempt to close the current tab
            // If the tab cannot be closed, you can redirect to another page
            // window.location.href = 'index.html'; // Redirect to home page
        });
    }
}

// Call startTimer when the page loads
window.onload = startTimer;