create table flock (
    flock_id int not null auto_increment primary key,
    flock_name text,
    admin_id int,
    foreign key(admin_id) references user(user_id)
)

create table flock_user (
    user_id int,
    flock_id int,
    authority_type int,
    foreign key(user_id) references user(user_id),
    foreign key(flock_id) references flock(flock_id),
    primary key(flock_id, flock_user_id)
)

create table task (
    task_id int not null auto_increment primary key,
    user_id int,
    task_name text,
    explain text,
    start_time datetime,
    end_time datetime,
    deadline datetime,
    foreign key(user_id) references user(user_id)
)

create table notice (
    notice_id int not null auto_increment primary key,
    flock_id int,
    notice_name text,
    start_time datetime,
    end_time datetime,
    foreign key(flock_id) references flock(flock_id)
)