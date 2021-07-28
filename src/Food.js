class Food {
  #element = [];
  constructor(x, y, width, height, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 20;
    this.height = height || 20;
    this.color = color || "cyan";
  }
  init(map) {
    this.remove();
    let div = document.createElement("div");
    console.log(map);
    map.appendChild(div);
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.color;
    div.style.borderRadius = 10 + "px";
    div.style.display = "block";
    div.style.position = "absolute";
    this.x =
      parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
    this.y =
      parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    this.twinkle(div);
    this.#element.push(div);
  }
  remove() {
      console.log('吃掉前',this.#element)
    this.#element.forEach((el, i) => {
      el.parentNode.removeChild(el)
      this.#element.splice(i, 1)
    });
    console.log('吃掉后',this.#element)
  }
  twinkle(div) {
    // 闪烁
    let displayed = true;
    window.setInterval(() => {
      if (displayed) {
        div.style.display = "none";
      } else {
        div.style.display = "block";
      }
      displayed = !displayed;
    }, 200);
  }
}
window.Food = Food;
export default Food;
