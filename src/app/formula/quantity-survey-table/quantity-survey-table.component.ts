import { Component } from '@angular/core';
import { FormulaService } from '../formula-service/formula.service';

@Component({
  selector: 'app-quantity-survey-table',
  templateUrl: './quantity-survey-table.component.html',
  styleUrls: ['./quantity-survey-table.component.css'],
})
export class QuantitySurveyTableComponent {
  enumType: any = [];
  selectOption: any = '';
  formulaList: any;

  constructor(private formulaService: FormulaService) {
    this.formulaList = this.formulaService.getFormulaList();
    console.log(this.formulaList);
  }

  ngOnInit(): void {
    this.formulaService.getEnumType().subscribe({
      next: (data) => (this.enumType = data),
      error: (err) => console.log('error when fetching enumtype', err),
      // complete: () => console.log(this.enumType),
    });
  }

  addFormula() {
    let obj = {
      field: '',
      type: '',
      formula: null,
    };
    this.formulaList.push(obj);
  }
  deleteFormula(index:number){
    this.formulaService.removeFormulaToList(index);
  }
}
