import { Component, Input, SimpleChanges } from '@angular/core';
import { ProjectService } from 'src/app/project/project-service/project.service';
import { FormulaService } from '../formula-service/formula.service';

@Component({
  selector: 'app-scopefield-table',
  templateUrl: './scopefield-table.component.html',
  styleUrls: ['./scopefield-table.component.css'],
})
export class ScopefieldTableComponent {
  @Input() isSubmit: boolean = false;
  currentProject: any;
  currentProjectName: string = '';
  formulaTypeList: any = [];

  constructor(
    private projectService: ProjectService,
    private formulaService: FormulaService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes['isSubmit'] && changes['isSubmit'].currentValue === true) {
      // if (this.formulaList.isValid) {
      // console.log("it's time to submit scope type check");
      let selectedType = this.formulaTypeList.filter((type:any)=>type.ischecked === true).map((type:any)=> type.type)
   this.formulaService.addFilterType(selectedType)
      console.log('selectedType: ', selectedType);
      // } else {
      //   alert('You have unfinished formula input');
      // }
    }
  }

  ngOnInit() {
    if (this.projectService.getCurrentProject()) {
      let filterType = this.formulaService.filteredType;
      this.formulaTypeList = this.formulaService
        .getFormulaTypeByProjectName(
          this.projectService.getCurrentProject().projectName
        )
        .subscribe({
          next: (data) => {
            this.formulaTypeList = data;
          },

          error: (err) => console.log('Error when fetcging formulaType ', err),
          complete: () => {
            let formattedTypeList: any = [];

            for (let i = 0; i < this.formulaTypeList.length; i++) {
            
              let obj = {
                type: this.formulaTypeList[i],
                ischecked: false,
              };
                if (filterType.includes(this.formulaTypeList[i])){
                  obj.ischecked = true;
                }
                  formattedTypeList.push(obj);
            }
            this.formulaTypeList.length = 0;
            this.formulaTypeList = formattedTypeList;
          },
        });
    }
  }
   selectCheckBox(index:number, event:any){
       this.formulaTypeList[index].ischecked = event.target.checked;
   }


}
