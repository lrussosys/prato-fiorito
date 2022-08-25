import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'prato-fiorito';
  constructor() {}

  camp: any = [];
  gameLost = false;

  ngOnInit() {
    this.newGame();
  }

  generateBombs() {
    let randomIndex = Math.floor(Math.random() * 7);
    let randomIndex2 = Math.floor(Math.random() * 7);

    console.log(randomIndex);

    for (let i = 0; i < 8; i++) {
      this.camp[randomIndex2].splice(randomIndex, 1, 1);
      randomIndex = Math.floor(Math.random() * 7);
      randomIndex2 = Math.floor(Math.random() * 7);
      console.log(randomIndex);
    }

    console.log(this.camp);
  }

  generateCamp() {
    for (let i = 0; i < 8; i++) {
      this.camp[i] = [];

      for (let k = 0; k < 8; k++) {
        this.camp[i][k] = 0;
      }
    }
    console.log(this.camp);
  }

  newGame() {
    this.gameLost = false;

    this.generateCamp();

    this.generateBombs();
  }

  getClickedSquare(i: any, j: any) {
    console.log(i, j)

    if(this.camp[i][j] == 1) {
        console.log('bomba')
        this.gameLost = true;
    } else {
        this.gameLost = false;
        console.log('campo')
    }
  } 
}
