// script.js

var player = new Image();
player.src = './img/player.png';

var dirt = new Image();
dirt.src = './img/darkDirtBlock.png';

function load() {
    gameArea.start();
    var playerObject = new obj(player, 50, 50, 0, 0);
    let xpos = 0;
    let ypos = 0;

    var floorArray = [];
    
    for(let y =0;y<10;y++){
        for (let i = 0; i < 10; i++) {
            floorArray.push(new obj(dirt, 50, 50, xpos, ypos));
            xpos = xpos + 50;
        }
        ypos = ypos+50;
    }


    gameArea.addPlayer(playerObject);
    gameArea.addFloor(floorArray);
    gameArea.update();
}

var gameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.player = null;
        this.floorArray = [];
    },
    addPlayer: function (player) {
        this.player = player;
    },
    addFloor: function (floorArray) {
        this.floorArray = floorArray;
    },
    update: function () {
        this.clear();

        // Rendezze az objektumokat z koordináta szerint
        var allObjects = this.floorArray.concat(this.player);
        allObjects.sort(function (a, b) {
            return a.z - b.z;
        });

        for (let i = 0; i < allObjects.length; i++) {
            allObjects[i].update();
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function obj(src, width, height, x, y, z) {
    this.src = src;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.z = z || 0;
    this.update = function () {
        ctx = gameArea.context;
        ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    gameArea.update();
}
