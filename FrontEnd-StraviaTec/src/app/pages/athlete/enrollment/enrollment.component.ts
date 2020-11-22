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

  //SE POPULAN LAS TABLAS DE LA INTERFAZ CON LAS CARRERAS, RETOS Y GRUPOS DISPONIBLES
  ngOnInit(): void{

    this.races_table_content = [];
    this.challenges_table_content = [];
    this.groups_table_content = [];
    
    this.CS.getRaces().subscribe(res => {
      this.races_table_content = [];
      var cont = 1;
      while(cont < res["size"]){
        var data = [];
        var race = "race" + cont.toString();
        data.push(res[race]["race_id"]);
        data.push(res[race]["race_name"]);
        data.push(res[race]["race_type"]);
        data.push(res[race]["race_cost"]);
        data.push(res[race]["route"]);
        data.push(res[race]["visibility"]);
        this.races_table_content.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });

    this.CS.getChallenges().subscribe(res => {
      this.challenges_table_content = [];
      var cont = 1;
      while(cont < res["size"]){
        var data = [];
        var challenge = "cha" + cont.toString();
        data.push(res[challenge]["cha_id"]);
        data.push(res[challenge]["cha_name"]);
        data.push(res[challenge]["t_period"].slice(0,10));
        data.push(res[challenge]["cha_type"]);
        data.push(res[challenge]["visibility"]);
        this.challenges_table_content.push(data);
        cont++;
      }
      
    }, error => {
      alert("ERROR");
    });

    this.CS.getGroups().subscribe(res => {
      var cont = 1;
      this.groups_table_content = [];
      while(cont < res["size"]){

        var data = [];
        var group = "group" + cont.toString();

        data.push(res[group]["group_id"]);
        data.push(res[group]["group_name"]);
        data.push(res[group]["group_admin"]);
        var cont2 = 1;
        var desc = "";
        while(cont2 < res[group]["athletes"]["size"]){
          var athlete = "athlete" + cont2.toString();
          desc += res[group]["athletes"][athlete]["username"];
          if(cont2+1 < res[group]["athletes"]["size"]){
            desc += ", ";
          }
          cont2++;
        }

        data.push(desc);

        this.groups_table_content.push(data);
        cont++;

      }
    }, error => {
      alert("ERROR");
    });
  }

  races_table_titles = [
    ["id","Nombre de la Carrera","Fecha de la Carrera","Tipo de Actividad","Privacidad","Costo de la Carrera","Cuenta Bancaria", "Categoría","Lista de Patrocinadores"]
  ]

  races_table_content = [];

  challenges_table_titles = [
    ["id",	"Nombre",	"Periodo Disponible",	"Tipo de Actividad",	"Modo",	"Privacidad",	"Patrocinadores"]
  ]

  challenges_table_content = [];

  groups_table_titles = [
    ["id",	"Nombre del Grupo", "Administrador",	"Deportistas"]
  ]

  groups_table_content = []

  public imagePath;
  imgURL: any;
  public message: string;

  //SE PEGAN LOS ÍCONOS
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
  signupRace(id, file_route){
    var newRoute = "../../../../assets/img/faces/" + file_route.slice(12);
    this.CS.signupRace(id, newRoute).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  //ENVÍO DE DATOS DE INSCRIPCIÓN DE RETO A "COMMUNICATION SERVICE"
  signupChallenge(id){
    this.CS.signupChallenge(id).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  //ENVÍO DE DATOS DE INSCRIPCIÓN DE GRUPO A "COMMUNICATION SERVICE"
  signupGroup(group_id){
    this.CS.signupGroup(group_id).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

}
