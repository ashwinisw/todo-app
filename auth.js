// auth.js

const credentials = {
    username: "admin",
    password: "password123"
};

function isAuthenticated() {
    return localStorage.getItem("loggedIn") === "true";
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// Handle login
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMsg = document.getElementById("login-error");

        if (username === credentials.username && password === credentials.password) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            errorMsg.textContent = "Invalid username or password.";
        }
    });
}

// Protect dashboard page
if (window.location.pathname.includes("dashboard.html") && !isAuthenticated()) {
    window.location.href = "index.html";
}