var zombieObject = new obj(zombie, 50, 50, 0, 0, 40);
var nextObject = new obj(nextlv, 50, 50, 459, 459, 40);

function gen_zombie(n) {
    var usedPositions = [];
    for (let i = 0; i < n; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * 10) * 51;
            randomY = Math.floor(Math.random() * 10) * 51;
        } while (
            usedPositions.find(
                (pos) => pos.x == randomX && pos.y == randomY
            ) || (randomX === 0 && randomY === 0) || (randomX === 459 && randomY === 459)
        );

        usedPositions.push({ x: randomX, y: randomY });

        let zombieObject = new obj(zombie, 50, 50, randomX, randomY, 40);
        floorArray.push(zombieObject);
    }
}


function checkCollision() {
    for (let i = 0; i < gameArea.floorArray.length; i++) {
        let object = gameArea.floorArray[i];
        if (object !== gameArea.player && collision(gameArea.player, object)) {
            if (object.src === zombieObject.src) {
                alert("Game Over");
                gameArea.player.y = 0;
                gameArea.player.x = 0;
                break;
            } else if (object.src === nextObject.src) {
                alert("Gratulálok nyertél");
                console.log("Win detected");
            }
        }
    }
}

function collision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
