import feedback from "../logic/feedback";

export const checkForTextExistence = (text) => {
  text = text.toString();
  return !text || text.trim() === "" ? false : true;
};

export const checkForAlphanumerics = (text) => {
  text = text.toString();
  return !text.toString().match(/^[\w]+([\s](\w)+)*[\w]$/) ? false : true;
};

export const checkForTextLength = (text) => {
  text = text.toString();
  return text.length < 2 || text.length > 20 ? false : true;
};

export const checkForWordDog = (text) => {
  text = text.toString();
  return text.toLowerCase().trim() === "dog" ? false : true;
};

export const checkForNumberFormat = (text) => {
  text = text.toString();
  return text.match(/[\D]+/) ? false : true;
};

export const validateItemInputs = (item, setMessageFunction) => {
  if (
    !checkForTextExistence(item.category) ||
    !checkForTextExistence(item.name) ||
    !checkForTextExistence(item.stock) ||
    !checkForTextExistence(item.target)
  ) {
    setMessageFunction(feedback["ITEMINFO_INCOMPLETE"]);
    return false;
  }

  if (
    !checkForAlphanumerics(item.category) ||
    !checkForAlphanumerics(item.name)
  ) {
    setMessageFunction(feedback["TEXTFORMAT_INVALID"]);
    return false;
  }

  if (!checkForNumberFormat(item.stock) || !checkForNumberFormat(item.target)) {
    setMessageFunction(feedback["NUMBERFORMAT_INVALID"]);
    return false;
  }

  return true;
};

export const checkUsernameSintax = (text, setMessageFunction) => {
  if (!checkForTextExistence(text)) {
    setMessageFunction(feedback["USERNAME_REQUIRED"]);
    return false;
  }
  if (!checkForTextLength(text)) {
    setMessageFunction(feedback["USERNAME_LENGTH_INVALID"]);
    return false;
  }
  if (!checkForAlphanumerics(text)) {
    setMessageFunction(feedback["TEXTFORMAT_INVALID"]);
    return false;
  }

  if (!checkForWordDog(text)) {
    setMessageFunction(feedback["DOGWORD_NOT_ALLOWED"]);
    return false;
  }
  return true;
};
