let body = document.querySelector('body');
let cardContainer = document.querySelector('.card-container');
let gamePage = document.querySelector('.game-page');
let winPage = document.querySelector('.win-page-container');
let matchAmount = document.querySelector('.amount-container');
let winPageTime = document.querySelector('.total-time');
let firstScore = document.querySelector('.first-score');
let secondScore = document.querySelector('.second-score');
let thirdScore = document.querySelector('.third-score');
let deck = new Deck();
let timer = new Timer();
let avengersInitials = ['A', 'V', 'E', 'N', 'G', 'E', 'R', 'S'];

window.onload = invokeDeck(); // this loads the cards 
body.addEventListener('click', clickHandler); // this listens to first click to start game

function clickHandler(event) {
  if (event.target.closest('.card')) {
    deck.checkSelected(event);
    invokeTimer(); // This triggers when user clicks a card
  }

  if (deck.selectedCards.length === 2) {
    deck.moveToMatched(); // This resets after user unsuccesfully picks two random cards
  }

  if (event.target.classList.contains('new-game-button')) {
    window.location.reload(); //This reloads the game after user clicks the play again button
  }
}

function invokeTimer() {
  if (!timer.started) {
    timer.start();
  }
} //This starts the timer

function invokeDeck() {
  deck.populateDeck();
  displayCards(event);
  displayTopTimes();
}

function displayCards() {
  for (let i = 0; i < deck.shuffledCards.length; i++) {
    let cardId = deck.shuffledCards[i].id;
    let imgId = cardId > 5 ? cardId - 5 : cardId;
    cardContainer.insertAdjacentHTML('beforeend', `
    <div id="${cardId}" class="front card card-${cardId}">
      <p class="">${avengersInitials[Math.floor(Math.random()*avengersInitials.length)]}</p>
    </div>
    <div id="${cardId}" class="back-${imgId} card card-${cardId} hide">
    </div>`);
  }
}

function displayImg(event) {
  if(event.target.classList.contains('front')) {
    event.target.classList.add('hide', 'flipped');
    event.target.nextElementSibling.classList.remove('hide');
    event.target.nextElementSibling.classList.add('back');
  }
}

function flipTimeout(event) {
  if(deck.selectedCards.length === 2) {
    let flippedCards = cardContainer.getElementsByClassName('back')
    flippedCards[0].classList.add('hide');
    flippedCards[1].classList.add('hide');
    flippedCards[0].previousElementSibling.classList.remove('hide', 'flipped');
    flippedCards[1].previousElementSibling.classList.remove('hide', 'flipped');
    flippedCards[0].classList.remove('back');
    flippedCards[0].classList.remove('back');
    deck.selectedCards = [];
  }
}

function removeMatchedDom() {
  let trueMatch = cardContainer.getElementsByClassName('flipped');
  let flippedCards = cardContainer.getElementsByClassName('back')
  trueMatch[0].nextElementSibling.style.visibility = 'hidden';
  trueMatch[1].nextElementSibling.style.visibility = 'hidden';
  trueMatch[0].classList.remove('flipped');
  trueMatch[0].classList.remove('flipped');
  flippedCards[0].classList.remove('back');
  flippedCards[0].classList.remove('back');
  deck.matchedCards.forEach((match) => {
    match.forEach(card => {
      card.selected = false;
      deck.selectedCards = [];
    });
  });
  increaseMatchAmount();
}

function increaseMatchAmount() {
  let amount = Number(matchAmount.innerText);
  amount++;
  matchAmount.innerText = `${amount}`;
  if (matchAmount.innerText == 5) {
    timer.stop();
  }
}

function gameOver(minutes, seconds) {
  gamePage.classList.add('hide');
  winPage.classList.remove('hide');
  winPageTime.innerText = `${minutes} minutes ${seconds} seconds`;
}

function displayTopTimes() {
  let times = [];
  let namesList = [];
  timer.topTimes.forEach(time => {
    let names = time.name;
    let min = Math.floor(time.time / 60);
    let sec = Math.round(time.time % 60);
    times.push(min, sec)
    namesList.push(names);
  })
  firstScore.innerText = `1.${namesList[0] || ''}..... ${times[0] || '0'} min ${times[1] || '0'} sec`;
  secondScore.innerText = `2. ${namesList[1] || ''}..... ${times[2] || '0'} min ${times[3] || '0'} sec`;
  thirdScore.innerText = `3. ${namesList[2] || ''}..... ${times[4] || '0'} min ${times[5] || '0'} sec`;
}

function showCurrentMatchesImg(card) {
  let matchBoxes = gamePage.getElementsByClassName('current-match');
  for (let i = 0; i < matchBoxes.length; i++) {
    if (card.matchInfo === matchBoxes[i].dataset.id) {
      matchBoxes[i].classList.add(`back-${card.imgId}`);
    }
  }
}

