import { StatWidgetInterface } from "@/data/statWidget";
import { ApiResponse } from "@/interfaces";

export interface GetAnalyticsResponse extends ApiResponse {
  analytics: StatWidgetInterface[];
}
