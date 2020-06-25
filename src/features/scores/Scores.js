import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPlayers
} from './playersSlice';
import {
  selectBadges
} from './badgesSlice';
import styles from './Scores.module.css';
import { 
  selectRooms, 
  selectGames, 
  selectLevels 
} from './roomsSlice';

export function Scores() {
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();
  //const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div>
        {players.map((item, i) => <Player data={item} key={i} />)}
      </div>
    </div>
  );
}

export function Player(props) {
  let player = props.data;
  return (
      <div className={styles.player}>
        <div className={styles.playerInfo}>
          <div>{player.player_name}</div>
          <div>Stars: {player.stars}</div>
          <div>Rank: {player.rank}</div>
          <div>Score: {player.total_score}</div>
          <div>Badges: {player.badges_count}</div>

        </div>
        {/* <Badges player_badges={player.badges} /> */}
        <Rooms scores={player.high_scores} />
      </div>
    );
}

export function Rooms(props) {
  const rooms = useSelector(selectRooms);
  const levels = useSelector(selectLevels);

  return (
    <div className={styles.rooms}>
      {map(rooms, (item, i) => <Room room={item} scores={props.scores} key={i} />)}
    </div>
  )

  // return (
  // <div>{game.name} [{playerScore.level_id}] Score:{playerScore.score}</div>
  // );
}

export function Room(props) {
  const games = useSelector(selectGames);

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

  var style = "";
  if(player_score != "-")
  {
    switch(diff) {
      case 0: style = styles.range0; break;
      case 1: style = styles.range1; break;
      case 2: style = styles.range2; break;
      case 3: style = styles.range3; break;
      case 4: style = styles.range4; break;
      case 5: style = styles.range5; break;
      case 6: style = styles.range6; break;
      case 7: style = styles.range7; break;
      case 8: style = styles.range8; break;
      default: style = styles.range9; break;
    }
  }

  return (
    <div className={[styles.level, style].join(' ')}>
      <label title={`${props.game.name} ${parseInt(props.level_id) + 1} \nPlayer score: ${player_score} \n    Top score: ${top_score}`}>{player_score}</label>
    </div>
  );
}


export function Badges(props) {
  let badges = map(props.player_badges, (item, i) => <Badge data={item} key={i} />);
  
  return (
    <div>
      <div>{badges}</div>
    </div>
  );
}

export function Badge(props) {
  const badges = useSelector(selectBadges);

  let playerBadge = props.data;
  let badge = badges[playerBadge.achievement_id];
  return (
    <div>
      <div>{badge.name} {badge.description} {playerBadge.status} {playerBadge.progress}/{badge.total_progress}</div>
    </div>
  )
}

function map(obj, action) {
  let arr = [];
  for(var key in obj) {
    let component = action(obj[key], key);
    arr.push(component);
  }
  return arr;
}