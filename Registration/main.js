document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const usernameInput = document.getElementById('usernameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    function showError(input, errorMessage) {
        let errorContainer = document.getElementById(`${input.id}Error`);
        if (!errorContainer) {
            errorContainer = document.createElement('p');
            errorContainer.id = `${input.id}Error`;
            errorContainer.style.color = "red";
            input.parentElement.appendChild(errorContainer);
        }
        errorContainer.textContent = errorMessage;
        input.classList.add('error');
        errorContainer.style.display = 'block';
    }

    function hideError(input) {
        let errorContainer = document.getElementById(`${input.id}Error`);
        if (errorContainer) {
            errorContainer.textContent = '';
            input.classList.remove('error');
            errorContainer.style.display = 'none';
        }
    }

    function validateUsername() {
        if (usernameInput.value.length < 3 || usernameInput.value.length > 15) {
            showError(usernameInput, 'Username must be at least 3 characters');
        } else {
            hideError(usernameInput);
        }
    }

    function validateEmail() {
        if (!emailInput.value.match(/^\S+@\S+\.\S+$/)) {
            showError(emailInput, 'Email is not valid!!!');
        } else {
            hideError(emailInput);
        }
    }

    function validatePassword() {
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
        } else {
            hideError(passwordInput);
        }
    }

    function validateConfirmPassword() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match');
        } else {
            hideError(confirmPasswordInput);
        }
    }

    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            const userData = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(userData);

            localStorage.setItem('users', JSON.stringify(users));

            const successMessage = document.createElement('p');
            successMessage.textContent = 'Registration successful!';
            successMessage.classList.add('success-message');
            form.appendChild(successMessage);
            form.reset();
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });

    function validateForm() {
        validateUsername();
        validateEmail();
        validatePassword();
        validateConfirmPassword();

        return !form.querySelector('.error');
    }
});