import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Construction from "./pages/Construction";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import ProfilePage from "@/pages/ProfilePage";
import AddPostPage from "@/pages/AddPostPage";
import MyPostsPage from "@/pages/MyPostsPage";
import AddPropertyPage from "@/pages/AddPropertyPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminPosts from "./pages/AdminPosts";
import AdminProperties from "./pages/AdminProperties";
import EditProfile from "./pages/EditProfile";
import AddProperty from "./pages/AddProperty";
import CreatePost from "./pages/CreatePost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/properties" element={<AdminProperties />} />
              <Route path="/admin/posts" element={<AdminPosts />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/community/new" element={<AddPostPage />} />
              <Route path="/community/myposts" element={<MyPostsPage />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/properties/add" element={<AddPropertyPage />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/properties" element={
                <ProtectedRoute>
                  <Properties />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                  </ProtectedRoute>
                } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
