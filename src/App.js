import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { getAuth } from "firebase/auth";
import { app } from "./firebase.init";
import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);

function App() {
  // const handleEmailChange = e => {
  //   console.log(e.target.value);
  // }
  const handleEmailBlur = (e) => {
    console.log(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    console.log(e.target.value);
  };

  //this handler trigers with the button click inside the form. But the button reloads the page. In casse of spa in order to stop reloading the page we write e.preventDefault()
  const handleFormSubmit = (e) => {
    console.log("form submitted");
    e.preventDefault();
  };
  return (
    <div className="App">
      {/* <form onSubmit={handleFormSubmit} action="">
        <input onBlur={handleEmailBlur} type="text" placeholder='Email' />
        <br />
        <input onBlur={handlePasswordBlur} type="password" placeholder='Password' />
        <br />
        <input type="submit" value="Login" />
      </form> */}

      <div className="registration w-50 mx-auto">
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
