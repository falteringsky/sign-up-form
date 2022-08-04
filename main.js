/*FLOATING LABELS START*/

$(document).ready(function(){
// Test for placeholder support
$.support.placeholder = (function(){
    var i = document.createElement('input');
    return'placeholder' in i;
})();

// Hide labels by default if placeholders are supported
if($.support.placeholder) {
    $('.form li > .firstName, .lastName, .phoneNumber, .password, .confirmPassword').each(function(){
        $(this).addClass('js-hide-label');
    });  

    // Code for adding/removing classes here
    $('.form li > .firstName, .lastName, .phoneNumber, .password, .confirmPassword').find('input').on('keyup blur focus', function(e){
    
        // Cache our selectors
        var $this = $(this),
            $parent = $this.parent();
    
        // Add or remove classes
        if (e.type == 'keyup') {
            // keyup code here
            if( $this.val() == '' ) {
                $parent.addClass('js-hide-label'); 
            } else {
                $parent.removeClass('js-hide-label');   
            }                
        } 
        else if (e.type == 'blur') {
            // blur code here
            if( $this.val() == '' ) {
                $parent.addClass('js-hide-label');
            } 
            else {
                $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
            }
        } 
        else if (e.type == 'focus') {
            // focus code here
            if( $this.val() !== '' ) {
                $parent.removeClass('js-unhighlight-label');
            }
        }
    });
}
});
/*FLOATING LABELS END*/


/*VALIDATION FORM CHECK START*/
const firstNameEl = document.querySelector('#fName');
const lastNameEl = document.querySelector('#lName');
const emailEl = document.querySelector('#userEmail');
const passwordEl = document.querySelector('#pass');
const confirmPasswordEl = document.querySelector('#confirmPass');
const form = document.querySelector('#signup');


const checkFirstName = () => {

    let valid = false;
    const min = 1,
        max = 25;
    const firstname = firstNameEl.value.trim();

    if (!isRequired(firstname)) {
        showError(firstNameEl, 'First name cannot be blank.');
    } else if (!isBetween(firstname.length, min, max)) {
        showError(firstNameEl, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {

    let valid = false;
    const min = 1,
        max = 25;
    const lastname = lastNameEl.value.trim();

    if (!isRequired(lastname)) {
        showError(lastNameEl, 'Last name cannot be blank.');
    } else if (!isBetween(lastname.length, min, max)) {
        showError(lastNameEl, `Last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Confirm password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); //regEx for validating email
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password); //regEx for validating pasword
};

const isRequired = value => value === '' ? false : true; //returns true if argument(input) empty

const isBetween = (length, min, max) => length < min || length > max ? false : true; //returns false if argument(input) is not between certain characters

const showError = (input, message) => {
    // get the div parent element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the div parent element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

//timer for improving performance by waiting to validate form inputs until user has stopped typing for 0.5s
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

//instant feedback of input fields, not requiring to press Sign-Up by getting ids of input and changing cases as indicated
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fName':
            checkFirstName();
            break;
        case 'lName':
            checkLastName();
            break;  
        case 'userEmail':
            checkEmail();
            break;
        case 'pass':
            checkPassword();
            break;
        case 'confirmPass':
            checkConfirmPassword();
            break;
    }
}));
/*VALIDATION FORM CHECK END*/

/*TOGGLE PASSWORD TO VIEW/HIDDEN START*/
    const togglePassword = document.querySelector("#togglePassword");

        togglePassword.addEventListener("click", function () {
            // toggle the type attribute
            const type = passwordEl.getAttribute("type") === "password" ? "text" : "password";
            passwordEl.setAttribute("type", type);
            
            // toggle the icon
            this.classList.toggle("bi-eye");
        });
