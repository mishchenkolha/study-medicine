'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
export type TIcon = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
};

interface IIconProps extends TIcon {
  type: string;
}

const iconCache: Record<string, any> = {};

export const Icon = ({
  type,
  id,
  className,
  style,
  width,
  height,
}: IIconProps) => {
  const DynamicIcon = useMemo(() => {
    if (!type) return null;

    if (!iconCache[type]) {
      iconCache[type] = dynamic(() => import(`@/ui/icons/icons/${type}`), {
        ssr: true, // Дозволяє серверний рендеринг, щоб текст і іконка з'являлися разом
        loading: () => <span style={{ width, height }} className={className} />, // Заглушка, щоб не "стрибав" макет
      });
    }
    return iconCache[type];
  }, [type, width, height, className]);

  if (!DynamicIcon) return null;

  return (
    <DynamicIcon
      id={id}
      className={className}
      style={style}
      width={width}
      height={height}
    />
  );
};
