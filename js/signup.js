const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const successMessage = document.getElementById("successMessage");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    let isValid = true;
    if (name === "") {
        nameError.textContent = "Name is required";
        isValid = false;
    } else if (name.length < 3) {
        nameError.textContent = "Name must contain at least 3 characters";
        isValid = false;
    } else if (!/^[A-Za-z ]+$/.test(name)) {
        nameError.textContent ="Name can contain only letters and spaces";
        isValid = false;
    }

    if (email === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
    } else if (isEmailExists(email)) {
        emailError.textContent = "This email is already registered";
        isValid = false;
    }

    if (phone === "") {
        phoneError.textContent = "Phone number is required";
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
        phoneError.textContent = "Phone must contain exactly 10 digits";
        isValid = false;
    }

    if (password === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = "Password must contain at least 8 characters";
        isValid = false;
    } else if (!/[A-Z]/.test(password)) {
        passwordError.textContent = "Password must contain an uppercase letter";
        isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
        passwordError.textContent = "Password must contain a special character";
        isValid = false;
    }

    if (confirmPassword === "") {
        confirmPasswordError.textContent = "Confirm password is required";
        isValid = false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match";
        isValid = false;
    }

    if (isValid) {
        saveUser(name, email, phone);
        successMessage.textContent = "Registration successful!";
        signupForm.reset();
        window.location.href = 'users.html';
    }
});

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isEmailExists(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(function(user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });
}

function saveUser(name, email, phone) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = {
        name: name,
        email: email,
        phone: phone
    };
    users.push(user);
    localStorage.setItem( "users", JSON.stringify(users));
}


function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    successMessage.textContent = "";
}