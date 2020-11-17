import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

   // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO
   public verifyUser(username: string, password: string){
    return this.http.post<JSON>("api/login", {"username": username, "password": password});
   }

  //GET ACTIVITIES LIST
  public getActivities(username){
    return this.http.post<JSON>("api/athlete/activity",{'username':username});
  }

  //GET FRIENDS ACTIVITIES LIST
  public getFriendsActivities(username){
   return this.http.post<JSON>("api/athlete/follows",{'username':username});
 }

  //GET ORGANIZER RACES
  public getOrgRaces(username){
  return this.http.post<JSON>("api/athlete/follows",{'username':username});
  }

  //GET ORGANIZER CHALLENGES
  public getOrgChallenges(username){
    return this.http.post<JSON>("api/athlete/follows",{'username':username});
    }

  //GET MY  RACES
  public getMyRaces(username){
    return this.http.post<JSON>("api/athlete/raceandchallenge",{'username':username});
  }

  //SEND REGISTER DATA
  public sendRegisterData(fname, lname, nationality, bDate, age, user, pass, athlete, url){
   return this.http.post<JSON>("api/Register",{
     "fName":fname,
     "lName":lname,
     "nationality":nationality,
     "bDate":bDate,
     "age":age,
     "username":user,
     "password":pass,
     "userType":athlete,
     "url_img":url
      });
   }

   //SEND REGISTER DATA
  public sendDataToUpdate(fname, lname, nationality, bDate, age, user, pass, url){
    return this.http.post<JSON>("api/athlete/update",
    {
      "username":user,
      "f_name":fname,
      "l_name":lname,
      "b_date":bDate,
      "nationality":nationality,
      "age":age,
      "u_password":pass,
      "prof_img":url
    }
       );
    }

//SEND REGISTER DATA
  public sendNewActivity(username, s_time,duration,a_type,date,URL, km){
    return this.http.post<JSON>("api/athlete/createactivity",{
    "username":username,
    "s_time":s_time,
    "duration":duration,
    "a_type":a_type,
    "date":date,
    "URL":URL,
    "km":km
    });
  }

//"name", "type", "cost", "date", "route", "visibility"
 //CREATE RACE
 public createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners, current_username){
  return this.http.post<JSON>("api/organizer/createrace",
                             {"name": race_name, "date": race_date, "route": race_path,"type": activity_type,
                              "visibility": privacity, "cost": race_cost,"bank_account":bank_account,"race_category": race_category, "race_partners": race_partners, "username": current_username}).subscribe(res => {
                                alert("Carrera creada exitosamente");
                              }, error =>{
                                alert("Se produjo un error al crear una carrera en la base de datos. Intente más tarde.");
                              })
}

//UPDATE RACE
public updateRace(race_id ,race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
  return this.http.post<JSON>("api/organizer/update/race",
                             {"race_id":race_id, "race_name": race_name, "race_date": race_date, "race_path": race_path,"activity_type": activity_type,
                              "privacity": privacity, "race_cost": race_cost,"bank_account":bank_account,"race_category": race_category, "race_partners": race_partners}).subscribe(res => {
                                alert("Carrera actualizada exitosamente");
                              }, error =>{
                                alert("Se produjo un error al actualizar la carrera en la base de datos. Intente más tarde.");
                              })
}

//DELETE RACE
public deleteRace(race_id){
  return this.http.post<JSON>("api/organizer/delete/race",
                            {"race_id": race_id}).subscribe(res => {
                              alert("Carrera eliminada exitosamente");
                            }, error =>{
                              alert("Se produjo un error al eliminar la carrera en la base de datos. Intente más tarde.");
                            })
}


//CREATE CHALLENGE
public createChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
  return this.http.post<JSON>("api/organizer/create/challenge",
                             {"challenge_name": challenge_name, "challenge_period": challenge_period, "activity_type": activity_type,"challenge_mode": challenge_mode,
                              "privacity": privacity, "challenge_partners": challenge_partners}).subscribe(res => {
                                alert("Reto creado exitosamente");
                              }, error =>{
                                alert("Se produjo un error al crear un reto en la base de datos. Intente más tarde.");
                              })
}

//UPDATE CHALLENGE
updateChallenge(challenge_id ,challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
  return this.http.post<JSON>("api/organizer/update/challenge",
                             {"challenge_id":challenge_id, "challenge_name": challenge_name, "challenge_period": challenge_period, "activity_type": activity_type,"challenge_mode": challenge_mode,
                              "privacity": privacity, "challenge_partners": challenge_partners}).subscribe(res => {
                                alert("Reto actualizado exitosamente");
                              }, error =>{
                                alert("Se produjo un error al actualizar un reto en la base de datos. Intente más tarde.");
                              })
}

//DELETE RACE
public deleteChallenge(challenge_id){
  return this.http.post<JSON>("api/organizer/delete/challenge",
                             {"challenge_id": challenge_id}).subscribe(res => {
                                alert("Reto eliminado exitosamente");
                              }, error =>{
                                alert("Se produjo un error al eliminar un reto en la base de datos. Intente más tarde.");
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

//AÑADE UN USUARIO A LA LISTA DE MIS AMIGOS
addFriend(current_username, athlete_username){
  return this.http.post<JSON>("api/athlete/add/friend",
                              {"current_username": current_username, "athlete_username": athlete_username}).subscribe(res => {
                                alert("Se añadió a su lista de amigos exitosamente");
                              }, error =>{
                                alert("Se produjo un error al añadir a su lista de amigos. Intente más tarde.");
                              })
}

}
