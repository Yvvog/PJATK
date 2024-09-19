function validateForm() {


    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const totalErrorMessage = document.getElementById('errorMessage-totalError').innerText;
    const notNumberMessage = document.getElementById('errorMessage-notNumber').innerText;
    const numberRangeMessage = document.getElementById('errorMessage-numberRange').innerText;
    const numberRangeStatusMessage = document.getElementById('errorMessage-numberRangeStatus').innerText;

    const employeeInput = document.getElementById('Employee');
    const dogInput = document.getElementById('Dog');
    const statusInput = document.getElementById('Status');
    const descrInput = document.getElementById('Descr');

    const errorEmployee = document.getElementById('errorEmployee');
    const errorDog = document.getElementById('errorDog');
    const errorStatus = document.getElementById('errorStatus');
    const errorDescr = document.getElementById('errorDescr');

    const errorsSummary = document.getElementById('errorSummary');

    resetErrors([employeeInput, dogInput, statusInput, descrInput], [errorEmployee, errorDog, errorStatus, errorDescr], errorsSummary);

    let valid = true;

    if (!checkRequired(employeeInput.value)) {
        valid = false;
        employeeInput.classList.add('error-input');
        errorEmployee.innerText = reqMessage;
    }

    if (!checkRequired(dogInput.value)) {
        valid = false;
        dogInput.classList.add('error-input');
        errorDog.innerText = reqMessage;
    }

    if (!checkRequired(statusInput.value)) {
        valid = false;
        statusInput.classList.add("error-input");
        errorStatus.innerText = reqMessage;
    } else if (!checkNumberStatus(statusInput.value)) {
        valid = false;
        statusInput.classList.add("error-input");
        errorStatus.innerText = numberRangeMessageStatus;
    }

    if (!checkRequired(descrInput.value)) {
        valid = false;
        descrInput.classList.add('error-input');
        errorDescr.innerText = reqMessage;
    }
    if (!valid) {
        errorsSummary.innerText = totalErrorMessage;
    }

    return valid;
}