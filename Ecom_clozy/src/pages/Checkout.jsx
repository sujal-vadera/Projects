// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import Button from "../components/Buttons/Button";
// import Input from "../components/Input/Input";
// import { roundDecimal } from "../components/Util/utilFunc";
// import { useCart } from "../context/cart/CartProvider";
// import { useAuth } from "../context/AuthContext";

// const ShoppingCart = () => {
//   const { cart, clearCart } = useCart();
//   const auth = useAuth();

//   const [deli, setDeli] = useState("STORE_PICKUP");
//   const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");

//   // Form Fields
//   const [name, setName] = useState(auth.user?.displayName || "");
//   const [email, setEmail] = useState(auth.user?.email || "");
//   const [phone, setPhone] = useState(auth.user?.phone || "");
//   const [password, setPassword] = useState("");
//   const [diffAddr, setDiffAddr] = useState(false);
//   const [address, setAddress] = useState(auth.user?.shippingAddress || "");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [isOrdering, setIsOrdering] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [completedOrder, setCompletedOrder] = useState(null);
//   const [orderError, setOrderError] = useState("");
//   const [sendEmail, setSendEmail] = useState(false);

//   const products = cart.map((item) => ({
//     id: item.id,
//     quantity: item.qty,
//   }));

//   useEffect(() => {
//     if (!isOrdering) return;

//     setErrorMsg("");

//     const registerUser = async () => {
//       if (!auth.user) {
//         const regResponse = await auth.register(email, name, password, address, phone);
//         if (!regResponse.success) {
//           setIsOrdering(false);
//           setErrorMsg(regResponse.message === "alreadyExists" ? "Email already exists" : "Error occurred");
//           return false;
//         }
//       }
//     };

//     const makeOrder = async () => {
//       if (!auth.user) return;
//       try {
//         const res = await axios.post(
//           `https://example.com/api/orders`, // Replace with real backend
//           {
//             customerId: auth.user.id,
//             shippingAddress: shippingAddress ? shippingAddress : address,
//             totalPrice: subtotal,
//             deliveryDate: new Date().setDate(new Date().getDate() + 7),
//             paymentType: paymentMethod,
//             deliveryType: deli,
//             products,
//             sendEmail,
//           }
//         );
//         if (res.data.success) {
//           setCompletedOrder(res.data.data);
//           clearCart();
//           setIsOrdering(false);
//         } else {
//           setOrderError("Error occurred while placing order");
//         }
//       } catch (err) {
//         setOrderError("Network/Error occurred");
//       }
//     };

//     registerUser().then(makeOrder);
//   }, [isOrdering]);

//   useEffect(() => {
//     if (auth.user) {
//       setName(auth.user.displayName);
//       setEmail(auth.user.email);
//       setAddress(auth.user.shippingAddress || "");
//       setPhone(auth.user.phone || "");
//     } else {
//       setName("");
//       setEmail("");
//       setAddress("");
//       setPhone("");
//     }
//   }, [auth.user]);

//   const disableOrder = !name || !email || !phone || !address || (!auth.user && !password);

//   const subtotal = roundDecimal(
//     cart.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   const deliFee = deli === "YANGON" ? 2 : deli === "OTHERS" ? 7 : 0;

//   return (
//     <div>
//       <Header title="Shopping Cart" />

//       <main>
//         {!completedOrder ? (
//           <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-20 mb-14">
//             <div className="w-full lg:w-7/12 mr-8">
//               {errorMsg && <span className="text-red-600">{errorMsg}</span>}
//               <div className="my-4">
//                 <label>Name</label>
//                 <Input value={name} onChange={(e) => setName(e.target.value)} />
//               </div>
//               <div className="my-4">
//                 <label>Email</label>
//                 <Input value={email} readOnly={!!auth.user} onChange={(e) => setEmail(e.target.value)} />
//               </div>
//               {!auth.user && (
//                 <div className="my-4">
//                   <label>Password</label>
//                   <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//               )}
//               <div className="my-4">
//                 <label>Phone</label>
//                 <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
//               </div>
//               <div className="my-4">
//                 <label>Address</label>
//                 <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={4} />
//               </div>

//               <div>
//                 <input type="checkbox" checked={diffAddr} onChange={() => setDiffAddr(!diffAddr)} /> Different shipping address
//               </div>
//               {diffAddr && (
//                 <div className="my-4">
//                   <label>Shipping Address</label>
//                   <textarea value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} rows={4} />
//                 </div>
//               )}
//             </div>

//             <div className="w-full lg:w-5/12 mt-10 lg:mt-4">
//               <div className="border p-6">
//                 <h3>Cart Summary</h3>
//                 {cart.map((item) => (
//                   <div key={item.id} className="flex justify-between">
//                     <span>{item.name} x {item.qty}</span>
//                     <span>${roundDecimal(item.price * item.qty)}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-3">
//                   <span>Subtotal</span>
//                   <span>${subtotal}</span>
//                 </div>
//                 <div className="flex justify-between mt-3">
//                   <span>Delivery</span>
//                   <span>${deliFee}</span>
//                 </div>
//                 <div className="flex justify-between mt-3 font-bold">
//                   <span>Grand Total</span>
//                   <span>${roundDecimal(subtotal + deliFee)}</span>
//                 </div>

//                 <div className="mt-4">
//                   <h4>Payment Method</h4>
//                   <div>
//                     <input type="radio" checked={paymentMethod === "CASH_ON_DELIVERY"} onChange={() => setPaymentMethod("CASH_ON_DELIVERY")} /> Cash on Delivery
//                   </div>
//                   <div>
//                     <input type="radio" checked={paymentMethod === "BANK_TRANSFER"} onChange={() => setPaymentMethod("BANK_TRANSFER")} /> Bank Transfer
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <input type="checkbox" checked={sendEmail} onChange={() => setSendEmail(!sendEmail)} /> Send order email
//                 </div>

//                 <Button value="Place Order" onClick={() => setIsOrdering(true)} disabled={disableOrder} />
//                 {orderError && <span className="text-red-600">{orderError}</span>}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="px-4 sm:px-8 md:px-20 mb-14 mt-6">
//             <h2>Thank You! Your Order is Placed.</h2>
//             <div>Order ID: {completedOrder.orderNumber}</div>
//             <div>Total: ${completedOrder.totalPrice}</div>
//             <div>Payment: {completedOrder.paymentType}</div>
//             <div>Delivery: {completedOrder.deliveryType}</div>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ShoppingCart;

// import React, { useEffect, useState } from "react";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import Button from "../components/Buttons/Button";
// import Input from "../components/Input/Input";
// import { roundDecimal } from "../components/Util/utilFunc";
// import { useCart } from "../context/cart/CartProvider";
// import { useAuth } from "../context/AuthContext";
// import { saveOrderToFirestore } from "../firebaseOrders";
// import { useNavigate } from "react-router-dom";
// import LoginForm from "../components/Auth/AuthForm";


// const ShoppingCart = () => {
//   const { cart, clearCart, updateQty } = useCart();
//   const auth = useAuth();
//   const navigate = useNavigate()

//   // States
//   const [deliveryType, setDeliveryType] = useState("STORE_PICKUP");
//   const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");

//   const [name, setName] = useState(auth.user?.displayName || "");
//   const [email, setEmail] = useState(auth.user?.email || "");
//   const [phone, setPhone] = useState(auth.user?.phone || "");
//   const [address, setAddress] = useState(auth.user?.shippingAddress || "");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [diffAddr, setDiffAddr] = useState(false);

//   const [password, setPassword] = useState(""); // agar register karna ho
//   const [isOrdering, setIsOrdering] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [orderError, setOrderError] = useState("");
//   const [completedOrder, setCompletedOrder] = useState(null);
//   const [sendEmail, setSendEmail] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);


//   const subtotal = roundDecimal(
//     cart.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   const deliFee =
//     deliveryType === "HOME_DELIVERY" ? 5 : 0;

//   const disableOrder =
//     !name.trim() || !email.trim() || !phone.trim() || !address.trim();

//   useEffect(() => {
//   if (auth.user) {
//     setName(auth.user.displayName || "");
//     setEmail(auth.user.email || "");
//     setPhone(auth.user.phone || "");
//     setAddress(auth.user.shippingAddress || "");
//   } else {
//     setName("");
//     setEmail("");
//     setPhone("");
//     setAddress("");
//   }
// }, [auth.user]);


//   // Place Order Function
//   useEffect(() => {
//     if (!isOrdering) return;

//     const placeOrder = async () => {
//       setErrorMsg("");
//       setOrderError("");

//       try {
//         // Register user if not logged in
//         if (!auth.user) {
//           const regResponse = await auth.register(
//             email,
//             name,
//             password,
//             address,
//             phone
//           );
//           if (!regResponse.success) {
//             setErrorMsg(
//               regResponse.message === "alreadyExists"
//                 ? "Email already exists"
//                 : "Error during registration"
//             );
//             setIsOrdering(false);
//             return;
//           } else {
//             await auth.login(email, password)
//           }
//         }

//         // Prepare Order Data
//         const orderData = {
//           createdAt: new Date(),
//           customerUid: auth.user?.uid || null,
//           customerId: auth.user?.id || null,
//           customerName: name,
//           email,
//           phone,
//           address,
//           shippingAddress: diffAddr ? shippingAddress : address,
//           paymentType: paymentMethod,
//           deliveryType,
//           deliveryDate: Date.now(),
//           sendEmail,
//           products: cart.map((item) => ({
//             id: item.id,
//             name: item.name,
//             price: item.price,
//             quantity: item.qty,
//           })),
//           totalPrice: roundDecimal(subtotal + deliFee),
//         };

//         const orderId = await saveOrderToFirestore(orderData);
//         setCompletedOrder({ ...orderData, orderNumber: orderId });
//         clearCart();
//         console.log("✅ Order placed with ID:", orderId);
//       } catch (err) {
//         console.error(err);
//         setOrderError("Error saving order to Firebase");
//       }

//       setIsOrdering(false);

//     };

//     placeOrder();

//   }, [isOrdering]);

//   useEffect(() => {
//     if (completedOrder) {
//       const timer = setTimeout(() => {
//         navigate("/");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [completedOrder, navigate]);


//   return (
//     <div>
//       <Header title="Shopping Cart" />
//       <main>
//         {!completedOrder ? (
//           <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-20 mb-14">
//             {/* LEFT SIDE - FORM */}
//             <div className="w-full lg:w-7/12 mr-8">
//               {errorMsg && <span className="text-red-600">{errorMsg}</span>}

//               <div className="my-4">
//                 <label className="font-medium pr-3">Name</label>
//                 <Input value={name} onChange={(e) => setName(e.target.value)} readOnly={!!auth.user} />
//               </div>

//               <div className="my-4">
//                 <label className="font-medium pr-3">Email</label>
//                 <Input
//                   value={email}
//                   readOnly={!!auth.user}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="my-4">
//                 <label className="font-medium pr-3">Phone</label>
//                 <Input
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="Enter your phone"
//                   required
//                 />
//               </div>

//               <div className="my-4">
//                 <label className="block mb-1 font-medium">Address</label>
//                 <textarea
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   rows={4}
//                   placeholder="Enter your address"
//                   required
//                   className="w-60 border rounded p-2"
//                 />
//               </div>

//               <div>
//                 <input
//                   type="checkbox"
//                   checked={diffAddr}
//                   onChange={() => setDiffAddr(!diffAddr)}
//                 />{" "}
//                 Different shipping address
//               </div>

//               {diffAddr && (
//                 <div className="my-4">
//                   <label className="font-medium block mb-1 pr-3">
//                     Shipping Address
//                   </label>
//                   <textarea
//                     value={shippingAddress}
//                     onChange={(e) => setShippingAddress(e.target.value)}
//                     rows={4}
//                     className="w-60 border rounded p-2"
//                   />
//                 </div>
//               )}

//               {/* {!auth.user && (
//                 <div className="my-4">
//                   <label className="font-medium pr-3">Password</label>
//                   <Input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter password"
//                   />
//                 </div>
//               )} */}



//               {/* Delivery Type */}
//               <div className="my-4">
//                 <h4 className="font-medium">Delivery Type</h4>
//                 <div>
//                   <input
//                     type="radio"
//                     checked={deliveryType === "STORE_PICKUP"}
//                     onChange={() => setDeliveryType("STORE_PICKUP")}
//                   />{" "}
//                   Store Pickup
//                 </div>
//                 <div>
//                   <input
//                     type="radio"
//                     checked={deliveryType === "HOME_DELIVERY"}
//                     onChange={() => setDeliveryType("HOME_DELIVERY")}
//                   />{" "}
//                   Home Delivery
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE - SUMMARY */}
//             <div className="w-full lg:w-5/12 mt-10 lg:mt-4">
//               <div className="border p-6">
//                 <h3>Cart Summary</h3>
//                 {cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex justify-between items-center my-2"
//                   >
//                     <span>{item.name}</span>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => updateQty(item.id, item.qty - 1)}
//                         className="px-2 bg-gray-200"
//                       >
//                         -
//                       </button>
//                       <span>{item.qty}</span>
//                       <button
//                         onClick={() => updateQty(item.id, item.qty + 1)}
//                         className="px-2 bg-gray-200"
//                       >
//                         +
//                       </button>
//                       <span>${roundDecimal(item.price * item.qty)}</span>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="flex justify-between mt-3">
//                   <span>Subtotal</span>
//                   <span>${subtotal}</span>
//                 </div>
//                 <div className="flex justify-between mt-3">
//                   <span>Delivery</span>
//                   <span>${deliFee}</span>
//                 </div>
//                 <div className="flex justify-between mt-3 font-bold">
//                   <span>Grand Total</span>
//                   <span>${roundDecimal(subtotal + deliFee)}</span>
//                 </div>

//                 {/* Payment Method */}
//                 <div className="mt-4">
//                   <h4>Payment Method</h4>
//                   <div>
//                     <input
//                       type="radio"
//                       checked={paymentMethod === "CASH_ON_DELIVERY"}
//                       onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
//                     />{" "}
//                     Cash on Delivery
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       checked={paymentMethod === "BANK_TRANSFER"}
//                       onChange={() => setPaymentMethod("BANK_TRANSFER")}
//                     />{" "}
//                     Bank Transfer
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <input
//                     type="checkbox"
//                     checked={sendEmail}
//                     onChange={() => setSendEmail(!sendEmail)}
//                   />{" "}
//                   Send order email
//                 </div>

//                 <Button
//                   value="Place Order"
//                   onClick={() => setIsOrdering(true)}
//                   disabled={disableOrder}
//                 />
//                 {orderError && (
//                   <span className="text-red-600">{orderError}</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="px-4 sm:px-8 md:px-20 mb-14 mt-6">
//             <h2>✅ Thank You! Your Order is Placed.</h2>
//             <div>Order ID: {completedOrder.orderNumber}</div>
//             <div>Total: ${completedOrder.totalPrice}</div>
//             <div>Payment: {completedOrder.paymentType}</div>
//             <div>Delivery: {completedOrder.deliveryType}</div>
//             {completedOrder.customerUid && (
//               <div>Your User ID: {completedOrder.customerUid}</div>
//             )}
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ShoppingCart;

import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import Input from "../components/Input/Input";
import { roundDecimal } from "../components/Util/utilFunc";
import { useCart } from "../context/cart/CartProvider";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/Auth/AuthForm";
import { saveOrderToFirestore } from "../firebaseOrders";
import { useLocation, useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, clearCart, updateQty } = useCart();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // --- UI States ---
  const [deliveryType, setDeliveryType] = useState("STORE_PICKUP");
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");

  const [name, setName] = useState(auth.user?.displayName || "");
  const [email, setEmail] = useState(auth.user?.email || "");
  const [phone, setPhone] = useState(auth.user?.phone || "");
  const [address, setAddress] = useState(auth.user?.shippingAddress || "");
  const [shippingAddress, setShippingAddress] = useState("");
  const [diffAddr, setDiffAddr] = useState(false);

  const [isOrdering, setIsOrdering] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderError, setOrderError] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // --- Derived amounts ---
  const subtotal = roundDecimal(
    cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const deliFee = deliveryType === "HOME_DELIVERY" ? 5 : 0;
  const calculateTotal = () => roundDecimal(subtotal + deliFee);

  const disableOrder =
    !name.trim() || !email.trim() || !phone.trim() || !address.trim() || cart.length === 0;

  // Autofill when user logs in/out
  useEffect(() => {
    if (auth.user) {
      setName(auth.user.displayName || "");
      setEmail(auth.user.email || "");
      setPhone(auth.user.phone || "");
      setAddress(auth.user.shippingAddress || "");
      setLoginModalOpen(false); // ✅ close login modal if user is logged in
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  }, [auth.user]);

  // --- Place Order (guest-friendly) ---
  useEffect(() => {
    if (!isOrdering) return;

    if (!auth.user) {
      // User not logged in → show login modal
      setLoginModalOpen(true);
      setIsOrdering(false);
      return;
    }

    const placeOrder = async () => {
      setErrorMsg("");
      setOrderError("");

      try {
        if (cart.length === 0) {
          setOrderError("Your cart is empty.");
          setIsOrdering(false);
          return;
        }

        const orderData = {
          createdAt: new Date(),
          customerUid: auth.user?.uid || null,
          customerId: auth.user?.id || null,
          customerName: name,
          email,
          phone,
          address,
          shippingAddress: diffAddr ? shippingAddress : address,
          paymentType: paymentMethod,
          deliveryType,
          deliveryDate: Date.now(),
          sendEmail,
          products: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.qty,
          })),
          totalPrice: calculateTotal(),
        };

        const orderId = await saveOrderToFirestore(orderData);
        setCompletedOrder({ ...orderData, orderNumber: orderId });
        clearCart();
      } catch (err) {
        console.error("❌ Error saving order:", err);
        setOrderError("Error saving order. Please try again.");
      } finally {
        setIsOrdering(false);
      }
    };

    placeOrder();
  }, [
    isOrdering,
    auth.user,
    deliveryType,
    paymentMethod,
    name,
    email,
    phone,
    address,
    shippingAddress,
    diffAddr,
    sendEmail,
    cart,
  ]);

  // Auto-redirect after success
  useEffect(() => {
    if (completedOrder) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [completedOrder, navigate]);

  return (
    <div>
      <Header title="Shopping Cart" />
      <main>
        {!completedOrder ? (
          <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-20 mb-14">
            {/* LEFT: FORM */}
            <div className="w-full lg:w-7/12 mr-8">
              {errorMsg && <span className="text-red-600">{errorMsg}</span>}

              {/* FORM INPUTS */}
              <div className="my-4">
                <label className="font-medium pr-3">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!!auth.user}
                />
              </div>

              <div className="my-4">
                <label className="font-medium pr-3">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!!auth.user}
                />
              </div>

              <div className="my-4">
                <label className="font-medium pr-3">Phone</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone"
                  required
                />
              </div>

              <div className="my-4">
                <label className="block mb-1 font-medium">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  placeholder="Enter your address"
                  required
                  className="w-60 border rounded p-2"
                />
              </div>

              <div>
                <input
                  type="checkbox"
                  checked={diffAddr}
                  onChange={() => setDiffAddr(!diffAddr)}
                />{" "}
                Different shipping address
              </div>

              {diffAddr && (
                <div className="my-4">
                  <label className="font-medium block mb-1 pr-3">
                    Shipping Address
                  </label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={4}
                    className="w-60 border rounded p-2"
                  />
                </div>
              )}

              {/* Delivery Type */}
              <div className="my-4">
                <h4 className="font-medium">Delivery Type</h4>
                <div>
                  <input
                    type="radio"
                    checked={deliveryType === "STORE_PICKUP"}
                    onChange={() => setDeliveryType("STORE_PICKUP")}
                  />{" "}
                  Store Pickup
                </div>
                <div>
                  <input
                    type="radio"
                    checked={deliveryType === "HOME_DELIVERY"}
                    onChange={() => setDeliveryType("HOME_DELIVERY")}
                  />{" "}
                  Home Delivery
                </div>
              </div>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="w-full lg:w-5/12 mt-10 lg:mt-4">
              <div className="border p-6">
                <h3>Cart Summary</h3>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center my-2"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.qty - 1))
                        }
                        className="px-2 bg-gray-200"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-2 bg-gray-200"
                      >
                        +
                      </button>
                      <span>${roundDecimal(item.price * item.qty)}</span>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-3">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Delivery</span>
                  <span>${deliFee}</span>
                </div>
                <div className="flex justify-between mt-3 font-bold">
                  <span>Grand Total</span>
                  <span>${calculateTotal()}</span>
                </div>

                {/* Payment Method */}
                <div className="mt-4">
                  <h4>Payment Method</h4>
                  <div>
                    <input
                      type="radio"
                      checked={paymentMethod === "CASH_ON_DELIVERY"}
                      onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
                    />{" "}
                    Cash on Delivery
                  </div>
                  <div>
                    <input
                      type="radio"
                      checked={paymentMethod === "BANK_TRANSFER"}
                      onChange={() => setPaymentMethod("BANK_TRANSFER")}
                    />{" "}
                    Bank Transfer
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={() => setSendEmail(!sendEmail)}
                  />{" "}
                  Send order email
                </div>

                <Button
                  value={isOrdering ? "Placing Order..." : "Place Order"}
                  onClick={() => setIsOrdering(true)}
                  disabled={disableOrder || isOrdering}
                />
                {orderError && (
                  <span className="text-red-600 block mt-2">{orderError}</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-8 md:px-20 mb-14 mt-6">
            <h2>✅ Thank You! Your Order is Placed.</h2>
            <div>Order ID: {completedOrder.orderNumber}</div>
            <div>Total: ${completedOrder.totalPrice}</div>
            <div>Payment: {completedOrder.paymentType}</div>
            <div>Delivery: {completedOrder.deliveryType}</div>
            {completedOrder.customerUid && (
              <div>Your User ID: {completedOrder.customerUid}</div>
            )}
          </div>
        )}
      </main>

      {/* --- Login Modal (Conditional) --- */}
      {loginModalOpen && (
        <LoginForm setLoginModalOpen={setLoginModalOpen} />
      )}

      <Footer />
    </div>
  );
};

export default ShoppingCart;
