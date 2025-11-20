import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const AddPostPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Add Community Post</h1>
      <p className="mb-6">Create a new post to share with the community.</p>
      {/* Placeholder for post form */}
      <Button>Add Post</Button>
    </div>
  );
};

export default AddPostPage;
