import styles from './HeroSection.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../HOC/ThemeProvider';

const HeroSection = () => {
    const navigate = useNavigate();
    const{isDark} = useTheme();
    return (
        <section className={styles.wrapper}>
            <div className={styles.slogan_wrapper}>
                <h1 className={styles.hero_title}>Meet a new generation of video calls you have ever seen!</h1>
                <p className={isDark ? `${styles.hero_text} ${styles.hero_text_darkmode}` : styles.hero_text}>Create events, plan time and enjoy the best quality of video calls! Keep in touch with your friends, reletievs and business partners!
                 </p>
                 <Button onClick={()=> {navigate('/registration')}} styles={{padding: "16px 32px", color: `${isDark ? "rgb(0, 108, 255)" : "white"}`, border: "none", fontSize: "24px", borderRadius:"8px", cursor: "pointer"}}>
            Get started
                    </Button>
            </div>
            <img className={styles.hero_img} src="../images/hero-photo.png" alt="People communicating on videochat" />
        </section>
    )
}

export default HeroSection;