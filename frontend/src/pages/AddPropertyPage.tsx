import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const AddPropertyPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Add Property Listing</h1>
      <p className="mb-6">Submit a new property to be listed.</p>
      {/* Placeholder for property form */}
      <Button>Add Property</Button>
    </div>
  );
};

export default AddPropertyPage;
