import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../app.component.css']
})

export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(username, password){
      alert(username);
  }

}
