import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
      <p className="mb-6">Here you will be able to update your profile information.</p>
      {/* Placeholder for profile form */}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default ProfilePage;
