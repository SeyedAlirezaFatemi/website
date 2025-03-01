import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import { twMerge } from 'tailwind-merge';
import styles from './work.module.css';
import { SectionHeader } from '@/components/Typography/Headers';

export type Experience = {
  company: string;
  date: string;
  description: string;
  id: string;
  link: string;
  place: string;
  title: string;
};

export default function WorkSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div className="text-center">
      <SectionHeader className="mb-8 text-center">
        Work & Research Experiences
      </SectionHeader>
      <div className="flex flex-col flex-wrap space-y-4">
        {experiences.map((experience) => (
          <WorkItem
            key={experience.id}
            company={`${experience.company}, ${experience.place}`}
            title={experience.title}
            date={experience.date}
            description={experience.description}
            link={experience.link}
          />
        ))}
      </div>
    </div>
  );
}

function WorkItem({
  title,
  company,
  date,
  description,
  link,
}: {
  children?: React.ReactNode;
  company: string;
  date: string;
  description: string;
  link: string;
  title: string;
}) {
  return (
    <div className="text-start">
      <h3
        className={twMerge(
          'block w-fit text-center text-xl font-semibold uppercase tracking-wide no-underline',
          'bg-gradient-to-r from-sky-500 to-indigo-500 bg-no-repeat',
          styles.link
        )}
      >
        <a href={link} target="_blank" rel="noreferrer">
          {company}
        </a>
      </h3>
      <h4 className="pt-1 text-sm font-medium">{title}</h4>
      <span className="text-sm text-zinc-500">{date}</span>
      <div className="prose max-w-none pt-1 text-justify leading-tight xl:prose-lg 2xl:prose-xl">
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeExternalLinks]}>
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
