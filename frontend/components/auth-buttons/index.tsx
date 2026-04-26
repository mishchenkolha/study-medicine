'use client';
import { useLogout, useUser } from '@/hooks/useUser';
import { ILabelObj } from '@/types/dictionary';
import { Button, VARIANTS } from '@/ui/button';
import { ROUTES } from '@/utils/routes';

export default function AuthButtons({ dictionary }: { dictionary: ILabelObj }) {
  const { user: userData, isLoading }: { user: any; isLoading: boolean } =
    useUser();
  const user = userData?.user || {};
  const { logout } = useLogout();
  const onLogout = () => {
    logout();
    setTimeout(() => window.open('/', '_self'), 500);
  };
  if (isLoading) {
    return <div className="h-10 w-40" />;
  }

  return (
    <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
      {!user?.username ? (
        <div className="flex gap-2">
          <Button
            className="whitespace-nowrap xl:!inline-flex"
            href={ROUTES.LOGIN}
          >
            {dictionary.login}
          </Button>
          <Button
            className="whitespace-nowrap xl:!inline-flex"
            href={ROUTES.REGISTER}
            variant={VARIANTS.SECONDARY}
          >
            {dictionary.register}
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            className="whitespace-nowrap xl:!inline-flex"
            onClick={onLogout}
          >
            {dictionary.logout}
          </Button>
          <Button
            className="truncate whitespace-nowrap xl:!inline-flex"
            href={ROUTES.PROFILE}
            variant={VARIANTS.SECONDARY}
          >
            {dictionary.profile}
          </Button>
        </div>
      )}
    </div>
  );
}
