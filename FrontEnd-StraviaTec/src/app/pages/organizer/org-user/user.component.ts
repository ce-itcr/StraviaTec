import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent{
  constructor(private router:Router){}

  ngOnInit(): void{
  }


  userImage = "../../assets/img/default-avatar.png";
  userFullName = "Usuario por Defecto";
  username = "defaultuser";
  groups = 1;


  logout(){
    this.router.navigateByUrl("/");
  }

}
