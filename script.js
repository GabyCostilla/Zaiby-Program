var Zaira = document.querySelector('#Zaira');
var Gaby = document.querySelector('#Gaby');
var floor = document.querySelector('#piso');
var floorPosition = window.innerHeight - floor.offsetHeight;
var characterHeight = 50;
var soundEffect = new Audio('sound-effect.mp3');
var backgroundMusic = new Audio('background-music.mp3');
var score = 0;

var gravity = 0.5;
var characterVelocityZaira = 0;
var characterVelocityGaby = 0;

var keysPressed = {};

var heartContainer = document.getElementById('heart-container');
var hearts = [];

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
  if (event.key === ' ') {
    playSoundEffect();
  }
});

window.addEventListener('load', function () {
  playBackgroundMusic();
});

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

  // Generar corazones aleatoriamente
  if (Math.random() < 0.02) { // Ajusta este valor para controlar la frecuencia de generación
    var heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * (window.innerWidth - 30) + 'px'; // Ajusta el tamaño del corazón (30) si es necesario
    heart.style.top = '0px';
    heartContainer.appendChild(heart);
    hearts.push(heart);
  }

  // Hacer caer los corazones y verificar si los personajes los atrapan
  hearts.forEach(function (heart, index) {
    var top = parseInt(heart.style.top) || 0;
    var newTop = top + 5; // Ajusta la velocidad de caída del corazón

    if (newTop >= window.innerHeight) {
      heartContainer.removeChild(heart);
      hearts.splice(index, 1);
    } else {
      heart.style.top = newTop + 'px';

      // Verificar si los personajes atrapan los corazones
      var zairaRect = Zaira.getBoundingClientRect();
      var gabyRect = Gaby.getBoundingClientRect();
      var heartRect = heart.getBoundingClientRect();

      if (isCollision(zairaRect, heartRect)) {
        heartContainer.removeChild(heart);
        hearts.splice(index, 1);
        increaseScore(1); // Ajusta la cantidad de puntos que se suman al atrapar un corazón
      } else if (isCollision(gabyRect, heartRect)) {
        heartContainer.removeChild(heart);
        hearts.splice(index, 1);
        increaseScore(1); // Ajusta la cantidad de puntos que se suman al atrapar un corazón
      }
    }
  });

  requestAnimationFrame(updateGame);
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function increaseScore(points) {
  score += points;
  document.getElementById('score').textContent = 'Puntaje: ' + score;
}

requestAnimationFrame(updateGame);
