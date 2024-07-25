import React from 'react';
import { Calendar } from 'lucide-react';

interface ArticleHeadingProps {
  data: {
    heading: string;
    updatedAt: string;
  };
}

export default function ArticleHeading({ data }: ArticleHeadingProps) {
  // 格式化日期为 "July 17, 2024" 格式
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="rich-text pt-6 dark:bg-black dark:text-gray-50">
      <h1 className="text-2xl lg:text-4xl text-gray-900 dark:text-gray-50">{data.heading}</h1>
      <div className="date-container flex items-center mt-6 text-gray-600 dark:text-gray-400">
        <Calendar size={18} className="mr-2" />
        <span>{formatDate(data.updatedAt)}</span>
      </div>
    </section>
  );
}