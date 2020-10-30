/*
--------------------------------------------------------------------
© 2020 ce-itcr All Rights Reserved
--------------------------------------------------------------------
Name   : STRAVIATEC_DB
Version: 1.0
--------------------------------------------------------------------
*/

-- DATABASE TABLES
USE STRAVIATEC_DB;
go

/*	FirstName varchar(20),
	LastName varchar(20),
	FullName varchar(40),
	BirthDate varchar(20),
	CurrentAge int,
	Nacionality varchar(20),
	Username varchar(20),
	Password varchar(20),
	PRIMARY KEY (FullName)*/

INSERT INTO ATHLETE(
	FirstName,
	LastName,
	FullName,
	BirthDate,
	CurrentAge,
	Nacionality,
	Username,
	Password)
VALUES
	('Angelo', 'Ortiz', 'Angelo Ortiz', '28/08/1998', 22, 'Costarricense', 'angelortizv', 'angelortizv_athlete')
