import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-race-management',
  templateUrl: './race-management.component.html',
  styleUrls: ['./race-management.component.css']
})

export class RaceManagementComponent implements OnInit {

  constructor(private router: Router, private modal:NgbModal) { }

  ngOnInit(): void {
  }

  actual = "/race-management";

  //VENTANA EMERGENTE (pop-up)
  openModal(content){
    alert("asdsadasdsa");
    this.modal.open(content,{size:'sm', centered:true});
  }


}
