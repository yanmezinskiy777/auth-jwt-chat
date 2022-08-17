import { Button } from "reactstrap";
import { useTypedDispatch, useTypedSelector } from "../../app/store";
import { fetchLogout } from "../../features/user/userFetch";
import Chat from "../Chat/Chat";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.user);
  const handlerLogout = () => dispatch(fetchLogout());
  return (
    <div>
      <div className={styles.profile}>
        <h2>{`email: ${user.email}`}</h2>
        <Button color="info" onClick={handlerLogout}>
          Logout
        </Button>
      </div>
      <div>
        <Chat />
      </div>
    </div>
  );
};

export default Profile;
