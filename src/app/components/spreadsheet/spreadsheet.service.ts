import { Injectable } from '@angular/core';
import { Data } from './data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpreadsheetService {
  constructor() {}

  dataChanged = new Subject<Data[]>();

  spreadSheetData: Data[] = [
    {
      position: 2,
      id: '222',
      applicationName: 'My app',
      email: 'myapp@gmail.com',
      inception: new Date(),
      amount: {
        value: 100,
        currency: '$',
      },
      allocation: 2,
    },
    {
      position: 1,
      id: '111',
      applicationName: 'My app',
      email: 'myapp@gmail.com',
      inception: new Date(),
      amount: {
        value: 100,
        currency: '$',
      },
      allocation: 2,
    },
  ];

  addEmptyData(newDataInsert: number) {
    for (let i = 0; i < newDataInsert; i++) {
      this.spreadSheetData.push({
        position: this.findNextPosition(),
        id: '',
        applicationName: '',
        email: '',
        inception: new Date(),
        amount: {
          value: 0,
          currency: '$',
        },
        allocation: 0,
      });
      this.dataChanged.next(this.spreadSheetData.slice());
    }
  }

  addData(data: Data) {
    this.spreadSheetData.push(data);
    this.dataChanged.next(this.spreadSheetData.slice());
  }

  removeData(position: number) {
    this.spreadSheetData = this.spreadSheetData.filter(
      (item) => item.position !== position
    );
    this.dataChanged.next(this.spreadSheetData.slice());
  }

  sortData() {
    return this.spreadSheetData.sort((a, b) => {
      return a.position - b.position;
    });
  }

  /* Find 1st free position number*/
  findNextPosition() {
    let freePos = 1;
    let data = this.sortData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].position !== i + 1) {
        freePos = i + 1;
        break;
      } else {
        freePos = data.length + 1;
      }
    }

    return freePos;
  }

  getData() {
    return this.spreadSheetData;
  }
}
