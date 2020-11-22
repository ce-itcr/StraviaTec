import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'race-management.component.html'
})

export class RaceManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService, private router: Router) {}

  ngOnInit(): void{
    //SE POPULA LA TABLA DE CARRERAS CON LOS DATOS DE LAS CARRERAS QUE PERTENECEN AL ORGANIZADOR
    this.CS.getOrgRaces(localStorage.getItem('current_username')).subscribe(res => {

      var cont = 1;
      this.race_management_table_content = [];

      while(cont < res["size"]){

        var race = "race" + cont.toString();
        var data = [];

        data.push(res[race]["race_id"]);
        data.push(res[race]["race_name"]); 
        data.push(res[race]["race_date"].slice(0,10)); 
        data.push(res[race]["route"]); 
        data.push(res[race]["race_type"]);
        data.push(res[race]["visibility"]);
        data.push(res[race]["race_cost"]); 
        
        data.push(this.getData(res[race]["bAccounts"], "account", "bank_account"));
        data.push(this.getData(res[race]["categories"], "category", "cat_name"));
        data.push(this.getData(res[race]["sponsors"], "sponsor", "comp_name"));

        this.race_management_table_content.push(data);
        cont++;
      }
    }, error=>{
      alert("ERROR");
    });
  }

  race_management_table_titles = [
    ["id", "Nombre","Fecha","Recorrido","Tipo de Actividad","Privacidad","Costo","Cuentas Bancarias","Categorías Disponibles","Patrocinadores"]
  ]

  race_management_table_content = [];

  //FUNCIÓN AUXILIAR PARA OBTENER EL NOMBRE DE TODOS LOS PATROCINADORES
  //obj: JSON AL QUE SE LE EXTRAERÁN DATOS
  //type: KEY A CONCATENAR CON EL CONTADOR
  //key: KEY DEL DATO A EXTRAER
  public getData(obj, type, key){
        var cont = 1;
        var data = "";
        while(cont < obj["size"]){
          var dataType = type + cont.toString();
          if(cont+1<obj["size"]){
            data = data + obj[dataType][key] + ", ";
          }else{
            data += obj[dataType][key];
          }
          cont++;
        }
        return data;
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA CREAR CARRERA
  createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    this.CS.createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners).subscribe( res => {
      this.ngOnInit();
    }
    );
  }

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ACTUALIZAR CARRERA
  updateRace(race_id ,race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    this.CS.updateRace(race_id, race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners).subscribe(res => {
      //SE GENERAN REPORTES
      this.CS.createReports().subscribe(res => {
        this.ngOnInit();
      });
    });
  }

  //ENVÍO DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ELIMINAR CARRERA
  deleteRace(race_id){
    this.CS.deleteRace(race_id).subscribe(res => {
      //SE GENERAN REPORTES
      this.CS.createReports().subscribe(res => {
        this.ngOnInit();
      });
    });
  }

}
