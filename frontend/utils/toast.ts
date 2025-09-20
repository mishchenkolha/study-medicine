import { toast, ToastPosition } from 'react-toastify';
export const AUTO_CLOSE_TOAST = 5000;
import type { ToastOptions } from 'react-toastify';
const baseSettings: ToastOptions = {
  position: 'top-right' as ToastPosition,
  autoClose: AUTO_CLOSE_TOAST,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'colored',
};
export const success = (msg: string) => toast.success(msg, baseSettings);

export const error = (msg: string) => toast.error(msg, baseSettings);

export const info = (msg: string) => toast.info(msg, baseSettings);

export const custom = (
  component: React.ReactNode,
  settings?: Partial<typeof baseSettings>,
) => toast(component, { ...baseSettings, ...settings });
