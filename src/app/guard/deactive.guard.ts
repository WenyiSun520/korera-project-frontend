import { CanDeactivateFn } from '@angular/router';
import { ProjectComponent } from '../project/project.component';
import { ProjectTableComponent } from '../project/project-table/project-table.component';
import { JoinedTableComponent } from '../project/joined-table.component';

export const deactiveGuard: CanDeactivateFn<JoinedTableComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
 
  if (component && component?.projectService.getSelectedResource().length !== 0) {
    const confirmation = confirm('You have unsubmitted resource. Discard?');
    if (confirmation) {
      component?.projectService.resetSelectedResource();
      return true;
    } else {
      return false;
    }
  }
  return true;
};
