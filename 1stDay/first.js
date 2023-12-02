const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString().split("\n");
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
(async () => {
  const arr = await readFile("testData.txt");
  const res = arr
    .map((line) => {
      const first = getFirstNumber(line);
      const last = getLastNumber(line);
      return Number(first + last);
    })
    .reduce((accumulator, curr) => accumulator + curr);
  console.log(res);
})();

function getFirstNumber(item) {
  for (let i = 0; i <= item.length - 1; i++) {
    if (/^[0-9]*$/.test(item[i])) {
      return item[i];
    }
  }
  return null;
}

function getLastNumber(item) {
  for (let i = item.length - 1; i >= 0; i--) {
    if (/^[0-9]*$/.test(item[i])) {
      return item[i];
    }
  }
  return null;
}
