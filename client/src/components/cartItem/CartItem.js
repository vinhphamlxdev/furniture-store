import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  removeFromCart,
  setQuantityCart,
} from "../../redux-toolkit/cartSlice/cartSlice";
import handleAddToCart from "../../utils/handleAddToCart";
import handleRemoveFromWishlist from "../../utils/handleRemoveFromWishlist";
import Button from "../Button/Button";
const CartItem = ({ item = {}, isWishList = false }) => {
  const dispatch = useDispatch();

  const { id, thumbnail, name, salePrice, quantity } = item;
  const handleRemoveFromCart = (productNeedRemove) => {
    Swal.fire({
      text: "Bạn muốn xóa sản phẩm này khỏi giỏ hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(productNeedRemove));
        Swal.fire({
          text: "Sản phẩm đã được xóa khỏi giỏ hàng!",
          icon: "success",
        });
      }
    });
  };
  const updateQuantity = (type) => {
    dispatch(setQuantityCart({ id, type }));
  };
  return (
    <StyledCartItem className="flex py-3 border-t border-b border-gray-300 cart-row">
      <div className="flex w-5/12 gap-x-1">
        <div className="relative flex items-center cursor-pointer">
          {isWishList && (
            <button
              onClick={() => handleRemoveFromWishlist(item, dispatch)}
              className="flex items-center justify-center mr-3 rounded-full w-9 h-9 bg-bgPrimary"
            >
              <i className="bi text-white leading-[0px]  text-lg bi-x-lg"></i>
            </button>
          )}
          <img className="rounded-md w-28" src={thumbnail} alt="" />
        </div>
        <div className="flex flex-col items-start justify-center p-2">
          <h5 className="text-base font-semibold transition-all duration-500 cursor-pointer text-secondary whitespace-nowrap hover:text-primary">
            {name}
          </h5>
          <span>COLOR: Blue</span>
        </div>
      </div>
      <div
        className={`grid w-full  gap-x-3 ${
          isWishList ? "grid-cols-3" : "grid-cols-4"
        }`}
      >
        <div className="flex items-center justify-center text-base font-semibold flex-center text-secondary">
          330.000$
        </div>
        {isWishList && (
          <span className="flex items-center justify-center text-base font-light text-bgPrimary">
            in stock
          </span>
        )}
        {!isWishList && (
          <div className="flex items-center justify-center">
            <div
              onClick={() => updateQuantity("-")}
              className="select-none btn-decrease"
            >
              -
            </div>
            <div className="cart-quantity">{quantity}</div>
            <div
              onClick={() => updateQuantity("+")}
              className="select-none btn-increase"
            >
              +
            </div>
          </div>
        )}
        <div className="flex items-center justify-center text-base font-semibold text-secondary">
          {!isWishList ? (
            <span>{quantity * salePrice}</span>
          ) : (
            <Button
              onClick={() => handleAddToCart(item, 1, dispatch)}
              className="btn-add-to-cart"
            >
              Thêm Vào Giỏ Hàng
            </Button>
          )}
        </div>
        {!isWishList && (
          <div className="flex-center">
            <i
              onClick={() => handleRemoveFromCart(item)}
              className="text-xl font-semibold transition-all duration-500 cursor-pointer select-none text-bgPrimary bi bi-trash"
            />
          </div>
        )}
      </div>
    </StyledCartItem>
  );
};

export default CartItem;
const StyledCartItem = styled.div`
  .btn-add-to-cart {
    border: 0;
    background-color: #f51c1c;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #121a25;
    }
  }
`;