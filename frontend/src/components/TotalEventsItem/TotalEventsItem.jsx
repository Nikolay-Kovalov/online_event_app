import styles from './TotalEventsItem.module.css';
import { Link } from 'react-router-dom';

const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decembre"
]

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"

]

const TotalEventsItem = ({name, type, date, description, time, _id}) => {
 
    return (
        <li className={styles.event_item}> 
        <Link className={styles.event_link} to={`/events/${_id}`}>
            <div> 
            <h2 className={styles.event_title}>{name}</h2>
            <p className={styles.event_type}>{type}</p>
            <p className={styles.event_descr}>{description}</p>
            </div>
            <p className={styles.date}><span>{days[date.day]}</span><span className={styles.span_wrapper}><span>{date.date.toString().padStart(2,"0")}</span><span>{month[date.month]}</span><span>{date.year}</span> <span className={styles.time_wrapper}><span>{time.hours}</span>:<span>{String(time.minutes).padStart(2,"0")}</span></span>  </span></p>
            </Link>
        </li>
       
    )
}

export default TotalEventsItem;