import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// 🔐 Auth Pages
import Login from './auth/Login';
import Registration from './auth/Registration';

// 👤 User Pages (Buy & Sell)
import BuyUsedVehicle from './pages/Buyer/BuyUsedVehicle';
import Favourites from './pages/Buyer/Favourites';
import ViewVehicle from './pages/Buyer/ViewVehicle';
import SellVehicle from './pages/Seller/SellVehicle';
import MyVehicles from './pages/Seller/MyVehicles';

// 🛠️ Admin Page (uncomment when implemented)
// import AdminDashboard from './pages/Admin/AdminDashboard';

// 🌐 Common Pages
import Messages from './pages/Messages/Messages';
import EditProfile from './pages/Buyer/EditProfile';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🔰 Default Page */}
        <Route path="/" element={<BuyUsedVehicle />} />
        <Route path="/BuyUsedVehicle" element={<BuyUsedVehicle />} />

        {/* 👤 User Pages */}
        <Route path="/Favourites" element={<Favourites />} />
        <Route path="/ViewVehicle" element={<ViewVehicle />} />

        <Route path="/SellVehicle" element={<SellVehicle />} />
        <Route path="/MyVehicles" element={<MyVehicles />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/EditProfile" element={<EditProfile />} />

        {/* 🔐 Auth Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />

        {/* 🛠️ Admin Route */}
        {/* <Route path="/Admin/AdminDashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
