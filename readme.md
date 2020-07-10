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

  ​		"data":{"flockId": xxx, "username": xxx}

- [ ] calendar

- [ ] task list

- [x] announcement

    /users/addflockannounce

    ​	"data":  { "flockId": xxx, "announcer": xxx, "title": xxx,  "description": xxx, "deadline": xxx }


- [x] create a flock

    /users/addflock

    ​	"data": {"username": xxx, "title": xxx}

- [x] find flockid

    /users/lookflockid

    ​	"data": {"userName": xxx, "type": xxx}



https://blog.csdn.net/weixin_33774615/article/details/91368524 React组件调用顺序constructor -> willMount -> render -> DidMount

出现之前数据刷不出来的原因是render比willMount、constructor先执行完毕（React组件的执行看起来是并行的），所以需要加一个isLoading变量来控制，具体可以参考这篇https://blog.csdn.net/weixin_30588729/article/details/98212617

关于页面不能refresh的问题，或许是需要再额外建一个文件把link to的跳转改为前端的route路由，但似乎改起来不是那么简单，之后再说吧

