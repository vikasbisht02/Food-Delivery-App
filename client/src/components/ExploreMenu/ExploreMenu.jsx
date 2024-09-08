import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose form a diverse menu featuring a delectabelarray of dishes crafted
        with the finest ingrediets and culinary expertise. Our mission is to
        saitsfy your cravings and elevate your dining exprience. one delicious
        meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))
                
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img src={item.menu_image} alt="item-image" className={category===item.menu_name?"active" : ""} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
