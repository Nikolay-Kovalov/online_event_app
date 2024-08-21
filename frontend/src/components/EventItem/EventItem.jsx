import styles from './EventItem.module.css';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import Button from '../Button/Button';
import { useDeleteEventMutation } from '../../redux/eventsAPI';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {useUpdateEventMutation} from './../../redux/eventsAPI';
import DatePicker from "react-datepicker";
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

const EventItem = ({name, type, date, description, time, _id}) => {
    const [itemData, setItemData] = useState({name, type, date, description, time, _id})
    const token = useSelector(state => state.authReducer.token)
    const [deleteEvent] = useDeleteEventMutation();

    const [startDate, setStartDate] = useState(new Date());

    const [isEditable, setIsEditable] = useState(false);

    const [updateEvent] = useUpdateEventMutation();

    const onEditBtnClick = async () => {
     await updateEvent({id:_id, token, body:itemData})
     setTimeout(()=>{setIsEditable(false)},300)
    }

    const handleEditEvent = () => {
        setIsEditable(true)
    }

    const handleDateSelect = (date) => {
        setItemData(prevState => {console.log(date.getDay()) 
            return ({...prevState, date: {
            year:date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            day:  date.getDay()
        }, time: {
            hours: date.getHours(),
            minutes: date.getMinutes()
        }})})
    } 
 
   const handleEditInputChange = (evt) => {
setItemData(prevState => ({...prevState, [evt.target.name]: evt.target.value}))
   }
    const handleDeleteEvent = async () => {
   await deleteEvent({id:_id, token})
    }

    return (
        <li className={styles.event_item}> 
    
            <MdOutlineDelete title='Delete event' onClick={handleDeleteEvent} className={styles.delete_btn}/>
            <CiEdit onClick={handleEditEvent} title='Edit event' className={styles.edit_icon}/>
            <div> 
            {isEditable ?
             <textarea autoFocus className={styles.input_edit} name='name' type='text' value={itemData.name} onChange={handleEditInputChange}/> 
             : 
             <h2 className={styles.event_title}>{name}</h2>}
            {isEditable ? 
            <select onChange={handleEditInputChange} className={styles.select} name="type" id="select">
                    <option value="Webinar">Webinar</option>
                    <option value="Online-session">Online-session</option>
                    <option value="Virtual summit">Virtual summit</option>
                    <option value="Online-exebition">Online-exebition</option>
                    <option value="Online-training">Online-training</option>
                    <option value="Online-course">Online-course</option>
                   </select>
                   :
                   <p className={styles.event_type}>{type}</p>}
            {isEditable 
            ? 
            <textarea className={styles.input_descr_edit} name='description' type='text' value={itemData.description} onChange={handleEditInputChange}/> 
            :
            <p className={styles.event_descr}>{description}</p>}
            </div>
            {/* <button className={styles.edit_btn} onClick={onEditBtnClick}>Edit</button> */}
            {isEditable ?
             <Button onClick={onEditBtnClick}   type="button"  styles={{width: "100px", height: "40px",marginBottom: "12px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", border: "none", fontSize: "20px", borderRadius:"8px"}}>Edit</Button>
            :
            <Link to={`/myevents/${_id}`} >
            <Button  type="button"  styles={{width: "148px", height: "40px",marginBottom: "12px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", border: "none", fontSize: "20px", borderRadius:"8px"}}>To event</Button>

            </Link>
            }
            {isEditable ?
             <DatePicker selected={startDate}
                    onSelect={handleDateSelect}
                     showTimeSelect
                     timeFormat="HH:mm"
                     timeIntervals={15}
                     timeCaption="time"
                     dateFormat="MMMM d, yyyy h:mm aa"
                   className={styles.date_picker} 
                    onChange={(date) => setStartDate(date)} 
                    width="200"/>
             
                :
                <p className={styles.date}><span>{days[date.day]}</span><span className={styles.span_wrapper}><span>{date.date.toString().padStart(2,"0")}</span><span>{month[date.month]}</span><span>{date.year}</span> <span className={styles.time_wrapper}><span>{time.hours}</span>:<span>{String(time.minutes).padStart(2,"0")}</span></span>  </span></p>

                }
                
        </li>
    )
}

export default EventItem;