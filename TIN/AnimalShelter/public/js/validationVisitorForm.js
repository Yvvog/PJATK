function validateForm() {


    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lengthMessage = document.getElementById('errorMessage-length').innerText;
    const notNumberMessage = document.getElementById('errorMessage-notNumber').innerText;
    const numberRangeMessage = document.getElementById('errorMessage-numberRange').innerText;
    const emailPatternMessage = document.getElementById('errorMessage-emailPattern').innerText;
    const passPatternMessage = document.getElementById('errorMessage-passPattern').innerText;
    const totalErrorMessage = document.getElementById('errorMessage-totalError').innerText;

    const formModeInput = document.getElementById('formMode');
    const nameInput = document.getElementById('Name');
    const surnameInput = document.getElementById('Surname');
    const numOfVisitsInput = document.getElementById('NumberOfVisits');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('Password');
    const errorNameInput = document.getElementById('errorName');
    const errorSurnameInput = document.getElementById('errorSurname');
    const errorNumOfVisitsInput = document.getElementById('errorNumberOfVisits');
    const errorEmailInput = document.getElementById('errorEmail');
    const errorPasswordInput = document.getElementById('errorPassword');
    const errorSummary = document.getElementById('errorSummary');
    resetErrors([nameInput, surnameInput, numOfVisitsInput, emailInput, passwordInput], [errorNameInput, errorSurnameInput, errorNumOfVisitsInput, errorEmailInput, errorPasswordInput], errorSummary);
    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = reqMessage;
    } else if (!checkName(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = notNumberMessage;
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = lengthMessage;
    }

    if (!checkRequired(surnameInput.value)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurnameInput.innerText = reqMessage;
    } else if (!checkName(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = notNumberMessage;
    } else if (!checkTextLengthRange(surnameInput.value, 2, 60)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurnameInput.innerText = lengthMessage;
    }

    if (!checkNumber(numOfVisitsInput.value)) {
        valid = false;
        numOfVisitsInput.classList.add("error-input");
        errorNumOfVisitsInput.innerText = numberRangeMessage;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmailInput.innerText = reqMessage;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmailInput.innerText = emailPatternMessage;
    }
    if (formModeInput.value == 'createNew') {
        if (!checkRequired(passwordInput.value)) {
            valid = false;
            passwordInput.classList.add("error-input");
            errorPasswordInput.innerText = reqMessage;
        } else if (!checkPassword(passwordInput.value)) {
            valid = false;
            passwordInput.classList.add("error-input");
            errorPasswordInput.innerText = passPatternMessage;
        }
    } else if (formModeInput.value == 'edit' && passwordInput.value != "") {
        if (!checkPassword(passwordInput.value)) {
            valid = false;
            passwordInput.classList.add("error-input");
            errorPasswordInput.innerText = passPatternMessage;
        }
    }

    if (!valid) {
        errorSummary.innerText = totalErrorMessage;
    }
    return valid;
}