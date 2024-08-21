import { createContext, useContext, useState} from "react";


const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false)
    
return <ThemeContext.Provider value={{isDark, setIsDark}}>{children}</ThemeContext.Provider>
}

export default ThemeProvider;