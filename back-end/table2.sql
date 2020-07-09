create table flock (
  flockId int auto_increment primary key,
  flockName text,
  adminName varchar(50),
  foreign key(adminName) references users(username)
);

-- 限制(管理员,群组号)唯一
delimiter $$
create trigger tr_flock_before_insert
before insert on flock
for each row 
begin 
	DECLARE num int DEFAULT 0; 
	select count(*) into num from flock where flockName=new.flockName and adminName=new.adminName;
	if(num) then
		insert into wrongtable values(0);
	end if;
end;
$$
delimiter ;

create table flockUser (
  userName varchar(50),
  flockId int,
  authorityType int,
  foreign key(userName) references users(username),
  foreign key(flockId) references flock(flockId),
  primary key(flockId, userName)
)

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

