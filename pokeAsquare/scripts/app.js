console.log('Welcome to Poke-A-Square...');

/*
SPECS

When the user clicks begin the timer should start counting down, and the squares should populate with a random color, either red, green, or blue.

When the user clicks on a color the color should become invisible. If the square is blue add one to the score. If the square is red or green subtract one from the score.

If the user clicks all the blue squares, take them to the next round, repopulate the board with more squares, and restart the timer.

If the timer gets to 0 update the display to show Game Over and show the score.
*/

let timer = 30;

function getRandomColor() {
  // randomly returns red, green or blue
  const colorsList = ['red', 'green', 'blue'];
  const randomNumber = Math.floor(Math.random() * 3);

  return colorsList[randomNumber];
}

// make function to show the squares
function populateSquares(numberOfSquares) {
  for (let i = 0; i < numberOfSquares; i++) {
    const newSquare = $(`
      <div class="square ${getRandomColor()}" />
    `);
    
    $('.squaresContainer').append(newSquare);
  }
}
// make function to start the timer
function startTimer() {
  const counter = setInterval(function() {
    timer--;

    $('#timer').text(`timer: ${timer}s`);

    if (timer === 0) {
      clearInterval(counter);
    }

  }, 1000);
  // start a timer at 0
  // every second console.log one greater
}



// Listen for a click on each square
// - if square clicked on is blue add one to the score
// - if square clicked on is red or green subtract from the score
// - If all blue squares are gone, go to the next round
// Inside the timer, check if the timer is 0
// If timer is 0 and there are still squares left --> Game over

// When button is clicked show 30 squares and start the timer at 30s
// Add a listener to the begin button
$('#begin-button').on('click', function() {
  console.log('Game has started!')
  populateSquares(30);
  startTimer();
});
