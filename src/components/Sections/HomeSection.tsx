import ReactMarkdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import Photo from '@/assets/avatar.jpg';
import { SectionHeader } from '@/components/Typography/Headers';
import { skills } from '@/constants/skills';
import Image from 'next/image';
import Link from 'next/link';

export type EducationItem = {
  date: string;
  description: string;
  gpa: string;
  id: string;
  major: string;
  minor: string;
  name: string;
};

export type ProfessionalDevelopmentItem = {
  date: string;
  description: string;
  id: string;
  name: string;
};

export function HomeSection({
  educationItems,
  profDevItems,
}: {
  educationItems: EducationItem[];
  profDevItems: ProfessionalDevelopmentItem[];
}) {
  return (
    <div>
      <div className="px-4 lg:px-16">
        <SectionHeader className="mb-4 text-center">
          Seyed Alireza Fatemi Jahromi
        </SectionHeader>
        <div className="flex flex-col flex-wrap place-items-center justify-center gap-12 lg:flex-row">
          <div className="avatar flex-initial">
            <div className="avatar w-48 rounded-full">
              <Image
                src={Photo}
                placeholder="blur"
                alt="Photo of Alireza Fatemi"
              />
            </div>
          </div>
          <div className="flex-1 leading-6">
            <p>
              <span className="inline-block">
                Master&apos;s Student in Computer Science at Aalto University
              </span>
              <span className="inline-block">
                Pursuing a minor in Game Design and Development and Math&Arts
              </span>
              <span className="my-2 inline-block text-gray-500">
                Passionate about Game Development, Visual Computing, Machine
                Learning, Computer Graphics, and Extended Reality
              </span>
              <span className="inline-block">
                <a
                  className="link link-info"
                  href="https://github.com/SeyedAlirezaFatemi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                ,&nbsp;
                <a
                  className="link link-info"
                  href="https://scholar.google.com/citations?user=YxRB1PAAAAAJ&hl=en&authuser=2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Scholar
                </a>
                ,{' '}
                <a
                  className="link link-info"
                  href="https://www.linkedin.com/in/seyed-alireza-fatemi-jahromi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                ,{' '}
                <a
                  className="link link-info"
                  href="/SeyedAlirezaFatemiJahromi.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download CV
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <SectionHeader className="pb-2 text-center">Interests</SectionHeader>
      <ul className="list-disc px-8 [&>li]:mb-0.5">
        <li>Game Design & Development & Graphics Programming</li>
        <li>Machine Learning & Generative AI & Visual Computing</li>
        <li>Augmented & Virtual Reality</li>
        <li>Photogrammetry & 3D Modeling & Printing</li>
        <li>Software & Web Development</li>
        <li>A lot of other things I haven&apos;t discovered yet!</li>
      </ul>
      {/* <div className="divider"></div>
      <SectionHeader className="pb-2 text-center">
        Research Interests
      </SectionHeader>
      <ul className="list-disc px-8 [&>li]:mb-0.5">
        <li>Visual Computing (Computer Graphics & Vision)</li>
        <li>Machine Learning & Deep Learning</li>
        <li>Geometry Processing & Geometric Deep Learning</li>
        <li>A lot of other things I haven&apos;t discovered yet!</li>
      </ul> */}
      <div className="divider"></div>
      <SectionHeader className="pb-2 text-center">Education</SectionHeader>
      <ul className="list-disc px-8 [&>li]:mb-6">
        {educationItems.map((educationItem) => (
          <li key={educationItem.id}>
            <span className="block font-semibold">{educationItem.name}</span>
            <span className="block text-sm text-gray-500">
              GPA: {educationItem.gpa}
            </span>
            <span className="block">{educationItem.major}</span>
            <span className="block">{educationItem.minor}</span>
            <span className="block text-sm text-gray-500">
              {educationItem.date}
            </span>
            <div
              tabIndex={0}
              className="collapse collapse-arrow mt-2 border border-base-300 bg-base-200"
            >
              <input type="checkbox" />
              <div className="collapse-title">Course Highlights</div>
              <div className="collapse-content">
                <div className="prose max-w-none pt-1 text-justify leading-tight prose-ul:-mt-2">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeExternalLinks]}
                  >
                    {educationItem.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="divider"></div>
      <SectionHeader className="pb-2 text-center">
        Professional Development
      </SectionHeader>
      <ul className="list-disc px-8 [&>li]:mb-6">
        {profDevItems.map((profDevItem) => (
          <li key={profDevItem.id}>
            <span className="block font-semibold">{profDevItem.name}</span>
            <span className="block text-sm text-gray-500">
              {profDevItem.date}
            </span>
            <div className="prose max-w-none pt-1 text-justify leading-tight prose-ul:-mt-2">
              <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeExternalLinks]}>
                {profDevItem.description}
              </ReactMarkdown>
            </div>
          </li>
        ))}
      </ul>
      <div className="divider"></div>
      <SectionHeader className="pb-2 text-center">Skills</SectionHeader>
      <section>
        {skills.map((it) => (
          <div className="pb-2 pt-4 text-center md:text-left" key={it.title}>
            <p className="text-lg font-bold">{it.title}</p>
            <ul>
              {it.items.map((skill) => (
                <li
                  className="badge badge-ghost badge-lg m-2 cursor-pointer p-4 hover:bg-gray-400 hover:shadow dark:hover:bg-gray-600"
                  key={skill.name}
                >
                  <Link
                    href={skill.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {skill.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
