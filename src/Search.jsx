import './styles/Search.css'

export default function Search(props){
    return(
        <div className='search-container'>
            <span className='search-icon-prefix' aria-hidden='true'>
                <svg viewBox='0 0 100 100' role='img' aria-label='Pokeball icon'>
                    <circle cx='50' cy='50' r='48' fill='#fff' stroke='#111' strokeWidth='6' />
                    <path d='M2 50 A48 48 0 0 1 98 50 L2 50 Z' fill='#ef4444' />
                    <line x1='4' y1='50' x2='96' y2='50' stroke='#111' strokeWidth='6' />
                    <circle cx='50' cy='50' r='13' fill='#fff' stroke='#111' strokeWidth='6' />
                    <circle cx='50' cy='50' r='5' fill='#d1d5db' />
                </svg>
            </span>
            <input
                type='text'
                className='searchbar'
                value={props.searchTerm}
                onChange={props.searchUpdate}
                placeholder='Search Pokemon'
                aria-label='Search Pokemon'
            />
        </div>

    )
}