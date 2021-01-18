import pretest from "./pretest.js";

export default function luhn(str) {
  const lastDigit = str.slice(-1);
  console.log(`${str} entry`);
  let output = "";
  try {
    const verified = luhnAlg(str);
    console.log(`${verified} after luhn`);
    if (verified !== +lastDigit) {
      throw new Error(`The Credit Card number is NOT valid`);
    } else {
      return (output = `The Credit Card number is valid`);
    }
  } catch (e) {
    return e;
  }
  return output;
}

function luhnAlg(str) {
  const numToVerify = str.split("");
  numToVerify.splice(-1);
  const reversed = numToVerify.reverse();
  console.log(reversed);

  let message = "";
  let sum = 0;

  for (let i = 0; i <= reversed.length; i++) {
    let digit = +reversed[i];
    console.log(`${i} index ${reversed[i]}`);
    if (i % 2 == 0) {
      digit *= 2;
      console.log(digit);
      if (digit > 9) {
        console.log(`${digit} > 9`);
        digit -= 9;
      }
    }
    sum += digit;
    console.log(`${i}:index - cyfra: ${digit} >> suma ${sum}`);
  }

  const checkSum = sum % 10;
  console.log(`${sum} suma`);
  console.log(`${checkSum} kontr`);
  return checkSum;
}
