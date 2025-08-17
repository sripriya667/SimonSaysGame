var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor(4*Math.random());
    var  randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Handle both click and touch events
$(".btn").on("click touchstart", function(e){
    e.preventDefault();
    e.stopPropagation();
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(randomChosenColor){
    var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}

// Handle both keyboard and touch events to start the game
$(document).on("keypress touchstart", function(e){
    if (start==false){
        e.preventDefault();
        e.stopPropagation();
        nextSequence();
        start=true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){    
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text(`Game Over, Your score is ${level - 1} Press Any Key to Restart`);
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    start = false;
}

// Additional mobile-specific event handling
$(document).ready(function() {
    // Prevent double-tap zoom on mobile
    $(".btn").on("touchend", function(e) {
        e.preventDefault();
    });
    
    // Ensure touch events don't interfere with game logic
    $(".btn").on("touchmove", function(e) {
        e.preventDefault();
    });
});