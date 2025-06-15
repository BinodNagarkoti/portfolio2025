import Image from 'next/image';
import SectionWrapper from '@/components/common/SectionWrapper';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonialsData, type Testimonial } from '@/lib/data';
import { StarIcon, MessageCircleIcon } from 'lucide-react'; // Using StarIcon for rating, MessageCircle for quote

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="h-full flex flex-col justify-between bg-card/80 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105">
      <CardHeader className="p-6 relative">
        <MessageCircleIcon className="absolute top-4 right-4 w-10 h-10 text-primary/20" />
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-semibold text-foreground font-headline">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.role}{testimonial.company && `, ${testimonial.company}`}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 text-muted-foreground italic leading-relaxed flex-grow">
        <p>&ldquo;{testimonial.testimonial}&rdquo;</p>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-accent fill-accent" />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

const TestimonialsSection = () => {
  if (testimonialsData.length === 0) {
    return (
      <SectionWrapper id="testimonials" title="Testimonials" subtitle="Client Feedback">
        <p className="text-center text-muted-foreground">Testimonials coming soon!</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="testimonials" title="Testimonials" subtitle="Client Feedback">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
