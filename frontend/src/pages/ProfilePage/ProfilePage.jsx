import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    return (
        <section className={styles.profile_section}>
            <h1 className={styles.profile_title}>Profile</h1>
            <ProfileInfo/>
        </section>
    )
}

export default ProfilePage;