import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "@/api/axiosConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Bed, Bath, Square, User } from "lucide-react";
import heroProperties from "@/assets/hero-construction.jpg"; // sample banner

interface Property {
  id: number;
  user_id?: number;
  user_name?: string;
  ownerName?: string;
  title: string;
  description: string;
  price: string | number;
  status: string;
  created_at: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  image_url?: string;
  listingType?: "sale" | "rent";
  type?: string;
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listingType, setListingType] = useState<"all" | "sale" | "rent">("all");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [newListingType, setNewListingType] = useState<"sale" | "rent">("sale");

  // Fetch all approved properties
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<{ properties: Property[] }>(
        "/api/users/properties/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Submit new property
  const handleAddProperty = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Title is required");

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("listingType", newListingType);
    if (file) formData.append("image", file);

    try {
      const res = await axios.post<{ property: Property }>(
        "/api/users/properties/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newProperty = res.data.property;
      if (newProperty) {
        setProperties((prev) => [newProperty, ...prev]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setFile(null);
      setNewListingType("sale");

      alert("Property added successfully!");
    } catch (err) {
      console.error("Error adding property:", err);
      alert("Failed to add property");
    }
  };

  // Filtered properties
  const filteredProperties = properties.filter((p) => {
    const matchesText = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesListing = listingType === "all" || p.listingType === listingType;
    return matchesText && matchesListing;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-blue-900/100">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${heroProperties})` }}></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Listings</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Explore, buy, rent, or list properties through the Lotsdacity real estate platform
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Listed Properties</h1>
      
        {/* Search & Filter Section */}
        <section className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* <Select
            value={listingType}
            onValueChange={(v) => setListingType(v as "all" | "sale" | "rent")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter Sale / Rent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select> */}
        </section>

        {/* Properties Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {property.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.image_url}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary">
                      {property.listingType === "sale" ? "For Sale" : "Available"  }
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {property.description}
                  </CardDescription>
                   {/* Owner name */}
                <CardDescription className="flex items-center gap-1 mt-1 text-sm">
                  <User className="h-3 w-3" />
                  {property.ownerName ? (
                    <Link
                      to={`/users/${property.user_id}`}
                      className="hover:underline"
                    >
                      {property.ownerName}
                    </Link>
                  ) : (
                    "Lotsdacity"
                  )}
                </CardDescription>
                  <div className="text-xl font-bold text-primary mt-2">
                    ${property.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" /> {property.bedrooms} Bed
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" /> {property.bathrooms} Bath
                      </div>
                    )}
                    {property.sqft && (
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" /> {property.sqft} sqft
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full">
              No properties found.
            </p>
          )}
        </section>

        {/* Add Property Form */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
          <form onSubmit={handleAddProperty} className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Input
              placeholder="Property Location / Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input type="file" onChange={handleFileChange} />
            {/* <Select
              value={newListingType}
              onValueChange={(v) => setNewListingType(v as "sale" | "rent")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Listing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select> */}
            <Button type="submit" className="md:col-span-2">
              Add Property
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Properties;
