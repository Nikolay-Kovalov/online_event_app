import styles from './JoinRoomPage.module.css';
import {useGetEventByIdQuery} from './../../redux/eventsAPI';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation, Navigate} from 'react-router-dom';
import EventInfo from '../../components/EventInfo/EventInfo';
import EventFrame from '../../components/EventFrame/EventFrame';
import Chat from '../../components/Chat/Chat';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

const JoinRoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {eventId} = useParams();
    const token = useSelector(state => state.authReducer.token);

    const handleRedirectClick = () => {
        navigate('/login', {state: {from: location}});
    //    return <Navigate to="/login" state={{from: location}}/>
    }


    const {isFetching, currentData, isSuccess} = useGetEventByIdQuery({id:eventId, token})
    if(!token) {return <Modal onBackdroppClick={()=>{}}>
        <p className={styles.notific_text}>Please, log in befor joining the event</p>
        <div className={styles.btn_wrapper}>
        <Button onClick={() => {navigate(-1)}} type='button' styles={{padding: "8px 16px", color: "white", border: "none", fontSize: "20px", borderRadius:"8px", cursor: "pointer"}}>Go back</Button>
        <Button onClick={handleRedirectClick} type='button' styles={{padding: "8px 16px", color: "white", border: "none", fontSize: "20px", borderRadius:"8px", cursor: "pointer"}}>Log in</Button>
</div>
    </Modal>}
    return (
       <section className={styles.event_page}>
{isFetching && <p>Loading...</p>}
<EventFrame person='guestVideo'/>
<div className={styles.aside_wrapper}>
{isSuccess && <EventInfo {...currentData.data}/>}
<Chat/>
</div>

       </section> 
    )
}

export default JoinRoomPage;