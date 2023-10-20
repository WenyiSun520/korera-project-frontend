import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaComponent } from './formula/formula.component';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FormulaComponent, TemplateComponent],
  imports: [CommonModule, RouterModule],
  exports: [FormulaComponent],
})
export class FormulaModule {}
