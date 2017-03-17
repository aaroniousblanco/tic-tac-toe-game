//Objects start here

function Gameboard() {
  this.sq1 = $('#0').text();
  this.sq2 = $('#1').text();
  this.sq3 = $('#2').text();
  this.sq4 = $('#3').text();
  this.sq5 = $('#4').text();
  this.sq6 = $('#5').text();
  this.sq7 = $('#6').text();
  this.sq8 = $('#7').text();
  this.sq9 = $('#8').text();
}

function Player(name, icon) {
  this.name = name;
  this.icon = icon;
  this.gamesWon = 0;
  this.gamesLost = 0;

}

//global variables start here
var winner = false;
var tries = 0;
var playerName = "";
var player1 = new Player("Player 1", "O");
var player2 = new Player("Player 2", "X");
var cpuBool = false;

//non-OOP functions

function checkForWinner(player) {
  var board = new Gameboard();
    if (player === board.sq1 && player === board.sq2 && player === board.sq3) {
      winner = true;
    } else if (player === board.sq4 && player === board.sq5 && player === board.sq6) {
      winner = true;
    } else if (player === board.sq7 && player === board.sq8 && player === board.sq9) {
      winner = true;
    } else if (player === board.sq1 && player === board.sq4 && player === board.sq7) {
      winner = true;
    } else if (player === board.sq2 && player === board.sq5 && player === board.sq8) {
      winner = true;
    } else if (player === board.sq3 && player === board.sq6 && player === board.sq9) {
      winner = true;
    } else if (player === board.sq1 && player === board.sq5 && player === board.sq9) {
      winner = true;
    } else if (player === board.sq3 && player === board.sq5 && player === board.sq7) {
      winner = true;
    }
  return winner;
}

function checkForTie(tries, winner) {
  if (tries === 9 && winner === false) {
    $("#winnerdeclaration").text("It's a draw.");
    $(".square").addClass("disableclick");
  }
}

function getRandomInt(num) {
  return Math.floor(Math.random() * (num));
}

function cpuMove() {
  var board = new Gameboard();
  spotsLeft = [];
  for (var i = 0; i <= 8; i++) {
    if ($("#" + i).text() === "") {
      spotsLeft.push("#" + i);
    }
  }
  randomSpot = spotsLeft[(getRandomInt(spotsLeft.length))];
  $(randomSpot).text(player2.icon);
  tries += 1;
}

// function cpuMoveLogic(board, spotsLeft) {
//   if (player1.icon === board.sq1) {
//     $(randomSpot).text(player2.icon);
//   }
// }


//main jQuery section
$(document).ready(function() {

  $('input:radio').change(
    function(){
        if($(this).val() == 'CPU') {
            $(".square").text("");
            cpuBool = true;
            $("#winnerdeclaration").text("Your move!");
            playerIcon = player1.icon;
        } else {
          cpuBool = false;
        }
    }
  );

  var playerIcon = player1.icon;
  $('.square').click(function () {
      $("#winnerdeclaration").text("");
      var squareValue = $(this).text();
      if (squareValue === '') {
        $(this).text(playerIcon);
        checkForWinner(playerIcon);
        if (playerIcon === 'O') {
          playerName = player1.name;
          playerWin = player1; //can you refactor this section, but putting these variables below?
          playerLose = player2;
          playerIcon = player2.icon;
        } else {
          playerName = player2.name;
          playerWin = player2;
          playerLose = player1;
          playerIcon = player1.icon;
        }
        if (winner === true) {
          $("#winnerdeclaration").text(playerName + " wins!");
          playerWin.gamesWon += 1;
          playerLose.gamesLost += 1;
          $('#winsPlayer1').text(player1.gamesWon);
          $('#winsPlayer2').text(player2.gamesWon);
          $(".square").addClass("disableclick");
        }
      }
      tries += 1;
      checkForTie(tries, winner);
      if (tries < 9 && cpuBool === true && winner === false) {//not registering when cpu wins
        $("#winnerdeclaration").text("Be patient, I'm thinking...");
        setTimeout(function() {
          cpuMove();
          $("#winnerdeclaration").text("");
        }, 2000);
        playerIcon = player1.icon;
      }
      checkForWinner(player2.icon);
  }); //end of '.square' click


$('.option-buttons').hide();

$('#restartGame').click(function () {
  winner = false;
  $(".square").removeClass("disableclick");
  $('.square').text('');
  $("#winnerdeclaration").text("New Game Started!").delay(2000);
  playerIcon = player1.icon;
  tries = 0;
});

$('table').click(function () {
  $('tbody').toggle();
});

$('#options').click(function () {
  $('.option-buttons').toggle();
});

$('#clearScoreboard').click(function () {
  player1.gamesWon = 0;
  player2.gamesWon = 0;
  $('#winsPlayer1').text(0);
  $('#winsPlayer2').text(0);
});

}); //end of DOM ready
