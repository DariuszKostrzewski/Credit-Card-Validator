import { issuers } from "./issuers.js";

export default function pretest(number) {
  let output = "";

  try {
    const isNumber = digitsTest(number); //string in, string out
    const isLength = lengthTest(isNumber); //string in, string out
    const issuerName = issuerTest(isLength); //string/arr in, string out

    if (issuerName === "") {
      throw new Error("Sorry, the card provider is unknown.");
    } else {
      output = isNumber;
    }
  } catch (e) {
    output = `${e.message}`; // ${e.stack}`;
  }
  return output;
}

//instant digits test

function digitsTest(str) {
  const arrNumber = Array.from(str);
  let digits = "";

  arrNumber.forEach((element) => {
    if (isNaN(element)) {
      throw new Error(`Whoops! '${element}' is not a number!`);
    } else {
      return (digits += element);
    }
  });
  return digits;
}

//instant length test

function lengthTest(str) {
  const regex = /\S*\d+/g;
  if (str.match(regex)) {
    const pretested = str.match(regex).join("");
    const strLength = pretested.length;

    if (strLength < 13) {
      throw new Error(`Whoops! The number entered: ${pretested} is too short!`);
    }
    if (strLength == 14) {
      throw new Error(`Whoops! The number entered: ${pretested} is invalid!`);
    }
    if (strLength > 16) {
      throw new Error(`Whoops! The number entered: ${pretested} is too long!`);
    }
  } else {
    return str;
  }
  return str;
}

//specifying issuer, function compares/testing entry data with data stored in module issuers.js

function issuerTest(arr) {
  let issuer = "";
  const numLength = arr.length;
  const [firstDigit, secondDigit] = arr;
  const prefixShort = firstDigit;
  const prefixLong = `${firstDigit}${secondDigit}`;

  issuers.forEach((el) => {
    if (el.prefix.includes(prefixShort) && el.numLength.includes(numLength)) {
      return (issuer = el.id);
    }
    if (el.prefix.includes(prefixLong) && el.numLength.includes(numLength)) {
      return (issuer = el.id);
    }
  });
  return issuer;
}
