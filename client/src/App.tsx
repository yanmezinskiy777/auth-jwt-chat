import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useTypedDispatch, useTypedSelector } from "./app/store";
import Form from "./components/Form";
import Profile from "./components/Profile";
import { fetchCheckAuth } from "./features/user/userFetch";

function App() {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.user);
  const isAuth = useTypedSelector((state) => state.user.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCheckAuth());
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          {isAuth && <Profile/>}
        </Col>
      </Row>
      <Row>
        <Col md="4">
          {!isAuth && <Form />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
