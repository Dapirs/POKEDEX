import './styles/Search.css'

export default function Search(props){
    function handleChange(e){
        e.preventDefault();
    }
    return(
        <>
            <input type='text'
                   className='searchbar'
                   value={props.searchTerm}
                   onChange={props.searchUpdate}
            />
        </>

    )
}