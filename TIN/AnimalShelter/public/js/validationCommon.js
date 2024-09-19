function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkName(value) {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(value);
}

function checkNumber(value) {
    const pattern = /^$|^[0-9]$|^[0-9][0-9]$/;
    return pattern.test(value);
}

function chackNumberStatus(value) {
    if (value < 0 || value > 10) {
        return false;
    } else {
        return true;
    }
}

function checkNumberRange(value, min, max) {
    const patternFull = /^$/;
    const pattern = /^$|^[0-9]$|^[0-9][0-9]$/;

    if (patternFull.test(value)) {
        return true;
    } else {
        value = parseFloat(value);
        if (value < min) {
            return false;
        }
        if (value > max) {
            return false;
        }
        return true;
    }
}


function checkDate(value, min, max) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);

    if (valueDate.getTime() > compareToDate.getTime()) {
        return false;
    }
    return true;
}

function checkEmail(value) {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return pattern.test(value);
}

function checkPassword(value) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{4,16}$/;
    return pattern.test(value);
}