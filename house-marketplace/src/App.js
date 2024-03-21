import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Navbar />
      </Router>
     </>
  )
}

export default App
