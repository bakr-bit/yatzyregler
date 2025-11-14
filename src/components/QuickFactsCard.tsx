import styles from './QuickFactsCard.module.css';

interface QuickFactsCardProps {
  players: string;
  playTime: string;
  equipment: string[];
  goal: string;
}

export default function QuickFactsCard({
  players,
  playTime,
  equipment,
  goal,
}: QuickFactsCardProps) {
  return (
    <div className={styles['quick-facts-card']}>
      <h3>📊 Snabbfakta</h3>
      <div className={styles['facts-grid']}>
        <div className={styles['fact-item']}>
          <span className={styles['fact-icon']}>👥</span>
          <div>
            <strong>Spelare</strong>
            <p>{players}</p>
          </div>
        </div>
        <div className={styles['fact-item']}>
          <span className={styles['fact-icon']}>⏱️</span>
          <div>
            <strong>Speltid</strong>
            <p>{playTime}</p>
          </div>
        </div>
        <div className={styles['fact-item']}>
          <span className={styles['fact-icon']}>🎲</span>
          <div>
            <strong>Utrustning</strong>
            <ul>
              {equipment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${styles['fact-item']} ${styles['fact-goal']}`}>
          <span className={styles['fact-icon']}>🎯</span>
          <div>
            <strong>Mål</strong>
            <p>{goal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
