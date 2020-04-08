class Card {
    constructor(matchInfo, id, imgId) {
      this.id = id;
      this.imgId = imgId;
      this.matchInfo = matchInfo;
      this.matched = false;
      this.selected = false;
      if(this.selected === true) {
      	this.classList.add('hide');
      }
    }
  
    match() {
      this.matched = true;
    }
  }
  