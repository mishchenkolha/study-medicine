import React from 'react';
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  duration: string;
  level: string;
  audience: string;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Foundations of Aesthetic Medicine (Botox & Filler)',
    duration: '2 DAYS',
    level: 'BEGINNER',
    audience: 'Physicians & Nurses',
    image: 'https://picsum.photos/400/300?random=1',
  },
  {
    id: 2,
    title: 'Injectable Fillers: Cannula Techniques',
    duration: '1 DAY',
    level: 'INTERMEDIATE',
    audience: 'Physicians & Nurses',
    image: 'https://picsum.photos/400/300?random=2',
  },
  {
    id: 3,
    title: 'Aesthetic Applications of Platelet-Rich Plasma (PRP)',
    duration: '1 DAY',
    level: 'BEGINNER',
    audience: 'Physicians & Nurses',
    image: 'https://picsum.photos/400/300?random=3',
  },
  {
    id: 4,
    title: 'Advanced Injectables',
    duration: '2 DAYS',
    level: 'ADVANCED',
    audience: 'Physicians & Nurses',
    image: 'https://picsum.photos/400/300?random=4',
  },
  {
    id: 5,
    title: 'Skin Rejuvenation Techniques',
    duration: '1 DAY',
    level: 'BEGINNER',
    audience: 'Physicians & Nurses',
    image: 'https://picsum.photos/400/300?random=5',
  },
  {
    id: 6,
    title: 'Facial Anatomy for Injectors',
    duration: '2 DAYS',
    level: 'ADVANCED',
    audience: 'Physicians & Nurses',
    image: 'https://picsum.photos/400/300?random=6',
  },
];

export default function CourseGrid() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select your course:</h2>

      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          xl:grid-cols-4 
          gap-6
        "
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
          >
            <div className="w-full h-48 relative">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover object-center-top"
              />
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
          </div>
        ))}
      </div>
    </div>
  );
}
