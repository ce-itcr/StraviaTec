/*
--------------------------------------------------------------------
© 2020 ce-itcr All Rights Reserved
--------------------------------------------------------------------
Name   : STRAVIATEC_DB
Version: 1.0
--------------------------------------------------------------------
*/

-- SQL DATABASE
CREATE DATABASE STRAVIATEC_DB;
GO

-- DATABASE TABLES
USE STRAVIATEC_DB;
go


CREATE TABLE ATHLETE(
	FirstName varchar(20),
	LastName varchar(20),
	FullName varchar(40),
	BirthDate varchar(20),
	CurrentAge int,
	Nacionality varchar(20),
	Username varchar(20),
	Password varchar(20),
	PRIMARY KEY (FullName)
);

CREATE TABLE ATHLETEACTIVITY(
	AthleteName varchar(40) FOREIGN KEY REFERENCES ATHLETE(FullName),
	ActivityCode int,
	ActivityDate varchar(20),
	StartTime int,
	EndingTime int,
	Duration int,
	ActivityType varchar(20),
	Mileage int, 
	ActivityPath varchar(100),
	Completeness int,
	PRIMARY KEY (ActivityCode)
);