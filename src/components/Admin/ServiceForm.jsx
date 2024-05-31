import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

// Define schema for form validation
const serviceSchema = z.object({
  serviceTitle: z.string().min(3).max(50),
  serviceDescription: z.string().min(3).max(200),
  serviceCost: z.number().min(0),
  serviceLink: z.string().min(10).max(500),
});

function ServiceForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceLink, setServiceLink] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form data
    try {
      serviceSchema.parse({
        serviceTitle,
        serviceDescription,
        serviceCost,
        serviceLink,
      });
      // If validation succeeds, handle form submission (e.g., send data to backend)
      console.log("Service Title:", serviceTitle);
      console.log("Service Description:", serviceDescription);
      console.log("Service Cost:", serviceCost);
      console.log("Service Link:", serviceLink);
      var url = apiUrl + "/admins/service";
      await axios.post(url, {
        title: serviceTitle,
        description: serviceDescription,
        cost: serviceCost,
        link: serviceLink,
      });

      // Reset form fields
      setServiceTitle("");
      setServiceDescription("");
      setServiceCost("");
      setServiceLink("");
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
              <Label htmlFor="serviceTitle">Service Title:</Label>
              <Input
                id="serviceTitle"
                type="text"
                value={serviceTitle}
                onChange={(e) => setServiceTitle(e.target.value)}
              />
              {errors.serviceTitle && (
                <span className="text-red-500 text-sm">
                  {errors.serviceTitle}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="serviceDescription">Service Description:</Label>
              <Input
                id="serviceDescription"
                type="text"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
              {errors.serviceDescription && (
                <span className="text-red-500 text-sm">
                  {errors.serviceDescription}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="serviceCost">Service Cost:</Label>
              <Input
                id="serviceCost"
                type="number"
                value={serviceCost}
                onChange={(e) => setServiceCost(parseInt(e.target.value))}
              />
              {errors.serviceCost && (
                <span className="text-red-500 text-sm">
                  {errors.serviceCost}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="serviceLink">Service Link:</Label>
              <Input
                id="serviceLink"
                type="text"
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
