/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
* Masks the first 5 digits of the mobile number with *
* @param {*} mobileNumber
* @returns {string} returns the mobile number with first 5 digits masked
*/
function maskMobileNumber(mobileNumber) {
  if (!mobileNumber) {
    return '';
  }
  const value = mobileNumber.toString();
  // Mask first 5 digits and keep the rest
  return ` ${'*'.repeat(5)}${value.substring(5)}`;
}

/** 
 * Custom Functions
*/

/**
 * Starts OTP resend timer
 * @returns {string}
 */
function startOtpTimer() {
  const resendBtn = document.querySelector('.field-resendotpbtn button');
  const timerText = document.querySelector('.field-resend-and-attempts-text strong');

  let timeLeft = 30;

  if (resendBtn) {
    resendBtn.disabled = true;
    resendBtn.style.background = '#999';
    resendBtn.style.cursor = 'not-allowed';
  }

  const timer = setInterval(() => {
    if (timerText) {
      timerText.innerText = `${timeLeft} secs`;
    }

    timeLeft -= 1;

    if (timeLeft < 0) {
      clearInterval(timer);

      if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.style.background = 'blue';
        resendBtn.style.cursor = 'pointer';
      }

      if (timerText) {
        timerText.innerText = '0 secs';
      }
    }
  }, 1000);

  return 'Timer Started';
}
/**
 * Handles resend OTP attempts in frontend
 * @returns {string}
 */
function handleResendOtpAttempt() {
  const resendBtn = document.querySelector('.field-resendotpbtn button');
  const timerText = document.querySelector('.field-resend-and-attempts-text strong');
  const attemptsText = document.querySelector('.field-resend-and-attempts-text');

  let attemptsLeft = Number(sessionStorage.getItem('otpAttemptsLeft'));

  if (!attemptsLeft) {
    attemptsLeft = 3;
  }

  attemptsLeft -= 1;
  sessionStorage.setItem('otpAttemptsLeft', attemptsLeft);

  if (attemptsLeft <= 0) {
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.style.background = '#999';
      resendBtn.style.cursor = 'not-allowed';
    }

    if (attemptsText) {
      attemptsText.innerText = 'Try again sometime.';
    }

    return 'No attempts left';
  }

  startOtpTimer();

  return `${attemptsLeft} attempts left`;
}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, submitFormArrayToString, maskMobileNumber, startOtpTimer, handleResendOtpAttempt
};
