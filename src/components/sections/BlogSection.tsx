import SectionWrapper from '../common/SectionWrapper';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { blogPosts } from '@/lib/data';
import Link from 'next/link';
import { Button } from '../ui/button';

const BlogSection = () => {
  if (!blogPosts || blogPosts.length === 0) {
    return null;
  }
  return (
    <SectionWrapper id="blog" title="Latest Blog" subtitle="">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{post.snippet}</p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href={post.link}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};
export default BlogSection;
