# Google-Girl-Hackathon Fangoo

```
├─back-end
│  ├─bin
│  ├─public
│  │  └─stylesheets
│  ├─routes
│  └─views
├─front-end
│  ├─build
│  │  └─static
│  │      └─css
│  ├─public
│  └─src
│      └─Components
└─server
    ├─bin
    ├─public
    │  ├─static
    │  │  └─css
    │  └─stylesheets
    ├─routes
    └─views
```

+ run the web locally

  + create `.env` file in the `back-end` folder and then fill it according to the following format

    ```
    DB_DATABASE=${YOUR_DATABASE_NAME}
    DB_USER=${YOUR_USERNAME}
    DB_PASS=${YOUR_PASSWORD}
    MAIL_HOST=${MAIL_HOST}
    MAIL_FROM=${MAIL_SENDER_ACCOUNT}
    MAIL_PASS=${MAIL_SENDER_PASSWORD}
    ```

  + run `npm install` and `npm start` in both `front-end` and `back-end`

  + back-end works at port 4040

  + front-end works at port 3000

  

+ deploy the web on gcloud

  + create `.env` file in the `server` folder and then fill it according to the following format

      ```
      DB_DATABASE=${YOUR_DATABASE_NAME}
      DB_USER=${YOUR_USERNAME}
      DB_PASS=${YOUR_PASSWORD}
      CLOUD_SQL_CONNECTION_NAME=${YOUR_CLOUD_SQL_CONNECTION_NAME}
      MAIL_HOST=${MAIL_HOST}
      MAIL_FROM=${MAIL_SENDER_ACCOUNT}
      MAIL_PASS=${MAIL_SENDER_PASSWORD}
      ```

  + prepare `google cloud sql for mysql` in advance
  + run `gcloud app deploy` 
