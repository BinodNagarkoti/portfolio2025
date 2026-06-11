
import { notFound } from 'next/navigation';
import { getPersonalInfo, getPostBySlug } from '@/lib/actions';
import SectionWrapper from '@/components/common/SectionWrapper';
import JsonLd from '@/components/seo/JsonLd';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';
import { staticPersonalInfo } from '@/lib/data';
import { buildBlogPostMetadata, buildBlogPostingJsonLd } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [{ data: post }, personalInfo] = await Promise.all([
    getPostBySlug(slug),
    getPersonalInfo(),
  ]);

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  return buildBlogPostMetadata(post, personalInfo ?? staticPersonalInfo);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [{ data: post }, personalInfo] = await Promise.all([
    getPostBySlug(slug),
    getPersonalInfo(),
  ]);
  const info = personalInfo ?? staticPersonalInfo;

  if (!post) {
    notFound();
  }

  return (
    <SectionWrapper>
      <JsonLd data={buildBlogPostingJsonLd(post, info)} />
      <div className="max-w-4xl mx-auto pt-16">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center border-b pb-6">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{post.title}</h1>
            <CardDescription className="pt-2">
              Posted on {format(parseISO(post.created_at), 'PPP')}
            </CardDescription>
            <div className="flex justify-center flex-wrap gap-2 pt-4">
              {post.tags?.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            <article className="prose prose-lg dark:prose-invert max-w-none mx-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
