import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useTypedDispatch } from "../app/store";
import { fetchLogin, fetchRegistration } from "../features/user/userFetch";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const From = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useTypedDispatch();

  const handlerEmail = (e: InputEvent): void => setEmail(e.target.value);
  const handlerPassword = (e: InputEvent): void => setPassword(e.target.value);
  
  const handlerSignUp = () => dispatch(fetchRegistration({ email, password }));
  const handlerSignIn = () => dispatch(fetchLogin({ email, password }));

  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Email"
          type="email"
          onChange={handlerEmail}
          value={email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Password"
          type="password"
          onChange={handlerPassword}
          value={password}
        />
      </FormGroup>
      <FormGroup>
        <Button onClick={handlerSignUp}>Sign up</Button>
      </FormGroup>
      <FormGroup>
        <Button onClick={handlerSignIn}>Sign in</Button>
      </FormGroup>
    </Form>
  );
};

export default From;
