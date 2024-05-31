import "./Contact.css";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function Contact() {
  return (
    <div className="contact-container" id="contact">
      <h2 className="section-title">Contact Us</h2>
      <Card className="form-container">
        <CardHeader>
          <h3 className="form-name text-2xl font-bold">Leave a Message</h3>
        </CardHeader>
        <CardContent className="form-text">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="min-h-[100px]"
              id="message"
              placeholder="Enter your message"
            />
            <button className="btn-contact">Send Us</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Contact;
