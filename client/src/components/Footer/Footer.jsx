import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa assumenda ratione, ea sunt et esse animi, eius natus perferendis architecto quidem suscipit alias quibusdam ut vel! Cum ab molestiae dignissimos.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook-icon" />
            <img src={assets.twitter_icon} alt="twitte-icon" />
            <img src={assets.linkedin_icon} alt="linkedIn-icon" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 7536061133</li>
                <li>vikas@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyringt 2024 &copy; Tomato.com - All Right Reserved.</p>
    </div>
  );
};

export default Footer;
