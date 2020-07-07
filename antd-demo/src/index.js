import React,{Component} from 'react';
import { render } from 'react-dom';
import { Router, Route,   Redirect, IndexLink} from 'react-router';
import { Link} from 'react-router-dom';
import { createHashHistory } from 'history';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Menu, Button,Layout,Space } from 'antd';
import './index.css';
import SiderDemo from './Components/SiderDemo.js'
import Mylogin from './Components/Mylogin.js';
import MyRegister from './Components/MyRegister.js';
import * as serviceWorker from './serviceWorker';
import SiderTwo from './Components/SiderTwo';
import SiderTwoCopy from './Components/SiderTwoCopy';
import SiderThree from './Components/SiderThree';
const hashHistory = createHashHistory();

render((
    <Router history={hashHistory} >
        <Route path="/" exact component={SiderDemo}/>
        <Route path="/SiderDemo" component={SiderDemo}/>
        <Route path="/SiderDemo/Mylogin" component={Mylogin}/>
        <Route path="/MyRegister" component={MyRegister}/>
        <Route path="/SiderTwo" component={SiderTwo}/>
        <Route path="/SiderTwoCopy" component={SiderTwoCopy}/>
        <Route path="/SiderThree" component={SiderThree}/>
    </Router>
), document.body);
//), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
