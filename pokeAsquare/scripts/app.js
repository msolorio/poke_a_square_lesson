console.log('Welcome to Poke-A-Square...');

// == User Stories/game logic == //
// When the user clicks begin the timer should start, and the squares should populate with a random color

// When the use clicks on a color the color should disapear, and score should be added or subtracted

// When the round is over the scores round and time should be updated and the user should be able to start again with increased difficulty.

// Step one. Add a listener to the button when the user clicks to console log

$('button').on('click', () => {
	console.log('Game Start');
	createSquares(200);
	setTimer();
	setUpRound();
});

// Step two.
// Now we need to write a function named (createSquares) that sets up our squares, write a function that takes a parameter numberOfSquares that will create an arbitary number of divs depending on the parameter and attach them to the squares class from the html.

// Define Function
// grab the squares container
// create a loop that runs to the number of squares given
// for each loop create a square
// add the square class to it
// append the square to squares container

const createSquares = numberOfSquares => {
	const $squares = $('.squares');
	for (let i = 0; i < numberOfSquares; i++) {
		const $square = $('<div/>');
		$square.addClass('square');
		// $square.css('background-color', applyRandomColor());
		$squares.append($square);
	}
};

// Now add createSquares to the event listener

// Step 3 Blue squares are boring! We want our squares to have a random, red, blue, or green color. Write a function to make that happen.

// Define the function
// create an array of colors
// get a random index
// return the random color

const applyRandomColor = () => {
	const colors = ['red', 'green', 'blue'];
	const index = Math.floor(Math.random() * 3);
	return colors[index];
};

// We need to add this cool new function to our square creation.

// $square.css('background-color', applyRandomColor());

// YAY! we have colored squares!

// Step 4. Making the squares clickable. When we click them we want them to be hidden.

// grab the squares container
// add a click listener
// create a function to execute called handlePoke()
// in handlePoke() on click change opacity to zero

$('.squares').on('click', e => {
	handlePoke(e);
});

// Step 5. We want to check the color of the square and add or subtract points based on the color of the square.

// create a variable called score and set it to zero
// in handlePoke() lets grab the color of the current square and save it to a variable
// Create a new function called checkValidPoke that takes in the square color
// call that function inside of handlePoke()

// in checkValidPoke()
// grab the colors passed to the function and split the color numbers into an array.
// pull out the blue value of the array
// if the value is equal to 255 (aka the max value of blue) increase the score
// if not then decrease the score
// finally target the h1 tag and change he text to display the score

let score = 0;

const handlePoke = e => {
	if (e.target.classList.contains('square')) {
		$(e.target).css('opacity', 0);
		const color = $(e.target).css('background-color');
		// checkValidPoke(color);
	}
};

const checkValidPoke = squareColor => {
	// console.log('SQUARE', square, typeof square);
	const colors = squareColor.substring(4, squareColor.length - 1).split(' '); // Get rgba from div inline style
	const blue = parseInt(colors[2]);
	if (blue === 255) {
		score++;
		$('h1').text('scoreboard: ' + score);
	} else {
		score--;
		$('h1').text('scoreboard: ' + score);
	}
};

// YAY! now we have a score incrementing!

// Step 6. Set a timer. Set a round. Increase Difficulty.
// Write a function called setTimer that starts an interval and countsdown to 0 and when it reaches 0 increase the round increase the amount of squares for each round.

// define two new variables. time and round. Set time to 30 and round to 1.
// create a function called setTimer()
// create a variable called timer and set it as a setInterval() function with a delay of 1000]

// the function inside the set interval will...
// decrement the time
// grab the #timer and change it's text to the amount of time left
// it will check if the time is 0 if so increase round, setup a new round, and call setTimer to restart the timer

// YAY! Timer is working. But what about round?

let time = 30;
let round = 1;

const setTimer = () => {
	const timer = setInterval(() => {
		time--;
		if (time === 0) {
			round++;
			clearInterval(timer);
			setUpRound();
			setTimer();
		}
		updateTime();
	}, 1000);
};

const updateTime = () => {
	const $timer = $('#timer');
	$timer.text(`timer: ${time}s`);
};

// define a function called setUpRound
// remove all the squares
// increase the round number in the dom
// based on the round call createSquares with a set number
// based on the round decrease the timer number
// add setUpRound into the SetTimer function

const setUpRound = () => {
	$('.squares').empty();
	$('#round').text('round: ' + round);

	if (round === 1) {
		createSquares(50);
		time = 30;
	} else if (round === 2) {
		createSquares(100);
		time = 20;
	} else if (round === 3) {
		createSquares(150);
		time = 10;
	} else {
		createSquares(250);
		time = 10;
	}
};

// WE DID IT!!
