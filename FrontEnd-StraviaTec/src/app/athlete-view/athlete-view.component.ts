import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.css']
})
export class AthleteViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var following = 232;
    var followers = 555;
    var activities = 244;

    //var htmlFollowings = document.getElementById("htmlFollowing");
    //htmlFollowings.innerHTML = following.toString();
    //var htmlFollowers = document.getElementById("htmlFollowers");
    //htmlFollowers.innerHTML = followers.toString();
    //var htmlActivities = document.getElementById("htmlActivities");
    //htmlActivities.innerHTML = activities.toString();
  }

  userName = "its... JONITHOOOOO"
  following = 232;
  followers = 555;
  activities = 244;

}
