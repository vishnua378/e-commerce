function passwordValidate(password){
    const minlength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const haspecial = /[!@#$%^&*()_{}|":?>?><,./;'"]/.test(password);

    if(password.length < minlength){
        return "Password must be atleast 8 characters"
    }
    if(!hasUpper){
        return "Password must be Uppercase";
    }
    if(!hasLower){
        return "Password must be Lowercase";
    }
    if(!hasNum){
        return "Password must be numbers";
    }
    if(!haspecial){
        return "Password must be special characters";
    }

    return   ""; 

}

module.exports = passwordValidate;
    ;