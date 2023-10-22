import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/resource/resource-service/resource.service';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/project/project-service/project.service';
import { FormulaService } from '../formula-service/formula.service';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
})
export class FormulaComponent {
  toggleFormulsinput: string = '';
  formulaValueInput:string = '';
  currentProject: any;
  currentProjectName: string = '';
  resourceList: any = [];
  formulaMap: any = [];

  constructor(
    private location: Location,
    private activedRouter: ActivatedRoute,
    private resourceService: ResourceService,
    private formulaService: FormulaService
  ) {}

  ngOnInit() {
    this.activedRouter.params.subscribe((param) => {
      this.currentProjectName = param['projectName'];
      // console.log('currentProjectName', this.currentProjectName);
      this.resourceService
        .getResourcesByProjectName(this.currentProjectName)
        .subscribe({
          next: (data) => {
            this.resourceList = data;
          },
          error: (Err) => console.log(Err),
        });

      this.formulaService
        .getFormulaByProjectName(this.currentProjectName)
        .subscribe({
          next: (data) => {
            this.formulaMap = data;
          },
          error: (Err) => console.log(Err),
          complete: () => console.log(this.formulaMap),
        });
    });
  }
  handleOpenEditFormulaBox(formulaId: number, resourceID:number) {
    this.toggleFormulsinput = ""+formulaId;
    // this.toggleFormulsinput = '';
    console.log(resourceID);
    console.log(this.toggleFormulsinput == ""+formulaId);
  }
  cancelFormulaInput() {
    // console.log('cancel');
    this.toggleFormulsinput = '';
  }
  submitFieldValue(formulaId:number){
    if(this.formulaValueInput !== ""){
    this.formulaService.updateFieldValue(formulaId, this.formulaValueInput);
    }
    this.toggleFormulsinput = '';

  }
  goBack() {
    this.location.back();
  }
}
