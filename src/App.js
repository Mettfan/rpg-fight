import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
function App() {
  let dispatch = useDispatch()
  let globalState = useSelector( state => state )
  let user = {
    name: '',
    entry: '',
    life: 100,
    attacks: [
      {
        name: 'kick',
        damage: 10,
      },
      {
        name: 'punch',
        damage: 5,
      },
      {
        name: 'magic',
        damage: 20,
      },
  ],
    shield: Math.random()*10, //Could be any number
    lives: 3,
    potions: [{
      evade: {
        damage: 0,
        health: 0
      },
      torsHammer: {
        damage: 30,
        health: 0
      },
      health: {
        damage: 0,
        health: 20
      }
    }]

  }
  let enemy = {
    name: '',
    entry: '',
    life: 100,
    attacks: [
      {
        name: 'kick',
        damage: 10,
      },
      {
        name: 'punch',
        damage: 5,
      },
  ],
    shield: Math.random()*10, //Could be any number
    lives: 3,
    potions: [{}]

  }
  let [state, setState] = useState({
    user,
    enemy
  })
  let turn = (player, attack, objective) => {
    console.log(player, attack, objective);
    let move = state[player]?.attacks?.find( move => {
      return move.name == attack
    })
    setState({
      ...state,
      [objective]: {
        ...state[objective],
        life: state[objective]?.life - (move?.damage || 0)
      }
    })
    // objective.life -= player[attack]

  }
  let handleUserChange = (e) => {
    setState({
      ...state,
      [e.target.name]: {
        ...state[e.target.name],
        entry: e.target.value
      }
    })
    console.log(e.target.value);
  }
  return (
    
    <div className="App">

        {JSON.stringify(globalState)}
      <div className='userEntry'>
        <div>Vida: { ' ' + state.user.life }</div>
        <input name='user' onChange={(e) => {handleUserChange(e)}} type={'text'} placeholder={'Ingrese su ataque'}></input>
        <button onClick={() => {turn('user', state.user.entry, 'enemy')}}>Ataque</button>     
        {/* {JSON.stringify(state.user)}       */}
      </div>

      <div className='enemyEntry'>
      <div>Vida: { ' ' + state.enemy.life }</div>
        <input name='enemy' onChange={(e) => {handleUserChange(e)}} type={'text'} placeholder={'Ingrese su ataque'}></input>           
        <button onClick={ () => {turn('enemy', state.enemy.entry, 'user')} }>Ataque</button>           
        {/* {JSON.stringify(state.enemy)}       */}
      </div>

      

    </div>
  );
}

export default App;
