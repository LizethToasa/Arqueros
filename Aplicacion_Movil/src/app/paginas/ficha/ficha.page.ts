import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {
  age:any;
  showAge:any;
  ano:number;
  max:Date;
  min:Date;
  constructor() { 
    this.ano = new Date().getFullYear();
    var max = this.ano - 7;
    var min = this.ano - 30;
    var actual = "1/" + "1/" + max;
    var minima = "1/" + "1/" + min;
    this.min = new Date(minima);
    this.max = new Date(actual);
    console.log(this.max);
    

  }

  ngOnInit() {
  }
  ageCalculator(){
    if(this.age){
      console.log(this.age);
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }

}
