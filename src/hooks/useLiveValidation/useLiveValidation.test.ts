import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import { act, renderHook } from "@testing-library/react";

const setup = (dirtyFields: Record<string, boolean> = {}) => {
  const trigger = vi.fn();
  const clearSubmitError = vi.fn();

  const { result } = renderHook(() => useLiveValidation({ trigger, dirtyFields, clearSubmitError }));

  return { result, trigger, clearSubmitError };
};

describe("useLiveValidation", () => {
  describe("onBlur", () => {
    it("does nothing if field is not dirty", () => {
      const { result, trigger } = setup({ email: false });
      act(() => result.current("email").onBlur());
      expect(trigger).not.toHaveBeenCalled();
    });

    it("calls trigger if field is dirty", () => {
      const { result, trigger } = setup({ email: true });
      act(() => result.current("email").onBlur());
      expect(trigger).toHaveBeenCalledWith("email");
    });

    it("enables live validation for the field", () => {
      const { result, trigger } = setup({ email: true });
      act(() => result.current("email").onBlur());

      // live validation now enabled — onChange should trigger
      act(() => result.current("email").onChange());
      expect(trigger).toHaveBeenCalledTimes(2);
    });
  });

  describe("onChange", () => {
    it("does nothing if field is not dirty", () => {
      const { result, trigger } = setup({ email: false });
      act(() => result.current("email").onChange());
      expect(trigger).not.toHaveBeenCalled();
    });

    it("does nothing if live validation not yet enabled", () => {
      const { result, trigger } = setup({ email: true });
      // no onBlur called first
      act(() => result.current("email").onChange());
      expect(trigger).not.toHaveBeenCalled();
    });

    it("calls trigger and clearSubmitError if dirty and live validation enabled", () => {
      const { result, trigger, clearSubmitError } = setup({ email: true });
      act(() => result.current("email").onBlur());
      act(() => result.current("email").onChange());
      expect(trigger).toHaveBeenCalledTimes(2);
      expect(clearSubmitError).toHaveBeenCalledTimes(1);
    });
  });
});
