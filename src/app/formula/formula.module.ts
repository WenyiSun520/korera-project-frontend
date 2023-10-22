import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaComponent } from './formula/formula.component';
import { TemplateComponent } from './template/template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScopefieldTableComponent } from './scopefield-table/scopefield-table.component';
import { QuantitySurveyTableComponent } from './quantity-survey-table/quantity-survey-table.component';



@NgModule({
  declarations: [
    FormulaComponent,
    TemplateComponent,
    ScopefieldTableComponent,
    QuantitySurveyTableComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule,ReactiveFormsModule],
  exports: [FormulaComponent],
})
export class FormulaModule {}
