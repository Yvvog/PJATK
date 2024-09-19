function validateForm() {


    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lengthMessage = document.getElementById('errorMessage-length').innerText;
    const notNumberMessage = document.getElementById('errorMessage-notNumber').innerText;
    const numberRangeMessage = document.getElementById('errorMessage-numberRange').innerText;
    const dateFormatMessage = document.getElementById('errorMessage-dateFormat').innerText;
    const pastDateMessage = document.getElementById('errorMessage-pastDate').innerText;
    const dateIfAfterMessage = document.getElementById('errorMessage-dateIfAfter').innerText;
    const emailPatternMessage = document.getElementById('errorMessage-emailPattern').innerText;
    const passPatternMessage = document.getElementById('errorMessage-passPattern').innerText;
    const totalErrorMessage = document.getElementById('errorMessage-totalError').innerText;

    const formModeInput = document.getElementById('formMode');
    const empNameInput = document.getElementById('EmpName');
    const empSurnameInput = document.getElementById('EmpSurname');
    const dateEmpInput = document.getElementById('DateEmp');
    const emailEmpInput = document.getElementById('EmailEmp');
    const passwordEmpInput = document.getElementById('PasswordEmp');
    const errorNameInput = document.getElementById('errorEmpName');
    const errorSurnameInput = document.getElementById('errorEmpSurname');
    const errorDateEmpInput = document.getElementById('errorDateEmp');
    const errorEmailInput = document.getElementById('errorEmailEmp');
    const errorPasswordInput = document.getElementById('errorPasswordEmp');
    const errorSummary = document.getElementById('errorSummary');
    resetErrors([empNameInput, empSurnameInput, dateEmpInput, emailEmpInput, passwordEmpInput], [errorNameInput, errorSurnameInput, errorDateEmpInput, errorEmailInput, errorPasswordInput], errorSummary);
    let valid = true;

    if (!checkRequired(empNameInput.value)) {
        valid = false;
        empNameInput.classList.add("error-input");
        errorNameInput.innerText = reqMessage;
    } else if (!checkName(empNameInput.value)) {
        valid = false;
        empNameInput.classList.add("error-input");
        errorNameInput.innerText = notNumberMessage;
    } else if (!checkTextLengthRange(empNameInput.value, 2, 60)) {
        valid = false;
        empNameInput.classList.add("error-input");
        errorNameInput.innerText = lengthMessage;
    }

    if (!checkRequired(empSurnameInput.value)) {
        valid = false;
        empSurnameInput.classList.add("error-input");
        errorSurnameInput.innerText = reqMessage;
    } else if (!checkName(empNameInput.value)) {
        valid = false;
        empNameInput.classList.add("error-input");
        errorNameInput.innerText = notNumberMessage;
    } else if (!checkTextLengthRange(empSurnameInput.value, 2, 60)) {
        valid = false;
        empSurnameInput.classList.add("error-input");
        errorSurnameInput.innerText = lengthMessage;
    }
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateEmpInput.value)) {
        valid = false;
        dateEmpInput.classList.add("error-input");
        errorDateEmpInput.innerText = reqMessage;
    } else if (!checkDate(dateEmpInput.value)) {
        valid = false;
        dateEmpInput.classList.add("error-input");
        errorDateEmpInput.innerText = dateFormatMessage;

    }

    if (!checkRequired(emailEmpInput.value)) {
        valid = false;
        emailEmpInput.classList.add("error-input");
        errorEmailInput.innerText = reqMessage;
    } else if (!checkEmail(emailEmpInput.value)) {
        valid = false;
        emailEmpInput.classList.add("error-input");
        errorEmailInput.innerText = emailPatternMessage;
    }
    if (formModeInput.value == 'createNew') {
        if (!checkRequired(passwordEmpInput.value)) {
            valid = false;
            passwordEmpInput.classList.add("error-input");
            errorPasswordInput.innerText = reqMessage;
        } else if (!checkPassword(passwordEmpInput.value)) {
            valid = false;
            passwordEmpInput.classList.add("error-input");
            errorPasswordInput.innerText = passPatternMessage;
        }
    } else if (formModeInput.value == 'edit' && passwordEmpInput.value != "") {
        if (!checkPassword(passwordEmpInput.value)) {
            valid = false;
            passwordEmpInput.classList.add("error-input");
            errorPasswordInput.innerText = passPatternMessage;
        }
    }

    if (!valid) {
        errorSummary.innerText = totalErrorMessage;
    }
    return valid;
}