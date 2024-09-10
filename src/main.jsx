import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Bookings from "./pages/Booking/Bookings";
import Rooms from "./pages/Rooms/Rooms";
import Contact from "./pages/Contact/Contact";
import Users from "./pages/Users/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/components/Layout/Layout";
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />}>
                <Route path=":id" element={<Bookings />} />
                <Route path="new" element={<Bookings />} />
                <Route path=":id/edit" element={<Bookings />} />
                <Route path=":id/delete" element={<Bookings />} />
              </Route>
              <Route path="users" element={<Users />}>
                <Route path=":id" element={<Users />} />
                <Route path="new" element={<Users />} />
                <Route path=":id/edit" element={<Users />} />
                <Route path=":id/delete" element={<Users />} />
              </Route>
              <Route path="rooms" element={<Rooms />}>
                <Route path=":id" element={<Rooms />} />
                <Route path="new" element={<Rooms />} />
                <Route path=":id/edit" element={<Rooms />} />
                <Route path=":id/delete" element={<Rooms />} />
              </Route>
              <Route path="contact" element={<Contact />}>
                <Route path=":id" element={<Contact />} />
                <Route path="new" element={<Contact />} />
                <Route path=":id/edit" element={<Contact />} />
                <Route path=":id/delete" element={<Contact />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
