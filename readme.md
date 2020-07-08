# Google-Girl-Hackathon Fangoo

back-end works at port 4040

front-end works at port 3000

use `npm install`and `npm start` in each folder

create `.env` file in the `back-end` folder and then fill it according to the following format

```
DB_DATABASE=${YOUR_DATABASE_NAME}
DB_USER=${YOUR_USERNAME}
DB_PASS=${YOUR_PASSWORD}
MAIL_HOST=${MAIL_HOST}
MAIL_FROM=${MAIL_SENDER_ACCOUNT}
MAIL_PASS=${MAIL_SENDER_PASSWORD}
```



API list

- [x] login(with md5)

  ​	/users/login

  ​		"data":{"username": xxx, "password": xxx}

- [x] register(with md5)

  ​	/users/register

  ​		"data":{"username": xxx, "password": xxx, "email": xxx, "captcha": xxx}

- [x] captcha

  ​	/users/captcha

  ​		"data":{"email": xxx}

- [x] sign in

  ​	/sign_in/add

  ​		"data":{"flockId": xxx, "beginTime": xxx, "endTime": xxx, "description": xxx}

  ​	/sign_in/done

  ​		"data":{"flockId": xxx, "username": xxx, "getTime": xxx}

- [ ] calendar

- [ ] task list

- [ ] announcement

