import Validator from "validator";
import isEmpty from "is-empty";

export function validateLoginInput(data: any) {
    let error: string = "";
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Email and Password checks
    if (Validator.isEmpty(data.email))
        error = "Email field is required";
    else if (!Validator.isEmail(data.email))
        error = "Email is invalid";
    // Password checks
    if (Validator.isEmpty(data.password))
        error = "Password field is required";
    return error;
};