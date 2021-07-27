import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../contexts/UserProvider';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useParams,
} from "react-router-dom";

const errorPage = ()=>{
    return(
        <h3>Bạn Phải bấm yes thì mới được kiểm tra</h3>
    )
}

export default errorPage;