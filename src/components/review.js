import Rate from './rate';

export default function Review({ user: name, text: description, rating }) {
    return (
        <div>
            <p>{name}</p>
            <p>{description} $</p>
            <Rate value={rating} />
        </div>
    );
}
