import type { Metadata } from 'next';
import { SectionHeader } from '@/components/Typography/Headers';
import type { BlogPost } from '@/features/blog/@types';
import { getBlogPosts } from '@/utils/notion';
import Image from 'next/image';
import Link from 'next/link';

const getStaticProps = async () => {
  const blogPosts = await getBlogPosts();
  return { blogPosts };
};

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function BlogPosts() {
  const { blogPosts } = await getStaticProps();
  return (
    <div className="container mx-auto">
      <SectionHeader className="mb-4 text-center">Blog</SectionHeader>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.title} className="mb-8">
            <div className="flex">
              {post.cover ? (
                <Image
                  width={150}
                  height={150}
                  className="mr-4 rounded-md md:block"
                  src={post.cover}
                  alt={post.title}
                />
              ) : null}
              <div className="flex flex-col">
                <Link
                  className="text-2xl font-bold text-blue-500 hover:underline"
                  href={`/blog/${post.slug}`}
                >
                  {post.title}
                </Link>
                <p className="mt-2 text-gray-500">{post.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="mt-4 flex items-center">
                {/*{post.authors.map((author) => (*/}
                {/*  <p key={author} className="text-gray-500">*/}
                {/*    {author}*/}
                {/*  </p>*/}
                {/*))}*/}
                <p className="text-gray-500">Alireza</p>
                <p className="mx-4 text-gray-500">|</p>
                <p className="text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-GB')}
                </p>
              </div>
              {!!post.tags.length && (
                <div className="mt-2 flex items-center">
                  <span className="mr-2 text-gray-500">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mr-2 rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
