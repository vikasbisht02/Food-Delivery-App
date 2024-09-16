import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [payMethod, setPayMethod] = useState("cod");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Handling input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    const phoneValid = /^[0-9]{10}$/.test(data.phone); // Simple phone number validation
    if (!phoneValid) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  // Placing order by Card
  const placeOrderByCard = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50, // Delivery fee of 50
    };

    try {
      setLoading(true);
      const response = await axios.post(`${url}/api/order/card`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success && response.data.session_url) {
        window.location.replace(response.data.session_url);
      } else {
        toast.error("Error, please try again later.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error placing order";
      toast.error("Card method not working");
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Placing order by Cash on Delivery (COD)
  const placeOrderByCod = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50, // Delivery fee of 50
    };

    try {
      setLoading(true);
      const response = await axios.post(`${url}/api/order/cod`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Order placed successfully");
        navigate("/"); // Redirect to home or order confirmation page
        // Clear cart or reset form after successful order if necessary
      } else {
        toast.error("Error, please try again later.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error placing order";
      toast.error(errorMessage);
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form
      className="place-order"
      onSubmit={payMethod === "cod" ? placeOrderByCod : placeOrderByCard}
    >
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        {/* Delivery form inputs */}
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone number"
          required
        />

       

     
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              {getTotalCartAmount() ? <p>&#8377;{50}</p> : <p>&#8377;0</p>}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {getTotalCartAmount() ? (
                <b>&#8377;{getTotalCartAmount() + 50}</b>
              ) : (
                <p>&#8377;0</p>
              )}
            </div>
          </div>
        </div>
        <p className="payTitle">Payment Method</p>
        <div className="cod">
          <label className="label" htmlFor="cod">Cash On Delivery</label>
          <input
          className="radio"
            onChange={() => setPayMethod("cod")}
            type="radio"
            name="payment"
            id="cod"
            checked={payMethod === "cod"}
          />
        </div>
        <div className="stripe">
          <label className="label" htmlFor="card">Credit/Debit Card</label>
          <input className="radio"
            onChange={() => setPayMethod("card")}
            type="radio"
            name="payment"
            id="card"
            checked={payMethod === "card"}
          />
        </div>
        <button className="submit" type="submit" disabled={loading}>
          {loading ? "Processing..." : "PROCEED TO CHECKOUT"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
