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

function SignIn(props) {
    const { users } = useContext(UserContext);
    const {user_id} = useParams();
    const {  allow,onChangeEmail, onChangePassword, onSubmit, validateEmail, validatePassword } = useContext(UserContext);
    let history = useHistory();
    const handleSignIn =()=>{
        history.push("/sign-up");
    }
    return (
        <Router>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control isInvalid={validateEmail.isValid ? false : true} onChange={(e) => onChangeEmail(e)} placeholder="Enter email" />
                    <Form.Text className="text-danger">
                        {validateEmail.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => onChangePassword(e)} type="password" placeholder="Password" />
                    <Form.Text className="text-danger">
                        {validatePassword.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Link className="btn btn-primary" to={allow.isAccess?history.push(`/main/${allow.token.id}`):"/"} onClick={() => onSubmit()} variant="primary" style={{ marginRight: 10 }}>Log In</Link>
            </Form>
        </Router>
    )
}

export default SignIn;