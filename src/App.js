import React from "react"
import "./App.css"
import Die from "./Die"
import { nanoid } from 'nanoid'
import winnerlogo from "../src/winner-img.gif"

export default function App(){
  function generateDie(){
    return {
      key : nanoid(),
      value : Math.ceil(Math.random() * 6),
      isHeld : false
    }
  }
  const [die,setDie] = React.useState(allNewDies())

  function allNewDies(){
    let newDie=[]
    for(let i = 0 ; i < 10; i++ ){
      newDie.push((
        generateDie()
      ))
    }
    return newDie
  }
  
  function rollDie(){
    if(tenzis === false){
      setDie(oldDie =>oldDie.map(
        die =>{
          return die.isHeld === true? die: generateDie()
        }
      ))
    }
    else{
        setTenzis(false)
        setDie(allNewDies())
    }
    
  }
  const dieElement = die.map((item)=><Die key={item.key} value={item.value} isHeld={item.isHeld} holdDice={() => holdDice(item.key)}/>)

  function holdDice(id){
    setDie(oldDie =>  oldDie.map(
      die => {
        return (
          die.key === id ? {...die , isHeld : !die.isHeld } : die
        )
      }
    ))
  }

  const [tenzis,setTenzis] = React.useState(false)
  React.useEffect(()=>
    {
      const allHeld = die.every(die => die.isHeld)
      const firstDievalue =  die[0].value
      const allDieValue = die.every(
        die => die.value === firstDievalue)
      if (allHeld && allDieValue){
        setTenzis(true)
        console.log("You won!!")

      }
  },
    [die])
  
  return(
    <div className="body">
      <main>
        <h1 className="heading">Tenzies Game</h1>
        {tenzis?"":<h3 className="text">Playing Instruction-- Select all the dies with same number to hold the dice. <br></br>Once all dies are hold in same number You win!! Click on roll to change numbers on die.</h3>}
        {tenzis?<div className="win-comp"><img  className="winner-logo" src={winnerlogo} alt="Winner's logo"></img><p>You have won the game!! Click on Reset to start a new game. </p></div> :<div className="die-comp">
          {dieElement}
        </div>
        }
        <button className="roll" onClick={rollDie}>
          {tenzis?"Reset":"Roll"}
        </button>
      </main>
      <div className="footer">Developed by &copy; Rudra Banerjee</div>
    </div>
  )
}