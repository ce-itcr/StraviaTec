import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affiliation-management',
  templateUrl: './affiliation-management.component.html',
  styleUrls: ['./affiliation-management.component.css']
})
export class AffiliationManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  actual = "/affiliation-management";
}
