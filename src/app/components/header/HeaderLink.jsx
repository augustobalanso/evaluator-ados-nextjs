'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderLink = ({ href, children }) => {

  const pathname = usePathname();
  const isActive = pathname === href;

  return !isActive ? <Link className="mx-4" href={href}>{children}</Link> : null;
};

export default HeaderLink;