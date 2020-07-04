import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { mySignature } from 'src/utils/commonUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'av-recipe-book';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
    mySignature();
  }
}
