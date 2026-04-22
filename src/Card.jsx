import './styles/Card.css'

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

function getTypeColor(type) {
    return TYPE_COLORS[type?.toLowerCase()] || DEFAULT_TYPE_COLOR
}

function formatPokemonId(id) {
    const numericId = Number(id)
    if (!Number.isFinite(numericId) || numericId <= 0) {
        return '#000'
    }

    return `#${String(numericId).padStart(3, '0')}`
}

function hexToRgba(hexColor, alpha) {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function Card({ img, name, id, types = [], onClick }) {
    const primaryTypeColor = getTypeColor(types[0])
    const backgroundColor = hexToRgba(primaryTypeColor, 0.13)

    return (
        <button type="button" className="card" style={{ backgroundColor }} onClick={onClick}>
            <img src={img} alt={name} />
            <p className="card-id">{formatPokemonId(id)}</p>
            <p className="card-name">{name}</p>
            <div className="type-badges">
                {types.map((type) => (
                    <span
                        key={type}
                        className="type-badge"
                        style={{ backgroundColor: getTypeColor(type) }}
                    >
                        {type}
                    </span>
                ))}
            </div>
        </button>
    )
}