
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

$(document).keypress(function()
{
    if(!started)
    {
     
     //console.log(level);
      $("h1").text("Level "+level);
      nextSequence();
      started=true;
    }
   
});

$(".btn").click(function()
{
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   console.log(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer((userClickedPattern.length)-1);
  
});


function checkAnswer(currentlevel)
{
   
    if( userClickedPattern[currentlevel]===gamePattern[currentlevel])
    {
        console.log("yes");
        if((userClickedPattern.length)===(gamePattern.length))
        {
          
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        console.log("no");
        startOver();
    }
}

function nextSequence()
{
    userClickedPattern=[];
    level=level+1;
    console.log(level);
    $("h1").text("Level "+level);
    var randonNumber;
    randomNumber=Math.random()*4; 
    //generating random number in the range of 0 and 4
    randomNumber=Math.floor(randomNumber);
  //  var randomChosenColourIndex=nextSequence();
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
     //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log(randomChosenColour);
    playSound(randomChosenColour);
    //animatePress(randomChosenColour);
    
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
     $("#"+currentColour).addClass("pressed");
     setTimeout(function()
     {
        $("#"+currentColour).removeClass("pressed");
     },100);
}



function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}