import "./Die.css"
export default function Die(props){
    const styles ={
        backgroundColor : props.isHeld? "rgb(0, 255, 13)" : "white"
    }
    return(
        <div className="die" style={styles} onClick={props.holdDice}>
           <h2>{props.value}</h2> 
        </div>

    )
}