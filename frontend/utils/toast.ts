import { toast, ToastPosition } from 'react-toastify';
const baseSettings = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'colored',
};
export const success = (msg: string) => toast.success(msg, baseSettings);

export const error = (msg: string) => toast.error(msg, baseSettings);
