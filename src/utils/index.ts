import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import cn from 'classnames';

import { getClassName } from '../components/Button3D';

const BUTTON_SPACING = 'mx-4';
const CONFIRM_BUTTON_CLASS_NAME = cn(
  getClassName({ color: 'blue' }),
  BUTTON_SPACING,
);
const CANCEL_BUTTON_CLASS_NAME = cn(
  getClassName({ color: 'red' }),
  BUTTON_SPACING,
);

export const swalWithButtons = Swal.mixin({
  buttonsStyling: false,
  customClass: {
    confirmButton: CONFIRM_BUTTON_CLASS_NAME,
    cancelButton: CANCEL_BUTTON_CLASS_NAME,
  },
});

export const fireCanceleableConfirm = ({
  title = 'Are you sure?',
  text,
  icon = 'warning',
  confirmButtonText = "Yes, I'm sure!",
  preConfirm = () => {},
  doneCallback,
  doneTitle = 'Done',
  doneText = '',
}: {
  title?: string;
  text: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  preConfirm?: SweetAlertOptions['preConfirm'];
  doneTitle?: string;
  doneText?: string;
  doneCallback?: Function;
}) =>
  swalWithButtons
    .fire({
      title,
      text,
      icon,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText,
      preConfirm,
    })
    .then((result) => {
      if (!doneCallback) return;

      if (result.isConfirmed) {
        swalWithButtons.fire(doneTitle, doneText, 'success').then(() => {
          doneCallback();
        });
      }
    });
