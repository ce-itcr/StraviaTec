import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'enrollment-management-cmp',
    moduleId: module.id,
    templateUrl: 'enrollment-management.component.html'
})

export class EnrollmentManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  //SE POPULAN LAS TABLAS DE LAS INSCRIPCIONES SOLICITADAS
  ngOnInit(): void {
    this.races_table_content = [];
    this.CS.getOrgEnrollments(localStorage.getItem("current_username")).subscribe(res => {
      var cont = 1;
      while(cont < res["size"]){
        var data = [];
        var register = "register" + cont.toString();
        data.push(res[register]["race_id"]);
        data.push(res[register]["race_name"]);
        data.push(res[register]["race_date"].slice(0,10));
        data.push(res[register]["receipt"]);
        data.push(res[register]["a_username"]);
        this.races_table_content.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });
  }

  races_table_titles = [
    ["Id", "Nombre de la Carrera","Fecha de la Carrera", "Nombre de Usuario del Deportista", "Recibo de Inscripción"]
  ];

  races_table_content = [];

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVÍ0 DE DATOS DE ACEPTACIÓN DE INSCRIPCIÓN DE CARRERA A "COMMUNICATION SERVICE"
  acceptRaceEnrollment(race_id, athlete_username){
    this.CS.acceptRaceEnrollment(race_id, athlete_username).subscribe(res => {
      this.CS.createReports().subscribe(res => {
        this.ngOnInit();
      });
    }, error => {
      alert("ERROR");
    });
  }

  //ENVÍ0 DE DATOS DE DENEGACIÓN DE INSCRIPCIÓN DE CARRERA A "COMMUNICATION SERVICE"
  denyRaceEnrollment(race_id, athlete_username){
    this.CS.denyRaceEnrollment(race_id, athlete_username).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }
}
