import { useRedux } from "@/hooks/useRedux";
import { TABS, TabOption } from "@/enums";
import { cn } from "@/lib/utils";
import Analytics from "./Analytics";
import { Content } from "./Content";
import { PropsWithChildren } from "react";
import styled from "styled-components";

interface PageContainerProps extends PropsWithChildren {
  tab: TabOption;
}

const PageContainer = ({ tab, children }: PageContainerProps) => {
  const { useStateSelector } = useRedux();

  const { activeTab } = useStateSelector((state) => state.Layout);

  return (
    <div
      className={cn("w-full h-full", {
        "order-7": activeTab !== tab,
        "order-1": activeTab === tab,
      })}
    >
      <BodyDiv
        className={cn("flex flex-col relative  px-4 md:px-8 py-4", {
          hidden: activeTab !== tab,
        })}
      >
        {children}
      </BodyDiv>
    </div>
  );
};

export const Dashboard = () => {
  console.log("Got here");

  return (
    <div className="w-full h-full order-5 md:order-10 flex flex-col">
      {/* <Sidebar /> */}
      <PageContainer tab={TABS.ANALYTICS}>
        <Analytics />
      </PageContainer>
      <PageContainer tab={TABS.CONTENT}>
        <Content />
      </PageContainer>
    </div>
  );
};

const BodyDiv = styled.div`
  height: 100dvh;

  @media screen and (max-width: 768px) {
    height: calc(100dvh - 70px);
  }
`;
