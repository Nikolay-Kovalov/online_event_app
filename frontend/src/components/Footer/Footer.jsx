import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useTheme } from '../../HOC/ThemeProvider';

const Footer = () => {
    const {isDark} = useTheme();
    return (
        <footer className={isDark ? `${styles.footer} ${styles.footer_darkmode}`: styles.footer}>
             <Link to="/" className={styles.logo_link}>Meet Me</Link>
             <p className={styles.rights}>© 2024. All rights reserved.</p>
        </footer>
    )
}

export default Footer;