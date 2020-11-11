import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'entollment-cmp',
    moduleId: module.id,
    templateUrl: 'enrollment.component.html'
})

export class EnrollmentComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}


  races_table_titles = [
    ["Nombre de la Carrera","Fecha de la Carrera","Tipo de Actividad","Privacidad","Costo de la Carrera","Cuenta Bancaria", "Categoría","Lista de Patrocinadores"],
  ]

  races_table_content = [
    ["Carrera La Candelaria", "24/12/2020","Atletismo","Público","5000 Colones exactos", "300000000000","Elite, Master A","StraviaTEC, NorthFace"],
    ["Vuelta al Lago", "24/12/2021","Ciclismo","Público","20000", "2134535567657","Junior,Elite, Master A","StraviaTEC, Red Bull"]
  ]

  groups_table_titles = [
    ["Nombre del Grupo", "Administrador"]
  ]

  groups_table_content = [
    ["Ciclistas del TEC", "johndoe"]
  ]

  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVÍO DE DATOS DE INSCRIPCIÓN DE CARRERA A "COMMUNICATION SERVICE"
  signupRace(race_name,race_date, file_route){
    localStorage.getItem("current_username");
    this.CS.signupRace(race_name,race_date, file_route, localStorage.getItem("current_username"));
  }

  //ENVÍO DE DATOS DE INSCRIPCIÓN DE GRUPO A "COMMUNICATION SERVICE"
  signupGroup(group_name){
    this.CS.signupGroup(group_name, localStorage.getItem("current_username"));
  }

}
