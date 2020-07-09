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
  usersName varchar(50),
  flockId int,
  authorityType int,
  foreign key(usersName) references users(username),
  foreign key(flockId) references flock(flockId),
  primary key(flockId, usersName)
)

create table task (
  usersName varchar(50),
  finish int default 0,
  flockId int,
  taskName text,
  annotation text,
  startTime datetime,
  endTime datetime,
  deadline datetime,
  foreign key(usersName) references users(username),
  foreign key(flockId) references flock(flockId)
)