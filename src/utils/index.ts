import Swal from 'sweetalert2';
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
