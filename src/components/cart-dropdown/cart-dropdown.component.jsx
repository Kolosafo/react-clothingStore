import {
  CartDropdownComponent,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import React from "react";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownComponent>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage> Your Cart Is Empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType="inverted" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </CartDropdownComponent>
  );
};

export default CartDropDown;
