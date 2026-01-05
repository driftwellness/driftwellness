import { Star, Users, Heart } from 'lucide-react';

export default function TrustIndicators() {
  const testimonials = [
    { name: 'Sarah M.', text: 'Life-changing experience. Drift helped me find peace.' },
    { name: 'Emma K.', text: 'The best wellness app I\'ve tried. Highly recommend!' },
    { name: 'Lisa R.', text: 'Finally found my sanctuary. Thank you, Drift.' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background">
      <div className="container">
        {/* Trust Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Members */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-burgundy/10 rounded-full">
                <Users className="w-6 h-6 text-burgundy" />
              </div>
            </div>
            <p className="text-3xl font-bold text-burgundy mb-2">1,366+</p>
            <p className="text-muted-foreground">Active Members</p>
            <p className="text-sm text-muted-foreground/70 mt-2">Trusted by thousands worldwide</p>
          </div>

          {/* Rating */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gold/10 rounded-full">
                <Star className="w-6 h-6 text-gold fill-gold" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gold mb-2">4.9/5</p>
            <p className="text-muted-foreground">Average Rating</p>
            <p className="text-sm text-muted-foreground/70 mt-2">From 1,200+ reviews</p>
          </div>

          {/* Impact */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <Heart className="w-6 h-6 text-accent" />
              </div>
            </div>
            <p className="text-3xl font-bold text-accent mb-2">35M</p>
            <p className="text-muted-foreground">NOK Donated</p>
            <p className="text-sm text-muted-foreground/70 mt-2">To clean water initiatives</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
            What Members Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gold fill-gold"
                    />
                  ))}
                </div>
                <p className="text-card-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-sm text-muted-foreground">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
