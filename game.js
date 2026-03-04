var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var isMuted = false;
var timeLeft;
var timerInterval;
var maxTime = 5;
var acceptingInput = false; 

$("#mute-btn").click(function() {
  isMuted = !isMuted; 
  
  if (isMuted) {
    $(this).text("🔇 Sound: OFF");
  } else {
    $(this).text("🔊 Sound: ON");
  }
});

var highScore = localStorage.getItem("simonHighScore") || 0;

$("h1").after("<h2 id='score-title' style='color: white; font-family: \"Press Start 2P\", cursive; font-size: 1.5rem; margin-top: 20px;'>High Score: " + highScore + "</h2>");

var currentTheme = localStorage.getItem("simonTheme") || "classic";
$("body").addClass("theme-" + currentTheme);

$(document).keydown(function(event) {
  if (event.repeat) return; 

  if (!started) {
    startGame();
  } else if (acceptingInput) { 
    var key = event.key.toLowerCase();
    if (key === "q") $("#green").click();
    if (key === "w") $("#red").click();
    if (key === "a") $("#yellow").click();
    if (key === "s") $("#blue").click();
  }
});

$("h1").click(startGame);

function startGame() {
  if (!started) {
    $("body").addClass("game-active");
    $("h1").text("Level " + level);
    $("h1").removeClass("blink-text");
    nextSequence();
    started = true;
    $(".retro-btn").fadeOut();
  }
}

function createParticles(color, x, y) {
  for (let i = 0; i < 12; i++) {
    const particle = $('<div class="particle"></div>');
    const angle = Math.random() * Math.PI * 2; 
    const velocity = Math.random() * 80 + 40; 
    
    particle.css({
      '--dx': Math.cos(angle) * velocity + 'px',
      '--dy': Math.sin(angle) * velocity + 'px',
      'background-color': color,
      'left': x + 'px',
      'top': y + 'px'
    });

    $('body').append(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 600);
  }
}

$(".btn").click(function(e) { 
  if (started && acceptingInput) { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    var color = $(this).css("background-color");
    createParticles(color, e.pageX, e.pageY);
    
    checkAnswer(userClickedPattern.length - 1);
  }
});

// --- UI Button Listeners ---
$("#reset-btn").click(function() {
  highScore = 0;
  playSound("trash");
  localStorage.removeItem("simonHighScore");
  $("#score-title").text("High Score: " + highScore);
});

$("#instructions-btn").click(function() {
  $("#instructions-modal").fadeIn();
});

$("#close-modal-btn").click(function() {
  $("#instructions-modal").fadeOut();
});

$("#fullscreen-btn").click(function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// --- Theme Modal Logic ---
$("#theme-btn").click(function() {
  if (highScore >= 5) {
    $("#theme-neon").prop("disabled", false).text("Neon (Unlocked!)");
  }
  if (highScore >= 10) {
    $("#theme-minimal").prop("disabled", false).text("Minimal (Unlocked!)");
  }
  $("#theme-modal").fadeIn();
});

$("#close-theme-btn").click(function() {
  $("#theme-modal").fadeOut();
});

$("#theme-classic").click(function() { applyTheme("classic"); });
$("#theme-neon").click(function() { applyTheme("neon"); });
$("#theme-minimal").click(function() { applyTheme("minimal"); });

function applyTheme(themeName) {
  $("body").removeClass("theme-classic theme-neon theme-minimal").addClass("theme-" + themeName);
  localStorage.setItem("simonTheme", themeName);
}

// --- Core Game Logic ---
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  
  acceptingInput = false; 
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  let i = 0;
  let interval = setInterval(function() {
    let color = gamePattern[i];
    
    $("#" + color).addClass("flash");
    playSound(color);
    
    setTimeout(function() {
      $("#" + color).removeClass("flash");
    }, 150);
    
    i++;
    
    if (i >= gamePattern.length) {
      clearInterval(interval); 
      
      setTimeout(function() {
        startTimer();
        acceptingInput = true; 
      }, 600);
    }
  }, 600); 
}

function playSound(name) {
  if (!isMuted) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    clearInterval(timerInterval);
    
    if (userClickedPattern.length === gamePattern.length) {
      acceptingInput = false; 
      var delaySpeed = Math.max(300, 1000 - (level * 50));
      setTimeout(function() {
        nextSequence();
      }, delaySpeed);
    } else {
      startTimer();
    }
  } else { 
    handleGameOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  acceptingInput = false; 
  $("body").removeClass("game-active");
  $(".retro-btn").fadeIn();
}

function startTimer() {
  clearInterval(timerInterval); 
  $("#progress-container").show();

  maxTime = 2 + (level * 1.0); 
  timeLeft = maxTime;

  $("#progress-bar").css("width", "100%");
  timerInterval = setInterval(function() {
    timeLeft -= 0.1;
    var percentage = (timeLeft / maxTime) * 100;
    $("#progress-bar").css("width", percentage + "%");
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleGameOver(); 
    }
  }, 100); 
}

function handleGameOver() {
  started = false;
  acceptingInput = false; 
  clearInterval(timerInterval);
  playSound("wrong");
  $("body").addClass("game-over");
  $("#progress-container").hide(); 
  
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
  $("h1").addClass("blink-text");

  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonHighScore", highScore);
    $("#score-title").text("High Score: " + highScore);
  }
  startOver();
}