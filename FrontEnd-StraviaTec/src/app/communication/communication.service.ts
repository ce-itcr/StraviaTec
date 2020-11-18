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
    return this.http.post<JSON>("api/organizer/races",{'username':username});
  }

  //GET ORGANIZER GROUPS
  public getOrgGroups(username){
    return this.http.post<JSON>("api/organizer/groups",{'username':username});
  }

  //GET ORGANIZER CHALLENGES
  public getOrgChallenges(username){
    return this.http.post<JSON>("api/organizer/challenges",{'username':username});
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

 //CREATE RACE
 public createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
  return this.http.post<JSON>("api/organizer/createrace",
                             {"name": race_name, "date": race_date, "route": race_path,"type": activity_type,
                              "visibility": privacity, "cost": race_cost,"bank_account":bank_account,"race_category": race_category, "race_partners": race_partners, "username": localStorage.getItem("current_username")});
}

//UPDATE RACE
public updateRace(race_id ,race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category, race_partners){
  return this.http.post<JSON>("api/organizer/updaterace",
                             {"race_id":race_id, "race_name": race_name, "race_date": race_date, "route": race_path,"race_type": activity_type,
                              "visibility": privacity, "race_cost": race_cost,"bank_account":bank_account,"race_category": race_category, "race_partners": race_partners, "username":localStorage.getItem("current_username")});
}

//DELETE RACE
public deleteRace(race_id, ){
  return this.http.post<JSON>("api/organizer/deleterace",
                            {"id": race_id, "username":localStorage.getItem("current_username")});
}


//CREATE CHALLENGE
public createChallenge(challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
  return this.http.post<JSON>("api/organizer/createchallenge",
                             {"name": challenge_name, "period": challenge_period, "type": activity_type,"mode": challenge_mode,
                              "visibility": privacity, "challenge_partners": challenge_partners, "username":localStorage.getItem("current_username")});
}

//UPDATE CHALLENGE
updateChallenge(challenge_id ,challenge_name, challenge_period, activity_type, challenge_mode, privacity, challenge_partners){
  return this.http.post<JSON>("api/organizer/updatechallenge",
                             {"cha_id":challenge_id, "cha_name": challenge_name, "t_period": challenge_period, "cha_type": activity_type,"cha_mode": challenge_mode,
                              "visibility": privacity, "challenge_partners": challenge_partners, "username":localStorage.getItem("current_username")});
}

//DELETE CHALLENGE
public deleteChallenge(challenge_id){
  return this.http.post<JSON>("api/organizer/deletechallenge",
                             {"id": challenge_id, "username":localStorage.getItem("current_username")});
}


//CREATE GROUP
public createGroup(group_name, group_admin){
  return this.http.post<JSON>("api/organizer/creategroup",
                             {"group_name": group_name, "group_admin": group_admin, "username":localStorage.getItem("current_username")});
}

//UPDATE GROUP
public updateGroup(group_id, group_name, group_admin){
  return this.http.post<JSON>("api/organizer/updategroup",
                              {"group_id": group_id, "group_name": group_name, "group_admin": group_admin, "username":localStorage.getItem("current_username")});
}

//DELETE GROUP
public deleteGroup(group_id){
  return this.http.post<JSON>("api/organizer/deletegroup",
                              {"id": group_id, "username": localStorage.getItem("current_username")});
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
