CREATE TABLE users(
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(50),
  nickname VARCHAR(50),
  email VARCHAR(50) UNIQUE
);

CREATE TABLE captcha(
  email VARCHAR(50),
  captcha VARCHAR(50),
  getTime DATETIME
);