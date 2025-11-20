import { useState } from "react";
import { Building2, Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Footer = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{ title: string; body: string } | null>(null);

  const handleOpenDialog = (type: "privacy" | "terms" | "community") => {
    let content = { title: "", body: "" };
    switch (type) {
      case "privacy":
        content.title = "Privacy Policy";
        content.body = `This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
We collect details such as your name, email, contact information, and activity on the site to improve your experience.
Your data is stored securely and never shared with third parties except when required to complete a transaction or comply with the law.
By using this service, you agree to how we handle and safeguard your information.`;
        break;
      case "terms":
        content.title = "Terms of Service";
        content.body = `These Terms of Service outline the rules for using our platform.
Users are expected to provide accurate information, respect other members, and use the site for legal activities only.
We reserve the right to update listings, adjust services, or limit access if we detect misuse.
By accessing the platform, you accept these terms and agree to follow all guidelines provided.`;
        break;
      case "community":
        content.title = "Community Guidelines";
        content.body = `These Community Guidelines help keep our platform safe for buyers, sellers, and agents.
Treat every user with respect.
Do not post misleading listings or false information.
Keep conversations professional, and follow all local property laws and regulations.
By staying within these guidelines, the community remains trustworthy and supportive for everyone.`;
        break;
    }

    setDialogContent(content);
    setOpenDialog(true);
  };

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Lotsdacity
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for construction excellence and real estate solutions. Building the future, one project at a time.
            </p>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/construction" className="text-muted-foreground hover:text-primary transition-colors">Construction Services</Link></li>
              <li><Link to="/properties" className="text-muted-foreground hover:text-primary transition-colors">Browse Properties</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Community Forum</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary transition-colors p-0"
                  onClick={() => handleOpenDialog("privacy")}
                >
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary transition-colors p-0"
                  onClick={() => handleOpenDialog("terms")}
                >
                  Terms of Service
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary transition-colors p-0"
                  onClick={() => handleOpenDialog("community")}
                >
                  Community Guidelines
                </Button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>234 902 156 9627.</span>
                <span>234 905 452 9573.</span>
                <span>234 706 285 6748.</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>info.lotsdacity@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Bogije, Lekki Epe Expressway, Lagos.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lotsdacity. All rights reserved.</p>
        </div>
      </div>

      {/* Dialog for Policies & Guidelines */}
      {dialogContent && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
              <DialogDescription>{dialogContent.body}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Button className="w-full" onClick={() => setOpenDialog(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </footer>
  );
};

export default Footer;
