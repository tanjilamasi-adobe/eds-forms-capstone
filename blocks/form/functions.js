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

let resendCount = 0;
const maxAttempts = 3;
let interval;
let timeLeft = 30;

/**
 * Handles resend OTP logic (attempts + initial timer)
 * @returns {object}
 */
function resendOtpHandler() {
  if (resendCount >= maxAttempts) {
    return {
      timerText: 'No more resend attempts left',
      attemptsText: '0/3 attempt(s) left',
      disableButton: true,
    };
  }

  resendCount++;
  timeLeft = 30;

  const attemptsLeft = maxAttempts - resendCount;

  clearInterval(interval);

  interval = setInterval(() => {
    timeLeft--;
  }, 1000);

  return {
    timerText: `Resend OTP in: ${timeLeft} secs`,
    attemptsText: `${attemptsLeft}/3 attempt(s) left`,
    disableButton: true,
  };
}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, submitFormArrayToString, maskMobileNumber, resendOtpHandler,
};
