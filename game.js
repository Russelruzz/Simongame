var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;


$(document).keypress(function() {
  if (start === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }

});

$(".btn").click(function() {

  var userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("fail");

    playSound("wrong");
    
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 2000);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }


}


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level   " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");

  setTimeout(function() {

    $("." + currentColour).removeClass("pressed");
  }, 100);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function startOver() {
  level = 0;
  gamePattern = [];
  start = false;


}
