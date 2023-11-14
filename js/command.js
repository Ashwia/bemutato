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

        console.log("Az elemek száma a droppable-ben: " + itemCount + "\nAz " + clonedElement.innerText + " az " + (itemIndex + 1) + ". elem.");

        commands.push({
            id: clonedElement.id,
            text: clonedElement.innerText
        });
    }
    else if (droppable.id === 'trash') {
        draggedElement.parentElement.removeChild(draggedElement);
        console.log(draggedElement.innerText);
        commands = commands.filter(command => command.id !== draggedElement.id);
    }
}