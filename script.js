document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.getElementById('appContainer');

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('accessToken');

  
    if (isLoggedIn) {
        // If logged in, set background for Profile page
        document.body.style.background = 'linear-gradient(to top right, cyan 50%, #F8FAFC 50%)';
        // If logged in, redirect to Profile page
        redirectToProfile();
    } else {
        // If not logged in, set background for Signup page
        document.body.style.background = 'linear-gradient(to top right, white 49%, cyan 50%, #F8FAFC 50%)';
        // If not logged in, show Signup page
        renderSignupPage();
    }

    function renderSignupPage() {
        appContainer.innerHTML = `
            <h5 id="wb">Welcome back!👋</h5>
            <h2>Sign Up to your account</h2>
            <form class="formfields" action="">
                <label for="name">Your name</label>
                <input class="inputc" id="name" type="text" name="name">
                <label for="email">Your email</label>
                <input class="inputc" id="email" type="email" name="email">
                <label for="password">Password</label>
                <input class="inputc" id="password" type="password" name="password">
                <label for="confirmpassword">Confirm Password</label>
                <input class="inputc" id="confirmpassword" type="password" name="confirmpassword">
            </form>
            <button class="conbutton" id="conbutton" type="button">CONTINUE</button>
            <h3 class="error" id="errorMessage">Error : All fields are mandatory!</h3>
        `;
        document.body.style.background = 'linear-gradient(to top right, white 49%, cyan 50%, #F8FAFC 50%)';
        const continueButton = document.getElementById('conbutton');
        continueButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission
            signup();
        });
    }

    function redirectToProfile() {
        appContainer.innerHTML = `
            <div class="slider-thumb"></div>
            <h1 class="Signup">Sign up Successful!</h1>
            <div class="container1">
                <h2 class="Profile">Profile</h2>
                <h1>👤</h1>
                <div class="avatar">
                    <div class="user-icon"><span></span></div>
                </div>
                <p><strong>Full Name:</strong> ${localStorage.getItem('name')}</p>
                <p><strong>Email:</strong> ${localStorage.getItem('email')}</p>
                <p><strong>Token:</strong> ${localStorage.getItem('accessToken')}</p>
                <p><strong>Password:</strong> ${(localStorage.getItem('password'))}</p>
                <button class="buttonlg" id="logoutButton">Logout</button>
            </div>
        `;
 
        document.body.style.background = 'linear-gradient(to top right, cyan 50%, #F8FAFC 50%)';
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', function () {
            logout();
        });
    }

    function signup() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        if (!name || !email || !password || !confirmPassword) {
            displayMessage('error', 'Error: All fields are mandatory!');
            return;
        }

        if (password !== confirmPassword) {
            displayMessage('error', 'Passwords do not match!');
            return;
        }

        // Generate random 16-byte access token
        const accessToken = generateAccessToken();

        // Store user details in local storage
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('password', password);

        // Redirect to Profile page
        redirectToProfile();
    }

    function logout() {
        // Clear local storage
        localStorage.clear();

        // Redirect to Signup page
        renderSignupPage();
    }

    function displayMessage(type, message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerText = message;
        errorMessage.style.display = 'inline-block';

        // Clear message after 3 seconds
        setTimeout(() => {
            errorMessage.innerText = '';
            errorMessage.style.display = 'none';
        }, 3000);
    }

    function generateAccessToken() {
        return [...Array(16)].map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    }
});
