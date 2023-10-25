import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {
  isSubmit: boolean = false;
  constructor(
    private location: Location,
  ) {}

  goBack() {
    this.location.back();
  }
  submit() {
    this.isSubmit = true;

  
  }
}


