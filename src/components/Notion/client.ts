import { NotionToMarkdown } from 'notion-to-md';
import { Client } from '@notionhq/client';

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient });

n2m.setCustomTransformer('video', async (block) => {
  const { video } = block as any;
  const { type } = video;
  const video_url = video[type].url;
  return `<iframe class="w-full h-96" src="${video_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
});

export { n2m };
