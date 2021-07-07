import styles from './tabs.module.css'

export default function Tabs({ tabs, onChange }) {
  return (
    <div className={styles['tabs']}>
      <div className={styles['icon']}> 🍽 </div>
      {tabs.map(({ id, label }) => (
        <div key={id} onClick={() => onChange(id)} className={styles['tab']}>
          {label}
        </div>
      ))}
    </div>
  );
}
