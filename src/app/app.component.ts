import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'prato-fiorito';
  constructor() {}

  N = 8;
  camp: any = [];
  gameLost = false;
  gameWon = false;
  bombValue = -1;
  bombQuantity!: any;
  counter = 0;
  counterSelected: any = 0;
  bombCounter = 0;

  ngOnInit() {
    this.newGame();
  }

  // mette le bombe in maniera random
  generateBombs() {
    let randomIndex = Math.floor(Math.random() * (this.N - 1));
    let randomIndex2 = Math.floor(Math.random() * (this.N - 1));

    for (let i = 0; i < 8; i++) {
      this.camp[randomIndex2].splice(randomIndex, 1, {
        ...this.camp[randomIndex][randomIndex2],
        bomb: this.bombValue,
      });
      randomIndex = Math.floor(Math.random() * (this.N - 1));
      randomIndex2 = Math.floor(Math.random() * (this.N - 1));
    }
  }

  generateCamp() {
    for (let i = 0; i < this.N; i++) {
      this.camp[i] = [];

      for (let k = 0; k < this.N; k++) {
        this.camp[i][k] = {
          count: 0,
          bomb: 0,
          selected: false,
        };
      }
    }
  }

  newGame() {
    this.bombCounter = 0;
    this.counterSelected = 0;

    this.gameLost = false;
    this.gameWon = false;


    this.generateCamp();

    this.generateBombs();

    // Calcolo numero bombe
    this.camp.forEach((e: any) => {
      e.forEach((el: any) => {
        if (el.bomb == -1) {
          this.bombCounter++;
          this.bombQuantity = this.bombCounter;
        }

        if (el.selected) {
          let selected = 0;
          selected++;
        }
      });
    });
  }

  getClickedSquare(i: any, j: any, e: any = undefined) {
    if (this.camp[i][j].bomb == this.bombValue) {
      this.gameLost = true;
    }

    // START gioco

    this.counter = 0;

    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        let rowIndex = i - 1 + k;
        let colIndex = j - 1 + l;

        if (
          this.camp[rowIndex] &&
          this.camp[rowIndex][colIndex] &&
          this.camp[rowIndex][colIndex] &&
          this.camp[rowIndex][colIndex].bomb == this.bombValue
        ) {
          this.counter++;
        }
      }
    }
    if (this.camp[i][j].bomb != this.bombValue) {
      this.camp[i][j].count = this.counter;
      this.camp[i][j].selected = true;
    }

    // Conta caselle selezionate
    for (let c = i - 1; c < i - 1 + 3; c++) {
      for (let p = j - 1; p < j - 1 + 3; p++) {
        if (
          this.camp[c] !== undefined &&
          this.camp[c][p] !== undefined &&
          this.camp[c][p].bomb !== this.bombValue
        ) {
          this.camp[c][p].selected = true;
          this.counterSelected++;
        }
      }
    }

    // Controllo vittoria
    let selected = 0;
    this.camp.forEach((e: any) => {
      e.forEach((el: any) => {
        if (el.selected == true) {
          selected++;
        }

        if (this.N * this.N - selected == this.bombQuantity) {
          this.gameWon = true;
        }
      });
    });
  }
}
