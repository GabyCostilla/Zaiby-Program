var Zaira = document.querySelector('#Zaira');
var Gaby = document.querySelector('#Gaby');
var floor = document.querySelector('#piso');

var gravity = 0.3; // Valor de la gravedad
var characterVelocityZaira = 0; // Velocidad inicial del personaje Zaira en el eje vertical
var characterVelocityGaby = 0; // Velocidad inicial del personaje Gaby en el eje vertical

document.addEventListener('keydown', moveCharacter);

function moveCharacter(event) {
  var keyPressed = event.key;

  // Mover Zaira con las flechas del teclado
  if (keyPressed === 'ArrowLeft') {
    moveLeft(Zaira);
  } else if (keyPressed === 'ArrowUp') {
    moveUp(Zaira);
  } else if (keyPressed === 'ArrowRight') {
    moveRight(Zaira);
  } else if (keyPressed === 'ArrowDown') {
    moveDown(Zaira);
  }

  // Mover Gaby con las teclas WASD
  if (keyPressed === 'a' || keyPressed === 'A') {
    moveLeft(Gaby);
  } else if (keyPressed === 'w' || keyPressed === 'W') {
    moveUp(Gaby);
  } else if (keyPressed === 'd' || keyPressed === 'D') {
    moveRight(Gaby);
  } else if (keyPressed === 's' || keyPressed === 'S') {
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
