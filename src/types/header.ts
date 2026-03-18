export type OverflowMenuType = "settings" | "dashboard";

export type HeaderSettings = {
  title?: string;
  showBackButton?: boolean;
  backButtonRoute?: string;
  overflowMenu?: OverflowMenuType;
};
