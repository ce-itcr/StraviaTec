import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.css']
})
export class AthleteViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  userImage = "../../assets/img/jonitho.jpg";
  userName = "JONITHO";
  following = 232;
  followers = 555;
  activities = 244;
  actual = "/athlete-view"

  public searchAthlete(athleteName){
    alert(athleteName);
    this.router.navigateByUrl("/athlete-search");
  }

}
