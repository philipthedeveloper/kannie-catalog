import { TabOption } from "@/enums";

type VariableColors =
  | "success"
  | "muted"
  | "primary"
  | "secondary"
  | "warning"
  | "info"
  | "danger";

export interface IAnalytics {
  label: string;
  counterStart: number;
  counterEnd: number;
  prefix: string;
  suffix: string;
  duration: number;
  decimal: string;
  decimals: number;
  seperator: string;
  linkType: "page" | "section";
  link: string;
  linkUrl: TabOption;
  widgetIconBg:
    | "success-bg"
    | "muted-bg"
    | "primary-bg"
    | "secondary-bg"
    | "warning-bg"
    | "info-bg"
    | "danger-bg";
  widgetIconClass: string;
  widgetIconColor: VariableColors;
}
