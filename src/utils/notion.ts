import { n2m, notionClient } from '@/components/Notion/client';
import type { BlogPost, NotionBlogDto } from '@/features/blog/@types';

export async function getBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.BLOG_DATABASE_ID as string;
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
  });

  return (response.results as NotionBlogDto[])
    .map((page) => ({
      title: page.properties.title.title[0].text.content,
      date: page.properties.date.date.start,
      created: page.properties.created.created_time,
      updated: page.properties.updated.last_edited_time,
      authors: page.properties.author.people.map((it) => it.object),
      description: page.properties.summary.rich_text[0]?.text?.content ?? '',
      slug: page.properties.slug.formula.string,
      published: page.properties.published.checkbox.valueOf(),
      tags: page.properties.tags.multi_select.map((tag) => tag.name),
      cover: page.cover.file?.url ?? 'https://loremflickr.com/150/150',
    }))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const databaseId = process.env.BLOG_DATABASE_ID as string;
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0] as NotionBlogDto;

  const pageMarkdown = await n2m.pageToMarkdown(page.id);

  const content = n2m.toMarkdownString(pageMarkdown).parent;

  return {
    title: page.properties.title.title[0].text.content,
    date: page.properties.date.date.start,
    created: page.properties.created.created_time,
    updated: page.properties.updated.last_edited_time,
    authors: page.properties.author.people.map((it) => it.object),
    description: page.properties.summary.rich_text[0]?.text?.content ?? '',
    slug: page.properties.slug.formula.string,
    published: page.properties.published.checkbox.valueOf(),
    content,
    cover: page.cover.file?.url ?? null,
    tags: page.properties.tags.multi_select.map((tag) => tag.name),
  };
}
