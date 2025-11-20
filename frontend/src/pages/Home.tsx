import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Wrench, Package, MapPin, ArrowRight, CheckCircle, Star } from "lucide-react";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroRealEstate from "@/assets/hero-real-estate.jpg";
import modularBuildings from "@/assets/modular-buildings.jpg";
import renovationService from "@/assets/renovation-service.jpg";

const HomePage = () => {
  const services = [
    {
      icon: Building2,
      title: "Building Construction",
      description: "Residential and commercial construction projects delivered with precision and quality.",
      image: heroConstruction,
      link: "/construction#buildings"
    },
    {
      icon: Wrench,
      title: "Renovation Services",
      description: "Transform your existing spaces with expert renovation and remodeling solutions.",
      image: renovationService,
      link: "/construction#renovations"
    },
    {
      icon: Package,
      title: "Modular Buildings",
      description: "Factory-made building components assembled on-site for faster, efficient construction.",
      image: modularBuildings,
      link: "/construction#modular"
    },
    {
      icon: MapPin,
      title: "Real Estate Solutions",
      description: "Browse, list, buy or rent properties through our comprehensive marketplace.",
      image: heroRealEstate,
      link: "/properties"
    },
  ];

  const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Happy Clients", value: "1,200+" },
    { label: "Properties Listed", value: "350+" },
    { label: "Years Experience", value: "15+" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Lotsdacity transformed our vision into reality. Their modular building approach saved us time and money while delivering exceptional quality.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Property Developer",
      content: "Professional, reliable, and innovative. Lotsdacity has been our go-to partner for multiple commercial projects.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Real Estate Investor",
      content: "The property marketplace is incredibly user-friendly. I've successfully listed and sold multiple properties through Lotsdacity.",
      rating: 5
    },
  ];

  const features = [
    "Licensed & Insured Contractors",
    "Quality Materials & Craftsmanship",
    "On-Time Project Delivery",
    "Transparent Pricing",
    "Professional Support Team",
    "Warranty & Aftercare Services"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroConstruction})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/25"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Building Excellence, Creating Value
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Your trusted partner for construction, modular buildings, renovation, and real estate solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/construction">
              <Button size="lg" variant="secondary" className="gap-2">
                <Building2 className="h-5 w-5" />
                Explore Construction
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                <MapPin className="h-5 w-5" />
                List or Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive construction and real estate solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={service.link}>
                  <Button variant="ghost" className="w-full gap-2 group-hover:gap-4 transition-all">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Lotsdacity?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We combine years of construction expertise with modern technology to deliver exceptional results. Our commitment to quality, innovation, and customer satisfaction sets us apart.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/about">
                  <Button size="lg" className="gap-2">
                    Learn More About Us <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <img
                src={heroRealEstate}
                alt="Modern Property"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg">
            Hear from our satisfied clients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're building, renovating, or looking for the perfect property, we're here to help. You can also list your property to potential buyers or renters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="gap-2">
                Contact Us Today
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
