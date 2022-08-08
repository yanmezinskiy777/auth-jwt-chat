import { Button } from 'reactstrap';
import { useTypedDispatch, useTypedSelector } from '../app/store';
import { fetchLogout } from '../features/user/userFetch';

const Profile = () => {
    const dispatch = useTypedDispatch();
    const user = useTypedSelector((state) => state.user.user);
    const handlerLogout = () => dispatch(fetchLogout());
  return (
    <>
        <h1>{`Email: ${user.email}`}</h1>
        <Button onClick={handlerLogout}>Logout</Button>
    </>
  )
}

export default Profile