import './styles/Search.css'

export default function Search(props){
    return(
        <div className='search-container'>
            <span className='search-icon-prefix' aria-hidden='true'>
                🔴⚪
            </span>
            <input
                type='text'
                className='searchbar'
                value={props.searchTerm}
                onChange={props.searchUpdate}
                placeholder='Search Pokemon'
                aria-label='Search Pokemon'
            />
            <span className='search-icon-suffix' aria-hidden='true'>
                🔍
            </span>
        </div>

    )
}