import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { ProjectService } from 'src/app/project/project-service/project.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username: string = 'Jone Done';
  toggleMenu: boolean = false;
  currentProject: any;
  isLoggedIn: Observable<boolean>;

  constructor(
    private projectService: ProjectService,
    private activeRouter: ActivatedRoute,
    private authService: AuthService
  ) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((param) => console.log(param['id']));
  }

  toggleMenuOpen() {
    this.toggleMenu = true;
  }

  toggleMenuClosed() {
    this.toggleMenu = false;
  }
}
