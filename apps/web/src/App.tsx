import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Planes from './pages/Planes';
import FAQ from './pages/FAQ';
import Soporte from './pages/Soporte';
import Checkout from './pages/Checkout';
import PaymentResult from './pages/PaymentResult';
import Blog from './pages/Blog';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import Refunds from './pages/legal/Refunds';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPlans from './pages/admin/Plans';
import AdminCRM from './pages/admin/CRM';
import AdminBlog from './pages/admin/Blog';
import AdminConfig from './pages/admin/Config'; // NEW
import AdminReminders from './pages/admin/Reminders'; // NEW
import AdminSEO from './pages/admin/SEO';
import Clients from './pages/admin/Clients'; // NEW
import Debug from './pages/Debug';

// Simple Fallbacks for now
const NotFound = () => <div className="p-10 text-center">404 - Not Found</div>;

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/checkout/:planId" element={<Checkout />} />
          <Route path="/pago/resultado" element={<PaymentResult />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/legal/terminos" element={<Terms />} />
          <Route path="/legal/privacidad" element={<Privacy />} />
          <Route path="/legal/reembolsos" element={<Refunds />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/planes" element={
            <ProtectedRoute>
              <AdminPlans />
            </ProtectedRoute>
          } />
          <Route path="/admin/crm" element={
            <ProtectedRoute>
              <AdminCRM />
            </ProtectedRoute>
          } />
          <Route path="/admin/clients" element={ /* NEW CLIENTS ROUTE */
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          } />
          <Route path="/admin/blog" element={
            <ProtectedRoute>
              <AdminBlog />
            </ProtectedRoute>
          } />
          <Route path="/admin/config" element={ /* NEW CONFIG ROUTE */
            <ProtectedRoute>
              <AdminConfig />
            </ProtectedRoute>
          } />
          <Route path="/admin/recordatorios" element={ /* NEW REMINDERS ROUTE */
            <ProtectedRoute>
              <AdminReminders />
            </ProtectedRoute>
          } />
          <Route path="/admin/seo" element={ /* NEW SEO ROUTE */
            <ProtectedRoute>
              <AdminSEO />
            </ProtectedRoute>
          } />

          <Route path="/debug" element={<Debug />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
