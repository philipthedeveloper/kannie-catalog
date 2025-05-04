import { AnalyticsState } from "./analytics/analyticsSlice";
import { LoginState } from "./auth/login/loginSlice";
import { IContentState } from "./content/interface";
import { LayoutState } from "./layout/interface";

export interface StoreInterface {
  Layout: LayoutState;
  Login: LoginState;
  Analytics: AnalyticsState;
  Content: IContentState;
}

export type RootState = {
  Layout: StoreInterface["Layout"];
  Login: StoreInterface["Login"];
  Analytics: StoreInterface["Analytics"];
  Content: StoreInterface["Content"];
};
