import { n2m, notionClient } from '@/components/Notion/client';
import type { Honor } from '@/components/Sections/HonorsSection';
import HonorsSection from '@/components/Sections/HonorsSection';
import Head from 'next/head';
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

export default function Honors({ honors }: { honors: Honor[] }) {
  return (
    <>
      <Head>
        <title>Honors | Seyed Alireza Fatemi Jahromi</title>
        <meta
          name="description"
          content="Seyed Alireza Fatemi Jahromi Personal Website"
        />
      </Head>
      <main>
        <HonorsSection honors={honors} />
      </main>
    </>
  );
}

type NotionHonorResponse = PageObjectResponse & {
  description: string;
  properties: {
    Date: {
      rich_text: Array<RichTextItemResponse>;
    };
    Place: {
      rich_text: Array<RichTextItemResponse>;
    };
  };
};

const getAllHonors = async () => {
  const honors = await notionClient.databases.query({
    database_id: process.env.HONORS_DATABASE_ID as string,
    sorts: [
      {
        property: 'Order',
        direction: 'descending',
      },
    ],
  });

  const allHonors = honors.results as NotionHonorResponse[];
  for (const honor of allHonors) {
    const mdblocks = await n2m.pageToMarkdown(honor.id);
    const mdStringObject = n2m.toMarkdownString(mdblocks);
    honor.description = mdStringObject.parent;
  }

  return allHonors.map((honor) => ({
    id: honor.id,
    date: honor.properties.Date.rich_text[0].plain_text,
    place: honor.properties.Place.rich_text[0].plain_text,
    description: honor.description,
  }));
};

export const getStaticProps = async () => {
  const data = await getAllHonors();

  return {
    props: {
      honors: data,
    },
    revalidate: 60,
  };
};
