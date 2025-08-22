import { useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import ItemsList from "./ItemsList";
import { clearCart } from "../utils/features/cartSlice";

// Selector with safe fallback
const selectCartItems = (state) => state.cart?.items ?? [];

// Robust price extractor (₹ stored as paise in your app)
const getItemPrice = (item) => {
  const p = item?.card?.info?.defaultPrice ?? item?.card?.info?.price ?? item?.price ?? 0;
  return p / 100; // convert paise -> INR
};

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems, shallowEqual);

  const itemCount = cartItems.length;

  const subtotal = useMemo(() => cartItems.reduce((sum, it) => sum + getItemPrice(it), 0), [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className="max-w-3xl mx-auto p-4 md:p-6">
      <header className="flex items-baseline justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
        <p className="text-sm text-gray-600">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </header>

      {itemCount === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {/* Summary / Actions */}
          <div className="flex flex-col gap-3  p-2 sm:flex-row sm:items-center sm:justify-between ">
            <div className="text-sm text-gray-700">
              <span className="font-medium">Subtotal:</span> {formatINR(subtotal)}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClearCart}
                className="px-3 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                aria-label="Clear all items from cart"
              >
                Clear cart
              </button>

              <Link to="/" className="px-3 py-2 rounded-xl border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                Continue shopping
              </Link>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white shadow-sm p-2">
            <ItemsList items={cartItems} />
          </div>
        </div>
      )}
    </section>
  );
};

const EmptyState = () => (
  <div className="text-center bg-white border rounded-2xl p-10 shadow-sm">
    <p className="text-lg font-semibold mb-2">Your cart is empty</p>
    <p className="text-gray-600 mb-6">Head back to the home page and add something tasty.</p>
    <Link
      to="/"
      className="inline-block px-4 py-2 rounded-xl bg-primary text-white hover:scale-115 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
    >
      Go to Home
    </Link>
  </div>
);

export default Cart;
