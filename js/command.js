function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("container", ev.target.parentElement.id);
    console.log("drag");
}

function allowDrop(ev) {
    ev.preventDefault();
}


var commands = [];

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var containerData = ev.dataTransfer.getData("container");
    var draggedElement = document.getElementById(data);
    console.log("drop");

    console.log("Container: " + containerData);

    var droppable = ev.target;

    if (containerData === 'allcommand' && droppable.id === 'usedcommand') {
        var clonedElement = draggedElement.cloneNode(true);
        droppable.appendChild(clonedElement);

        var droppableChildren = Array.from(droppable.children);

        var itemCount = droppableChildren.length;
        var itemIndex = droppableChildren.indexOf(clonedElement);

        console.log("Az elemek száma a droppable-ben: " + itemCount + "\nAz " + clonedElement.innerText + " az " + (itemIndex) + ". elem.");

        commands.push(clonedElement.innerText);
    }
    else if (droppable.id == 'trash') {
        draggedElement.parentElement.removeChild(draggedElement);
        console.log(draggedElement.innerText);
        commands = commands.filter(command => command !== draggedElement.innerText);
    }
    
}


var player_direction = 0;



function run() {
    console.log(commands.length)
    console.log(commands)
    if(commands.length === 0){
        gameArea.player.y = 0;
        gameArea.player.x = 0;
    } else {
        gameArea.player.y = 0;
        gameArea.player.x = 0;
        gameArea.update();

        for (let i = 0; i < commands.length; i++) {
            setTimeout(() => executeCommand(commands[i]), i * 1000);
        }
    }
}

function executeCommand(command) {
    switch (command) {
        case "Lefele megy":
            moveDown();
            break;
        case "Jobbra megy":
            moveRight();
            break;
        case "Balra megy":
            moveLeft();
            break;
        default:
            console.log("Unknown command: " + command);
    }
}


function moveDown() {
    if (gameArea.player.y < gameArea.canvas.height - gameArea.player.height && gameArea.player.y !=510-51) {
        gameArea.player.y += 51;
    }
    gameArea.update();
}







function moveRight() {
    if (gameArea.player.x < gameArea.canvas.width - gameArea.player.width && gameArea.player.x !=510-51) {
        gameArea.player.x += 51;
        console.log("asd")
    }
    gameArea.update();
}

function moveLeft() {
    if (gameArea.player.x > 0) {
        gameArea.player.x -= 51;
    }
    gameArea.update();
}
