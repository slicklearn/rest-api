import validator from 'validator';

export const sanitizeLogin = (body) => {
    let { password, email } = body;

    if (password == null || email == null) {
        return {
            success: false,
            error: (password == null ? "PASSWORD" : "EMAIL") + "_REQUIRED"
        }
    }

    return { success: true, password, email: email.toLowerCase() };
}

export const sanitizeUsername = (body) => {
    let { username } = body;

    // Check if username is null
    if (username == null) {
        return { success: false, error: "USERNAME_REQUIRED"}
    }

    // Check if is valid
    if (!validator.isAlphanumeric(username.replace(/_/gi, ""))  || !validator.isLength(username, {min: 4, max: 32})) {
        return { success: false, error: "USERNAME_INVALID_FORMAT"}
    }

    return { success: true, username: username.toLowerCase(), displayName: username };
}

export const sanitizePasswords = (body) => {
    let { oldPassword, newPassword } = body;

    // Check if old password is null
    if (oldPassword == null) {
        return { success: false, error: "OLD_PASSWORD_REQUIRED"}
    }

    // Check if new password is null
    if (newPassword == null) {
        return { success: false, error: "NEW_PASSWORD_REQUIRED"}
    }

    // Check if is valid
    if (!validator.isLength(newPassword, {min: 8, max: 256})) {
        return { success: false, error: "NEW_PASSWORD_INVALID_FORMAT"}
    }

    return { success: true, oldPassword, newPassword }
}

export const sanitizeRegister = (body) => {
    let { password, email, username } = body;

    // Check if password, email or username is null
    if (password == null) {
        return { success: false, error: "PASSWORD_REQUIRED"}
    } 
    
    else if (email == null) {
        return { success: false, error: "EMAIL_REQUIRED"}
    } 
    
    else if (username == null) {
        return { success: false, error: "USERNAME_REQUIRED"}
    }

    // Check if email has valid format and has a max length of 128 characters
    if (!validator.isEmail(email) || !validator.isLength(email, { max: 128 })) {
        return { success: false, error: "EMAIL_INVALID_FORMAT"}
    } 
    
    // Check if username is alphanumeric and _, and check if has a length between 4 and 32 characters.
    else if (!validator.isAlphanumeric(username.replace(/_/gi, ""))  || !validator.isLength(username, {min: 4, max: 32})) {
        return { success: false, error: "USERNAME_INVALID_FORMAT"}
    } 
    
    // Check if the password length is between 8 and 256 characters
    else if (!validator.isLength(password, {min: 8, max: 256})) {
        return { success: false, error: "PASSWORD_INVALID_FORMAT"}
    }

    return { password, email: email.toLowerCase(), displayName: username, username: username.toLowerCase(), success: true };
}