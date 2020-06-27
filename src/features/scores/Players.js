import React from 'react';
import map from '../../app/map';
import { useSelector } from 'react-redux';
import { selectPlayers } from './playersSlice';
import { selectLevels } from './roomsSlice';
import { selectBadges } from './badgesSlice';

import styles from './Scores.module.css';
import Scores from './Scores'
import Badges from './Badges'


export function Players() {
  const players = useSelector(selectPlayers);
  //const dispatch = useDispatch();
  //const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div class={styles.scorecards}>
      {map(players, (item, i) => <Player player={item} key={i} />)}
    </div>
  );
}

export function Player(props) {

  const levels = useSelector(selectLevels);
  const badges = useSelector(selectBadges);

  let player = props.player;
  if(player.isLoading){
    return (<div>Loading {player.player_name}</div>);
  }

  let totalStars = getTotalStars(levels, badges);
  let totalBadges = Object.keys(badges).length;
  return (
      <div className={styles.scorecard}>
        <div className={styles.playerInfo}>
          <div className={styles.playerContent}>
            <div className={styles.playerName}>{player.player_name}</div>
            <div className={styles.playerStars}><span>Stars:</span> {player.stars} / {totalStars}</div>
            <div className={styles.playerRank}><span>Rank:</span> {player.rank}</div>
            <div className={styles.playerScore}><span>Score:</span> {player.total_score}</div>
            <div className={styles.playerBadges}><span>Badges:</span> {player.badges_count} / {totalBadges}</div>
          </div>
        </div>
        <div className={styles.playerDetails}>
          <Scores scores={player.high_scores} />
          <Badges player_badges={player.badges} />
        </div>
      </div>
    );
}

export function getTotalStars(levels, badges) {
  let levelTotal = 0;
  map(levels, (item, i) => levelTotal += getLevelStars(item))

  let badgeTotal = 0;
  map(badges, (item, i) => badgeTotal += getBadgeStars(item));

  return levelTotal + badgeTotal;
}

function getLevelStars(level) {
  if(level.status === '1')
  {
    return 1;
  }
  return 0;
}

function getBadgeStars(badge) {
  switch(badge.medal) {
    case "bronze": return 1;
    case "silver": return 2;
    case "gold": return 3;
    default: return 0;
  }
}