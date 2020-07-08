create table flock (
    flock_id int not null auto_increment primary key,
    flock_name text,
    admin_name varchar(50),
    foreign key(admin_name) references users(username),
)

create table flock_user (
    users_name varchar(50),
    flock_id int,
    authority_type int,
    foreign key(users_name) references users(username),
    foreign key(flock_id) references flock(flock_id),
    primary key(flock_id, flock_user_id)
)

create table task (
    task_id int not null auto_increment primary key,
    users_name varchar(50),
    task_name text,
    explain text,
    start_time datetime,
    end_time datetime,
    deadline datetime,
    foreign key(users_name) references users(username),
)

create table notice (
    notice_id int not null auto_increment primary key,
    flock_id int,
    notice_name text,
    start_time datetime,
    end_time datetime,
    foreign key(flock_id) references flock(flock_id)
)