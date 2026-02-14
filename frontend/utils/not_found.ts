import { IPageProps } from '@/types/page';
import { Metadata } from 'next';

export const noParamsChecker = async ({
  params,
}: IPageProps): Promise<Metadata> => {
  try {
    if (!params) {
      return {
        title: 'Course Not Found',
        description: 'The requested course does not exist',
      };
    }
    const { slug } = await params;
    if (!slug) {
      return {
        title: 'Course Not Found',
        description: 'The requested course does not exist',
      };
    }
  } catch (error) {
    return {
      title: 'Course Not Found',
      description: 'The requested course does not exist',
    };
  }
  return {} as Metadata;
};
