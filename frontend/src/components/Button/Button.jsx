import styling from './Button.module.css';
import { useTheme } from '../../HOC/ThemeProvider';

const Button = ({children, styles, onClick, type, disabled, title}) => {
    const{isDark} = useTheme();
    return (
        <button title={title} disabled={disabled} type={type} onClick={onClick} style={styles} className={isDark ? styling.dark : styling.btn}>{children}</button>
    )
}

export default Button;