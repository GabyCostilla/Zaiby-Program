var Zaira = document.querySelector('#Zaira');
var Gaby = document.querySelector('#Gaby');
var floor = document.querySelector('#piso');
var floorPosition = window.innerHeight - floor.offsetHeight;
var characterHeight = 50;
var soundEffect = new Audio('sound-effect.mp3');
var backgroundMusic = new Audio('background-music.mp3');

function playSoundEffect() {
  soundEffect.currentTime = 0;
  soundEffect.play();
}

function playBackgroundMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

document.addEventListener('keydown', function (event) {
  if (event.key === ' ') { // Verifica si la tecla presionada es la tecla Espacio
    playSoundEffect();
  }
});

window.addEventListener('load', function () {
  playBackgroundMusic();
});


var gravity = 0.5;
var characterVelocityZaira = 0;
var characterVelocityGaby = 0;

var keysPressed = {};

document.addEventListener('keydown', function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener('keyup', function (event) {
  delete keysPressed[event.key];
});

function moveCharacter(character, dx, dy) {
  var left = parseInt(character.style.left) || 0;
  var top = parseInt(character.style.top) || 0;
  var newLeft = left + dx;
  var newTop = top + dy;

  if (newLeft >= 0 && newLeft <= window.innerWidth - character.offsetWidth) {
    character.style.left = newLeft + 'px';
  }

  if (newTop >= 0 && newTop <= window.innerHeight - character.offsetHeight) {
    character.style.top = newTop + 'px';
  }
}

function updateGame() {
  function applyGravity(character, characterVelocity) {
    var top = parseInt(character.style.top) || 0;
    var bottomLimit = window.innerHeight - character.offsetHeight;
    var floorPosition = window.innerHeight - floor.offsetHeight;

    if (top < bottomLimit) {
      characterVelocity += gravity;
      characterVelocity = Math.min(characterVelocity, 10);
      var newTop = top + characterVelocity;
      character.style.top = newTop + 'px';
    } else {
      character.style.top = bottomLimit + 'px';
      characterVelocity = 0;
    }

    if (newTop + characterHeight >= floorPosition) {
      character.style.top = floorPosition - characterHeight + 'px';
      characterVelocity = 0;
    }

    return characterVelocity;
  }

  if ('ArrowLeft' in keysPressed) {
    moveCharacter(Zaira, -10, 0);
  }
  if ('ArrowRight' in keysPressed) {
    moveCharacter(Zaira, 10, 0);
  }
  if ('ArrowUp' in keysPressed) {
    moveCharacter(Zaira, 0, -10);
  }
  if ('ArrowDown' in keysPressed) {
    moveCharacter(Zaira, 0, 10);
  }

  if ('a' in keysPressed || 'A' in keysPressed) {
    moveCharacter(Gaby, -10, 0);
  }
  if ('d' in keysPressed || 'D' in keysPressed) {
    moveCharacter(Gaby, 10, 0);
  }
  if ('w' in keysPressed || 'W' in keysPressed) {
    moveCharacter(Gaby, 0, -10);
  }
  if ('s' in keysPressed || 'S' in keysPressed) {
    moveCharacter(Gaby, 0, 10);
  }

  characterVelocityZaira = applyGravity(Zaira, characterVelocityZaira);
  characterVelocityGaby = applyGravity(Gaby, characterVelocityGaby);

  requestAnimationFrame(updateGame);
}

requestAnimationFrame(updateGame);
