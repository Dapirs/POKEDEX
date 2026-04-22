import './styles/PokemonModal.css'

const TYPE_COLORS = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
}

const DEFAULT_TYPE_COLOR = '#9CA3AF'

const STAT_ORDER = [
    { key: 'hp', label: 'HP' },
    { key: 'attack', label: 'Attack' },
    { key: 'defense', label: 'Defense' },
    { key: 'special-attack', label: 'Sp. Atk' },
    { key: 'special-defense', label: 'Sp. Def' },
    { key: 'speed', label: 'Speed' },
]

function getTypeColor(type) {
    return TYPE_COLORS[type?.toLowerCase()] || DEFAULT_TYPE_COLOR
}

function getStatColor(value) {
    if (value < 50) {
        return '#ef4444'
    }

    if (value < 80) {
        return '#f59e0b'
    }

    return '#22c55e'
}

function formatPokemonId(id) {
    const numericId = Number(id)
    if (!Number.isFinite(numericId) || numericId <= 0) {
        return '#000'
    }

    return `#${String(numericId).padStart(3, '0')}`
}

function capitalizeName(name = '') {
    if (!name) {
        return ''
    }

    return name.charAt(0).toUpperCase() + name.slice(1)
}

export default function PokemonModal({ pokemon, isLoading, onClose }) {
    if (!pokemon && !isLoading) {
        return null
    }

    const pokemonTypes = pokemon?.types?.map((typeInfo) => typeInfo.type.name) || []

    return (
        <div className="modal-overlay" role="presentation" onClick={onClose}>
            <section
                className="pokemon-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Pokemon details"
                onClick={(event) => event.stopPropagation()}
            >
                <button type="button" className="modal-close" onClick={onClose}>
                    Close
                </button>

                {isLoading ? (
                    <div className="modal-loading">
                        <svg className="pokeball-loader" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="48" fill="#fff" stroke="#111" strokeWidth="5" />
                            <path d="M2 50 A48 48 0 0 1 98 50 L2 50 Z" fill="#ef4444" />
                            <line x1="4" y1="50" x2="96" y2="50" stroke="#111" strokeWidth="5" />
                            <circle cx="50" cy="50" r="14" fill="#fff" stroke="#111" strokeWidth="5" />
                            <circle cx="50" cy="50" r="6" fill="#d1d5db" />
                        </svg>
                    </div>
                ) : (
                    <>
                        <h2 className="modal-name">{capitalizeName(pokemon.name)}</h2>
                        <img
                            className="modal-image"
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name}
                        />
                        <p className="modal-id">{formatPokemonId(pokemon.id)}</p>

                        <div className="modal-types">
                            {pokemonTypes.map((type) => (
                                <span
                                    key={type}
                                    className="modal-type-badge"
                                    style={{ backgroundColor: getTypeColor(type) }}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>

                        <div className="modal-stats">
                            {STAT_ORDER.map((statEntry) => {
                                const statValue = pokemon.stats.find(
                                    (stat) => stat.stat.name === statEntry.key
                                )?.base_stat || 0

                                const safeBarValue = Math.min(statValue, 150)

                                return (
                                    <div className="stat-row" key={statEntry.key}>
                                        <span className="stat-label">{statEntry.label}</span>
                                        <div className="stat-track">
                                            <div
                                                className="stat-fill"
                                                style={{
                                                    width: `${(safeBarValue / 150) * 100}%`,
                                                    backgroundColor: getStatColor(statValue),
                                                }}
                                            />
                                        </div>
                                        <span className="stat-value">{statValue}</span>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="modal-measurements">
                            <p>
                                <strong>Height:</strong> {pokemon.height / 10} m
                            </p>
                            <p>
                                <strong>Weight:</strong> {pokemon.weight / 10} kg
                            </p>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

