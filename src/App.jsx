import Grid from './Grid'
import './styles/App.css'

export default function App() {
    return(
        <div className="app-shell">
            <header className="app-header" aria-label="Pokedex header">
                <h1 className="pokedex-title">
                    <span className="pokedex-icon" aria-hidden="true">
                        <svg viewBox="0 0 100 100" role="img" aria-label="Pokeball icon">
                            <circle cx="50" cy="50" r="48" fill="#fff" stroke="#111" strokeWidth="6" />
                            <path d="M2 50 A48 48 0 0 1 98 50 L2 50 Z" fill="#ef4444" />
                            <line x1="4" y1="50" x2="96" y2="50" stroke="#111" strokeWidth="6" />
                            <circle cx="50" cy="50" r="13" fill="#fff" stroke="#111" strokeWidth="6" />
                            <circle cx="50" cy="50" r="5" fill="#d1d5db" />
                        </svg>
                    </span>
                    Pokedex
                </h1>
            </header>
            <Grid />
        </div>

    )
}