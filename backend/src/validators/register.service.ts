

import Validator from 'validator';
import isEmpty from 'is-empty';

export function validateRegisterInput(data: any) {
    let error: string = "";
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.pconfirm = !isEmpty(data.pconfirm) ? data.pconfirm : "";
    // Name checks
    if (Validator.isEmpty(data.name))
        error = "Name field is required";
    // Email checks
    if (Validator.isEmpty(data.email))
        error = "Email field is required";
    else if (!Validator.isEmail(data.email))
        error = "Email is invalid";
    // Password checks
    if (Validator.isEmpty(data.password))
        error = "Password field is required";
    if (Validator.isEmpty(data.pconfirm))
        error = "Confirm password field is required";
    if (!Validator.isLength(data.password, { min: 6, max: 30 }))
        error = "Password must be at least 6 characters";
    if (!Validator.equals(data.password, data.pconfirm))
        error = "Passwords must match";
    return error
};