import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
    try {
        // Find the user
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        // Ensure cartData is initialized
        let cartData = userData.cartData || {};

        // Add or update item in the cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update user document
        await userModel.updateOne({ _id: req.body.userId }, { $set: { cartData } });

        res.json({
            success: true,
            message: "Added to cart",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = userData.cartData || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId]; // Remove item if quantity is 0
            }
        }

        await userModel.updateOne({ _id: req.body.userId }, { $set: { cartData } });
        res.json({ success: true, message: "Removed From Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is initialized
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, removeFromCart, getCart };
