exports.validationCheck = (data) => {
  for (let key in data) {
    if (!data[key]) {
      return { status: false, errorAt: key };
    }
  }
  return { status: true };
};

exports.validateEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};

exports.validatePhoneNumber = (input_str) => {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(input_str);
};

exports.getFilledObject = (data) => {
  let result = {};
  for (let key in data) {
    if (data[key]) {
      result[key] = data[key];
    }
  }
  return result;
};

exports.passwordCheck = (password) => {
  const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let result = { status: true, response: "" };
  if (password.search(/[0-9]/) == -1) {
    result.status = false;
    result.response = "Password must contain at least 6 characters";
  } else if (password.search(/[a-z]/) == -1) {
    result.status = false;
    result.response = "Password must contain one lower case character";
  } else if (password.search(/[A-Z]/) == -1) {
    result.status = false;
    result.response = "Password must contain one upper case character";
  } else if (!specialCharacterFormat.test(password)) {
    result.status = false;
    result.response = "Password must contain special character";
  }
  return result;
};
