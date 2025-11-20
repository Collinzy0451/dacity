import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminProperties = () => {
  const navigate = useNavigate();

  const handleDelete = async (propertyId: number) => {
  const token = localStorage.getItem("token");
  await fetch(`http://127.0.0.1:5000/api/admin/properties/${propertyId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  alert(`Property ${propertyId} deleted`);
};

const handleApprove = async (propertyId: number) => {
  const token = localStorage.getItem("token");
  await fetch(`http://127.0.0.1:5000/api/admin/properties/${propertyId}/approve`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  alert(`Property ${propertyId} approved`);
};

const handleDecline = async (propertyId: number) => {
  const token = localStorage.getItem("token");
  await fetch(`http://127.0.0.1:5000/api/admin/properties/${propertyId}/decline`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  alert(`Property ${propertyId} declined`);
};


  const properties = [
    { id: 1, title: "Luxury Apartment", status: "Pending" },
    { id: 2, title: "Beach House", status: "Approved" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span className="cursor-pointer text-blue-600" onClick={() => navigate("/admin")}>
          Dashboard
        </span>{" "}
        &gt; Property Management
      </div>

      <h1 className="text-2xl font-bold mb-4">Property Management</h1>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="p-2 border">{property.id}</td>
              <td className="p-2 border">{property.title}</td>
              <td className="p-2 border">{property.status}</td>
              <td className="p-2 border flex gap-2">
                <Button onClick={() => handleApprove(property.id)}>Approve</Button>
                <Button onClick={() => handleDecline(property.id)} variant="destructive">
                  Decline
                </Button>
                <Button onClick={() => handleDelete(property.id)} variant="destructive">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProperties;
