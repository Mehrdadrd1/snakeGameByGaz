let seconds = 0;
let timerInterval = null;
let snakeInterval = null;
let isCaounting = false; //Flag
let score = 0;

const snake = {
  positions: [
    { x: 100, y: 100 },
    { x: 90, y: 100 },
  ],
  direction: "right",
};

const food = {
  x: 300,
  y: 300,
};

const snakeStartDom = document.getElementById("snakeStart");

const snakeBoardDom = document.getElementById("snakeBoard");

const convertSecondsTotime = () => {
  let minutesNumber = Math.floor(seconds / 60);
  let secondsNumber = seconds % 60;

  if (minutesNumber < 10) {
    minutesNumber = `0${minutesNumber}`;
  }

  if (secondsNumber < 10) {
    secondsNumber = `0${secondsNumber}`;
  }

  return `${minutesNumber}:${secondsNumber}`;
};

const updateTimeinDOM = () => {
  document.querySelector("#snakeTime .time").innerHTML =
    convertSecondsTotime();
};

const updateSnakeinDOM = () => {
  let snakeHTML = ``;
  snake.positions.forEach((positions, index) => {
    snakeHTML += `<div class="snakeBox" style="left: ${snake.positions[index].x}px; top:${snake.positions[index].y}px></div>`;
  });
  document.getElementById("snake").innerHTML = snakeHTML;
};

// document.querySelector("#snakeScore .score").innerHTML =
//   score;

const startTime = () => {
  if (isCaounting) return;
  isCaounting = true;
  snake.positions = [{ x: 100, y: 100 }];
  snake.direction = "right";
  timerInterval = setInterval(() => {
    seconds++;
    updateTimeinDOM();
  }, 1000);
};

const generateFood = () => {
  food.x = Math.floor(
    Math.random() * snakeBoardDom.clientHeight - 10
  );
  food.x = food.x - (food.x % 10);
  food.y = Math.floor(
    Math.random() * snakeBoardDom.clientHeight - 10
  );
  food.y = food.y - (food.y % 10);
  document.getElementById(
    "snakeFood"
  ).style.left = `${food.x}px`;
  document.getElementById(
    "snakeFood"
  ).style.top = `${food.y}px`;
  document.getElementById("snakeFood").style.display =
    "block";
};

const stopTime = () => {
  clearInterval(timerInterval);
  clearInterval(snakeInterval);
  seconds = 0;
  updateTimeinDOM();
};

snakeStartDom.addEventListener("click", () => {
  snakeStartDom.disabled = true;
  startTime();
  moveSnake();
  generateFood();
  updateSnakeinDOM();
});

document
  .getElementById("snakeStop")
  .addEventListener("click", () => {
    isCaounting = false;
    snakeStartDom.disabled = false;
    stopTime();
  });

const endGame = () => {
  stopTime();
  snakeStartDom.disabled = false;
  isCaounting = false;
};

const moveSnake = () => {
  snakeInterval = setInterval(() => {
    if (snake.direction === "right") {
      snake.positions[0].x += 10;
    }
    if (snake.direction === "left") {
      snake.positions[0].x -= 10;
    }
    if (snake.direction === "up") {
      snake.positions[0].y -= 10;
    }
    if (snake.direction === "down") {
      snake.positions[0].y += 10;
    }

    const boardHeight = snakeBoardDom.clientWidth;
    const boardWidth = snakeBoardDom.clientWidth;

    if (snake.positions[0].x < 0) {
      endGame();
      return;
    }
    if (snake.positions[0].x > boardWidth - 10) {
      endGame();
      return;
    }
    if (snake.positions[0].y < 0) {
      endGame();
      return;
    }
    if (snake.positions[0].y > boardHeight - 10) {
      endGame();
      return;
    }

    updateSnakeinDOM();
  }, seconds * 10 + 250);
};

document.addEventListener("keydown", (event) => {
  if (!isCaounting) return;
  if (event.key === "ArrowRight") {
    snake.direction = "right";
  }
  if (event.key === "ArrowLeft") {
    snake.direction = "left";
  }
  if (event.key === "ArrowUp") {
    snake.direction = "up";
  }
  if (event.key === "ArrowDown") {
    snake.direction = "down";
  }
});
