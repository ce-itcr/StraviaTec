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
    URL: string, 
    km: string
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    athleteActivity = new BehaviorSubject([]);

    constructor(private platform: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient){
        this.platform.ready().then(()=> {
            this.sqlite.create({
                name: 'StraviaTEC.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                this.database = db;
                this.seedDatabase();
            })
        })
    }

    seedDatabase(){
        
    }

    getDatabaseState(){
        return this.dbReady.asObservable();
    }

}