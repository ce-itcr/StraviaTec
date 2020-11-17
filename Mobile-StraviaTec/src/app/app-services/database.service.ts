import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Time } from '@angular/common';

//username, s_time, duration, a_type, date, URL, km
export interface AthleteActivity{
    username: string,
    s_time: Time,
    duration: Time,
    a_type: string, 
    date: Date, 
    URL_path: string, 
    km: string
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    athleteActivity = new BehaviorSubject([]);

    constructor(private platform: Platform, private sqlite: SQLite){
        this.platform.ready().then(()=> {
            this.sqlite.create({
                name: 'StraviaTEC.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                this.database = db;
            })
        })
    }

    getDatabaseState(){
        return this.dbReady.asObservable();
    }

    getAthleteActivity(): Observable<AthleteActivity[]> {
        return this.athleteActivity.asObservable();
    }

    loadAthleteActivity(username: string){
        return this.database.executeSql('SELECT * FROM ATHLETE_ACTIVITY WHERE username =?', [username]).then(data => {
            let dr: AthleteActivity[] = [];

            if(data.rows.length > 0){
                for(var i=0; i<data.rows.length; i++){
                    
                    dr.push({
                        username: data.rows.item(i).username,
                        s_time: data.rows.item(i).s_time,
                        duration: data.rows.item(i).duration,
                        a_type: data.rows.item(i).a_type,
                        date: data.rows.item(i).date,
                        URL_path: data.rows.item(i).URL_path,
                        km: data.rows.item(i).km,
                    });
                }
            }
            this.athleteActivity.next(dr);
        });
    }

    //username, s_time, duration, a_type, date, URL, km
    addAthleteActivity(username, s_time, duration, a_type, date, URL_path, km){
        let data = [username, s_time, duration, a_type, date, URL_path, km];
        return this.database.executeSql('INSERT INTO ATHLETE_ACTIVITY (username, s_time, duration, a_type, date, URL_path, km) VALUES (?,?,?,?,?,?)', data).then(data => {
            this.loadAthleteActivity(username);
        });
    }

    deleteAthleteActivity(username, a_type, date){
        return this.database.executeSql('DELETE FROM ATHLETE_ACTIVITY WHERE username =? AND a_type =? AND date =?', [username, a_type, date]).then(_ => {
            this.loadAthleteActivity(username);
        });
    }

}