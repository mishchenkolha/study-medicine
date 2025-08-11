import { DictionaryResponse, ILabelObj } from '@/types/dictionary';
import { strapiService } from '@/utils/strapi_client';
import { stringify } from 'qs';

export const getDictionary = async (): Promise<ILabelObj> => {
  const queryString = stringify({
    populate: ['labels'],
    pagination: {
      limit: 1000,
    },
  });
  const responce = await strapiService.get<DictionaryResponse>(
    `/dictionary?${queryString}`,
    {
      token: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      revalidate: Number(process.env.NEXT_PUBLIC_CACHING_LONG_TIME ?? 0),
    },
  );
  const labelObj: ILabelObj = {};
  (responce.data?.labels ?? []).forEach(
    (label) => (labelObj[label.name] = label.title),
  );
  return labelObj;
};
