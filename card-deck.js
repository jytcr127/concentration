class Deck {
    constructor() {
      this.cards = [];
      this.matchedCards = [];
      this.selectedCards = [];
      this.shuffledCards = [];
    }
  
    shuffle() {
      let min = 0;
      let max = 10;
      for (let i = 0; i < 10; i++) {
        let randomNum = Math.floor(Math.random() * (max - min) + min);
        let card = this.cards.splice(randomNum, 1);
        this.shuffledCards.push.apply(this.shuffledCards, card);
        max--;
      }
    }
  
    moveToMatched() {
      let selectedArr = this.selectedCards;
      if (selectedArr[0].matchInfo === selectedArr[1].matchInfo) {
        selectedArr.forEach(card => {
          card.match();
          showCurrentMatchesImg(card);
        });
        this.matchedCards.push(selectedArr);
        removeMatchedDom();
      } else {
        setTimeout(flipTimeout, 1000)
      } 
    }
  
    populateDeck() {
      let firstCardsId = 0;
      let lastCardsId = 5;
      for (let i = 1; i < 6; i++) {
        firstCardsId++;
        lastCardsId++;
        let card1 = new Card(`card-${i}`, firstCardsId, i);
        let card2 = new Card(`card-${i}`, lastCardsId, i);
        this.cards.push(card1);
        this.cards.push(card2);
      }
      this.shuffle();
    }
  
    checkSelected(event) {
      let selectedArr = this.selectedCards;
      this.shuffledCards.forEach((card, i) => {
        let cardIndex = this.shuffledCards[i];
        if (cardIndex.id == event.target.id && selectedArr.length <= 2) {
          cardIndex.selected = false;
          this.populateSelected(selectedArr, cardIndex);
        }
      })
    }
  
    populateSelected(selectedArr, cardIndex) {
      if (!cardIndex.selected && selectedArr.length < 2) {
        selectedArr.push(cardIndex);
        cardIndex.selected = true;
        displayImg(event);
      } else {
        this.removeSelected(selectedArr);
      }
    }
  
    removeSelected(selectedArr) {
      selectedArr.forEach(card => {
        if (card.selected && (card.id == event.target.id)) {
          let index = selectedArr.indexOf(card);
          card.selected = false;
          selectedArr.splice(index, 1);
          displayImg(event);
        }
      })
    }
  }