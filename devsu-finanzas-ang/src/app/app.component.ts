import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Devsu Finanzas';

  constructor(
    private router: Router,
  ) {}

  onChangeContent(link: any) {
    this.router.navigate([link]);
  }
}
