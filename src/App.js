import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //validation(simply copied from react bootstrap form validation code)
  const [validated, setValidated] = useState(false);

  const [error, setError] = useState("");

  //register or login controlling checkbox
  const [registered, setRegistered] = useState(false);

  // const handleEmailChange = e => {
  //   console.log(e.target.value);
  // }
  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisteredChange = (e) => {
    setRegistered(e.target.checked); //true or false
  };

  //this handler trigers with the button click inside the form. But the button reloads the page. In case of spa in order to stop reloading the page we write e.preventDefault()
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // e.preventDefault();
      e.stopPropagation();
      //check validity false hobar por o user info firebase e send kortese, to stop that write return here.
      return;
    }
    //js password regex
    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      console.log("invalid");
      setError("Password should contain atleast one special character"); //we can show this error text in the form ui
      return;
    }

    setValidated(true);

    setError("");

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } else {
      //we are creating new user here(copied from firebase) . We can only create one user with one email by default.
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
          //clearing the input fields after a new user in created.
          setEmail('');
          setPassword('');

          verifyEmail();
          
        })
        .catch((error) => {
          console.log(error);
          // ..
        });
      e.preventDefault();
    }
  };

  //a function for sending verification email for first time registering. The inside code is from firebase user manager. this function is required to be called inside the handleformsubmit
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {
      console.log(result);
      console.log("email verification sent");
    });
  };

  //sending password reset email
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    console.log('reset Email sent');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
  });
  }

  return (
    <div>
      {/* <form onSubmit={handleFormSubmit} action="">
        <input onBlur={handleEmailBlur} type="text" placeholder='Email' />
        <br />
        <input onBlur={handlePasswordBlur} type="password" placeholder='Password' />
        <br />
        <input type="submit" value="Login" />
      </form> */}

      <div className="registration w-50 mx-auto">
        <h1
          className={
            registered
              ? "text-white bg-info  p-3 rounded "
              : "text-white bg-primary  p-3 rounded "
          }
        >
          Please {registered ? "Login" : "Register"}!!
        </h1>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegisteredChange}
              type="checkbox"
              label="Registered Already?"
            />
          </Form.Group>
          <p className="text-danger">{error}</p>

          <Button onClick={handlePasswordReset} variant="link">Forgot Password</Button>
          <br />

          <Button variant={registered ? "info" : "primary"} type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
