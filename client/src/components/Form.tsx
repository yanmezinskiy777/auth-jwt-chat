import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { fetchRegistration } from '../features/user/userFetch';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const From = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handlerEmail = (e: InputEvent): void => setEmail(e.target.value);
  const handlerPassword = (e: InputEvent): void => setPassword(e.target.value);
  const handlerSignUp = () => dispatch(fetchRegistration({email, password}) as any);

  return (
    <Form inline>
    <FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
        onChange={handlerEmail}
        value={email}
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handlerPassword}
        value={password}
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button onClick={handlerSignUp}>
      Sign up
    </Button>
  </Form>
  )
}

export default From