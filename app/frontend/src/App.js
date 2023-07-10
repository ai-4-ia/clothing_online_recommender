import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import LandingScreen from './screens/LandingScreen';
import TestScreen from './screens/TestScreen';
import PageFooter from './components/PageFooter';
import NavBarFull from './components/Navbar/NavBarFull';
import ShopScreen from './screens/ShopScreen';

const App = () => {
    return (
        <Router>
            {/* <Header /> */}
            <Header />
            {/* <NavBarFull /> */}
            <main>
                {/* <Container> */}
                <Routes>
                    {/* <Route path="/test" element={<TestScreen />} exact /> */}
                    <Route path="/" element={<LandingScreen />} exact />
                    <Route
                        path="/landingpage"
                        element={<LandingScreen />}
                        exact
                    />
                    <Route path="/shop" element={<HomeScreen />} exact />
                    <Route
                        path="/notfound"
                        element={<NotFoundScreen />}
                        exact
                    />
                    <Route
                        path="/search/:keyword"
                        element={<HomeScreen />}
                        exact
                    />
                    <Route
                        path="/page/:pageNumber"
                        element={<HomeScreen />}
                        exact
                    />
                    <Route
                        path="/search/:keyword/page/:pageNumber"
                        element={<HomeScreen />}
                        exact
                    />
                    <Route path="/product/:id" element={<ProductScreen />} />
                    <Route path="/cart/:id" element={<CartScreen />} />
                    <Route path="/cart" element={<CartScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/shipping" element={<ShippingScreen />} />
                    <Route path="/payment" element={<PaymentScreen />} />
                    <Route path="/placeorder" element={<PlaceOrderScreen />} />
                    <Route path="/orders/:id" element={<OrderScreen />} />
                    <Route
                        path="/admin/userlist"
                        element={<UserListScreen />}
                    />
                    <Route
                        path="/admin/users/:id/edit"
                        element={<UserEditScreen />}
                    />
                    <Route
                        path="/admin/productlist"
                        element={<ProductListScreen />}
                        exact
                    />
                    <Route
                        path="/admin/productlist/:pageNumber"
                        element={<ProductListScreen />}
                        exact
                    />
                    <Route
                        path="/admin/products/:id/edit"
                        element={<ProductEditScreen />}
                    />
                    <Route
                        path="/admin/orderlist"
                        element={<OrderListScreen />}
                    />
                </Routes>
                {/* </Container> */}
            </main>
            <PageFooter />
        </Router>
    );
};

export default App;
