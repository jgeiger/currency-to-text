function CurrencyConverter(currency) {
  "use strict";

  var SINGLES = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine"
  },
  TENS = {
    "20": "twenty",
    "30": "thirty",
    "40": "forty",
    "50": "fifty",
    "60": "sixty",
    "70": "seventy",
    "80": "eighty",
    "90": "ninety"
  },
  TEENS = {
    "10": "ten",
    "11": "eleven",
    "12": "twelve",
    "13": "thirteen",
    "14": "fourteen",
    "15": "fifteen",
    "16": "sixteen",
    "17": "seventeen",
    "18": "eighteen",
    "19": "nineteen"
  },
  SUFFIXES = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion"
  ],
  textArray = ["and", "dollars"],

  createOnesString = function(value) {
    return SINGLES[value.toString()];
  },

  createTeenString = function(value) {
    return TEENS[value.toString()];
  },

  createHypenatedString = function(numberText) {
    var array = numberText.split(""),
        joinWith = "",
        tensPlace = array[0],
        onesPlace = array[1],
        tenMultiple = parseInt(tensPlace, 10)*10,
        stringArray = [TENS[tenMultiple.toString()]];

    if (onesPlace !== "0") {
      stringArray.push(SINGLES[onesPlace]);
      joinWith = "-";
    }
    return stringArray.join(joinWith);
  },

  createTensString = function(tensInput) {
    var integerValue = parseInt(tensInput, 10);

    if (integerValue < 10) {
      return createOnesString(integerValue);
    }

    if (integerValue < 20) {
      return createTeenString(integerValue);
    }
    return createHypenatedString(tensInput);
  },

  addHundredsText = function(numberGroup, array) {
    var hundredsValue = numberGroup.slice(0, 1);

    if (hundredsValue !== "0") {
      array.unshift("hundred");
      array.unshift(SINGLES[hundredsValue]);
    }
    return array;
  },

  removeZeroValues = function(array) {
    if (array[0] === "zero") {
      array.pop();
    }
    return array;
  },

  createHundredGroups = function(numberGroup) {
    var tensValue = numberGroup.slice(-2),
        hundredsArray = [createTensString(tensValue)];

    if (numberGroup.length === 3) {
      hundredsArray = removeZeroValues(hundredsArray);
      hundredsArray = addHundredsText(numberGroup, hundredsArray);
    }
    return hundredsArray.join(" ");
  },

  addSuffix = function(count, array) {
    if (count !== 0) {
      array.unshift(SUFFIXES[count]);
    }
    return;
  },

  addCentsString = function(currencyArray) {
    var centsValue = "00",
        trailingZerosTruncated;

    if (currencyArray.length === 2) {
      trailingZerosTruncated = currencyArray[1].slice(0, 2);
      centsValue = ("0" + trailingZerosTruncated).slice(-2);
    }

    textArray.splice(-1, 0, centsValue+"/100");
    return;
  },

  splitDecimalPlace = function(value) {
    var currencyArray = value.split(".");

    addCentsString(currencyArray);
    return currencyArray[0];
  },

  convertedCurrencyString = function() {
    var string = textArray.join(" ");

    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  parseDollarValue = function(dollarString) {
    var thousandsCount = 0,
        hundred,
        hundredString;

    while (dollarString.length > 0) {
      hundred = dollarString.slice(-3);
      dollarString = dollarString.slice(0, -3);
      hundredString = createHundredGroups(hundred);
      if (hundredString.length > 0) {
        addSuffix(thousandsCount, textArray);
        textArray.unshift(hundredString);
      }
      thousandsCount += 1;
    }
    return;
  };

  this.convertCurrency = function() {
    var dollarString = splitDecimalPlace(currency);

    parseDollarValue(dollarString);
    return convertedCurrencyString();
  };
}

CurrencyConverter.prototype.toText = function() {
  "use strict";

  return this.convertCurrency();
};
