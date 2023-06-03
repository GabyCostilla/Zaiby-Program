var character1 = document.getElementById('character1');
var character2 = document.getElementById('character2');

document.addEventListener('keydown', moveCharacter);

function moveCharacter(event) {
    var keyPressed = event.key;

    // Mover personaje 1 con las flechas del teclado
    if (keyPressed === 'ArrowLeft') {
        moveLeft(character1);
    } else if (keyPressed === 'ArrowUp') {
        moveUp(character1);
    } else if (keyPressed === 'ArrowRight') {
        moveRight(character1);
    } else if (keyPressed === 'ArrowDown') {
        moveDown(character1);
    }

    // Mover personaje 2 con las teclas WASD
    if (keyPressed === 'a' || keyPressed === 'A') {
        moveLeft(character2);
    } else if (keyPressed === 'w' || keyPressed === 'W') {
        moveUp(character2);
    } else if (keyPressed === 'd' || keyPressed === 'D') {
        moveRight(character2);
    } else if (keyPressed === 's' || keyPressed === 'S') {
        moveDown(character2);
    }
}

function moveLeft(character) {
    var left = parseInt(character.style.left) || 0;
    character.style.left = (left - 10) + 'px';
}

function moveUp(character) {
    var top = parseInt(character.style.top) || 0;
    character.style.top = (top - 10) + 'px';
}

function moveRight(character) {
    var left = parseInt(character.style.left) || 0;
    character.style.left = (left + 10) + 'px';
}

function moveDown(character) {
    var top = parseInt(character.style.top) || 0;
    character.style.top = (top + 10) + 'px';
}
