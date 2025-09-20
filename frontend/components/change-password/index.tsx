'use client';

import { useEffect, useState } from 'react';
import { ILabelObj } from '@/types/dictionary';
import { error, success } from '@/utils/toast';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '@/utils';
interface IProps {
  dictionary: ILabelObj;
}

export default function ChangePasswordForm({ dictionary }: IProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const POST_CHANGE_PASSWORD_URL = '/api/change-password';
  const {
    trigger: onChangePassword,
    error: isError,
    isMutating: loading,
  } = useSWRMutation(POST_CHANGE_PASSWORD_URL, () =>
    fetcher(POST_CHANGE_PASSWORD_URL, 'POST', {
      currentPassword,
      password: newPassword,
      passwordConfirmation: repeatPassword,
    }),
  );
  if (isError) {
    error(dictionary.change_password_error);
  }
  useEffect(() => {
    if (!loading) {
      setCurrentPassword('');
      setNewPassword('');
      setRepeatPassword('');
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      error(dictionary.passwords_do_not_match);
      return;
    }
    try {
      await onChangePassword();
      success(dictionary.change_password_success);
    } catch (err: unknown) {
      error((err as Error).message || dictionary.change_password_error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6 max-w-[360px]">
      <h2 className="text-lg font-semibold">{dictionary.changePassword}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {dictionary.current_password}
        </label>
        <input
          type="password"
          className="mt-1 w-full rounded border px-3 py-2"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {dictionary.new_password}
        </label>
        <input
          type="password"
          className="mt-1 w-full rounded border px-3 py-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {dictionary.repeat_password}
        </label>
        <input
          type="password"
          className="mt-1 w-full rounded border px-3 py-2"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? dictionary.saving : dictionary.save}
      </button>
    </form>
  );
}
