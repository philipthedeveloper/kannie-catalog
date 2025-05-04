import styled from "styled-components";
import { SideMenu } from "./SideMenu";
import { PropsWithChildren } from "react";
import { useRedux } from "@/hooks/useRedux";

const Index = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <div className="w-full h-full">
        <GridDiv className="w-full h-full grid">
          <SideMenu />
          {children}
        </GridDiv>
      </div>
    </div>
  );
};

const GridDiv = styled.div`
  grid-template-rows: 1fr;
  grid-template-columns: 70px 1fr;

  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr 70px;
    grid-template-columns: 1fr;
  }
`;

export default Index;
