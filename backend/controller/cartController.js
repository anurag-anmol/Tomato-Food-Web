import userModel from "../models/userModel.js";

//add items to cart ..
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart successfully ... " });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in adding to cart ... " });

    }
};

//remove items from cart ..
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Removes Item is Success .... " })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in removing to cart ... " });
    }
};

//get cart items ..
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in listing to cart ... " });
    }
};

export { addToCart, removeFromCart, getCart };