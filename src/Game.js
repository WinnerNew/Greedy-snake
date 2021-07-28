import Food from "./Food.js";
import Snake from "./Snake.js";
let that = null;
class Game {
  constructor(map, speed) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    this.speed = speed;
    that = this;
  }
  init() {
    //食物初始化
    this.food.init(this.map);
    //小蛇初始化
    this.snake.init(this.map);

    //调用自动移动小蛇的方法
    this.runSnake(this.food, this.map);
    //调用按键的方法
    this.bindKey();
  }
  runSnake(food, map) {
    let timeId = setInterval(
      function () {
        this.snake.move(food, map);
        this.snake.init(map);
        const maxX = map.offsetWidth / this.snake.width; //40
        const maxY = map.offsetHeight / this.snake.height;
        const headX = this.snake.body[0].x;
        const headY = this.snake.body[0].y;
        console.log(headX, headY);
        if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
          clearInterval(timeId);
          alert("Game Over!");
        }
      }.bind(that),
      this.speed
    );
  }
  bindKey() {
    document.addEventListener(
      "keydown",
      function (e) {
        switch (e.keyCode) {
          case 37:
            this.snake.direction = "left";
            break;
          case 38:
            this.snake.direction = "top";
            break;
          case 39:
            this.snake.direction = "right";
            break;
          case 40:
            this.snake.direction = "bottom";
            break;
        }
      }.bind(that),
      false
    );
  }
}
export default Game;
