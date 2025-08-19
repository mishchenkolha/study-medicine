import { STRAPI_URL } from '@/utils/constants';
import OrigImage, { ImageProps } from 'next/image';

const Image = (props: ImageProps) => {
  if (!props.src) {
    return null;
  }
  if (!String(props.src).startsWith('http')) {
    const imgSrc = `${STRAPI_URL}${props.src}`;
    return <OrigImage {...props} src={imgSrc} />;
  }
  return <OrigImage {...props} />;
};

export default Image;
