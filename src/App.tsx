import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Lectures } from './pages/Lectures';
import { Assignments } from './pages/Assignments';
import { Events } from './pages/Events';
import { Tasks } from './pages/Tasks';
import { Expenses } from './pages/Expenses';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { Search } from './pages/Search';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <DataProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="lectures" element={<Lectures />} />
                  <Route path="assignments" element={<Assignments />} />
                  <Route path="events" element={<Events />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="expenses" element={<Expenses />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="search" element={<Search />} />
                </Route>
              </Routes>
            </DataProvider>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;