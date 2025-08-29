import ChangePasswordForm from '@/components/change-password';
import { getUser } from '@/services/auth.service';
import { getDictionary } from '@/services/dictionary.service';

export default async function UserProfilePage() {
  const [user, dictionary] = await Promise.all([getUser(), getDictionary()]);

  return (
    <div className="container w-full">
      <h1 className="header1 pb-6 animate-fade-in-up animate-fade-in-up">
        {dictionary.profile}
      </h1>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {dictionary.email}
          </label>
          <p className="text-gray-900">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {dictionary.username}
          </label>
          <p className="text-gray-900">{user.username}</p>
        </div>
      </div>

      <ChangePasswordForm dictionary={dictionary} />
    </div>
  );
}
