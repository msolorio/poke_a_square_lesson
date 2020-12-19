console.log('Welcome to Poke-A-Square...');

/*
SPECS

When the user clicks begin the timer should start counting down, and the squares should populate with a random color, either red, green, or blue.

When the user clicks on a color the color should become invisible. If the square is blue add one to the score. If the square is red or green subtract one from the score.

If the user clicks all the blue squares, take them to the next round, repopulate the board with more squares, and restart the timer.

If the timer gets to 0 update the display to show Game Over and show the score.
*/

let timer = 30;
let score = 0;
let round = 1;

function renderStats() {
  $('#score').text(`Scoreboard: ${score}`);
  $('#timer').text(`timer: ${timer}`);
  $('#round').text(`round: ${round}`);
}

function getRandomColor() {
  // randomly returns red, green or blue
  const colorsList = ['red', 'green', 'blue'];
  const randomNumber = Math.floor(Math.random() * 3);

  return colorsList[randomNumber];
}

// Creates squares and adds them to the page
function populateSquares(numberOfSquares) {
  for (let i = 0; i < numberOfSquares; i++) {
    const newSquare = $(`
      <div class="square ${getRandomColor()}" />
    `);
    
    $('.squaresContainer').append(newSquare);
  }
}

function startTimer() {
  const counter = setInterval(function() {
    timer--;

    renderStats();

    // If timer reaches 0 --> Game Over
    if (timer === 0) {
      $('#score').text(`Game Over! Your score is: ${score}`);
      clearInterval(counter);
    }

  }, 1000);
}

// Returns true if there are any blue squares remaining
// Returns false if there are none
function blueSquaresRemain() {
  const blueSquares = $('.blue');

  if (!blueSquares.length) {
    return false;
  }

  return true;
}

// Increases the round
// Updates the timer back to 30
// Resets the board with new squares
function goToNextRound() {
  round++;
  time = 30;
  renderStats();
  $('.squaresContainer').empty();
  populateSquares(30 + (round * 2));
}

function handleSquareClick(event) {
  // Adds a class that will hide the square
  $(event.target).addClass('hidden');
  
  // - if square clicked on is blue add one to the score
  if ($(event.target).hasClass('blue')) {
    $(event.target).removeClass('blue');
    
    // - If all blue squares are gone, go to the next round
    if (!blueSquaresRemain()) {
      goToNextRound();
    }
    
    score++;
    renderStats();
  } else {
    // - if square clicked on is red or green subtract from the score
    if (score > 0) {
      score--;
      renderStats();
    }
  }
}

function handleBeginClick() {
  populateSquares(30);
  startTimer();
}

// When button is clicked show 30 squares and start the timer at 30s
// Add a listener to the begin button
$('#begin-button').on('click', handleBeginClick);

// Listen for a click on each square
$('.squaresContainer').on('click', '.square', handleSquareClick);
