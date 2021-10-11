ALTER DATABASE rmB2NLg5Mh CHARACTER SET utf8mb4mb4 COLLATE utf8mb4mb4_general_ci;

create table contractme
(
	ID char(36) not null
		primary key,
	FULLNAME varchar(500) charset utf8mb4 null,
	EMAIL varchar(500) charset utf8mb4 null,
	PHONE varchar(20) charset utf8mb4 null,
	MESSAGE varchar(1000) charset utf8mb4 null,
	STATUS char null,
	DATECREATE DATETIME DEFAULT CURRENT_TIMESTAMP null
);

create table `group`
(
	CODE varchar(50) charset utf8mb4 not null
		primary key,
	NAME varchar(500) charset utf8mb4 null,
	STATUS char null
);

create table user
(
	ID char(36) not null
		primary key,
	NAME varchar(500) charset utf8mb4 null,
	PASSWORD varchar(1000) charset utf8mb4 null,
	STATUS char null,
	USERCREATE char(36) null,
	DATECREATE DATETIME DEFAULT CURRENT_TIMESTAMP null,
	EMAIL varchar(500) charset utf8mb4 not null,
	TOKEN varchar(2000) charset utf8mb4 null,
	constraint user_EMAIL_uindex
		unique (EMAIL)
);

create table `group-user`
(
	GROUP_CODE varchar(50) not null,
	USERID char(36) not null,
	primary key (GROUP_CODE, USERID),
	constraint `group-user_user_ID_fk`
		foreign key (USERID) references user (ID)
);

create table network
(
	ID char(36) not null
		primary key,
	NAME varchar(500) charset utf8mb4 null,
	CODE varchar(50) charset utf8mb4 null,
	ICON longtext null,
	NAMEICON varchar(500) charset utf8mb4 null,
	EXPECTEDAPY decimal(15,5) null,
	COMMISSION decimal(15,5) null,
	TOKENPRICE decimal(15,5) null,
	USERMODIFY char(36) null,
	STATUS char null,
	USERCREATE char(36) null,
	DATECREATE DATETIME DEFAULT CURRENT_TIMESTAMP null,
	TOTALAMOUNT decimal(15,5) null,
	DATEMODIFY datetime null,
	`ORDER` int null,
	STATUSNAME varchar(500) charset utf8mb4 null,
	ICONDATA longblob null,
	BACKGROUND varchar(50) charset utf8mb4 null,
	constraint network_user_ID_fk
		foreign key (USERCREATE) references user (ID),
	constraint network_user_ID_fk_2
		foreign key (USERMODIFY) references user (ID)
);

