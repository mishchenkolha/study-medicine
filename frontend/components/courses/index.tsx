'use client';
import React, { useState } from 'react';
import Image from '@/ui/image';
import { ICategoryIds, IPublicCourse } from '@/types/courses';
import { cn } from '@/utils';
import { Button } from '@/ui/button';
import Link from '@/ui/link';
import { Icon } from '@/ui/icons';
import { IconType } from '@/ui/icons/IconType';
import { ROUTES } from '@/utils/routes';

export default function CourseGrid({
  courses,
  categoryIds = {},
  showFilters = true,
}: {
  courses: IPublicCourse[];
  categoryIds: ICategoryIds;
  showFilters?: boolean;
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
      {showFilters && (
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
      )}
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
            href={`${ROUTES.COURSES}/${course.slug}`}
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
                <div className="text-gray-400 inline-flex flex-col">
                  <Icon type={IconType.Clock} width="16px" height="16px" />
                  {course.duration}
                </div>
                <div className="text-gray-400 inline-flex flex-col">
                  <Icon type={IconType.Level} width="16px" height="16px" />
                  {course.level}
                </div>
              </div>
              <div className="header6 flex-grow">{course.title}</div>
              <p className="text-sm text-gray-600 mt-2">{course.audience}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
