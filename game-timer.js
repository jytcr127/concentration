class Timer {
    constructor() {
      this.startTime = null;
      this.stopTime = null;
      this.topTimes = JSON.parse(localStorage.getItem('allScores')) || [];
      this.topNames = JSON.parse(localStorage.getItem('allnames')) || [];
      this.totalSeconds = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.started = false;
    }
  
    translateTimeAndName() {
      let totalSeconds = Math.round((this.stopTime - this.startTime) / 1000);
      this.minutes = Math.floor(totalSeconds / 60);
      this.seconds = Math.round(totalSeconds % 60);
      let names = name.value;
      this.topTimes.push({name: names, time: totalSeconds});
      this.topTimes.sort((a,b) => (a.time > b.time) ? 1 : -1);
      gameOver(this.minutes, this.seconds);
      this.saveToLocalStorage(this.topTimes);
    }

    start() {
      this.startTime = Date.now();
      this.started = true;
    }
  
    stop() {
      this.stopTime = Date.now();
      this.translateTimeAndName();
    }
  
    saveToLocalStorage() {
      let stringedArray = JSON.stringify(this.topTimes);
      localStorage.setItem('allScores', stringedArray);
    }
  }


let example = document.querySelector('#btn');
let name = document.querySelector('#user-name');

example.addEventListener('click', function(e) {
	e.preventDefault();
	console.log(name.value);
})

