import React from 'react';
import map from '../../app/map';
import { useSelector } from 'react-redux';
import { selectBadges } from './badgesSlice';
import styles from './Badges.module.css';

export default function Badges(props) {
  const badges = useSelector(selectBadges);

  return (
    <div className={styles.badges}>
      {getBadges(badges, props.player_badges, 'bronze')}
      {getBadges(badges, props.player_badges, 'silver')}
      {getBadges(badges, props.player_badges, 'gold')}
    </div>
  );
}

export function getBadges(badges, player_badges, medal) {

  return map(badges, (item, i) => 
  <Badge 
    badge={item} 
    player_badges={player_badges} 
    key={i} 
  />, 
  (item) => item.medal === medal);
}

export function Badge(props) {
  let badge = props.badge;
  let playerBadge = props.player_badges[badge.id];

  let progress = (playerBadge ? playerBadge.progress : 0);

  let medalStyle = styles['badge-'+badge.medal];
  let completionStyle = styles['badge-'+(playerBadge && playerBadge.status === "1" ? "complete" : "incomplete")];

  return (
    <div className={[styles.badge, medalStyle, completionStyle ].join(' ')}>
      <div><label title={`${badge.description} [${progress}/${badge.total_progress}]`}>{badge.name}</label></div>
    </div>
  )
}