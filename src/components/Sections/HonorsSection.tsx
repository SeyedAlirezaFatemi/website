'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from 'next-themes';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import TrophyDark from '@/assets/trophy_dark.svg';
import TrophyLight from '@/assets/trophy_light.svg';
import { SectionHeader } from '@/components/Typography/Headers';
import Image from 'next/image';

export type Honor = {
  date: string;
  description: string;
  id: string;
  place: string;
};

export default function HonorsSection({ honors }: { honors: Honor[] }) {
  return (
    <div>
      <SectionHeader className="text-center">Honors</SectionHeader>
      {honors.map((honor) => (
        <div key={honor.id} className="py-4 first:pt-0 last:pb-0">
          <HonorIcon />
          <div className="prose max-w-none text-justify leading-tight xl:prose-lg 2xl:prose-xl">
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeExternalLinks]}>
              {honor.description}
            </ReactMarkdown>
          </div>
          <span className="text-sm text-zinc-500">{`${honor.place} | ${honor.date}`}</span>
        </div>
      ))}
    </div>
  );
}

export function HonorIcon() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Image
      src={isDark ? TrophyDark : TrophyLight}
      alt="Honor"
      width={24}
      height={24}
      className="float-left"
    />
  );
}
