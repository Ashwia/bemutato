// script.js

var player = new Image();
player.src = './img/player.png';

var dirt = new Image();
dirt.src = './img/darkDirtBlock.png';

var zombie = new Image();
zombie.src = "./img/zombie.png";

var nextlv = new Image();
nextlv.src = "./img/next.png";

var n =12;
var floorArray = [];
function load() {
    gameArea.start();
    var playerObject = new obj(player, 50, 50, 0, 0);
    let xpos = 0;
    let ypos = 0;
    for (let y = 0; y < 10; y++) {
        for (let i = 0; i < 10; i++) {
            floorArray.push(new obj(dirt, 50, 50, xpos, ypos, 1));
            xpos = xpos + 51;
        }
        xpos = 0;
        ypos = ypos + 51;
    }
    gen_zombie(n);


    var nextobj = new obj(nextlv, 50, 50, 459, 459, 90);
    floorArray.push(nextobj);
    gameArea.addlevel(nextobj);
    gameArea.addPlayer(playerObject);
    gameArea.addFloor(floorArray);
    gameArea.update();
}



var gameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 510;
        this.canvas.height = 510;
        this.context = this.canvas.getContext('2d');
        document.getElementById("canvas_div").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        this.player = null;
        this.floorArray = [];
        this.next = null;
        this.addPlayer = function (player) {
            this.player = player;
        };
        this.addFloor = function (floorArray) {
            this.floorArray = floorArray;
        };
        this.addlevel = function (next) {
            this.next = next;
        };
        this.update = function () {
            this.clear();
            var allObjects = this.floorArray.concat(this.player, this.next);
            allObjects.sort(function (a, b) {
                return a.z - b.z || a.y - b.y;
            });
            for (let i = 0; i < allObjects.length; i++) {
                allObjects[i].update();
            }
        };
        this.clear = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
    }
};


function obj(src, width, height, x, y, z) {
    this.src = src;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.z = z || 100;
    this.update = function () {
        ctx = gameArea.context;
        ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    checkCollision();
    gameArea.update();
}
