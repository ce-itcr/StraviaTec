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

  //CREAR UNA NUEVA SOLICITUD DE INSCRIPCIÓN A CARRERA
  signupRace(race_name,race_date, file_route, athlete_username){
    return this.http.post<JSON>("api/athlete/create/enrollment",
                                {"race_name": race_name, "race_date": race_date,"file_route":file_route,"athlete_name":athlete_username}).subscribe(res => {
                                  alert("Solicitud de inscripción creada exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al crear su solicitud de inscripción a la carrera. Intente más tarde.");
                                })

  }

  //ACEPTA UNA SOLICITUD DE INSCRIPCIÓN A CARRERA
  acceptRaceEnrollment(race_name, athlete_username){
    return this.http.post<JSON>("api/organizer/accept/race/enrollment",
                                {"race_name": race_name, "athlete_username": athlete_username}).subscribe(res => {
                                  alert("Aceptación de solicitud de inscripción actualiada exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al aceptar solicitud de inscripción a la carrera. Intente más tarde.");
                                })
  }

  //DENEGA UNA SOLICITUD DE INSCRIPCIÓN A CARRERA
  denyRaceEnrollment(race_name, athlete_username){
    return this.http.post<JSON>("api/organizer/deny/race/enrollment",
                                {"race_name": race_name, "athlete_username": athlete_username}).subscribe(res => {
                                  alert("Denegación de solicitud de inscripción actualiada exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al denegar solicitud de inscripción a la carrera. Intente más tarde.");
                                })
  }

  //ACTUALIZA DATOS DE UN USUARIO DE TIPO DEPORTISTA
  updateUserData(fname, lname, birth_date, nacionality, file, username, password){
    return this.http.post<JSON>("api/athlete/update/user",
                                {"fname": fname, "lname": lname,"birth_date":birth_date,"nacionality":nacionality,"file":file,"username":username,"password":password}).subscribe(res => {
                                  alert("Actualización de datos de usuario realizad exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al actualizar datos de usuario. Intente más tarde.");
                                })
  }

  //CREAR UNA NUEVA SOLICITUD DE INSCRIPCIÓN A GRUPO
  signupGroup(group_name, username){
    return this.http.post<JSON>("api/athlete/join/group",
                                {"group_name": group_name, "username": username}).subscribe(res => {
                                  alert("Se le añadió exitosamente al grupo exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al unirse al grupo. Intente más tarde.");
                                })
  }

  //ACEPTA UNA SOLICITUD DE INSCRIPCIÓN A GRUPO
  acceptGroupEnrollment(group_name, athlete_username){
    return this.http.post<JSON>("api/organizer/accept/group/enrollment",
                                {"group_name": group_name, "athlete_username": athlete_username}).subscribe(res => {
                                  alert("Aceptación de solicitud a grupo actualiada exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al denegar solicitud de inscripción al grupo. Intente más tarde.");
                                })
  }

  //DENEGA UNA SOLICITUD DE INSCRIPCIÓN A GRUPO
  denyGroupEnrollment(group_name, athlete_username){
    return this.http.post<JSON>("api/organizer/deny/group/enrollment",
                                {"group_name": group_name, "athlete_username": athlete_username}).subscribe(res => {
                                  alert("Denegación de solicitud a grupo actualiada exitosamente");
                                }, error =>{
                                  alert("Se produjo un error al denegar solicitud de inscripción al grupo. Intente más tarde.");
                                })
  }
}
