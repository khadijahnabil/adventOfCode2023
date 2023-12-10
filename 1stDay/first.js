const fs = require("fs").promises;

const numbers = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const reversedNumbers = {
  1: "eno",
  2: "owt",
  3: "eerht",
  4: "ruof",
  5: "evif",
  6: "xis",
  7: "neves",
  8: "thgie",
  9: "enin",
};

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString().split("\n");
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
(async () => {
  const arr = await readFile("input1.txt");
  const res = arr
    .map((line) => {
      const first = getFirstNumber(line, numbers);
      const last = getLastNumber(line);
      return Number(first + last);
    })
    .reduce((accumulator, curr) => accumulator + curr);
  console.log(res);
})();

function isANumber(aChar) {
  if (/^[0-9]*$/.test(aChar)) {
    return aChar;
  }
}

function getFirstNumber(line, numbersMap) {
  for (let i = 0; i < line.length; i++) {
    if (isANumber(line.charAt(i))) {
      return line.charAt(i);
    }
    for (const [key, value] of Object.entries(numbersMap)) {
      if (line.substring(i).startsWith(value)) {
        return key;
      }
    }
  }
}

function getLastNumber(line) {
  const reversedLine = line.split("").reverse().join("");
  const result = getFirstNumber(reversedLine, reversedNumbers);
  return result;
}
