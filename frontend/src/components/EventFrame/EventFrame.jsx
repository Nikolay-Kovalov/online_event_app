import styles from './EventFrame.module.css';
import Button from '../Button/Button';
import { useRef, useState} from 'react';
import { useTheme } from '../../HOC/ThemeProvider';

const EventFrame = ({person}) => {

    const {isDark} = useTheme();
    const [stream, setStream] = useState({id: "", stream: null});
    
    const videoStreams = {
       ownerVideo:useRef(null),
       guestVideo: useRef(null),
    }
    // const ownerVideo = useRef(null);
    // const guestVideo = useRef(null);
   

    const playVideoFromCamera = async () => {
        try {
            const constraints = {
                'video':true,
                'audio': true
            }
            const stream =  await navigator.mediaDevices.getUserMedia(constraints);
            setStream({stream, id: stream.id})
            const videoElement = videoStreams[person].current;
           console.log([person])
            videoElement.srcObject = stream;
        }
        catch(error){
console.log('Error opening video camera', error)
        }
    }
    

    const onConnectBtnClick = () => {
playVideoFromCamera()
    }

    const onDisconnectBtnClick = () => {
  const tracks = stream.stream.getTracks();
  tracks.forEach(track => {
    track.stop()
  })
     }
      
    
    return (
        <div className={styles.frame_wrapper}>
            <div className={styles.event_frame}>
                <video ref={videoStreams.ownerVideo} className={styles.owner_video}  autoPlay ></video>
                <div className={styles.guests_video_wrapper}>
                <video ref={videoStreams.guestVideo} className={styles.guest_video} autoPlay></video>  
                <video className={styles.guest_video} autoPlay></video>
                <video className={styles.guest_video} autoPlay></video>
                </div>
            </div>
            <div className={styles.btn_outer_wrapper}>
            <div className={styles.btn_wrapper}>
            <Button onClick={onConnectBtnClick}  type="button"  styles={{width: "148px", height: "40px",marginBottom: "12px", display: "flex", justifyContent: "center", alignItems: "center", color: `${isDark ? "rgb(0, 108, 255)" : "white"}`, border: "none", fontSize: "20px", borderRadius:"8px"}}>Connect</Button>
            <Button onClick={onDisconnectBtnClick} type="button"  styles={{width: "148px", height: "40px",marginBottom: "12px", display: "flex", justifyContent: "center", alignItems: "center", color: `${isDark ? "rgb(0, 108, 255)" : "white"}`, border: "none", fontSize: "20px", borderRadius:"8px"}}>Disconnect</Button>
            </div>
            </div>
        </div>
    )
}

export default EventFrame;