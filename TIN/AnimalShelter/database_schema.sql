
CREATE TABLE IF NOT EXISTS Dog (
    _id int UNSIGNED NOT NULL AUTO_INCREMENT,
    DogName varchar(15) NOT NULL,
    DateFrom date NOT NULL,
    Healthy varchar(10) NOT NULL,
    CONSTRAINT Dog_pk PRIMARY KEY (_id),
    UNIQUE INDEX dog_id_UNIQUE (_id ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS Visitor (
    _id int UNSIGNED NOT NULL AUTO_INCREMENT,
    Name varchar(15) NOT NULL,
    Surname varchar(15) NOT NULL,
    NumberOfVisits varchar(3),
    Email varchar(25) NOT NULL,
    Password varchar(100) NOT NULL,
    CONSTRAINT Visitor_pk PRIMARY KEY (_id),
    UNIQUE INDEX visitor_id_UNIQUE (_id ASC)
)ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS Contract (
    _id int UNSIGNED NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
    Obligations varchar(200) NOT NULL,
    Dog_id int UNSIGNED NOT NULL,
    Vis_id int UNSIGNED NOT NULL,
    CONSTRAINT Contract_pk PRIMARY KEY (_id),
    UNIQUE INDEX contract_id_UNIQUE (_id ASC),
    CONSTRAINT Dog_fk FOREIGN KEY (Dog_id) REFERENCES Dog(_id),
    CONSTRAINT Visitor_fk FOREIGN KEY (Vis_id) REFERENCES Visitor(_id)
)ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS Employee (
    _id int UNSIGNED NOT NULL AUTO_INCREMENT,
    EmpName varchar(15) NOT NULL,
    EmpSurname varchar(15) NOT NULL,
    DateEmp date NOT NULL,
    EmailEmp varchar(25) NOT NULL,
    PasswordEmp varchar(100) NOT NULL,
    CONSTRAINT Visitor_pk PRIMARY KEY (_id),
    UNIQUE INDEX visitor_id_UNIQUE (_id ASC)
)ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS Task (
    _id int UNSIGNED NOT NULL AUTO_INCREMENT,
    Status varchar(3),
    Descr varchar(200) NOT NULL,
    Dog_id int UNSIGNED NULL,
    Emp_id int UNSIGNED NOT NULL,
    CONSTRAINT Task_pk PRIMARY KEY (_id),
    UNIQUE INDEX task_id_UNIQUE (_id ASC),
    CONSTRAINT Dogg_fk FOREIGN KEY (Dog_id) REFERENCES Dog(_id),
    CONSTRAINT Employee_fk FOREIGN KEY (Emp_id) REFERENCES Employee(_id)
)ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT INTO `Visitor`(`Name`, `Surname`, `NumberOfVisits`, `Email`, `Password`) VALUES ('Eva','Tompson','10','etompson@gmail.com','$2a$08$AZY61D88av4kU/JQBz/1GuSzPJhHhgZUUrMG2o7LuupvG2hvp2Q7G');
INSERT INTO `Visitor`(`Name`, `Surname`, `NumberOfVisits`, `Email`, `Password`) VALUES ('Alex','Weiner','2','aweiner@gmail.com','$2a$08$MwEzYfcAy3.0eg4wy/N7VOVQ1n9Cmi5mCJZFyRNqVycjZ3TYPaJwm');

INSERT INTO `Employee`(`EmpName`, `EmpSurname`, `DateEmp`, `EmailEmp`, `PasswordEmp`) VALUES ('Admin','Admin','2020-12-07','admin@gmail.com','$2a$08$ehPKPoHNnNU./MfGPw.fo.W9kIlHueFsDQ1L9rx1DXD58f2pBkL..');
INSERT INTO `Employee`(`EmpName`, `EmpSurname`, `DateEmp`, `EmailEmp`, `PasswordEmp`) VALUES ('Olya','Monchuk','2022-12-07','omon@gmail.com','$2a$08$k.lect350VFqM06bz9dm7eky.nJVdwmwmwBwxKrd8g5ab2yzkFFG2');
INSERT INTO `Dog`(`DogName`, `DateFrom`, `Healthy`) VALUES ('Lucky','2023-05-16','off');
INSERT INTO `Dog`(`DogName`, `DateFrom`, `Healthy`) VALUES ('Persy','2023-07-15','off');
INSERT INTO `Dog`(`DogName`, `DateFrom`, `Healthy`) VALUES ('Many','2023-06-13','off');
INSERT INTO `Contract`(`Date`, `Obligations`, `Dog_id`, `Vis_id`) VALUES ('2023-06-21','Confirmed','1','1');
INSERT INTO `Contract`(`Date`, `Obligations`, `Dog_id`, `Vis_id`) VALUES ('2023-04-25','Confirmed by employee','3','1');
INSERT INTO `Contract`(`Date`, `Obligations`, `Dog_id`, `Vis_id`) VALUES ('2023-05-16','Confirmed fully','3','2');
INSERT INTO `Task`(`Status`, `Descr`, `Dog_id`, `Emp_id`) VALUES ('0','Heal','1','2');
INSERT INTO `Task`(`Status`, `Descr`, `Dog_id`, `Emp_id`) VALUES ('0','Walk Alex','1','2');
INSERT INTO `Task`(`Status`, `Descr`, `Dog_id`, `Emp_id`) VALUES ('0','Walk Eva','1','2');

-- End of file.

