const fs = require("fs").promises;

class Game {
  constructor(id, gameSets) {
    this.id = id;
    this.gameSets = gameSets;
  }
}

class GameSet {
  constructor(rolls) {
    this.rolls = rolls;
  }
}

class Roll {
  constructor(num, color) {
    this.num = num;
    this.color = color;
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
  const arr = await readFile("input.txt");
  const gamesResult = arr.map((line) => {
    const game = Number(line.split(":")[0].substring(5));
    const sets = line.split(":")[1];
    const gameSet = sets.split(";");
    const goodGameSets = gameSet.map((c) => {
      const rolls = c.split(",");
      const trimmedRolls = rolls.map((x) => x.trim());
      const mappedRolls = trimmedRolls.map((r) => {
        const number = r.split(" ")[0];
        const color = r.split(" ")[1];
        return new Roll(Number(number), color);
      });
      return new GameSet(mappedRolls);
    });
    return new Game(game, goodGameSets);
  });

  const a = gamesResult
    .filter(
      (game) =>
        game.gameSets.filter((gameset) => {
          return (
            gameset.rolls.filter(
              (roll) =>
                (roll.color == "red" && roll.num > 12) ||
                (roll.color == "green" && roll.num > 13) ||
                (roll.color == "blue" && roll.num > 14)
            ).length !== 0
          );
        }) == 0
    )
    .reduce((acc, curr) => acc + curr.id, 0);
  console.log(a);
})();
