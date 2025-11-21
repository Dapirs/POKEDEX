import './styles/Card.css'
export default function Card(props){
    return(
        <div className="card">
            <img src={props.img} />
            <p>{props.name}</p>
        </div>
    )
}