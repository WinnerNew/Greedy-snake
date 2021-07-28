class Snake {
  #element = [];
  constructor(width, height, direction) {
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || "right";
    this.body = [
      { x: 3, y: 2, color: "silver" },
      { x: 2, y: 2, color: "deepskyblue"},
      { x: 1, y: 2, color: "deepskyblue"},
    ];
  }

  init(map) {
    this.remove();
    // 小蛇身体初始化
    this.body.forEach((item) => {
      let div = document.createElement("div");
      map.appendChild(div);
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      div.style.position = "absolute";
      div.style.left = item.x * this.width + "px";
      div.style.top = item.y * this.height + "px";
      div.style.backgroundColor = item.color;
      //把div加入到elements数组中---目的是为了删除
      this.#element.push(div);
    //   this.#element[0].style.borderRadius = "5px";
    //   this.#element[0].style.zIndex = 999;
    });
  }
  remove() {
    this.#element.forEach((item, i) => {
      item.parentNode.removeChild(item);
      this.#element.splice(i, 1);
    });
  }
  move(food, map) {
    var i = this.body.length - 1;
    for (; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    switch (this.direction) {
      case "left":
        this.body[0].x -= 1;
        break;
      case "right":
        this.body[0].x += 1;
        break;
      case "top":
        this.body[0].y -= 1;
        break;
      case "bottom":
        this.body[0].y += 1;
        break;
    }
    const headX = this.body[0].x * this.width;
    const headY = this.body[0].y * this.height;
    if (headX == food.x && headY == food.y) {
      const last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color,
      });
      //把食物删除,重新初始化食物
      food.init(map);
    }
  }
}
window.Snake = Snake;
export default Snake;
