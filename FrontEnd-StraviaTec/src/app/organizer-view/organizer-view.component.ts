import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer-view',
  templateUrl: './organizer-view.component.html',
  styleUrls: ['./organizer-view.component.css']
})
export class OrganizerViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  actual = "/organizer-view";

}
