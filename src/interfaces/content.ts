import { ContentType } from "@/enums";

export type Content = {
  _id: string;
  type: ContentType;
  description: string;
  mediaUrl: string;
  coverArtUrl?: string;
  createdAt: string;
  updatedAt: string;
};
