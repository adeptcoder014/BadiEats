import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import SuperAdminLogin from '../src/pages/Login';
import NotFoundPage from '../src/pages/404';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

import Dashboard from '../src/pages/Dashboard';
import UserManagement from './pages/Users';
import BusinessAdmins from './pages/BusinessAdmin';
//===================================================================

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route ==============================*/}
        <Route path="/" element={<PublicRoute element={<SuperAdminLogin />} />} />


        {/* Protected Routes ============================*/}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Layout><Dashboard /></Layout>} />} />

        <Route
          path="/users"
          element={<Layout><UserManagement /></Layout>} />
        <Route
          path="/business-admins"
          element={<ProtectedRoute element={<Layout><BusinessAdmins/></Layout>} />} />


        {/* Catch All (404)  ===================================*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
