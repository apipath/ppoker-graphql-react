import { useEffect, RefObject } from 'react';
import Clipboard from 'clipboard';
import { useToasts } from 'react-toast-notifications';

type Args = {
  ref: RefObject<any>;
  mounted?: boolean;
  text: () => string;
  successText?: string;
  failText?: string;
};

const useClipboard = ({
  ref,
  mounted = true,
  text,
  successText = 'URL copied to clipboard!',
  failText = 'Error when copying URL to clipboard!',
}: Args) => {
  const { addToast } = useToasts();
  useEffect(() => {
    if (!ref.current || !mounted) return;

    const clipboard = new Clipboard(ref.current, {
      text,
    });
    clipboard.on('success', () => {
      addToast(successText, {
        appearance: 'success',
        autoDismiss: true,
      });
    });
    clipboard.on('error', (e) => {
      addToast(failText, {
        appearance: 'error',
        autoDismiss: true,
      });
      console.error(e);
    });

    return () => clipboard.destroy();
  }, [mounted, successText, failText, addToast, ref, text]);
};

export default useClipboard;
