import { useTheme } from '../context/useTheme'

export default function Navbar() {
    const { theme, toggleTheme } = useTheme()

    return (
        <nav style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderBottom: '1px solid var(--accent)' }}
        className="px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        
        <h1 style={{ color: 'var(--accent)' }} 
            className="text-2xl font-bold tracking-widest uppercase">
            LCS
        </h1>

        <button
            onClick={toggleTheme}
            style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--accent)' }}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
        >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        </nav>
    )
}