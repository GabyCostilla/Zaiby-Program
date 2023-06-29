var Zaira = document.querySelector('#Zaira');
var Gaby = document.querySelector('#Gaby');
var floor = document.querySelector('#piso');
var floorPosition = window.innerHeight - floor.offsetHeight;
var characterHeight = 50;
var soundEffect = new Audio('sound-effect.mp3');
var backgroundMusic = new Audio('background-music.mp3');
var score = 0;
var time = 6000; // Tiempo inicial en segundos
var timerElement = document.getElementById('timer');

var gravity = 0.5;
var characterVelocityZaira = 0;
var characterVelocityGaby = 0;

var keysPressed = {};

var heartContainer = document.getElementById('heart-container');
var hearts = [];

var totalLives = 3;
var remainingLives = totalLives;

var livesElement = document.getElementById('lives');
livesElement.textContent = 'Vidas: ' + remainingLives;

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

function handleKeyDown(event) {
  if (event.key === ' ') {
    playSoundEffect();
  }
  
  keysPressed[event.key] = true;
}

function handleKeyUp(event) {
  delete keysPressed[event.key];
}

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

function reduceLives(amount) {
  remainingLives -= amount;
  document.getElementById('lives').textContent = 'Vidas: ' + remainingLives;

  if (remainingLives <= 0) {
    endGame();
  }
}

function createHeart() {
  var heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * (window.innerWidth - 50) + 'px';
  heartContainer.appendChild(heart);
  hearts.push(heart);
}

function checkHeartCollision() {
  hearts.forEach(function (heart, index) {
    var top = parseInt(heart.style.top) || 0;
    var newTop = top + 5;

    if (newTop >= window.innerHeight) {
      heartContainer.removeChild(heart);
      hearts.splice(index, 1);
      reduceLives(1);
    } else {
      heart.style.top = newTop + 'px';

      var zairaRect = Zaira.getBoundingClientRect();
      var gabyRect = Gaby.getBoundingClientRect();
      var heartRect = heart.getBoundingClientRect();

      if (isCollision(zairaRect, heartRect)) {
        heartContainer.removeChild(heart);
        hearts.splice(index, 1);
        increaseScore(1);
      } else if (isCollision(gabyRect, heartRect)) {
        heartContainer.removeChild(heart);
        hearts.splice(index, 1);
        increaseScore(1);
      }
    }
  });
}

function updateGame() {
  timerElement.textContent = 'Tiempo: ' + time + 's';

  time--;

  if (time <= 0) {
    endGame();
    return;
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

  checkHeartCollision();

  if (remainingLives > 0) {
    requestAnimationFrame(updateGame);
  } else {
    endGame();
  }
}

function endGame() {
  stopBackgroundMusic();
  alert('¡Game Over! Tu puntaje final es: ' + score + ' puntos');
  resetGame();
}

function resetGame() {
  Zaira.style.left = '0px';
  Zaira.style.top = '0px';
  Gaby.style.left = '0px';
  Gaby.style.top = '0px';
  hearts.forEach(function (heart) {
    heartContainer.removeChild(heart);
  });
  hearts = [];
  score = 0;
  remainingLives = totalLives;
  document.getElementById('score').textContent = 'Puntaje: ' + score;
  document.getElementById('lives').textContent = 'Vidas: ' + remainingLives;
  characterVelocityZaira = 0;
  characterVelocityGaby = 0;
  requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
window.addEventListener('load', playBackgroundMusic);
setInterval(createHeart, 2000);
updateGame();
