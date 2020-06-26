import React from 'react';
import map from '../../app/map';
import { 
  useSelector, 
  // useDispatch 
} from 'react-redux';
import styles from './Scores.module.css';
import { 
  selectRooms, 
  // selectGames, 
  // selectLevels 
} from './roomsSlice';

export default function Scores(props) {
  const rooms = useSelector(selectRooms);
  return (
    <div className={styles.rooms}>
      {map(rooms, (item, i) => <Room room={item} scores={props.scores} key={i} />)}
    </div>
  )
}

export function Room(props) {
  return (
    <div className={styles.room}>
      {props.room.name}
      <div className={styles.games}>
      {map(props.room.games, (item, i) => <Game game={item} scores={props.scores[item.id]} key={i} />)}
      </div>
    </div>
  );
}

export function Game(props) {
  
  return (
    <div className={styles.game}>
      <div className={styles.gamenamewrapper}>
        <div className={styles.gamename}>
          {props.game.name} 
        </div>
      </div>
      {[...new Array(10)].map((item, i) => 
        <Level 
          game={props.game}
          level_id={i} 
          levels={props.game.levels} 
          scores={props.scores} key={i} 
        />)}
    </div>
  );
}

export function Level(props) {
  let player_score = 0;
  let diff = 9999;

  // console.log(props.levels[props.level_id])

  if(!props.levels[props.level_id]){
    player_score = "-";
  }

  if(props.levels[props.level_id] && props.levels[props.level_id].top_score)
  {
    var top_score = props.levels[props.level_id].top_score;
  }

  if(props.scores && props.scores[props.level_id])
  {
    let score = props.scores[props.level_id];
    player_score = score.score;

    if(top_score){
      diff = Math.ceil((top_score - player_score) / 100);
    }
  }

  if(player_score !== "-")
  {
    var style = styles[`range${diff > 9 ? 9 : diff}`];
  }

  return (
    <div className={[styles.level, style].join(' ')}>
      <label title={`${props.game.name} ${parseInt(props.level_id) + 1} \nPlayer score: ${player_score} \n    Top score: ${top_score}`}>{player_score}</label>
    </div>
  );
}