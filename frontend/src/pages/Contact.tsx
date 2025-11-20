import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phones",
      content: "+234 902 156 9627\n+234 905 452 9573\n+234 706 285 6748",
      action: null
    },

     {
      icon: Mail,
      title: "Email",
      content: "info.lotsdacity@gmail.com",
      action: "mailto:info.lotsdacity@gmail.com"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Bogije, Lekki Epe Expressway, Lagos.",
      action: null
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 3:00 PM",
      action: null
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question or ready to start your project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">{info.title}</div>
                      {info.action ? (
                        <a 
                          href={info.action} 
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp
                </CardTitle>
                <CardDescription>Get instant responses via WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <a href="https://wa.me/2347066769620" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
  <div className="grid md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="name">Full Name *</Label>
      <Input id="name" placeholder="John Smith" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email Address *</Label>
      <Input id="email" type="email" placeholder="john@example.com" required />
    </div>
  </div>

  <div className="grid md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="subject">Subject *</Label>
      <Input id="subject" placeholder="Project inquiry" required />
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="service">Service Interest</Label>
    <select 
      id="service"
      className="w-full px-3 py-2 border rounded-md bg-background"
    >
      <option value="">Select a service</option>
      <option value="construction">Building Construction</option>
      <option value="renovation">Renovation Services</option>
      <option value="modular">Modular Buildings</option>
      <option value="real-estate">Real Estate</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div className="space-y-2">
    <Label htmlFor="message">Message *</Label>
    <Textarea 
      id="message" 
      placeholder="Tell us about your project or inquiry..."
      rows={6}
      required
    />
  </div>

  {/* Submit Buttons */}
  <div className="flex flex-col md:flex-row gap-4 pt-4">

    {/* Email Submit */}
    <Button
      type="button"
      size="lg"
      className="w-full"
      onClick={() => {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const subject = (document.getElementById("subject") as HTMLInputElement).value;
        const service = (document.getElementById("service") as HTMLSelectElement).value;
        const message = (document.getElementById("message") as HTMLTextAreaElement).value;

        const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message:
${message}
        `.trim();

        const mailto = `mailto:info@dacity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }}
    >
      Send via Email
    </Button>

    {/* WhatsApp Submit */}
    <Button
      type="button"
      size="lg"
      variant="outline"
      className="w-full"
      onClick={() => {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const subject = (document.getElementById("subject") as HTMLInputElement).value;
        const service = (document.getElementById("service") as HTMLSelectElement).value;
        const message = (document.getElementById("message") as HTMLTextAreaElement).value;

        const text = `
*New Contact Message*
--------------------
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Subject:* ${subject}
*Service:* ${service || "Not selected"}

*Message:*
${message}
        `.trim();

        const whatsappNumber = "+2347066769620"; // <-- replace with real number
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
      }}
    >
      Send via WhatsApp
    </Button>
  </div>
</form>

              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Visit Our Office</CardTitle>
              <CardDescription>Find us at our main office location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Map integration would appear here</p>
                  <p className="text-sm text-muted-foreground mt-2">123 Construction Ave, Building City, BC 12345</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
