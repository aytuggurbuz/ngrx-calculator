import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as CalcActions from './calc.action'; // action'larımız
import CalcState from './calc.state'; // state'in yapısı

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  // event'lerini dinlemek istediğimiz elementler
  inputData: any;
  numPad: any;
  resultButton: any;
  clearAllButton: any;
  // subscription, unsubscribe ederken kullanılacak
  calcSubscription: Subscription;

  // constructor'da store inject ediyoruz
  constructor(private store: Store<CalcState>) { }

  // eventlistener'ları ata
  eventlistener() {
    this.numPad.addEventListener('click', this.getVal);
    this.resultButton.addEventListener('click', this.evaluate);
    this.clearAllButton.addEventListener('click', this.clear);
  }
  // state güncellendiğinde çalışır
  render = (data) => {
    this.inputData.value = data.data.Memory;
  }
  // onInit lifecycle fonksiyonu
  ngOnInit() {
    // kullanacağımız html elementlerini seç
    this.inputData = document.getElementById('inputData');
    this.numPad = document.getElementById('numPad');
    this.resultButton = document.getElementById('resultButton');
    this.clearAllButton = document.getElementById('clearAllButton');
    // bu elementlere event listener'larını ekle
    this.eventlistener();
    // store'a subscribe ol
    this.calcSubscription = this.store.subscribe(this.render);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // component yok olurken unsubscribe olmayı unutma
    // resource'ların release edilmesi için kullanılır
    this.calcSubscription.unsubscribe();
  }

  // hesap makinesinin butonlarına tıklandığında çalışır
  getVal = (e) => {
    const valueOfButton = e.target.textContent;
    // eğer tıklanan buton 1-9 arası bir rakam ise veya
    // +-*/ gibi bir operatör ise 
    if (e.target.className === 'btn btn-primary') {
      // AppendOperandAction action'ını tetikle
      this.store.dispatch(CalcActions.AppendOperandAction({ payload: valueOfButton }));
    } else {
      return '';
    }
  }

  // eşittir butonuna tıklandığında çalışır
  evaluate = (e) => {
    // store'un son değerini al
    const stateValue: CalcState = this.getState(this.store);
    // ResultAction action'ını tetikle
    this.store.dispatch(CalcActions.ResultAction( { payload: stateValue.Memory } ));
  }

  // temizle butonuna tıklandığında çalışır
  clear = () => {
    // ClearAction'ı tetikle
    this.store.dispatch(CalcActions.ClearAction());
  }

  // state'in son değerini almak için kullanılan yardımcı fonksiyon
  getState(store: Store<CalcState>): CalcState {
    let state: CalcState;
    store.subscribe(s => state = s);
    return state;
  }
}
