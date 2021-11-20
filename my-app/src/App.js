import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'

import Footer from './components/footer'
import Header from './components/header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import productListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'


function App() {
  return (
    <Router>
      <Header />
     <main className = "py-3">
       <Container>
       <Route path='/' component={HomeScreen} exact />
       <Route path='/product/:id' component={ProductScreen}  />
       <Route path='/cart/:id?' component={CartScreen}  />
       <Route path='/login' component = {LoginScreen}  />
       <Route path='/register' component = {RegisterScreen}  />
       <Route path='/order/:id' component = {OrderScreen}  />

       <Route path='/payment' component = {PaymentScreen}  />
       <Route path='/profile' component = {ProfileScreen}  />
       <Route path='/shipping' component = {ShippingScreen}  />
       <Route path='/placeorder' component = {PlaceOrderScreen}  />
       <Route path='/admin/userList' component = {UserListScreen}  />
       <Route path='/admin/orderList' component = {OrderListScreen}  />
       <Route path='/admin/user/:id/edit' component = {UserEditScreen}  />

       <Route path='/admin/productList' component = {productListScreen}  />
       <Route path='/admin/product/:id/edit' component = {ProductEditScreen}  />

       </Container>
       </main>
     <Footer />
    </Router>
  );
}

export default App;
