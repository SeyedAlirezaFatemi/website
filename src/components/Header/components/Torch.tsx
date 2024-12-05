'use client';

import { useTheme } from 'next-themes';
import offImage from '@/assets/images/theme/off.png';
import onImage from '@/assets/images/theme/on.png';
import Image from 'next/image';

export function Torch() {
  const { theme, setTheme } = useTheme();
  return (
    <Image
      className="-mt-10 cursor-pointer"
      src={theme == 'dark' ? onImage : offImage}
      placeholder="blur"
      onClick={() => {
        setTheme(theme == 'light' ? 'dark' : 'light');
      }}
      alt="logo"
      width="80"
      height="140"
    />
  );
}
