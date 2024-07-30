import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input, Select, Option } from "@/components/ui/input"; // Assuming you have a Select component
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

// Define schema for form validation
const serviceSchema = z.object({
  serviceTitle: z.string().min(3).max(50),
  serviceDescription: z.string().min(3).max(200),
  serviceCost: z.number().min(0),
  serviceLink: z.string().min(10).max(500),
  and_up: z.boolean(),
});

function ServiceForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [serviceTitle, setServiceTitle] = useState("");
  const [newTitle, setNewTitle] = useState(""); // New state for new title input
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceLink, setServiceLink] = useState("");
  const [andUp, setAndUp] = useState(false);
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [uniqueTitles, setUniqueTitles] = useState([]);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admins/service`);
        setServices(response.data);

        // Extract unique service titles
        const titles = [
          ...new Set(response.data.map((service) => service.title.trim())),
        ];
        setUniqueTitles(titles);
        console.log(titles);
      } catch (error) {
        console.error("There was an error fetching the services!", error);
      }
    };

    fetchServices();
  }, [apiUrl]);

  const handleTitleChange = (e) => {
    const selectedTitle = e.target.value;
    if (selectedTitle) {
      setServiceTitle(selectedTitle);
      setNewTitle(""); // Clear new title input if a dropdown title is selected
    }
  };

  const handleNewTitleChange = (e) => {
    const newInputTitle = e.target.value;
    setNewTitle(newInputTitle);
    setServiceTitle(newInputTitle); // Update serviceTitle if new title is written
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form data
    try {
      serviceSchema.parse({
        serviceTitle,
        serviceDescription,
        serviceCost,
        serviceLink,
        and_up: andUp,
      });

      // If a new title is provided, add it to the list
      if (newTitle.trim() && !uniqueTitles.includes(newTitle.trim())) {
        setUniqueTitles([...uniqueTitles, newTitle.trim()]);
      }

      // Submit data to the backend
      await axios.post(`${apiUrl}/admins/service`, {
        title: serviceTitle,
        description: serviceDescription,
        cost: serviceCost,
        link: serviceLink,
        and_up: andUp,
      });

      // Reset form fields
      setServiceTitle("");
      setServiceDescription("");
      setServiceCost("");
      setServiceLink("");
      setAndUp(false);
      setNewTitle(""); // Reset new title field
      // Clear any previous validation errors
      setErrors({});
      alert("Service added!");
    } catch (error) {
      // If validation fails, set error state to display validation errors
      console.log(error);
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0];
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <Card className="w-4/5">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="serviceTitle">Service Group:</Label>
              <div className="flex space-x-2">
                <Select
                  id="serviceTitle"
                  value={serviceTitle}
                  onChange={handleTitleChange}
                >
                  <Option value="">Select a Group</Option>
                  {uniqueTitles.map((title, index) => (
                    <Option key={index} value={title}>
                      {title}
                    </Option>
                  ))}
                </Select>
                <Input
                  id="newTitle"
                  type="text"
                  placeholder="Add new Group"
                  value={newTitle}
                  onChange={handleNewTitleChange}
                />
              </div>
              {errors.serviceTitle && (
                <span className="text-red-500 text-sm">
                  {errors.serviceTitle}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="serviceDescription">Service Title:</Label>
              <Input
                id="serviceDescription"
                type="text"
                placeholder="Service Title"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
              {errors.serviceDescription && (
                <span className="text-red-500 text-sm">
                  {errors.serviceDescription}
                </span>
              )}
            </div>
            <div class="flex items-center justify-between">
              <div class="w-11/12">
              <Label htmlFor="serviceCost">Service Cost:</Label>
              <Input
                id="serviceCost"
                type="number"
                placeholder="Service Cost"
                value={serviceCost}
                onChange={(e) => setServiceCost(parseInt(e.target.value))}
                />
              {errors.serviceCost && (
                <span className="text-red-500 text-sm">
                  {errors.serviceCost}
                </span>
              )}
              </div>
              <div class="mr-10">
                <Label htmlFor="andUp">And Up:</Label>
                <input
                  id="andUp"
                  type="checkbox"
                  checked={andUp}
                  onChange={(e) => setAndUp(e.target.checked)}
                />
                {errors.and_up && (
                  <span className="text-red-500 text-sm">{errors.and_up}</span>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="serviceLink">Service Link:</Label>
              <Input
                id="serviceLink"
                type="text"
                placeholder="Service Link"
                value={serviceLink}
                onChange={(e) => setServiceLink(e.target.value)}
              />
              {errors.serviceLink && (
                <span className="text-red-500 text-sm">
                  {errors.serviceLink}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Add Service
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ServiceForm;
