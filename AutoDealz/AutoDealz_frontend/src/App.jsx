import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

//  Auth Pages
import Registration from './auth/Registration';
import Login from './Auth/Login';


//  User Pages (Buy & Sell)
import BuyUsedVehicle from './pages/Buyer/BuyUsedVehicle';
import Favourites from './pages/Buyer/Favourites';
import ViewVehicle from './pages/Buyer/ViewVehicle';
import SellVehicle from './pages/Seller/SellVehicle';
import MyVehicles from './pages/Seller/MyVehicles';

//  Admin Page (uncomment when implemented)
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageAds from './pages/Admin/ManageAds';
import ManageCategories from './pages/Admin/Category/ManageCategories';
import ManageCities from './pages/Admin/City/ManageCities';
import AddCategory from './pages/Admin/Category/AddCategory';
import EditCategory from './pages/Admin/Category/EditCategory';
import AddCity from './pages/Admin/City/AddCity';




//  Common Pages
import Messages from './pages/Messages/Messages';
import EditProfile from './pages/Buyer/EditProfile';
import ManageUsers from './pages/Admin/ManageUsers';
import Home from './components/Home';
import EditCity from './pages/Admin/City/EditCity';

function App() {
  return (
    <Router>
      

      <Routes>
        {/* 🔰 Default Page */}

        <Route path="/" element={<Home />} />
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
        <Route path="/Admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Admin/ManageAds" element={<ManageAds />} />
        <Route path="/Admin/ManageCategories" element={<ManageCategories />} />
        <Route path="/Admin/AddCategory" element={<AddCategory />} />
        <Route path="/Admin/ManageCities" element={<ManageCities />} />
        <Route path="/Admin/ManageUsers" element={<ManageUsers />} />
        <Route path="/Admin/EditCategory/:id" element={<EditCategory />} />
        <Route path="/Admin/AddCity" element={<AddCity />} />
        <Route path="/Admin/EditCity/:id" element={<EditCity />} />




      </Routes>
    </Router>
    
  );
}

export default App;
