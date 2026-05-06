import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export {ThemeContext}

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState('dark');

    useEffect(()=> {
        if(theme === 'dark') {
            document.documentElement.classList.add('dark')
        }
        if(theme === 'light') {
            document.documentElement.classList.remove('dark')
        }
    })

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const value = {
        theme, setTheme, toggleTheme
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}