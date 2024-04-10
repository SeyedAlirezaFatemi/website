import type { Metadata } from 'next';
import { n2m, notionClient } from '@/components/Notion/client';
import {
  type EducationItem,
  HomeSection,
} from '@/components/Sections/HomeSection';
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

type NotionEducationResponse = PageObjectResponse & {
  description: string;
  properties: {
    Date: {
      rich_text: Array<RichTextItemResponse>;
    };
    GPA: {
      rich_text: Array<RichTextItemResponse>;
    };
    Major: {
      rich_text: Array<RichTextItemResponse>;
    };
    Minor: {
      rich_text: Array<RichTextItemResponse>;
    };
    Name: {
      title: Array<RichTextItemResponse>;
    };
  };
};

const getEducationItems = async () => {
  const education = await notionClient.databases.query({
    database_id: process.env.EDUCATION_DATABASE_ID as string,
    sorts: [
      {
        property: 'Order',
        direction: 'descending',
      },
    ],
  });

  const educationItems = education.results as NotionEducationResponse[];
  for (const education of educationItems) {
    const mdblocks = await n2m.pageToMarkdown(education.id);
    const mdStringObject = n2m.toMarkdownString(mdblocks);
    education.description = mdStringObject.parent;
  }

  return educationItems.map((honor) => ({
    id: honor.id,
    name: honor.properties.Name.title[0].plain_text,
    date: honor.properties.Date.rich_text[0].plain_text,
    gpa: honor.properties.GPA.rich_text[0].plain_text,
    major: honor.properties.Major.rich_text[0].plain_text,
    minor: honor.properties.Minor.rich_text?.[0]?.plain_text ?? '',
    description: honor.description,
  }));
};

const getStaticProps = async () => {
  const data = (await getEducationItems()) as EducationItem[];

  return {
    educationItems: data,
  };
};

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const { educationItems } = await getStaticProps();
  return (
    <main>
      <HomeSection educationItems={educationItems} />
    </main>
  );
}
