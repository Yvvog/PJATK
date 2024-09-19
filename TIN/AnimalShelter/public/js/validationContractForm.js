function validateForm() {


    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const dateFormatMessage = document.getElementById('errorMessage-dateFormat').innerText;
    const pastDateMessage = document.getElementById('errorMessage-pastDate').innerText;
    const totalErrorMessage = document.getElementById('errorMessage-totalError').innerText;

    const visitorInput = document.getElementById('Visitor');
    const dogInput = document.getElementById('Dog');
    const DateInput = document.getElementById('Date');
    const obligationsInput = document.getElementById('Obligations');

    const errorVisitor = document.getElementById('errorVisitor');
    const errorDog = document.getElementById('errorDog');
    const errorDate = document.getElementById('errorDate');
    const errorObligations = document.getElementById('errorObligations');

    const errorsSummary = document.getElementById('errorSummary');

    resetErrors([visitorInput, dogInput, DateInput, obligationsInput], [errorVisitor, errorDog, errorDate, errorObligations], errorsSummary);

    let valid = true;

    if (!checkRequired(visitorInput.value)) {
        valid = false;
        visitorInput.classList.add('error-input');
        errorVisitor.innerText = reqMessage;
    }

    if (!checkRequired(dogInput.value)) {
        valid = false;
        dogInput.classList.add('error-input');
        errorDog.innerText = reqMessage;
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = '' + nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!(DateInput.value)) {
        valid = false;
        DateInput.classList.add('error-input');
        errorDate.innerText = reqMessage;
    } else if (!checkDate(DateInput.value)) {
        valid = false;
        DateInput.classList.add('error-input');
        errorDate.innerText = dateFormatMessage;
    } else if (checkDateIfAfter(DateInput.value, nowString)) {
        valid = false;
        DateInput.classList.add('error-input');
        errorDate.innerText = pastDateMessage;
    }

    if (!checkRequired(obligationsInput.value)) {
        valid = false;
        obligationsInput.classList.add('error-input');
        errorObligations.innerText = reqMessage;
    }
    if (!valid) {
        errorsSummary.innerText = totalErrorMessage;
    }

    return valid;
}