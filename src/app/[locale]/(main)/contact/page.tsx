import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

// TODO: continue this page

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have questions or need assistance? Reach out to our friendly support team.",
};

const contactInfo = {
  email: "support@travelease.com",
  phone: "+1 (555) 123-4567",
  hours: "Monday to Friday, 9am to 6pm EST",
  address: "123 Travel Street, New York, NY 10001",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto mt-20 px-4 py-8 lg:grid lg:px-0">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-muted-foreground">
          Have questions or need assistance? Reach out to our friendly support
          team.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Your Name
                </label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Email Address" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Subject
                </label>
                <Input id="subject" placeholder="Subject" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  className="min-h-[120px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              You can also reach us using the following information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">
                  {contactInfo.email}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  {contactInfo.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Working Hours</h3>
                <p className="text-sm text-muted-foreground">
                  {contactInfo.hours}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-sm text-muted-foreground">
                  {contactInfo.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
