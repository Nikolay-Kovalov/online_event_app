import styles from './Chat.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

const Chat = () => {
    const [inputValue, setInputValue] = useState('');
   const  onInputChange = (evt) => {
    setInputValue(evt.target.value)
   }
    return (
        <div className={styles.chat_wrapper}>
            <div className={styles.dialogs}></div>
            <div className={styles.form_wrapper}>
             <form className={styles.chat_form}>
                <input  className={styles.input} onChange={onInputChange} type="text" placeholder='Type a message...' value={inputValue}/>
                <Button type="button"  styles={{width: "108px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", border: "none", fontSize: "20px", borderRadius:"8px"}}>Send</Button>
             </form>
            </div>
        </div>
    )
}

export default Chat;