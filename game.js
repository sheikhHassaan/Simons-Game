let keydownFlag = false;
let gamePattern = [];
let userPattern = [];
let level = 1;

function generateRandomColor() {

    let randomNumber = Math.floor(Math.random() * 4);
    let colors = ["green", "red", "yellow", "blue"];
    return colors[randomNumber];

}

function blinkAndPlaySound(selector) {

    $('#'+selector).addClass("pressed");
    setTimeout(function () {
        $('#'+selector).removeClass("pressed");
    }, 100);
    $('#'+selector).fadeOut(100).fadeIn(100);  //Blink
    let soundEffect = new Audio("./sounds/"+selector+".mp3");
    soundEffect.play();

}

function newPattern() {

    let randColor = generateRandomColor();
    gamePattern.push(randColor);
    $("h1").text("Level "+level);
    blinkAndPlaySound(randColor);
    level++;
    userPattern.length = 0;

}


$(document).on("keydown", function() {

    if (!keydownFlag) {

        newPattern();
        keydownFlag = true;

    }

});

$(document).on("click", function(event) {
    // WORKING HERE! ⬇️
    // The problem here is that on each keypress complete array is checked again instead of last element of array. 

    let clickedColor = event.target.id;
    blinkAndPlaySound(clickedColor);
    userPattern.push(clickedColor);

    for (let i = 0; i < userPattern.length; i++) {

        if (userPattern[i] != gamePattern[i]) {

            $("h1").text("Game Over!");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 100);
            let wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            return;

        }
    }
    if (gamePattern.length === userPattern.length) {

        setTimeout(function (){

            newPattern();

        }, 500);

    }
});