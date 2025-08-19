'use client';
import { useEffect, useState } from 'react';
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

export const Icon = ({
  type,
  id,
  className,
  style,
  width,
  height,
}: IIconProps) => {
  const [DynamicComponent, setDynamicComponent] = useState<React.ComponentType<
    React.SVGProps<SVGSVGElement>
  > | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (type) {
      import(`@/ui/icons/icons/${type}`)
        .then((mod) => {
          if (isMounted) setDynamicComponent(() => mod.default);
        })
        .catch(() => {
          if (isMounted) setDynamicComponent(null);
          console.error('Icon not found', type);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [type]);

  if (!type || !DynamicComponent) return null;
  return (
    <DynamicComponent
      id={id}
      className={className}
      style={style}
      width={width}
      height={height}
    />
  );
};
