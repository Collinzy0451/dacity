import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Wrench, Package, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroConstruction from "@/assets/hero-construction.jpg";
import modularBuildings from "@/assets/modular-buildings.jpg";
import renovationService from "@/assets/renovation-service.jpg";

const Construction = () => {
  const services = [
    {
      id: "buildings",
      icon: Building2,
      title: "Building Construction",
      description: "From residential homes to commercial complexes, we deliver high-quality construction projects on time and within budget.",
      image: heroConstruction,
      features: [
        "Residential Construction",
        "Commercial Buildings",
        "Industrial Facilities",
        "Multi-Story Structures",
        "Custom Designs",
        "Green Building Options"
      ]
    },
    {
      id: "renovations",
      icon: Wrench,
      title: "Renovation & Remodeling",
      description: "Transform your existing spaces with expert renovation services that blend functionality with aesthetic appeal.",
      image: renovationService,
      features: [
        "Complete Home Renovations",
        "Kitchen & Bathroom Remodeling",
        "Office Renovations",
        "Historic Building Restoration",
        "Energy Efficiency Upgrades",
        "Interior & Exterior Updates"
      ]
    },
    {
      id: "modular",
      icon: Package,
      title: "Modular Buildings",
      description: "Experience the future of construction with our innovative modular building solutions - factory-made components assembled on-site.",
      image: modularBuildings,
      features: [
        "Faster Construction Time",
        "Cost-Effective Solutions",
        "Quality-Controlled Manufacturing",
        "Flexible Designs",
        "Eco-Friendly Process",
        "Scalable Projects"
      ]
    },
  ];

  const projects = [
    {
      title: "Riverside Commercial Complex",
      category: "Commercial Construction",
      description: "A 5-story modern office complex with sustainable design features.",
      status: "Completed"
    },
    {
      title: "Lakeside Residential Community",
      category: "Residential Construction",
      description: "50-unit residential development with modern amenities.",
      status: "Completed"
    },
    {
      title: "Downtown Office Renovation",
      category: "Renovation",
      description: "Complete renovation of historic building into modern office space.",
      status: "Completed"
    },
    {
      title: "Modular School Expansion",
      category: "Modular Building",
      description: "Quick deployment of additional classroom modules.",
      status: "In Progress"
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your vision, requirements, and budget to create a tailored plan."
    },
    {
      step: "02",
      title: "Design & Planning",
      description: "Our experts develop detailed designs and obtain necessary permits."
    },
    {
      step: "03",
      title: "Construction",
      description: "Skilled teams execute the project with precision and quality control."
    },
    {
      step: "04",
      title: "Completion & Handover",
      description: "Final inspections, quality checks, and project delivery with warranty."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroConstruction})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/25"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Construction Services
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-slide-up">
            Building excellence through innovation, quality, and expertise at Lotsdacity
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="gap-2">
                Request a Quote
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <Button size="lg" className="gap-2">
                    Request a Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Construction Process</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A streamlined approach that ensures quality, transparency, and timely delivery
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl font-bold text-primary/20 mb-2">{step.step}</div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects / Portfolio */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Showcasing our commitment to excellence and innovation</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-primary transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "Completed" ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Dream Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how we can bring your construction vision to life with quality and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">Get Started Today</Button>
            </Link>
            <Link to="/careers">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Construction;
