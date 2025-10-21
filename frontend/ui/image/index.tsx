import { getImageURL } from '@/utils';
import OrigImage, { ImageProps } from 'next/image';

const Image = (props: ImageProps) => {
  if (!props.src) {
    return null;
  }

  return <OrigImage {...props} src={getImageURL(String(props.src))} />;
};

export default Image;
