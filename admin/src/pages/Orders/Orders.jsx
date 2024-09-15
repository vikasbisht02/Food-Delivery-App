import { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        // Ensure response.data.data is an array
        setOrders(Array.isArray(response.data.data) ? response.data.data : []);
        console.log(response.data.data);
      } else {
        toast.error("Error, Try Again Later");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders. Please try again later.");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating status. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Add url to dependencies if it can change

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="order-item" key={order._id}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item) => (
                    <span key={item._id}>
                      {item.name} x {item.quantity}
                      {item !== order.items[order.items.length - 1] && ", "}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Item: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No Orders</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
