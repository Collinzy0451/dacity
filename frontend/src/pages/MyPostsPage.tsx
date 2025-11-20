import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const MyPostsPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">My Posts</h1>
      <p className="mb-6">View and delete your community posts here.</p>
      {/* Placeholder for listing posts */}
      <Button>Delete Selected Post</Button>
    </div>
  );
};

export default MyPostsPage;
