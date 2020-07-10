
drop database if exists fangoo;
create database fangoo;
USE fangoo;

drop table if exists users;
create table users(
  username varchar(50) primary key,
  password varchar(50),
  nickname varchar(50),
  email varchar(50) unique
);

drop table if exists captcha;
create table captcha(
  email varchar(50),
  captcha varchar(50),
  getTime datetime
);

drop table if exists signType;
create table signType(
  flockId varchar(50),
  beginTime datetime,
  endTime datetime,
  description text
);

drop table if exists signRecord;
create table signRecord(
  flockId varchar(50),
  username varchar(50),
  getTime datetime
);

drop table if exists flock;
create table flock (
  flockId int auto_increment primary key,
  flockName text,
  adminName varchar(50),
  foreign key(adminName) references users(username)
);

-- trigger (admin,flockName) unique
delimiter $$
create trigger tr_flock_before_insert
before insert on flock
for each row 
begin 
	declare num int default 0; 
	select count(*) into num from flock where flockName=new.flockName and adminName=new.adminName;
	if(num) then
		insert into wrongtable values(0);
	end if;
end;
$$
delimiter ;

drop table if exists flockUser;
create table flockUser (
  userName varchar(50),
  flockId int,
  authorityType int,
  foreign key(userName) references users(username),
  foreign key(flockId) references flock(flockId),
  primary key(flockId, userName)
);

drop table if exists task;
create table task (
  userName varchar(50),
  finish int default 0,
  flockId int,
  taskName varchar(50),
  `explain` text,
  startTime datetime,
  endTime datetime,
  deadline datetime,
	primary key(userName, taskName, deadline),
  foreign key(userName) references users(username),
  foreign key(flockId) references flock(flockId)
);

drop table if exists flockanno;
create table flockanno
(
	flockId int, 
	announcer varchar(50),
	details text,
	annoTime datetime,
	primary key(flockId, announcer, annoTime),
	foreign key(flockId) references flock(flockId),
	foreign key(announcer) references users(username)
);



