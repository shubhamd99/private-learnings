// Select all card elements from the DOM
const cards = document.querySelectorAll(".memory-card");

// State variables to keep track of the game's current status
let hasFlippedCard = false; // Tracks if one card is already flipped
let lockBoard = false; // Locks the board to prevent clicking while cards are animating
let firstCard, secondCard; // Stores the two cards currently being compared

/**
 * Handles the logic when a card is clicked.
 * Toggles the 'flip' class and manages the state of the first and second flipped cards.
 */
function flipCard() {
  // Prevent interactions if the board is locked or if the same card is clicked twice
  if (lockBoard) return;
  if (this === firstCard) return;

  // Visually flip the card by adding the 'flip' CSS class
  this.classList.add("flip");

  // If this is the first card clicked in the current turn
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // If this is the second card clicked
  secondCard = this;

  // We have two flipped cards, check if they match
  checkForMatch();
}

/**
 * Checks if the two flipped cards match based on their data-framework attribute.
 */
function checkForMatch() {
  // Do the datasets match? (e.g., both are "react" cards)
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards(); // Match found! Keep them flipped.
    return;
  }

  // Not a match, turn them back over
  unflipCards();
}

/**
 * Called when cards match.
 * Removes click listeners so they can't be interacted with again.
 */
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  // Reset the board state for the next turn
  resetBoard();
}

/**
 * Called when cards do not match.
 * Flip them back after a short delay so the user can see them, and lock the board meanwhile.
 */
function unflipCards() {
  lockBoard = true; // Lock the board to prevent clicking other cards

  // Wait 1.5 seconds before removing the 'flip' class
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    // Unlock the board and reset state for the next turn
    resetBoard();
  }, 1500);
}

/**
 * Resets the game state variables after a turn is completed.
 */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/**
 * Immediately Invoked Function Expression (IIFE) to shuffle the cards
 * exactly once before the game starts.
 */
(function shuffle() {
  cards.forEach((card) => {
    // Generate a random position between 0 and 11 (since there are 12 cards)
    let randomPos = Math.floor(Math.random() * 12);
    // Apply the random position to the CSS 'order' property to visually shuffle them (requires flexbox/grid)
    card.style.order = randomPos;
  });
})();

// Attach the flipCard function to the 'click' event of every card
cards.forEach((card) => card.addEventListener("click", flipCard));
