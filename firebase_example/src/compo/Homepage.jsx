// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import db, { auth } from './Firebase'
// import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
// import Login from './login'
// import { getAuth, signOut } from 'firebase/auth'

// function Homepage() {
//   const [viewproduct, setviewproduct] = useState([])
//   const navigate = useNavigate()
  

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const querySnapShot = await getDocs(collection(db, "products"))
//       const produtsArray = querySnapShot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()

//       }))
//       setviewproduct(produtsArray)
//       console.log(produtsArray)
//     }
//     fetchProduct()
//   }, [])

//   const handelDeleteBtn = async(id) => {
//    const removebtn = await deleteDoc(doc(db,"products",id));
//    console.log("delete btn click")
//    let updatedProducts = viewproduct.filter(item => item.id !== id)
//    setviewproduct(updatedProducts)
    
//   }



//   const auth = getAuth();

//   const logoutbtn = ()=>{
//     signOut(auth)
//     .then(()=>{
//       console.log("logged out")
//       navigate("/")
//     })
//      .catch((error) => {
//       console.log("Logout error:", error.message);
//     });
//   }



//   const handelclick = () => {
//     navigate("/Addproduct")
//   }
//   return (
//     <div>
//       <div>
//         <button className='btn  btn-secondary' onClick={logoutbtn}>Logout</button>
//       </div>
//       <table className='border'>
//         <thead>
//           <tr>
//             <th className='border'>username</th>
//             <th className='border'>product name</th>
//             <th className='border'>product catgaray</th>
//             <th className='border'>product img</th>
//           </tr>
//         </thead>
//         <tbody>
//           {viewproduct.map((item) => (
//             <tr key={item.id}>
//               <td className='border'>{item.username}</td>
//               <td className='border'>{item.productName}</td>
//               <td className='border'>{item.productCategory}</td>
//               <td className='border'>
//                 {/* {item.imgUrl} */}
//                 <img src={item.imgUrl || item.fromdata?.imgUrl} alt={item.productName || item.formdata?.productName || "Product"} width="50" />
//               </td>
//               <td >
//                 <button className='btn btn-danger' onClick={()=>handelDeleteBtn(item.id)}> delete</button>
//               </td>
//             </tr>
//           ))}

//         </tbody>
//       </table>
//       <button className="btn btn-primary" onClick={handelclick}>Add more product</button>
      

//     </div>


//   )
// }

// export default Homepage

// src/compo/Homepage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Homepage() {
  const [viewproduct, setviewproduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const querySnapShot = await getDocs(collection(db, "products"));
      const produtsArray = querySnapShot.docs.map((docu) => ({
        id: docu.id,
        ...docu.data(),
      }));
      setviewproduct(produtsArray);
      console.log(produtsArray);
    };
    fetchProduct();
  }, []);

  const handelDeleteBtn = async (id) => {
    await deleteDoc(doc(db, "products", id));
    console.log("delete btn click");
    let updatedProducts = viewproduct.filter((item) => item.id !== id);
    setviewproduct(updatedProducts);
  };

  const logoutbtn = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout error:", error.message);
      });
  };

  const handelclick = () => {
    navigate("/Addproduct");
  };

  return (
    <div>
      <div>
        <button className="btn btn-secondary" onClick={logoutbtn}>
          Logout
        </button>
      </div>
      <table className="border">
        <thead>
          <tr>
            <th className="border">Username</th>
            <th className="border">Product Name</th>
            <th className="border">Product Category</th>
            <th className="border">Product Img</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {viewproduct.map((item) => (
            <tr key={item.id}>
              <td className="border">{item.username}</td>
              <td className="border">{item.productName}</td>
              <td className="border">{item.productCategory}</td>
              <td className="border">
                <img
                  src={item.imgUrl}
                  alt={item.productName}
                  width="50"
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handelDeleteBtn(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handelclick}>
        Add more product
      </button>
    </div>
  );
}

export default Homepage;
