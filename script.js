// Array of image icons
var icons = [
    "💐", "🌹", "🌻", "🏵️",
    "🌺", "🌴", "🌈", "🍓"
  ];
  
  // Generate a new shuffled array of cards
  function generateCards() {
    var shuffledIcons = icons.concat(icons).sort(() => Math.random() - 0.5);
    var cards = shuffledIcons.map(icon => {
      return {
        icon: icon,
        isFlipped: false
      };
    });
    return cards;
  }
  
  // Render the game board
  function renderGameBoard() {
    var gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
  
    cards.forEach((card, index) => {
      var cardElement = document.createElement('div');
      cardElement.classList.add('card');
      if (card.isFlipped) {
        cardElement.classList.add('flipped');
        cardElement.textContent = card.icon;
      }
      cardElement.addEventListener('click', () => flipCard(index));
      gameBoard.appendChild(cardElement);
    });
  }
  
  // Flip a card
  function flipCard(index) {
    if (!cards[index].isFlipped && !isFlipping && !isGameOver && !isGamePaused) {
      cards[index].isFlipped = true;
      renderGameBoard();
  
      if (flippedCardIndex === null) {
        flippedCardIndex = index;
      } else {
        incrementMoveCounter();
        checkMoveLimit(); // Check move limit
  
        isFlipping = true;
        if (cards[flippedCardIndex].icon === cards[index].icon) {
          // Match found
          setTimeout(() => {
            cards[flippedCardIndex].isFlipped = true;
            cards[index].isFlipped = true;
            flippedCardIndex = null;
            isFlipping = false;
            checkGameOver();
            renderGameBoard();
          }, 800);
        } else {
          // Not a match
          setTimeout(() => {
            cards[flippedCardIndex].isFlipped = false;
            cards[index].isFlipped = false;
            flippedCardIndex = null;
            isFlipping = false;
            renderGameBoard();
          }, 800);
        }
      }
    }
  }
  
  // Check if the game is over
  function checkGameOver() {
    var flippedCardsCount = cards.filter(card => card.isFlipped).length;
    if (flippedCardsCount === cards.length) {
      isGameOver = true;
      clearInterval(timerInterval);
      var gameResult = {
        time: secondsElapsed,
        moves: moveCount
      };
      gameResults.push(gameResult);
      updateGameResultsTable();
      setTimeout(() => {
        var timeElapsed = formatTime(secondsElapsed);
        alert('Congratulations! You have won the game.\nTime: ' + timeElapsed + '\nMoves: ' + moveCount);
        restartGame();
      }, 500);
    }
  }
  
  // Check if the game is over due to exceeding move limit
  function checkMoveLimit() {
    if (moveCount > 20) {
      isGameOver = true;
      clearInterval(timerInterval);
      var gameResult = {
        time: secondsElapsed,
        moves: moveCount
      };
      gameResults.push(gameResult);
      updateGameResultsTable();
      setTimeout(() => {
        alert('Game Over! You have exceeded the move limit.');
        restartGame();
      }, 500);
    }
  }
  
  // Increment the move count
  function incrementMoveCounter() {
    moveCount++;
    document.getElementById('moveCount').textContent = moveCount;
  }
  
  // Start the timer
  function startTimer() {
    secondsElapsed = 0;
    timerInterval = setInterval(() => {
      secondsElapsed++;
      var time = formatTime(secondsElapsed);
      document.getElementById('timeElapsed').textContent = time;
    }, 1000);
  }
  
  // Format time as MM:SS
  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }
  
  // Add leading zero to single-digit numbers
  function padZero(number) {
    return number.toString().padStart(2, '0');
  }
  
  // Restart the game
  function restartGame() {
    cards = generateCards();
    flippedCardIndex = null;
    isFlipping = false;
    isGameOver = false;
    moveCount = 0;
    secondsElapsed = 0;
    clearInterval(timerInterval);
    document.getElementById('moveCount').textContent = moveCount;
    document.getElementById('timeElapsed').textContent = '00:00';
    renderGameBoard();
  }
  
  // Update the game results table
  function updateGameResultsTable() {
    var tableBody = document.querySelector('#gameResultsTable tbody');
    tableBody.innerHTML = '';
    gameResults.forEach((result, index) => {
      var row = document.createElement('tr');
      var numberCell = document.createElement('td');
      var timeCell = document.createElement('td');
      var movesCell = document.createElement('td');
  
      numberCell.textContent = index + 1;
      timeCell.textContent = result.time;
      movesCell.textContent = result.moves;
  
      row.appendChild(numberCell);
      row.appendChild(timeCell);
      row.appendChild(movesCell);
  
      tableBody.appendChild(row);
    });
  }
  
  // Start the game
  function startGame() {
    cards = generateCards();
    flippedCardIndex = null;
    isFlipping = false;
    isGameOver = false;
    moveCount = 0;
    secondsElapsed = 0;
    clearInterval(timerInterval);
    document.getElementById('moveCount').textContent = moveCount;
    document.getElementById('timeElapsed').textContent = '00:00';
    renderGameBoard();
    startTimer();
  }
  
  // Initial game setup
  var cards = [];
  var flippedCardIndex = null;
  var isFlipping = false;
  var isGameOver = false;
  var moveCount = 0;
  var secondsElapsed = 0;
  var timerInterval = null;
  var isGamePaused = false;
  var gameResults = [];
  
  document.getElementById('startButton').addEventListener('click', startGame);
  document.getElementById('restart-btn').addEventListener('click', restartGame);
  