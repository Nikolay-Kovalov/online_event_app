import { useSelector } from 'react-redux';
import styles from './ProfileInfo.module.css';
import { useState, useRef } from 'react';
import Button from './../Button/Button';
import { useUpdateUserAvatarMutation } from '../../redux/currentUserApi';


const ProfileInfo = () => {
    const [isChanged, setIsChanged] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const token = useSelector(state => state.authReducer.token);

    const inputRef = useRef();
    const[updateAvatar] = useUpdateUserAvatarMutation();
   

  const  handleChangeAvatar = () => {
        setIsChanged(true)
    }

    const handleAvatarFormSubmit = async (evt) => {
      evt.preventDefault();
      const {image} = evt.currentTarget.elements;
     const data = new FormData();
     data.append('avatar', image.files[0])
     console.log(inputRef.current)
    // const reader = new FileReader();
    //     reader.readAsDataURL(image.files[0])

        console.log(data.get('avatar'))
    
     const response = await updateAvatar({token, body:data});
     console.log(response)
    }
  

    return (
        <>
        <div className={styles.avatar_wrapper}>
        <img className={styles.user_avatar} alt='' src={`https:${user?.avatarUrl}`}/>
       {isChanged && 
       <form ref={inputRef} encType='multipart/formdata' onSubmit={handleAvatarFormSubmit}  className={styles.form} name='avatar'>
        <input hidden id='real-input' name='image' className={styles.input_file} type='file'/>
       <label className={styles.label} htmlFor="real-input">Upload avatar</label>
       <Button type="submit"  styles={{padding: '12px', display: "flex", justifyContent: "center", alignItems: "center", color: "white", border: "none", fontSize: "20px", borderRadius:"8px"}}>Submit</Button>
       </form>
       }
        <button onClick={handleChangeAvatar} title='Add avatar' className={styles.add_btn}>+</button>
        </div>
        <p className={styles.title}>Name:<span className={styles.user_name}>{user?.username}</span></p>
        <p className={styles.title}>Email:<span className={styles.user_email}>{user?.email}</span></p>
        </>
    )
}

export default ProfileInfo;