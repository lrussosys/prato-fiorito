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
  bombValue = -1;
  counter = 0;

  ngOnInit() {
    this.newGame();
  }
  // mette le bombe in maniera random
  generateBombs() {
    let randomIndex = Math.floor(Math.random() * (this.N - 1));
    let randomIndex2 = Math.floor(Math.random() * (this.N - 1));

    console.log(randomIndex);

    for (let i = 0; i < 8; i++) {
      this.camp[randomIndex2].splice(randomIndex, 1, {
        ...this.camp[randomIndex][randomIndex2],
        bomb: this.bombValue,
      });
      randomIndex = Math.floor(Math.random() * (this.N - 1));
      randomIndex2 = Math.floor(Math.random() * (this.N - 1));
      console.log(randomIndex);
    }

    console.log(this.camp);
  }

  generateCamp() {
    for (let i = 0; i < this.N; i++) {
      this.camp[i] = [];

      for (let k = 0; k < 8; k++) {
        this.camp[i][k] = {
          count: 0,
          bomb: 0,
          selected: false,
        };
      }
    }
    console.log(this.camp);
  }

  newGame() {
    this.gameLost = false;

    this.generateCamp();

    this.generateBombs();
  }

  getClickedSquare(i: any, j: any, e: any) {
    console.log(i, j);

    console.log(e.target);

    if (this.camp[i][j].bomb == this.bombValue) {
      console.log('bomba');
      this.gameLost = true;
      e.target.style.backgroundColor = 'red';
    } else {
      console.log('campo');
      //   e.target.style.border = '1px solid gray';
    }

    /******************/
    // Search nearby bombs

    // if (this.camp[i - 1][j]) {
    //   console.log('bomba sopra');
    // } else if(this.camp[i + 1][j]) {
    //     console.log('bomba sotto')
    // } else if(this.camp[i][j + 1]) {
    //     console.log('bomba a destra')
    // }

    // let counter = 0
    // this.camp[1].forEach((x:any)=>{
    //   if(x==1){
    //     counter+=1;
    //   }
    //   console.log(counter)})

    // console.log(this.camp)

    // START

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
    console.log(this.counter);
  }
}
