import { User, ChevronRight } from 'lucide-react'

import Link from "next/link";
import { useTheme } from 'next-themes';

interface BreadCrumbProps {
  firstname?: string;
  lastname?: string;
}

export default function BreadCrumb({ firstname, lastname }: BreadCrumbProps) {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href="/teachers" className={`inline-flex items-center text-sm font-medium text-primary
            ${isDark ? 'hover:text-gray-300' : 'hover:text-[#828282]'}`}>
            <User className='h-6 w-6 mr-2' />
            Professors
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 rtl:rotate-180 text-primary mx-1" aria-hidden="true" />
            <span className={`ms-1 text-sm font-medium text-primary md:ms-2 ${isDark ? 'hover:text-gray-300' : 'hover:text-[#828282]'}`}>
              {firstname} {lastname}
            </span>
          </div>
        </li>
      </ol>
    </nav>

  )
}