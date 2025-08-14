'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ICategoryIds, IPublicCourse } from '@/types/courses';
import { cn } from '@/utils';
import { Button } from '@/ui/button';
import Link from 'next/link';

export default function CourseGrid({
  courses,
  categoryIds = {},
}: {
  courses: IPublicCourse[];
  categoryIds: ICategoryIds;
}) {
  const [filter, setFilter] = useState('');
  const filterTabs = [
    { title: 'All', description: '', href: null, slug: '', children: {} },
    ...Object.entries(categoryIds ?? {}).map(([key, item]) => ({
      title: item.title,
      description: '',
      href: null,
      slug: key,
      children: {},
    })),
  ];

  const onSetFilter = (slug: string) => () => {
    setFilter(slug);
  };

  const filteredCourses = filter
    ? courses.filter((course) =>
        categoryIds[filter]?.list?.includes?.(course.slug),
      )
    : courses;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 w-full justify-center flex-wrap">
        {filterTabs.map((tab) => (
          <Button
            key={tab.slug}
            onClick={onSetFilter(tab.slug)}
            variant="secondary"
            className={cn(
              '!rounded-md whitespace-nowrap',
              tab.slug === filter && 'bg-gray-700 text-white',
            )}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          xl:grid-cols-4 
          gap-6
        "
      >
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
            href={`/courses/${course.slug}`}
          >
            <div className="w-full h-48 relative">
              {course.image && (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover object-center-top"
                />
              )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                <span className="text-gray-400">
                  <Image
                    src="/images/icons/clock.svg"
                    alt="Clock"
                    width={20}
                    height={18}
                  />{' '}
                  {course.duration}
                </span>
                <span className="text-gray-400">
                  <Image
                    src="/images/icons/level.svg"
                    alt="Level"
                    width={20}
                    height={18}
                  />{' '}
                  {course.level}
                </span>
              </div>
              <h3 className="text-base font-bold flex-grow">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{course.audience}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
