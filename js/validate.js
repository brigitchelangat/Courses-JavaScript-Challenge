const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// Event listeners for form submission
if (signUpForm) {
    signUpForm.addEventListener('submit', e => {
        e.preventDefault(); //prevent form from submitting
        validate();
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault(); //prevent form from submitting
        validate();
        login(email.value.trim(), password.value.trim());
    });
}

// Regular expressions
const nameRegex = /^[a-zA-Z]{2,}$/; // Only letters, at least 2 characters
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // Min 6 characters, 1 uppercase, 1 number, 1 special character
const disposableEmailDomains = ["mailinator.com", "tempmail.com", "10minutemail.com"]; // Add more as needed

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validate = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    // Validating First Name
    if (firstNameValue === '') {
        setError(firstName, 'First name is required');
    } else if (!nameRegex.test(firstNameValue)) {
        setError(firstName, 'First name must be at least 2 characters long and contain only letters');
    } else {
        setSuccess(firstName);
    }

    // Validating Last Name
    if (lastNameValue === '') {
        setError(lastName, 'Last name is required');
    } else if (!nameRegex.test(lastNameValue)) {
        setError(lastName, 'Last name must be at least 2 characters long and contain only letters');
    } else {
        setSuccess(lastName);
    }

    // Validating Email
    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!emailRegex.test(emailValue)) {
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
    } else if (!passwordRegex.test(passwordValue)) {
        setError(password, 'Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character');
    } else {
        setSuccess(password);
    }

    // Confirm Password
    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
    } else {
        setSuccess(password2);
    }

};
 
//isEmailValid
const isEmailValid = (email) => {
    const response =  fetch('path/to/users.json');
    const data =  response.json();
    const user = data.users.find(user => user.email === email);
    return user || null;
};

//login
const login =  (email, password) => {
    const user = isEmailValid(email);
    if (user) {
        if (user.password === password) {
            // Redirect to courses.html
            window.location.href = 'dashboard.html';
            alert("You have successfully logged in!")
        } else {
            // Display error message
            document.getElementById('loginError').innerHTML = "Your email or password is not valid.";
        }
    } else {
        // Display error message
        document.getElementById('loginError').innerHTML = "Your email or password is not valid.";
    }
};

const loginButton = document.getElementById("loginButton");
const loginErrorDiv = document.getElementById("loginError");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    validate();
    login(emailValue,passwordValue);
    
});


