import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  //CREATE RACE
  public createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    return this.http.post<JSON>("api/organizer/create/race",
                               {"race_name": race_name, "race_date": race_date, "race_path": race_path,"activity_type": activity_type,
                                "privacity": privacity, "race_cost": race_cost,"bank_account":bank_account,"race_category": race_category, "race_partners": race_partners}).subscribe(res => {
                                  alert("Carrera creada exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al crear una carrera en la base de datos. Intente más tarde.");
                                })
  }

  //UPDATE RACE
  public updateRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
    return this.http.post<JSON>("api/organizer/update/race",
                               {"race_name": race_name, "race_date": race_date, "race_path": race_path,"activity_type": activity_type,
                                "privacity": privacity, "race_cost": race_cost,"bank_account":bank_account,"race_category": race_category, "race_partners": race_partners}).subscribe(res => {
                                  alert("Carrera actualizada exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al actualizar la carrera en la base de datos. Intente más tarde.");
                                })
  }

  //DELETE RACE
  public deleteRace(race_name, race_date){
    return this.http.post<JSON>("api/organizer/delete/race",
                              {"race_name": race_name, "race_date": race_date}).subscribe(res => {
                                alert("Carrera eliminada exitosamente");
                              }, error =>{
                                alert("Se produjo un error al eliminar la carrera en la base de datos. Intente más tarde.");
                              })
  }

  //CREATE GROUP
  public createGroup(group_name, group_admin){
    return this.http.post<JSON>("api/organizer/create/group",
                               {"group_name": group_name, "group_admin": group_admin}).subscribe(res => {
                                  alert("Grupo creado exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al crear un nuevo grupo en la base de datos. Intente más tarde.");
                                })
  }

  //UPDATE GROUP
  public updateGroup(group_name, group_admin){
    return this.http.post<JSON>("api/organizer/update/group",
                                {"group_name": group_name, "group_admin": group_admin}).subscribe(res => {
                                  alert("Grupo actualizado exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al actualizar el grupo en la base de datos. Intente más tarde.");
                                })
  }

  //DELETE GROUP
  public deleteGroup(group_name, group_admin){
    return this.http.post<JSON>("api/organizer/delete/group",
                                {"group_name": group_name, "group_admin": group_admin}).subscribe(res => {
                                  alert("Grupo eliminado exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al eliminar el grupo en la base de datos. Intente más tarde.");
                                })
  }

}
