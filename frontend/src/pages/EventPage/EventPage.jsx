import styles from './EventPage.module.css';
import {useGetEventByIdQuery} from './../../redux/eventsAPI';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EventInfo from '../../components/EventInfo/EventInfo';
import EventFrame from '../../components/EventFrame/EventFrame';
import Chat from '../../components/Chat/Chat';

const EventPage = () => {
    const {eventId} = useParams();
    const token = useSelector(state => state.authReducer.token);
    const {isFetching, currentData, isSuccess} = useGetEventByIdQuery({id:eventId, token})
  
    return (
       <section className={styles.event_page}>
{isFetching && <p>Loading...</p>}
<EventFrame person='ownerVideo'/>
<div className={styles.aside_wrapper}>
{isSuccess && <EventInfo {...currentData.data}/>}
<Chat/>
</div>

       </section> 
    )
}

export default EventPage;