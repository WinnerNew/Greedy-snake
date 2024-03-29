(function f() {
})
    //自调用函数--食物对象=============================================
    (function () {
        //用来保存每个小方块食物
        var element = [];

        //创建食物的构造函数
        function Food(x, y, width, height, color) {
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 20;
            this.height = height || 20;
            this.color = color || "cyan";
        }

        //为原型添加初始化的方法(作用:在页面上显示这个食物)
        Food.prototype.init = function (map) {
            remove();
            //创建div
            var div = document.createElement("div");
            //把div加入到map中
            map.appendChild(div);
            //设置div样式
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundColor = this.color;
            div.style.borderRadius = 10 + "px";
            div.style.display = "block";
            // setInterval(function () {
            //     div.style.display == 'hidden' ? 'block' : 'hidden';
            // },1000)
            // // clearInterval(this.timeId);
            //食物闪烁
            var displayed = true;

            function flash() {
                if (displayed) {
                    div.style.display = 'none';
                } else {
                    div.style.display = 'block';
                }
                displayed = !displayed;
            }

            window.setInterval(flash, 520);
            //clearInterval(this.timeID);
            //需要随机产生left和top值
            // div.style.left = this.x+"px";
            // div.style.top = this.y+"px";
            div.style.position = "absolute";
            this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
            this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
            div.style.left = this.x + "px";
            div.style.top = this.y + "px";
            //把div加入到element数组中
            element.push(div);
        }

        //创建私有函数---删除食物对象
        function remove() {
            for (var i = 0; i < element.length; i++) {
                var ele = element[i];
                ele.parentNode.removeChild(ele);
                element.splice(i, 1);
            }
        }

        //把Food暴露给window,外部可以调用
        window.Food = Food;
    }());
//自调用函数--小蛇对象=============================================
(function () {
    //存放小蛇的每个身体部分
    var element = [];

    //小蛇的构造函数
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x: 3, y: 2, color: "silver"},
            {x: 2, y: 2, color: "deepskyblue"},
            {x: 1, y: 2, color: "deepskyblue"},
        ];
        this.direction = direction || "right";
    };
    //为原型添加方法--小蛇的初始化
    Snake.prototype.init = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            //数组中的每个元素都是一个对象
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.position = "absolute";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;
            //把div加入到elements数组中---目的是为了删除
            element.push(div);
            element[0].style.borderRadius = "5px";
            element[0].style.zIndex = 999;
        }
    };
    //为原型添加方法--小蛇动起来
    Snake.prototype.move = function (food, map) {
        //改变校舍的身体的坐标位置
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向--改变小蛇头的坐标位置
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
        //获取当前小蛇头部的横纵坐标并且判断有没有吃到食物
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        // console.log(headX+"======="+food.x);
        if (headX == food.x && headY == food.y) {
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //把食物删除,重新初始化食物
            food.init(map);
        }
    };

    //私有函数---删除小蛇
    function remove() {
        var i = element.length - 1;
        for (; i >= 0; i--) {
            //先从当前子元素中找到该子元素的父级元素,再删除这个子元素
            var ele = element[i];
            //从map地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            //数组中删除该子元素
            element.splice(i, 1);
        }
    };
    //把Snake暴露给window,可以外部访问到
    window.Snake = Snake;
}());
//自调用函数--游戏对象=============================================
(function () {
    //改变量的目的是为了保存游戏Game的实例化对象
    var that = null;

    //游戏的构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    };
    //初始化游戏--可以设置小蛇和食物显示出来
    Game.prototype.init = function () {
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);
        //调用自动移动小蛇的方法
        this.runSnake(this.food, this.map);
        //调用按键的方法
        this.bindKey();
    };
    //添加原型方法--设置小蛇可以自动的跑起来
    Game.prototype.runSnake = function (food, map) {
        var timeId = setInterval(function () {
            this.snake.move(food, map);
            this.snake.init(map);
            var maxX = map.offsetWidth / this.snake.width;//40
            var maxY = map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("Game Over!");
            }
        }.bind(that), 150);
    };
    //添加原型方法--设置用户按键改变小蛇移动方向
    Game.prototype.bindKey = function () {
        document.addEventListener("keydown", function (e) {
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
        }.bind(that), false)
    };
    //把Game暴露给window,可以外部访问到
    window.Game = Game;
}());
var game = new Game(document.querySelector(".map"));
game.init();
