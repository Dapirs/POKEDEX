export default function Card(props){
    return(
        <div className="card">
            <p>{props.name}</p>
            <img src={props.img} />
        </div>
    )
}