const fs = require("fs").promises;

class Game {
  constructor(winningNums, playNums) {
    this.winningNums = winningNums;
    this.playNums = playNums;
  }
}

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString().split("\n");
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
(async () => {
  const arr = await readFile("input4.txt");
  const cards = arr.map((card) => {
    const nums = card.split(":")[1];
    const winningNums = nums.trim().split("|")[0];
    const winningNumsArr = winningNums.split(" ").filter((n) => n);
    const playNums = nums.trim().split("|")[1];
    const playNumsArr = playNums.split(" ").filter((n) => n);
    return new Game(winningNumsArr, playNumsArr);
  });

  const result = cards
    .map((game) => {
      const { winningNums, playNums } = game;
      let intersection = winningNums.filter((x) => playNums.includes(x));
      return Math.floor(Math.pow(2, intersection.length - 1));
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(result);
})();
