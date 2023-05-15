import { Component, HostListener, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SpreadsheetService } from './spreadsheet.service';
import { Data } from './data';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spreadsheet',
  templateUrl: './spreadsheet.component.html',
})
export class SpreadsheetComponent {
  displayedColumns: string[] = [
    'Position',
    'Id',
    'Application name',
    'Email',
    'File name',
    'Url',
    'Inception',
    'Amount',
    'Allocation',
    'Remove',
  ];

  subscription: Subscription;
  myData = this.spreadsheetService.getData();
  dataSource = [...this.myData];
  maxDate = new Date();

  id = new FormControl('');

  constructor(private spreadsheetService: SpreadsheetService) {
    let date = new Date();
    let today = date.setDate(date.getDate() - 1);
    this.maxDate = new Date(today);
  }

  @ViewChild(MatTable) table: MatTable<Data>;

  ngOnInit() {
    this.dataSource = this.spreadsheetService.sortData();
    this.spreadsheetService.addEmptyData(30);
    this.subscription = this.spreadsheetService.dataChanged.subscribe(
      (data: Data[]) => {
        this.dataSource = data;
      }
    );
  }

  addData() {
    let freePos = this.spreadsheetService.findNextPosition();

    let newData = {
      position: freePos,
      id: '',
      applicationName: '',
      email: '',
      inception: new Date(),
      amount: {
        value: 0,
        currency: '$',
      },
      allocation: 0,
    };
    this.spreadsheetService.addData(newData);
    this.dataSource = this.spreadsheetService.sortData();

    this.table.renderRows();
    console.log(this.dataSource);
  }

  removeData(position: number) {
    this.spreadsheetService.removeData(position);
    this.dataSource = this.spreadsheetService.sortData();
    this.table.renderRows();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.spreadsheetService.addEmptyData(5);
  }
}
