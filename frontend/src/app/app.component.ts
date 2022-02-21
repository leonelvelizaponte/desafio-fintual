
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fintual-challenge';
  selectedStock: string = '';
  initDate: any = '';
  endDate: any = '';

  displayStock: string = '';
  displayInitDate: any = '';
  displayEndDate: any = '';
  displayProfit: any = '';

  positiveFlag: boolean = false;
  negativeFlag: boolean = false;
  zeroFlag: boolean = false;

  calculatorFlag: boolean = true;
  loadingFlag: boolean = false;
  resultFlag: boolean = false;

  restData = null;

  showFiller = false;

  constructor( private http: HttpClient) {}

  processProfit(): void {
    this.calculatorFlag = false;
    this.loadingFlag = true;
    if (this.selectedStock === 'NFLX') {
      this.displayStock = 'Netflix';
    } else if (this.selectedStock === 'TSLA') {
      this.displayStock = 'Tesla';
    } else if (this.selectedStock === 'GOOGL') {
      this.displayStock = 'Google';
    } else {
      this.displayStock = '';
    }

    this.displayInitDate = `${new Date(this.initDate).getFullYear()}-${new Date(this.initDate).getMonth()+1}`;
    this.displayEndDate = `${new Date(this.endDate).getFullYear()}-${new Date(this.endDate).getMonth()+1}`;

    this.http.get<any>(`http://localhost:3000/stock/${this.selectedStock}/${this.displayInitDate}/${this.displayEndDate}`).subscribe(data => {
      if (data > 0) {
        this.displayProfit = `+${data}%`;
        this.positiveFlag = true;
        this.negativeFlag = false;
        this.zeroFlag = false;
        this.loadingFlag = false;
        this.resultFlag = true;
      } else if (data < 0) {
        this.displayProfit = `${data}%`;
        this.positiveFlag = false;
        this.negativeFlag = true;
        this.zeroFlag = false;
        this.loadingFlag = false;
        this.resultFlag = true;
      } else if (data === 0.00) {
        this.displayProfit = '0%';
        this.positiveFlag = false;
        this.negativeFlag = false;
        this.zeroFlag = true;
        this.loadingFlag = false;
        this.resultFlag = true;
      } else {
        this.displayProfit = '-';
        this.positiveFlag = false;
        this.negativeFlag = false;
        this.zeroFlag = true;
        this.loadingFlag = false;
        this.resultFlag = true;
      }
    })
  };

  repeat(): void {
    this.resultFlag = false;
    this.calculatorFlag = true;
  };
}
