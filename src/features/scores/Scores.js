import React, { 
  // useState 
} from 'react';
import { 
  useSelector, 
  // useDispatch 
} from 'react-redux';
import {
  selectPlayers
} from './playersSlice';
import {
  selectBadges
} from './badgesSlice';
import styles from './Scores.module.css';
import { 
  selectRooms, 
  // selectGames, 
  // selectLevels 
} from './roomsSlice';

export function Scores() {
  const players = useSelector(selectPlayers);
  //const dispatch = useDispatch();
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