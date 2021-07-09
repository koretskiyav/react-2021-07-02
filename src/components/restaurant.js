import Menu from './menu';
import Reviews from "./reviews";
import Rate from "./rate";
import restaurantRate from "../hocs/restaurantRate";

function Restaurant({ restaurant, restaurantRate }) {
    return (
        <div>
            <div>
                <h2>{restaurant.name}</h2>
                <Rate value={restaurantRate} />
            </div>
            <Menu menu={restaurant.menu} />
            <Reviews reviews={restaurant.reviews} />
        </div>
    );
}

export default restaurantRate(Restaurant);