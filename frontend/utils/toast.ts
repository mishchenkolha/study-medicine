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
export const success = (msg: string, settings?: Partial<typeof baseSettings>) =>
  toast.success(msg, { ...baseSettings, ...settings });

export const error = (msg: string, settings?: Partial<typeof baseSettings>) =>
  toast.error(msg, { ...baseSettings, ...settings });

export const info = (msg: string, settings?: Partial<typeof baseSettings>) =>
  toast.info(msg, { ...baseSettings, ...settings });

export const custom = (
  component: React.ReactNode,
  settings?: Partial<typeof baseSettings>,
) => toast(component, { ...baseSettings, ...settings });
