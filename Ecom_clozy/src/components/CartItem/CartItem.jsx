import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import BagIcon from "../icons/BagIcon";
import Button from "../Buttons/Button";
import Item from "./Item";
import { useCart } from "../../context/cart/CartProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CartItem() {
  const { cart, addItem, removeItem, deleteItem, addOne } = useCart();
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState("");
  const navigate = useNavigate();

  const noOfItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleAnimate = useCallback(() => {
    if (noOfItems === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [noOfItems]);

  useEffect(() => {
    handleAnimate();
    const timer = setTimeout(() => setAnimate(""), 1000);
    return () => clearTimeout(timer);
  }, [handleAnimate]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);


  const { user, setRedirectPath, setLoginModalOpen } = useAuth();

  const handleCheckout = () => {
    // closeModal();
    if (!user) {
      setRedirectPath("/checkout")
      setLoginModalOpen(true)
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      <div className="relative">
        <button type="button" onClick={openModal} aria-label="Cart">
          <BagIcon extraClass="h-8 w-8 sm:h-6 sm:w-6" />
          {noOfItems > 0 && (
            <span className={`${animate} absolute text-xs -top-3 bg-gray500 text-gray100 py-1 px-2 rounded-full`}>
              {noOfItems}
            </span>
          )}
        </button>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" open={open} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-right">
            <div className="flex min-h-full justify-end">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative w-full max-w-md h-screen bg-white shadow-xl flex flex-col">
                  <div className="bg-lightgreen flex justify-between items-center p-6">
                    <h3 className="text-xl">Cart ({noOfItems})</h3>
                    <button type="button" className="outline-none focus:outline-none text-3xl sm:text-2xl" onClick={closeModal}>
                      &#10005;
                    </button>
                  </div>

                  <div className="px-4 flex-grow overflow-y-auto">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <Item
                          key={item.id}
                          name={item.name}
                          price={item.price}
                          qty={item.qty}
                          img={item.img1}
                          item={item}
                          onAdd={() => addOne(item)}
                          onRemove={() => removeItem(item)}
                          onDelete={() => deleteItem(item)}
                        />
                      ))
                    ) : (
                      <p className="text-center text-gray500 mt-10">Your cart is empty</p>
                    )}
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex justify-between mb-4">
                      <span>Subtotal</span>
                      <span>$ {subtotal.toFixed(2)}</span>
                    </div>

                    <Button
                      value="Checkout"
                      onClick={handleCheckout}
                      disabled={cart.length < 1}
                      extraClass="w-full text-center mt-2"
                      size="lg"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
