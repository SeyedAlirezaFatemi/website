'use client';

import React, { useState } from 'react';
import { HeaderItem } from '@/components/Header/components/HeaderItem';
import { Torch } from '@/components/Header/components/Torch';
import Link from 'next/link';

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);
  const handleLinkClick = () => {
    setIsChecked(false);
  };
  return (
    <header>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isChecked}
          // onChange={(e) => setIsChecked(e.target.checked)}
        />
        <div className="drawer-content flex flex-col">
          <div className="navbar w-full">
            <div
              className="absolute flex-none lg:hidden"
              onClick={() => {
                setIsChecked(true);
              }}
            >
              <label
                htmlFor="my-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block size-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="my-6 hidden w-full flex-row justify-between text-center lg:flex">
              <HeaderItem text="HOME" path="/" />
              <HeaderItem text="WORK" path="/work" />
              <Torch />
              <HeaderItem text="HONORS" path="/honors" />
              <HeaderItem text="BLOG" path="/blog" />
            </div>
            <div className="ex my-6 w-full flex-row justify-between text-center lg:hidden [&>*:first-child]:m-auto">
              <Torch />
            </div>
          </div>
        </div>
        <div className="drawer-side z-10">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={handleLinkClick}
          ></label>
          <ul className="menu min-h-full w-80 bg-base-200 p-4">
            <li onClick={handleLinkClick}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link href="/work">Work</Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link href="/honors">Honors</Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
