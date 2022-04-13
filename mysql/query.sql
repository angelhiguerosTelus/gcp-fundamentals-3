create table users(
	username varchar(50) primary key,
	name varchar(50) not null, 
    password varchar(50) not null, 
    rol integer(11) not null
);