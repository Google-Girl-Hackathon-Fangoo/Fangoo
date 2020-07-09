create table flock (
  flockId int not null primary key,
  flockName text,
  adminName varchar(50),
  foreign key(adminName) references users(username)
)

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
  explain text,
  startTime datetime,
  endTime datetime,
  deadline datetime,
  foreign key(usersName) references users(username),
  foreign key(flockId) references flock(flockId)
)