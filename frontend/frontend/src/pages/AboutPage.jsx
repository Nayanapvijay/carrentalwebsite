import { Award, Users, Shield } from "lucide-react"


const AboutPage = () => {
  return (
   
      <div className="container px-4 py-12 md:px-6 md:py-24">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About DrivEase</h1>
          <p className="mt-4 text-xl text-muted-foreground">Your trusted partner for car rentals since 2010</p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                DrivEase was founded in 2010 with a simple mission: to make car rentals easy, affordable, and accessible
                to everyone. What started as a small fleet of just 10 cars has now grown into one of the most trusted
                car rental services with operations in over 20 cities.
              </p>
              <p className="text-lg text-muted-foreground">
                Our founder, Jane Smith, recognized the need for a customer-centric car rental service after
                experiencing frustration with existing options. She set out to create a company that prioritizes
                transparency, quality, and customer satisfaction above all else.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src="/placeholder.svg?height=400&width=600" alt="DrivEase founders" className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We maintain a fleet of well-serviced, modern vehicles to ensure your safety and comfort on the road.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We go above and beyond to ensure a seamless rental experience.
              </p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                No hidden fees or surprises. We believe in clear, upfront pricing and honest communication.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                name: "Jane Smith",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "John Davis",
                role: "Chief Operations Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sarah Johnson",
                role: "Chief Marketing Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Chen",
                role: "Chief Technology Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-muted/50 p-8 rounded-lg">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">Vehicles in our fleet</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <p className="text-muted-foreground">Cities served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-muted-foreground">Happy customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">13</div>
              <p className="text-muted-foreground">Years of service</p>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default AboutPage

