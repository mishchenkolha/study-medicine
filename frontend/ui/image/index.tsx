import { getImageURL } from '@/utils';
import { IS_PROD } from '@/utils/constants';
import OrigImage, { ImageProps } from 'next/image';

const Image = (props: ImageProps) => {
  if (!props.src) {
    return null;
  }

  return (
    <OrigImage
      {...props}
      src={getImageURL(String(props.src))}
      fetchPriority={props.priority ? 'high' : undefined}
      loading={!props.priority ? (props.loading ?? 'lazy') : undefined}
      unoptimized={IS_PROD ? undefined : true}
    />
  );
};

export default Image;
