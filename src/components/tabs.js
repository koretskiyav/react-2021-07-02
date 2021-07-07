import style from './tabs.module.css';

export default function Tabs({ tabs, onChange }) {
  return (
    <div>
      {tabs.map(({ id, label }) => (
        <button className={style.tabs} key={id} onClick={() => onChange(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}
