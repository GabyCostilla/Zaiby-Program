var Zaira = document.querySelector('#Zaira');
var Gaby = document.querySelector('#Gaby');
var floor = document.querySelector('#piso');

var gravity = 0.5; // Valor de la gravedad
var characterVelocityZaira = 0; // Velocidad inicial del personaje Zaira en el eje vertical
var characterVelocityGaby = 0; // Velocidad inicial del personaje Gaby en el eje vertical

var keysPressed = {}; // Almacena las teclas presionadas

document.addEventListener('keydown', function (event) {
  keysPressed[event.key] = true;
  moveCharacter();
});

document.addEventListener('keyup', function (event) {
  delete keysPressed[event.key];
});

function moveCharacter() {
  // Mover Zaira con las flechas del teclado
  if ('ArrowLeft' in keysPressed && 'ArrowUp' in keysPressed) {
    moveUpLeft(Zaira);
  } else if ('ArrowRight' in keysPressed && 'ArrowUp' in keysPressed) {
    moveUpRight(Zaira);
  } else if ('ArrowLeft' in keysPressed && 'ArrowDown' in keysPressed) {
    moveDownLeft(Zaira);
  } else if ('ArrowRight' in keysPressed && 'ArrowDown' in keysPressed) {
    moveDownRight(Zaira);
  } else if ('ArrowLeft' in keysPressed) {
    moveLeft(Zaira);
  } else if ('ArrowUp' in keysPressed) {
    moveUp(Zaira);
  } else if ('ArrowRight' in keysPressed) {
    moveRight(Zaira);
  } else if ('ArrowDown' in keysPressed) {
    moveDown(Zaira);
  }

  // Mover Gaby con las teclas WASD
  if (('a' in keysPressed || 'A' in keysPressed) && ('w' in keysPressed || 'W' in keysPressed)) {
    moveUpLeft(Gaby);
  } else if (('d' in keysPressed || 'D' in keysPressed) && ('w' in keysPressed || 'W' in keysPressed)) {
    moveUpRight(Gaby);
  } else if (('a' in keysPressed || 'A' in keysPressed) && ('s' in keysPressed || 'S' in keysPressed)) {
    moveDownLeft(Gaby);
  } else if (('d' in keysPressed || 'D' in keysPressed) && ('s' in keysPressed || 'S' in keysPressed)) {
    moveDownRight(Gaby);
  } else if ('a' in keysPressed || 'A' in keysPressed) {
    moveLeft(Gaby);
  } else if ('w' in keysPressed || 'W' in keysPressed) {
    moveUp(Gaby);
  } else if ('d' in keysPressed || 'D' in keysPressed) {
    moveRight(Gaby);
  } else if ('s' in keysPressed || 'S' in keysPressed) {
    moveDown(Gaby);
  }
}

function moveLeft(character) {
  var left = parseInt(character.style.left) || 0;
  var newLeft = left - 10;
  if (newLeft >= 0) {
    character.style.left = newLeft + 'px';
  }
}

function moveUp(character) {
  var top = parseInt(character.style.top) || 0;
  var newTop = top - 10;
  if (newTop >= 0) {
    character.style.top = newTop + 'px';
  }
}

function moveRight(character) {
  var left = parseInt(character.style.left) || 0;
  var newLeft = left + 10;
  if (newLeft <= window.innerWidth - character.offsetWidth) {
    character.style.left = newLeft + 'px';
  }
}

function moveDown(character) {
  var top = parseInt(character.style.top) || 0;
  var newTop = top + 10;
  if (newTop <= window.innerHeight - character.offsetHeight) {
    character.style.top = newTop + 'px';
  }
}

function moveUpLeft(character) {
  moveUp(character);
  moveLeft(character);
}

function moveUpRight(character) {
  moveUp(character);
  moveRight(character);
}

function moveDownLeft(character) {
  moveDown(character);
  moveLeft(character);
}

function moveDownRight(character) {
  moveDown(character);
  moveRight(character);
}

function applyGravity(character, characterVelocity) {
  var top = parseInt(character.style.top) || 0;
  var bottomLimit = window.innerHeight - character.offsetHeight;

  if (top < bottomLimit) {
    characterVelocity += gravity; // Incrementar la velocidad del personaje debido a la gravedad constante
    characterVelocity = Math.min(characterVelocity, 10); // Limitar la velocidad máxima de caída
    var newTop = top + characterVelocity;
    character.style.top = newTop + 'px';
  } else {
    character.style.top = bottomLimit + 'px'; // Mantener al personaje en el límite inferior
    characterVelocity = 0; // Reiniciar la velocidad del personaje cuando toca el suelo
  }

  return characterVelocity;
}

function updateGame() {
  characterVelocityZaira = applyGravity(Zaira, characterVelocityZaira);
  characterVelocityGaby = applyGravity(Gaby, characterVelocityGaby);

  requestAnimationFrame(updateGame);
}

updateGame();
