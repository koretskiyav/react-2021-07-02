export default function Tabs({ tabs, onChange }) {
  return (
    <div>
      {tabs.map(({ id, label, reviews}) => (
        <button key={id} onClick={() => onChange(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}
