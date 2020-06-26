import React from 'react';
import map from '../../app/map';
import { useSelector } from 'react-redux';
import { selectPlayers } from './playersSlice';
import { selectBadges } from './badgesSlice';

import styles from './Scores.module.css';
import Scores from './Scores'
import Badges from './Badges'


export function Players() {
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
        <div className={styles.playerContent}>
          <Scores scores={player.high_scores} />
          <Badges player_badges={player.badges} />
        </div>
      </div>
    );
}