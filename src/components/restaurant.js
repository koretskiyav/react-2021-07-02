import Menu from './menu';
import Reviews from "./reviews";
import {useMemo} from "react";

export default function Restaurant({ menu, reviews }) {
    const activeRestaurant = useMemo(
        () => reviews.map(({ rating }) => rating),
        [reviews]);

    const rate = useMemo(
        () => activeRestaurant.reduce((a, b) => (a + b)) / activeRestaurant.length,
        [activeRestaurant]);

    return (
        <div>
          <Menu menu={menu} />
          <Reviews reviews={reviews} rate={Math.round(+rate)}/>
        </div>
  );
}
