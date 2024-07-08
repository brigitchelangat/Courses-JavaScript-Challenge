const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Regular expressions
const disposableEmailDomains = ["mailinator.com", "tempmail.com", "10minutemail.com"]; // Add more as needed

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    if (!errorDisplay) {
        const small = document.createElement('small');
        small.classList.add('error');
        inputControl.appendChild(small);
    }
    inputControl.querySelector('.error').innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    if (errorDisplay) {
        errorDisplay.innerText = '';
    }
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isEmailValid = async (email) => {
    const response = await fetch('path/to/users.json');
    const data = await response.json();
    const user = data.users.find(user => user.email === email);
    return user || null;
};

const login = async (email, password) => {
    const user = await isEmailValid(email);
    if (user) {
        if (user.password === password) {
            // Redirect to courses.html
            window.location.href = 'dashboard.html';
        } else {
            // Display error message
            document.getElementById('loginError').innerHTML = "Your email or password is not valid.";
        }
    } else {
        // Display error message
        document.getElementById('loginError').innerHTML = "Your email or password is not valid.";
    }
};

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from submitting
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    
    // Validate Email
    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setError(email, 'Please enter a valid email address');
    } else {
        const emailDomain = emailValue.split('@')[1];
        if (disposableEmailDomains.includes(emailDomain)) {
            setError(email, 'Disposable email addresses are not allowed');
        } else {
            setSuccess(email);
        }
    }

    // Validate Password
    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else {
        setSuccess(password);
    }

    // If both email and password are valid, attempt login
    if (!loginForm.querySelector('.error')) {
        await login(emailValue, passwordValue);
    }
});
