import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Award, Target, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroConstruction from "@/assets/hero-construction.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering quality that exceeds expectations."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Transparency, honesty, and ethical practices guide everything we do."
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Your satisfaction and success are at the heart of our business."
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We embrace new technologies and methods to deliver better results."
    },
  ];

  const team = [
    {
      name: "Robert Williams",
      role: "CEO & Founder",
      description: "Years in construction management and real estate development."
    },
    {
      name: "Jennifer Davis",
      role: "Chief Operating Officer",
      description: "Expert in operational excellence and project delivery."
    },
    {
      name: "Michael Thompson",
      role: "Head of Construction",
      description: "Licensed contractor with expertise in commercial and residential projects."
    },
    {
      name: "Patricia Garcia",
      role: "Real Estate Director",
      description: "Specialized in property development and market analysis."
    },
  ];

  // const milestones = [
  //   { year: "2008", event: "Lotsdacity Founded", description: "Started with a vision to transform construction" },
  //   { year: "2012", event: "100 Projects Milestone", description: "Completed our 100th successful project" },
  //   { year: "2015", event: "Real Estate Division", description: "Expanded into property sales and rentals" },
  //   { year: "2018", event: "Modular Innovation", description: "Pioneered modular building solutions" },
  //   { year: "2023", event: "500+ Projects", description: "Serving over 1,200 satisfied clients" },
  // ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroConstruction})` }}
        >
          <div className="absolute inset-0 bg-gradient-overlay"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            About Lotsdacity
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-slide-up">
            Building the future through excellence, innovation, and dedication
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Lotsdacity began with a simple mission: to deliver exceptional construction services while maintaining the highest standards of quality and integrity.
              </p>
              <p>
                Over the years, we've grown from a small construction firm to a comprehensive construction and real estate company, serving hundreds of satisfied clients across residential, commercial, and industrial sectors.
              </p>
              <p>
                Today, we're proud to be leaders in innovative construction methods, including modular building technology, while also providing comprehensive real estate solutions that connect people with their perfect properties.
              </p>
              <p>
                Our commitment to excellence, combined with our customer-first approach, has made us a trusted name in the industry.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold">50+</CardTitle>
                <CardDescription>Projects Completed</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-4xl font-bold">30+</CardTitle>
                <CardDescription>Happy Clients</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-4xl font-bold">5+</CardTitle>
                <CardDescription>Years Experience</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold">98%</CardTitle>
                <CardDescription>Satisfaction Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-muted-foreground text-lg">
            Experienced professionals dedicated to your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      {/* <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">
              Key milestones in our growth and evolution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                  </div>
                  <div className="flex-shrink-0 relative">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    {index < milestones.length - 1 && (
                      <div className="absolute top-4 left-1.5 w-0.5 h-full bg-border"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold mb-2">{milestone.event}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Success Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're looking to build, renovate, or find your perfect property, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
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

export default About;
