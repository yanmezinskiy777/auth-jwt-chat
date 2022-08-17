import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useTypedDispatch, useTypedSelector } from "./app/store";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import { fetchCheckAuth } from "./features/user/userFetch";
import styles from "./styles/App.module.css"

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
        <Col className={styles.wrapper}>
          {isAuth ? <Profile/> :  <Form />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
