import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormulaService } from '../formula-service/formula.service';
import { Location } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-quantity-survey-table',
  templateUrl: './quantity-survey-table.component.html',
  styleUrls: ['./quantity-survey-table.component.css'],
})
export class QuantitySurveyTableComponent implements OnChanges {
  @Input() isSubmit: boolean = false;
  formulaList: any = new FormArray([]);
  enumType: any = [];

  constructor(
    private formulaService: FormulaService,
    private location: Location
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isSubmit'] &&
      changes['isSubmit'].currentValue === true &&
      this.formulaList.length !== 0
    ) {
      if (this.formulaList.status === "VALID") {
      console.log("it's time to submit");
      this.formulaService.addFormulaToList(this.formulaList.value);
      this.formulaList.clear();
      this.goBack();
      } else {
        alert("Can't Submit your reqeustYou have unfinished formula input");
      }
    }
  }
  ngOnInit(): void {
    this.formulaService.getEnumType().subscribe({
      next: (data) => (this.enumType = data),
      error: (err) => console.log('error when fetching enumtype', err),
      // complete: () => console.log(this.enumType),
    });
  }

  addFormula() {
    const group = new FormGroup({
      fieldName: new FormControl('', [Validators.required]),
      fieldType: new FormControl('', [Validators.required]),
      fieldValue: new FormControl(''),
    });
    console.log(this.formulaList.controls);
    this.formulaList.push(group);
  }

  deleteFormula(index: number) {
    this.formulaList.removeAt(index);
  }
  goBack() {
    this.location.back();
  }

  //discard for now,may use later
  // updateTypeList(){
  //   for(let i = 0; i<this.formulaList.controls.length;i++){
  //     let form = this.formulaList.controls[i];
  //    // console.log(form)
  //     if(form.value.fieldType == "NUMBER"){
  //       this.formulaTypeList.push(form.value.fieldName)
  //     }
  //   }
  // }
}
