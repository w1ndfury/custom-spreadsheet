import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpreadsheetComponent } from './components/spreadsheet/spreadsheet.component';

const routes: Routes = [{ path: '', component: SpreadsheetComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
