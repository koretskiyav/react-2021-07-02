import Rate from './rate'

export default function Tabs({ tabs, onChange }) {

  return (
    <div>
      {tabs.map(({ id, label, reviews}) => (
        <button key={id} onClick={() => onChange(id)}>
          {label}
            <Rate value={rating(reviews)} />
        </button>
      ))}
    </div>
  );
}


const rating = (reviews) => {

  return (
    Math.round(
      reviews.reduce((sum, current) => sum + current.rating, 0
    ) / reviews.length));
}
