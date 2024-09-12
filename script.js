// alert("shubham");
var gameStart=false;

if (document.querySelector("h1").innerText == "Press A Key to Start" || document.querySelector("h1").innerText == "Game Over, Press Any Key to Restart") {
    $(document).keypress(function (event) {
        if (event.key == "a" || event.key == "A") {
            if(gameStart===false){
                gameStart=true;
                nextSequence();
            }
        }
    })
}

var gameLevel = 0;

var arr = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


function playSound(colorToPlay) {
    var audio = new Audio("sounds/" + colorToPlay + ".mp3");
    audio.play();
}

$(".btn").click(function () {
    // console.log($(".btn").attr(this)+" is clicked by user");
    var userChosenColor = $(this).attr("id");
    $("#" + userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkWin(userClickedPattern.length - 1);
})

function checkWin(currentLevel) {
    console.log(gamePattern[currentLevel],userClickedPattern[currentLevel])
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("sucess");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },220)
        playSound("wrong")
        resetGame();
    }
}


function nextSequence() {
    gameLevel++;
    $("h1").text("Level " + gameLevel);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = arr[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}



function resetGame(){
    $("h1").text("Game Over, Press Any Key to Restart");
    gameStart=false;
    gameLevel=0;
    userClickedPattern=[];
}