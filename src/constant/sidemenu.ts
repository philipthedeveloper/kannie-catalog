import { TabOption, TABS } from "@/enums";

export interface MenuItem {
  title: string;
  icon: string;
  tooltip: string;
  tabName: TabOption;
}

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: "fi fi-sr-house-crack",
    tooltip: "Home Section",
    tabName: TABS.ANALYTICS,
  },
  {
    title: "Contents",
    icon: "fi fi-sr-followcollection",
    tooltip: "Your Contents",
    tabName: TABS.CONTENT,
  },
];
