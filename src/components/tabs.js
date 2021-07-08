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
  const rating = []

  reviews.forEach((sum) => {
    rating.push(sum.rating);
  });

  return (Math.round(rating.reduce((sum, current) => sum + current, 0) / reviews.length));
}
