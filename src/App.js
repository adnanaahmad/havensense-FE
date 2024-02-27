import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import lazyWithPreload from './core/utils/preload';
import ProtectedRoute from './core/utils/protectedRoute';
import ScrollToTop from './core/utils/scrollToTop';

const AboutUs = React.lazy(() => import('./modules/miscellaneous/aboutUs'));
const TermsAndConditions = React.lazy(() => import('./modules/miscellaneous/termsAndConditions'));
const PrivacyPolicy = React.lazy(() => import('./modules/miscellaneous/privacyPolicy'));

const AuthenticationModule = React.lazy(() => import('./modules/auth/auth'));
const Signup = lazyWithPreload(() => import('./modules/auth/pages/signup'));
const Login = lazyWithPreload(() => import('./modules/auth/pages/login'));
const AccountStatus = lazyWithPreload(() => import('./modules/auth/pages/accountStatus'));

const HomeModule = React.lazy(() => import('./modules/home/home'));
const PlayByPlay = lazyWithPreload(() => import('./modules/home/pages/playByPlay'));
const Profile = lazyWithPreload(() => import('./modules/home/pages/profile/profile'));
const ProductsAndServices = lazyWithPreload(() => import('./modules/home/pages/productsAndServices'));
const Marketplace = lazyWithPreload(() => import('./modules/home/pages/marketplace/marketplace'));
const MarketplaceMain = lazyWithPreload(() => import('./modules/home/pages/marketplace/pages/main'));
const Services = lazyWithPreload(() => import('./modules/home/pages/marketplace/pages/services'));
const Products = lazyWithPreload(() => import('./modules/home/pages/marketplace/pages/products'));
const DigitalCollectibles = lazyWithPreload(() => import('./modules/home/pages/marketplace/pages/digitalCollectibles'));
const Item = lazyWithPreload(() => import('./modules/home/pages/marketplace/pages/item'));
const Orders = lazyWithPreload(() => import('./modules/home/pages/orders'));
const Users = lazyWithPreload(() => import('./modules/home/pages/users'));
const LandingPage = lazyWithPreload(() => import('./modules/landingpage/LandingPage'));

function App() {
  return (
      <React.Suspense fallback={<CircularProgress />}>
        <Router>
          <ScrollToTop/>
          <Routes>
            <Route path={''} element={<LandingPage/>}/>
            <Route path={'/'} element={<AuthenticationModule data={{Signup, Login, AccountStatus}}/>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Signup/>}/>
              <Route path='account-status' element={<AccountStatus/>}/>
            </Route>
            <Route path='/home/*' element={
              <ProtectedRoute>
                <HomeModule data={{PlayByPlay, Profile, ProductsAndServices, Marketplace, Orders}}/>
              </ProtectedRoute>
            }>
              <Route path={''} element={<Navigate to='play-by-play' replace/>}/>
              <Route path='profile/:id' element={<Profile />} />
              <Route path='play-by-play' element={<PlayByPlay />} />
              <Route path='products-and-services' element={<ProductsAndServices />} />
              <Route path='marketplace/*' element={<Marketplace />}>
                <Route path={''} element={<MarketplaceMain/>}/>
                <Route path={'item/:id'} element={<Item/>}/>
                <Route path={'services'} element={<Services/>}/>
                <Route path={'products'} element={<Products/>}/>
                <Route path={'digital-collectibles'} element={<DigitalCollectibles/>}/>
              </Route>
              <Route path='orders' element={<Orders />} />
              <Route path='users' element={<Users />} />
            </Route>
            <Route path={'/about-us'} element={<AboutUs/>}></Route>
            <Route path={'/terms-and-conditions'} element={<TermsAndConditions/>}></Route>
            <Route path={'/privacy-policy'} element={<PrivacyPolicy/>}></Route>
          </Routes>
        </Router>
      </React.Suspense>
  );
}

export default App;