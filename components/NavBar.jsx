'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";

const NavBar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="w-full px-6 py-4 flex justify-end items-center bg-white dark:bg-black border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {resolvedTheme === 'dark' ? <GoSun className="w-5 h-5" /> : <IoMoonOutline className="w-5 h-5" />}
      </Button>
    </nav>
  );
};

export default NavBar;
