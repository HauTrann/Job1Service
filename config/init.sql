create table AZCLUB.contractme
(
	ID char(36) not null
		primary key,
	FULLNAME varchar(500) charset utf8 null,
	EMAIL varchar(500) charset utf8 null,
	PHONE varchar(20) charset utf8 null,
	MESSAGE varchar(1000) charset utf8 null,
	STATUS char null,
	DATECREATE datetime default CURRENT_TIMESTAMP null
);

create table AZCLUB.`group`
(
	CODE varchar(50) charset utf8 not null
		primary key,
	NAME varchar(500) charset utf8 null,
	STATUS char null
);

create table AZCLUB.user
(
	ID char(36) not null
		primary key,
	NAME varchar(500) charset utf8 null,
	PASSWORD varchar(1000) charset utf8 null,
	STATUS char null,
	USERCREATE char(36) null,
	DATECREATE datetime default CURRENT_TIMESTAMP null,
	EMAIL varchar(500) charset utf8 not null,
	TOKEN varchar(2000) charset utf8 null,
	constraint user_EMAIL_uindex
		unique (EMAIL)
);

create table AZCLUB.`group-user`
(
	GROUP_CODE varchar(50) not null,
	USERID char(36) not null,
	primary key (GROUP_CODE, USERID),
	constraint `group-user_user_ID_fk`
		foreign key (USERID) references AZCLUB.user (ID)
);

create table AZCLUB.network
(
	ID char(36) not null
		primary key,
	NAME varchar(500) charset utf8 null,
	CODE varchar(50) charset utf8 null,
	ICON longtext null,
	NAMEICON varchar(500) charset utf8 null,
	EXPECTEDAPY decimal(15,5) null,
	COMMISSION decimal(15,5) null,
	TOKENPRICE decimal(15,5) null,
	USERMODIFY char(36) null,
	STATUS char null,
	USERCREATE char(36) null,
	DATECREATE datetime default CURRENT_TIMESTAMP null,
	TOTALAMOUNT decimal(15,5) null,
	DATEMODIFY datetime null,
	`ORDER` int null,
	STATUSNAME varchar(500) charset utf8 null,
	ICONDATA longblob null,
	BACKGROUND varchar(50) charset utf8 null,
	constraint network_user_ID_fk
		foreign key (USERCREATE) references AZCLUB.user (ID),
	constraint network_user_ID_fk_2
		foreign key (USERMODIFY) references AZCLUB.user (ID)
);

create table AZCLUB.networkmember
(
	ID char(36) not null
		primary key,
	NETWORKID char(36) null,
	NAME varchar(500) charset utf8 null,
	ADRRESS varchar(500) charset utf8 null,
	LINK varchar(1000) charset utf8 null,
	STATUS char null,
	TYPE int null,
	`ORDER` decimal null,
	constraint networkmember_network_ID_fk
		foreign key (NETWORKID) references AZCLUB.network (ID)
);

