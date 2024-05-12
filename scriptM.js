document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    fetch('http://localhost:3000/IsSignIn', {
        credentials: 'include' // or 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('xc');
        container.textContent = `Hi ${data.name}`;
    })
    .catch(error => {
        const container = document.getElementById('xc');

        container.textContent = `Hi Guest`;

        // Create a new <a> element
        var linkElement = document.createElement("a");
        linkElement.textContent = container.textContent;
        linkElement.href = "login.html"; // Set the login page URL
        linkElement.classList.add("btn", "btn-primary", "btn-sm", "ms-md-1", "mt-lg-0", "order-md-1", "ms-auto");
        
        // Replace the container with the link
        container.parentNode.replaceChild(linkElement, container);
    });
}

// Logout function
function logout() {
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include' // Ensure cookies are included in the request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert("Logout Successful");

            // Clear local storage and session storage
            localStorage.clear();
            sessionStorage.clear();

            // Clear user data or reset page elements
            const userDisplay = document.getElementById('xc');
            if (userDisplay) {
                userDisplay.textContent = "Hi Guest"; // Reset the user greeting
            }

            // Optionally clear any other parts of the UI that are user-specific
            // Example: clear user-specific lists, reset forms, etc.

            // Redirect to login page or any other page as needed
            window.location.href = "index.html"; // Redirect to login page
        } else {
            alert("Đăng xuất thành công"); // Display error message
            window.location.href = "./index.html";
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert("An error occurred during logout. Please try again."); // Display error message
    });
}

// Attach logout function to logout button
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
} else {
    console.error('Logout button not found');
}