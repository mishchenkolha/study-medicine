'use client';
import { useLogout, useUser } from '@/hooks/useUser';
import { ILabelObj } from '@/types/dictionary';
import { Button, VARIANTS } from '@/ui/button';
import { ROUTES } from '@/utils/routes';

export default function AuthButtons({ dictionary }: { dictionary: ILabelObj }) {
  const { user: userData, isLoading } = useUser();
  const user = userData?.user || {};
  const { logout } = useLogout();
  const onLogout = () => {
    logout();
    setTimeout(() => window.open('/', '_self'), 500);
  };
  if (isLoading) {
    return <div className="w-40 h-10" />;
  }

  return (
    <>
      {!user?.username ? (
        <div className="flex gap-2">
          <Button className="!hidden xl:!inline-flex" href={ROUTES.LOGIN}>
            {dictionary.login}
          </Button>
          <Button
            className="!hidden xl:!inline-flex"
            href={ROUTES.REGISTER}
            variant={VARIANTS.SECONDARY}
          >
            {dictionary.register}
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button className="!hidden xl:!inline-flex" onClick={onLogout}>
            {dictionary.logout}
          </Button>
          <Button
            className="!hidden xl:!inline-flex"
            href={ROUTES.PROFILE}
            variant={VARIANTS.SECONDARY}
          >
            {dictionary.greeting} {user?.username}
          </Button>
        </div>
      )}
    </>
  );
}
