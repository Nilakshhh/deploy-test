import React from "react";
import "./Contact.css";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function Contact() {
  return (
    <div className="contact-container" id="contact">
      <CardContent className="form-text">
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="form-name">Reach out to us!</h3>
            <p>
              Questions on products or waxing, we're here for you. Let us know a
              bit more info below and we'll get back to you within our next
              business day. Thanks!
            </p>
            <p><b>Phone:</b> (202) 842-9240</p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/tressessalondc/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <InstagramIcon fontSize="large" />
              </a>
              <a
                href="https://www.facebook.com/TressesSalonDC/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FacebookIcon fontSize="large" />
              </a>
            </div>
          </div>
          <div className="contact-form">
            <form
              action="mailto:your-email@example.com"
              method="post"
              encType="text/plain"
            >
              <div className="space-y-4">
                <div className="form-group">
                  <Input id="name" placeholder="Enter your name" type="text" name="name" />
                </div>
                <div className="form-group">
                  <Input id="email" placeholder="Enter your email" type="email" name="email" />
                </div>
                <div className="form-group">
                  <Input id="phone" placeholder="Enter your contact number" type="tel" name="phone" />
                </div>
                <div className="form-group">
                  <Textarea
                    className="min-h-[100px]"
                    id="message"
                    placeholder="Enter your message"
                    name="message"
                  />
                </div>
                <button className="btn-contact" type="submit">Submit</button>
              </div>
            </form>
            <div className="recaptcha-terms">
              This form is protected by reCAPTCHA and the Google{" "}
              <a
                rel="noreferrer noopener"
                href="https://policies.google.com/privacy"
                target="_blank"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                rel="noreferrer noopener"
                href="https://policies.google.com/terms"
                target="_blank"
              >
                Terms of Service
              </a>{" "}
              apply.
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default Contact;
