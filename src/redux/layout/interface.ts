import { TABS } from "@/enums";

export type TabOption = TABS.ANALYTICS | TABS.CONTENT;

export interface LayoutState {
  activeTab: TabOption;
}
