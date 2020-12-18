
### Poke A Square

- Were goin to make a game that looks like the following.

![squareGame](squareGame.png)

- The objective of our game is to click on as many blue squares as possible during the alloted time

### User Stories/game logic

-  When the user clicks begin the timer should start counting down, and the squares should populate with a random color, either red, green, or blue.

-  When the user clicks on a color the color should become invisible. If the square is blue add one to the score. If the square is red or green the subtract one from the score.

- If the user clicks all the blue squares, take them to the next round, repopulate the board with more squares, and restart the timer.

- If the timer gets to 0 update the display to show Game Over and show the score. 

### setup 

- open up the `pokeAsquare` folder in student examples, and read over the code


### Let's begin 

- Before we really dig in, there are a few pieces of information that we will need to keep track of and make accessible throughout our application. We can set up global variables near the top of our JavaScript file to keep track of these values that we know will throughout the life of our program.

```javascript
let score = 0;
let timer = 30;
let round = 1;
```

- Let's start by listening for a click on our begin button. We usually like to keep our event listeners at the bottom of our JavaScript file.

```javascript
  $('button').on('click', function() {
   console.log('this is working');
  });
```

- Now we need to write a function named (createSquares) that sets up our squares, Try to write a function that takes a parameter `numberOfSquares` that will create an arbitary number of divs depending on the parameter and attach them to the squares class from the html. 

```javascript
  function populateSquares(numberOfSquares) {
    for (let i = 0; i < NumberOfSquares; i++){
        const newSquare = $('<div/>');

        $('.squares').append(newSquare);
    }
  }
```

- lets call createSquares in the start button function

```javascript
  $('button').on('click', function() {
    populateSquares();
  });
```
- Now we have a bunch of blue squares, but we want our squares to have a random, red, blue, or green color try to write a function to make that happen.


```javascript
function getRandomColor() {
  const colorsList = ['red', 'green', 'blue'];
  const randomNumber = Math.floor(Math.random() * 3);

  return colorsList[randomNumber];
}
```

-  Where do we use that function?

```javascript
function populateSquares(numberOfSquares) {
  for (let i = 0; i < numberOfSquares; i++) {
    const randomColor = getRandomColor();
    const newSquare = $(`
      <div class="square ${randomColor}"><div/>
    `);

    squaresContainer.append(newSquare);
  }
}
```

-  Now that we have colored squares, lets make them clickable, and hidden when we click on them.  Give it a try!


```javascript
squaresContainer.on('click', '.square', handleSquareClick);
```

```javascript
function handleSquareClick(event) {
  if ($(event.target).hasClass('blue')) {
    $(event.target).addClass('hidden').removeClass('blue');
  }
}
```
In our CSS we are targeting the hidden class with `opacity: 0;` to hide the square.

-  One way to do it is like the following

```javascript
function handleSquareClick(event) {
  if ($(event.target).hasClass('blue')) {
    $(event.target).addClass('hidden').removeClass('blue');
    score++
  } else {
    if (score > 0) {
      score--;
    }
  }
}
```

- Now that we've updated the score variable we still have to update the score on the page. We might have a method called `renderStats` that takes care of rendering all of our stats. Then we can call that single method any time we want to update the stats on the page.

```javascript
function renderStats() {
  $('h1').text(`scoreBoard: ${score}`);
  $('#timer').text(`timer: ${timer}`);
  $('#round').text(`round: ${round}`);
}
```

- We can call `renderStats()` when we update the score when a square is clicked.
```javascript
function handleSquareClick(event) {
  if ($(event.target).hasClass('blue')) {
    $(event.target).addClass('hidden').removeClass('blue');
    score++
    renderStats();
  } else {
    if (score > 0) {
      score--;
      renderStats();
    }
  }
}
```

- Now try to write a function called `startTimer` that uses the setInterval method. This method should decrease our timer variable by one every second and then call renderStats to rerender the stats on the page.

```javascript
function startTimer() {
  let counter = setInterval(function() {
    timer--;

    renderStats();
  }, 1000);
}
```
The `setInterval` takes as it's first parameter a function to call every interval, and as it's second parameter the number of milliseconds to call it in. Here we call a function every 1000 milliseconds.

Whenever we use `setInterval` we want to remember to clear the interval at some point in the future. Here we check if timer is less than or equal to 0 and if so we call `clearInterval` stopping the timer and displaying a Game Over" message to the user.
```javascript
function startTimer() {
  let counter = setInterval(function() {
    timer--;

    if (timer <= 0) {
      clearInterval(counter);
      scoreBoard.text(`Game Over. Your score is ${score}`);
      return;
    }

    renderStats();
  }, 1000);
}
```

Now let's call `startTimer` when the begin button is clicked.
```javascript
function handleBeginClick() {
  startTimer();
  populateSquares(30);
}
```

- Now write a function called `goToNextRound`, that will increase the round number, reset the timer, clear out all of our squares and call `populateSquares` with an increased number of squares, increasing the difficulty. It should also call `renderStats` to update the display on the page.

```javascript
 function goToNextRound() {
  round++;
  timer = 30;

  squaresContainer.empty();
  populateSquares(30 + (round * 2));

  renderStats();
}
```

Just one more feature to add. All of the blue squares are clicked on the page we want to go to the next round. How would we do this? When ever a blue square is clicked we could do a check to see if there are any remaining blue squares on the page. Let's write a function called `blueSquaresRemain() {}` that will do this check.
```javascript
function blueSquaresRemain() {
  const blueSquares = $('.blue');

  if (!blueSquares.length) {
    console.log('no more blues 🎶');
    return false;
  }

  return true;
}
```
We can use the jQuery selector to get a list of the blueSquares. If the length of that list is 0 than we want to return false. Since 0 is a falsy value we can easily check for 0 with `!blueSquares.length`. If the length of that list is not 0 then we return true; there are blue squares remaining.

Now we want to use this function to check for blue squares every time we click a blue square. If there are no blue squares than we can call `goToNextRound()`.

```javascript
function handleSquareClick(event) {
  if ($(event.target).hasClass('blue')) {
    $(event.target).addClass('hidden').removeClass('blue');
    score++;
    renderStats();

    if (!blueSquaresRemain()) {
      goToNextRound();
    }
  } else {
    if (score > 0) {
      score--;
      renderStats();
    }
  }
}
```
___

### Extras

- So whats some add on we can make up and do together?
- Make the squares lose transparency during each round so you have to click faster.
- Make a Modal to gather the players name at the beginning of the game, and leave them a greeting in the header
- Can you refactor your code to encapsulate your methods and variables in an object
- Style it make it look nice
- Make a sound when you click a wrong one or a right one.
- have a modal pop up at the begining of a ready so the user knows how to continue
- make a section about how to play the game (how do you want to do that? an About page, in the header, a modal, idk???? anything you can imagine)
- Anything you can imagine, any twist, any turn you like, USE USE USE your imagination in this, it will allow you to create worlds.
