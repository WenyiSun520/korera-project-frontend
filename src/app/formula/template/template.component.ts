import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormulaService } from '../formula-service/formula.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {
  constructor(private location: Location, private formularService:FormulaService) {}



  goBack() {
    this.location.back();
  }

  submitFormula(){
    console.log(this.formularService.getFormulaList())
  }
}


