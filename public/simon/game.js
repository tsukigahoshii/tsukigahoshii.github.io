var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []
var gameStarted = false;
var userClickedPattern = [];
var level = 0;
$(document).keypress(function(event) {

    if (gameStarted == false) {
        level = 0;
        nextSequence();
        
    } else {
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        nextSequence();
    }
    //console.log(event.key);
});

$(".btn").on("click", function (event) {

    handler(event.target.id);
    
})

function handler(colorpicked) {
    var userChosenColour = colorpicked;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    playAudio(userChosenColour);
    checkAnswer(userClickedPattern.length);
}

function checkAnswer(currentLevel) {
    //console.log(userClickedPattern[currentLevel-1] + " " + gamePattern[currentLevel-1])
    if (userClickedPattern[currentLevel-1] == gamePattern[currentLevel-1]) {
        if (userClickedPattern.length == level) {
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        //console.log("wrong");
        $("body").addClass("game-over").delay(200).queue(function(next) {
            $("body").removeClass("game-over").dequeue();
        });
        $("h1").text("Game Over, Press Any Key to Restart");
        gameStarted = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}

function nextSequence() {
    level++;
    $('h1').text("Level " + level);
    gameStarted = true;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var correctButton = "#" + gamePattern[gamePattern.length -1];
    $(correctButton).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
    //console.log("game pattern: " + gamePattern);
}

function playAudio(randomChosenColour) {
    //console.log("random color: " + randomChosenColour);
    switch (randomChosenColour) {
        case "red":
            var audioElement1 = document.createElement('audio');
            audioElement1.setAttribute('src', './simon/sounds/AA-30.mp3');
            audioElement1.play();
            break;
        case "blue":
            var audioElement2 = document.createElement('audio');
            audioElement2.setAttribute('src', './simon/sounds/EE-30.mp3');
            audioElement2.play();
            break;
        case "green":
            var audioElement3 = document.createElement('audio');
            audioElement3.setAttribute('src', './simon/sounds/OO-30.mp3'); 
            audioElement3.play();
            break;
        case "yellow":
            var audioElement4 = document.createElement('audio');
            audioElement4.setAttribute('src', './simon/sounds/audio_jungle-30.mp3');
            audioElement4.play();
            break;
        default: 
            break;
}
}

function animatePress(userChosenColour) {
    $("#" + userChosenColour).addClass("pressed").delay(100).queue(function(next) {
        $("#" + userChosenColour).removeClass("pressed").dequeue();
    });
    
}