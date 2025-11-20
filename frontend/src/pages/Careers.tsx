import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Briefcase, Upload, Users, Award, TrendingUp, Heart } from "lucide-react";
import { toast } from "sonner";





const Careers = () => {

const [selectedJob, setSelectedJob] = useState<any>(null);
const [openDialog, setOpenDialog] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We'll review it and get back to you soon.");
  };

  const benefits = [
    {
      icon: Award,
      title: "Competitive Salary",
      description: "Industry-leading compensation packages"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Professional development and advancement opportunities"
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible schedules and generous time off"
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Collaborative and supportive work environment"
    },
  ];

  const openPositions = [
    {
      title: "Project Manager",
      department: "Construction",
      type: "Full-time",
      location: "Building City, BC"
    },
    {
      title: "Structural Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Building City, BC"
    },
    {
      title: "Real Estate Agent",
      department: "Real Estate",
      type: "Full-time",
      location: "Multiple Locations"
    },
    {
      title: "Site Supervisor",
      department: "Construction",
      type: "Full-time",
      location: "Building City, BC"
    },
    {
      title: "Architect",
      department: "Design",
      type: "Full-time",
      location: "Building City, BC"
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      type: "Full-time",
      location: "Building City, BC"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Build your career with a company that values innovation, excellence, and growth
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us?</h2>
          <p className="text-muted-foreground text-lg">
            We invest in our people because they are our greatest asset
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Positions */}
<section className="py-20 bg-muted/50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
      <p className="text-muted-foreground text-lg">
        Find the perfect role that matches your skills and ambitions
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
      {openPositions.map((position, index) => (
        <Card key={index} className="hover:shadow-primary transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                {position.type}
              </span>
            </div>
            <CardTitle>{position.title}</CardTitle>
            <CardDescription>
              {position.department} • {position.location}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedJob(position);
                setOpenDialog(true);
              }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>

  {/* Job Details Dialog */}
  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>{selectedJob?.title}</DialogTitle>
        <DialogDescription>
          {selectedJob?.department} • {selectedJob?.location}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        <h3 className="font-semibold">Qualifications Required</h3>

        <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-2">
          {(selectedJob?.requirements || [
            "Minimum of 2 years relevant experience",
            "Strong communication skills",
            "Ability to work under pressure",
            "Certification or degree in related field",
          ]).map((req: string, i: number) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Button className="w-full" onClick={() => setOpenDialog(false)}>
          Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</section>

      {/* Application Form Section */}
<section className="py-20 container mx-auto px-4">
  <div className="max-w-3xl mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>Apply Now</CardTitle>
        <CardDescription>
          Submit your application for any position or send us your CV for future opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const phone = (document.getElementById("phone") as HTMLInputElement).value;
            const position = (document.getElementById("position") as HTMLSelectElement).value;
            const coverLetter = (document.getElementById("coverLetter") as HTMLTextAreaElement).value;

            const resumeInput = document.getElementById("resume") as HTMLInputElement;
            const resume = resumeInput.files?.[0];
            const resumeName = resume ? resume.name : "No file selected";

            const subject = `Job Application - ${fullName}`;

            const body = `
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

Position Applying For: ${position || "Not selected"}

Resume Selected: ${resumeName}
(Please remember to attach the file before sending)

Cover Letter:
${coverLetter || "No cover letter provided"}
            `.trim();

            const mailto = `mailto:hr@lotsdacity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailto;
          }}
          className="space-y-6"
        >
          {/* Full Name + Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" placeholder="John Smith" required className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="john@example.com" required className="h-12 rounded-xl" />
            </div>
          </div>

          {/* Phone + Position */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position Applying For *</Label>
              <select
                id="position"
                required
                className="w-full h-12 px-3 border rounded-xl bg-background"
              >
                <option value="">Select a position</option>
                {openPositions.map((pos, idx) => (
                  <option key={idx} value={pos.title}>
                    {pos.title}
                  </option>
                ))}
                <option value="General Application">General Application</option>
              </select>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter / Why Lotsdacity</Label>
            <Textarea
              id="coverLetter"
              rows={6}
              placeholder="Tell us why you want to join our team..."
              className="rounded-xl"
            />
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume / CV *</Label>
            <div
              onClick={() => document.getElementById("resume")?.click()}
              className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary transition cursor-pointer"
            >
              <Upload className="h-8 w-8 mx-auto mb-2 opacity-70" />
              <p className="text-sm text-gray-600">Click to upload </p>
              <p id="resumeFileName" className="mt-2 text-sm font-medium text-primary">
                No file selected
              </p>
            </div>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                const nameDisplay = document.getElementById("resumeFileName");
                if (file && nameDisplay) nameDisplay.textContent = file.name;
              }}
            />
          </div>

          <Button type="submit" size="lg" className="w-full h-12 rounded-xl">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  

          {/* Partnership Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Partnership Opportunities</CardTitle>
              <CardDescription>
                Interested in partnering with Lotsdacity? We're open to collaboration with contractors, suppliers, and businesses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Please use the same form above and select "Other / General Application" or contact us directly at partnerships@dacity.com
              </p>
              <Button variant="outline" asChild>
                <a href="mailto:info@lotsdacity.com">Contact Partnership Team</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Careers;
