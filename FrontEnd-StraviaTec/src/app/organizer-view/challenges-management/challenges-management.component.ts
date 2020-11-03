import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-challenges-management',
  templateUrl: './challenges-management.component.html',
  styleUrls: ['./challenges-management.component.css']
})
export class ChallengesManagementComponent implements OnInit {

  constructor(private router: Router, private modal:NgbModal) { }

  ngOnInit(): void {
  }

  actual = "/challenges-management";

}
