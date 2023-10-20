import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaComponent } from './formula/formula.component';



@NgModule({
  declarations: [
    FormulaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[FormulaComponent]
})
export class FormulaModule { }
