import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

// Define schema for form validation
const memberSchema = z.object({
  memberName: z.string().min(3).max(50),
  memberDescription: z.string().min(10).max(200),
  memberImage: z.instanceof(File).optional(), // Handling image as a file
});

function MemberForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [memberName, setMemberName] = useState("");
  const [memberDescription, setMemberDescription] = useState("");
  const [memberImage, setMemberImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form data
    try {
      memberSchema.parse({ memberName, memberDescription, memberImage });
      
      // If validation succeeds, handle form submission
      const formData = new FormData();
      formData.append("name", memberName);
      formData.append("description", memberDescription);
      if (memberImage) {
        formData.append("photo", memberImage);
      }

      // Send data to backend
      const url = `${apiUrl}/admins/team`
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add team member");
      }

      const result = await response.json();
      console.log("Success:", result);

      // Reset form fields
      setMemberName("");
      setMemberDescription("");
      setMemberImage(null);
      setErrors({});
    } catch (error) {
      // If validation or submission fails, set error state to display validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0];
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <Card className="w-4/5">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="memberName">Member Name:</Label>
              <Input
                id="memberName"
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
              {errors.memberName && (
                <span className="text-red-500 text-sm">
                  {errors.memberName}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="memberDescription">Member Description:</Label>
              <Input
                id="memberDescription"
                type="text"
                value={memberDescription}
                onChange={(e) => setMemberDescription(e.target.value)}
              />
              {errors.memberDescription && (
                <span className="text-red-500 text-sm">
                  {errors.memberDescription}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="memberImage">Member Image:</Label>
              <Input
                id="memberImage"
                type="file"
                accept="image/*"
                onChange={(e) => setMemberImage(e.target.files[0])}
              />
              {errors.memberImage && (
                <span className="text-red-500 text-sm">
                  {errors.memberImage}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Add Member
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default MemberForm;
