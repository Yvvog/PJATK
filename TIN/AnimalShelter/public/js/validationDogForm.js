function validateForm() {

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const lengthMessage = document.getElementById('errorMessage-length').innerText;
    const notNumberMessage = document.getElementById('errorMessage-notNumber').innerText;
    const dateFormatMessage = document.getElementById('errorMessage-dateFormat').innerText;
    const pastDateMessage = document.getElementById('errorMessage-pastDate').innerText;
    const dateIfAfterMessage = document.getElementById('errorMessage-dateIfAfter').innerText;
    const totalErrorMessage = document.getElementById('errorMessage-totalError').innerText;

    const nameInput = document.getElementById('DogName');
    const dateInput = document.getElementById('DateFrom');
    const healthyInput = document.getElementById('Healthy');
    const errorNameInput = document.getElementById('errorDogName');
    const errorDateInput = document.getElementById('errorDateFrom');
    const errorHealthyInput = document.getElementById('errorHealthy');
    const errorSummary = document.getElementById('errorSummary');
    resetErrors([nameInput, dateInput, healthyInput], [errorNameInput, errorDateInput, errorHealthyInput], errorSummary);
    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = reqMessage;
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = lengthMessage;
    } else if (!checkName(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = notNumberMessage;
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDateInput.innerText = reqMessage;
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDateInput.innerText = dateFormatMessage;

    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDateInput.innerText = pastDateMessage;
    } else if (checkRequired(dateInput.value) && checkDate(dateInput.value) && !checkDateIfAfter(dateInput.value, dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDateInput.innerText = dateIfAfterMessage;
    }


    if (!checkRequired(healthyInput.value)) {
        valid = false;
        healthyInput.classList.add("error-input");
        errorHealthyInput.innerText = reqMessage;
    }

    if (!valid) {
        errorSummary.innerText = totalErrorMessage;
    }
    return valid;
}