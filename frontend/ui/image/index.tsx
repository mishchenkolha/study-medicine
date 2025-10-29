import { getImageURL } from '@/utils';
import OrigImage, { ImageProps } from 'next/image';

const Image = (props: ImageProps) => {
  if (!props.src) {
    return null;
  }

  return (
    <OrigImage
      {...props}
      src={getImageURL(String(props.src))}
      priority={props.priority ?? false}
      fetchPriority={props.priority ? 'high' : undefined}
      loading={!props.priority ? (props.loading ?? 'lazy') : undefined}
    />
  );
};

export default Image;
