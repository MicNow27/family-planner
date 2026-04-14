interface CapacitorWindow extends Window {
  Capacitor?: {
    isNativePlatform?: () => boolean;
  };
}

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

const isWindowDefined: boolean = typeof window !== "undefined";

const isCapacitor: boolean =
  isWindowDefined &&
  typeof (window as CapacitorWindow).Capacitor !== "undefined" &&
  (window as CapacitorWindow).Capacitor?.isNativePlatform?.() === true;

const isPWA: boolean =
  isWindowDefined &&
  (window.matchMedia?.("(display-mode: standalone)")?.matches ||
    (window.navigator as NavigatorStandalone).standalone === true);

export const isInstalledApp: boolean = isCapacitor || isPWA || true; // TODO: Remove true when Capacitor or PWA is set up.
