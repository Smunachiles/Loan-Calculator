
const principle = document.getElementById('amount');
const interest = document.getElementById('interest');
const duration = document.getElementById('years');
const resultDiv = document.getElementById('result');
const monthPay = document.getElementById('monthly-payment');
const totalPay = document.getElementById('total-payment');
const totalInt = document.getElementById('total-interest');
const createLoan = document.getElementById('create-loan');
const formLoan = document.getElementById('loan-form');
const inputFields = document.getElementsByClassName('input');
const errMesages = document.getElementsByClassName('error-message');

const inputs = Array.from(inputFields);
// Lunch function
lunchProgram()

// Lunch function
function lunchProgram() {
  // Check error on principle
  inputs.forEach(input => {
    input.addEventListener('keyup', inputErrHandler);
  })
  // Event on form submit (create loan)
  createLoan.addEventListener('click', createLoanEvent);

  // disable Submit button
  createLoan.setAttribute('disabled', 'disabled');
}

// Error Handler for the inputs
function inputErrHandler(e) {
  const input = Number(e.target.value),
        id = e.target.id;
  let borderColor = e.target.style;

  // Principle
  switch (id) {
    case 'amount':
      // Amount Range 
      if(input >= 50 && input < 50000) {
        borderColor['border-color'] = 'green';
        errMesages[0].innerText = '';

        // Consider the other input fields
        if (interest.style['border-color'].includes('green') && duration.style['border-color'].includes('green')) {
          createLoan.removeAttribute('disabled');
        }
      } else {
        borderColor['border-color'] = 'red';
        errMesages[0].innerText = 'Amount should not be less than $50 or more than $50,000';
        // Hide results
        resultDiv.style.display = 'none';
        // disable Submit button
        createLoan.setAttribute('disabled', 'disabled');
      }
      if (isNaN(input)) {
        errMesages[0].innerText = 'invalid Input';
      }
      // Checks for empty input
      if (input == '') {
        borderColor['border-color'] = '';
        errMesages[0].innerText = '';
      }
      break;
    case 'interest':
      if(input >= 0 && input <= 100) {
        borderColor['border-color'] = 'green';
        errMesages[1].innerText = '';

        // Consider the other input fields
        if (principle.style['border-color'].includes('green') && duration.style['border-color'].includes('green')) {
          createLoan.removeAttribute('disabled');
        }
      } else {
        borderColor['border-color'] = 'red';
        errMesages[1].innerText = 'interest is from 0 to 100';
        // Hide results
        resultDiv.style.display = 'none';
        // disable Submit button
        createLoan.setAttribute('disabled', 'disabled');
      }
      if (isNaN(input)) {
        errMesages[1].innerText = 'invalid Input';
      }
      // Checks for empty input
      if (input == '') {
        borderColor['border-color'] = '';
        errMesages[1].innerText = '';
      }
      break;
    case 'years':
      if(input > 0 && input <= 12) {
        borderColor['border-color'] = 'green';
        errMesages[2].innerText = '';

        // Consider the other input fields
        if (interest.style['border-color'].includes('green') && principle.style['border-color'].includes('green')) {
          createLoan.removeAttribute('disabled');
        }
      } else {
        borderColor['border-color'] = 'red';
        errMesages[2].innerText = 'Duration should be 0 to 12 years';
        // Hide results
        resultDiv.style.display = 'none';
        // disable Submit button
        createLoan.setAttribute('disabled', 'disabled');
      }
      if (isNaN(input)) {
        errMesages[2].innerText = 'invalid Input';
      }
      
      // Checks for empty input
      if (input == '') {
        borderColor['border-color'] = '';
        errMesages[2].innerText = '';
      }
      break;
      default:
        break;
      }
}


// Event on form submit
function createLoanEvent(e) {
  // Show results
  resultDiv.style.display = 'none';
  // Get card body
  const card = document.querySelector('.card');
  // Create loader div
  const loadDiv = document.createElement('div');
  // Add attr
  loadDiv.className = 'loader my-2 text-center';

  // Load Image
  const createLoader = document.createElement('div');
  // Add Attributes
  createLoader.setAttribute('class', 'spinner-grow');
  createLoader.style.width = '150px';
  createLoader.style.height = '150px';

  // Append loadDiv to LoadImg
  loadDiv.appendChild(createLoader);
  // Append LoadDiv to DOM
  card.appendChild(loadDiv);
  
  // Set timeOut to Display result
  setTimeout(showResult, 2500);

  // e.preventDefault();
}

// display result 
function showResult() {
  // remove loader
  document.querySelector('.loader').remove();
  /*
  Formular for Simple interest
  I = P(1 + (rt/100))
  where
  I = simple Inerest
  P = Principle
  r = Rate (%)
  t = time (years)
  */

  // Declaring variables
  const loanAmount = principle.value;
  const loanRate = interest.value;
  const loanYears = duration.value;

  // Calculations
  totalInt.value = ((loanAmount * (1 + ((loanRate * loanYears)/100))) - loanAmount).toFixed(2);
  totalPay.value = (Number(loanAmount) + Number(totalInt.value)).toFixed(2);
  monthPay.value = (totalPay.value/12).toFixed(2);

  // Show results
  resultDiv.style.display = 'block';
}
