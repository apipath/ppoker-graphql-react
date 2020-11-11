import { renderHook, act } from '@testing-library/react-hooks';
import { ToastProvider } from 'react-toast-notifications';
import ReactDOM from 'react-dom';
import usePoints from './usePoints';

describe('usePoints', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => {
      return element;
    }) as any;
  });

  afterEach(() => {
    (ReactDOM.createPortal as jest.Mock).mockClear();
  });

  describe('validation', () => {
    it('should not validate empty labels', () => {
      const labelOne = 'label-1';
      const labelTwo = 'label-2';

      const { result } = renderHook(
        () => usePoints([{ label: labelOne }, { label: labelTwo }]),
        {
          wrapper: ToastProvider,
        },
      );
      const { updateLabel, validatePointLabel } = result.current;
      expect(result.current.points[0].error).toBeFalsy();
      expect(result.current.points[1].error).toBeFalsy();

      act(() => updateLabel('', 1));
      act(() => validatePointLabel({ ...result.current.points[1] }));

      expect(result.current.points[0].error).toBeFalsy();
      expect(result.current.points[1].error).toBeFalsy();
    });

    it('should remove error from empty labels', () => {
      const labelOne = 'label-1';
      const labelTwo = 'label-2';
      const labelThree = '';

      const { result } = renderHook(
        () =>
          usePoints([
            { label: labelOne },
            { label: labelTwo },
            { label: labelThree },
          ]),
        {
          wrapper: ToastProvider,
        },
      );
      const { updateLabel, validatePointLabel } = result.current;
      expect(result.current.points[0].error).toBeFalsy();
      expect(result.current.points[1].error).toBeFalsy();

      act(() => updateLabel(labelOne, 1));
      act(() => validatePointLabel({ ...result.current.points[1] }));

      expect(result.current.points[0].error).toBeFalsy();
      expect(result.current.points[1].error).toBeTruthy();

      act(() => updateLabel('', 1));
      act(() => validatePointLabel({ ...result.current.points[1] }));

      expect(result.current.points[0].error).toBeFalsy();
      expect(result.current.points[1].error).toBeFalsy();
    });

    it('should mark point with error if label is not unique', async () => {
      const labelOne = 'label-1';
      const labelTwo = 'label-2';

      const { result } = renderHook(
        () => usePoints([{ label: labelOne }, { label: labelTwo }]),
        {
          wrapper: ToastProvider,
        },
      );
      const { updateLabel, validatePointLabel } = result.current;
      expect(result.current.points[0].error).toBeFalsy();
      expect(result.current.points[1].error).toBeFalsy();

      act(() => updateLabel(labelOne, 1));
      act(() => validatePointLabel({ ...result.current.points[1] }));

      expect(result.current.points[1].error).toBeTruthy();
      expect(result.current.points[0].error).toBeFalsy();
    });

    it('should remove errors from points that are now unique', () => {
      const labelOne = 'label-1';
      const labelTwo = 'label-2';
      const labelThree = 'label-3';

      const { result } = renderHook(
        () =>
          usePoints([
            { label: labelOne },
            { label: labelTwo },
            { label: labelThree },
          ]),
        {
          wrapper: ToastProvider,
        },
      );
      const { updateLabel, validatePointLabel } = result.current;

      expect(result.current.points[2].error).toBeFalsy();

      act(() => updateLabel(labelOne, 2));
      act(() => validatePointLabel(result.current.points[2]));
      expect(result.current.points[2].error).toBeTruthy();

      // updating Point 0 label to Point 1 label will remove conflict with Point 2 label
      // so error should be removed from Point 2 and Point 0 should now have an error
      act(() => updateLabel(labelTwo, 0));
      // Validating Point 0 should remove the error from Point 2
      act(() => validatePointLabel({ ...result.current.points[0] }));

      expect(result.current.points[0].error).toBeTruthy();
      expect(result.current.points[1].error).toBeFalsy();
      expect(result.current.points[2].error).toBeFalsy();
    });
  });
});
