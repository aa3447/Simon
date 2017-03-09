"use strict";
$(function() {
var colors = ["red","blue","green", "yellow"];
var clickColors = ["#ff8080","#8080ff","#33ff33","#ffff99"];
var sequence = [];
var incrament = 0;
var highScore = 0;
var score = 0;
var sound = document.getElementsByClassName("Sound");
var hard = false;
var color;
var tempSound;
function ai(){
    sequence.push(colors[Math.floor(Math.random() * 4)]); 
    $("#steps").text(sequence.length);
    repeat();
    }
function repeat(){
    $(".simon").prop("disabled",true);
    incrament = 0;
    var i = 0;
    var id = setInterval(function() {
            if (i < sequence.length) {
                var e = sequence[i];
                var index = colors.indexOf(e);
                $("#"+e).css("background-color",clickColors[index]);
                sound[index].play();
                window.setTimeout(function (){
                $("#"+e).css("background-color",e);
                },600);
                i++;
            }
            else{
                $(".simon").prop("disabled",false);
                 clearInterval(id);
            }
        },800);
    
}
$("#NewGame").click(function(){
        $("#win").text("");
        $("#hard").prop("disabled",true);
        sequence = []; 
        incrament = 0;
        if(score > highScore){
                highScore = score;
                score = 0;
                $("#playerScore").text(score); 
                $("#playerHighScore").text(highScore);
            }
        score = 0;
        $("#playerScore").text("0");
        ai();
    });
     $("#hard").click(function(){
         if($("#hardState").text() == "Off"){
             $("#hardState").text("On");
             hard = true;
         }else{
              $("#hardState").text("Off");
             hard = false;
         } 
     });
    $("#nightMode").click(function(){
        if($(this).text() == "Night Mode"){
             $(this).text("Day Mode");
            $("body").css({"background-color":"black" , "color":"orange"});    
        }else{
             $(this).text("Night Mode");
            $("body").css({"background-color":"white" , "color":"black"}); 
        }  
    });
    $(".simon").mousedown(function(){
        color = $(this).attr('id');
        var index = colors.indexOf(color);
        tempSound = sound[index];
        tempSound.currentTime = 0;
        tempSound.play();
        $(this).css("background-color",clickColors[index]);
    });
    $(".simon").mouseup(function(){
           $(this).css("background-color",color);
        if(sequence[incrament] === color){
            incrament++;  
            if(incrament === sequence.length){
                $("#win").text("");
                score++;
                $("#playerScore").text(score); 
                ai();   
            }
      }
        else{
            $("#win").text("Wrong!");
            $(".simon").prop("disabled",true);
            if(hard){
                if(score > highScore){
                highScore = score;
                score = 0;
                $("#playerScore").text(score); 
                $("#playerHighScore").text(highScore);
                }
                $("#hard").prop("disabled",false);
            }else{
                repeat();    
            }

          }
    });
 
});
   
