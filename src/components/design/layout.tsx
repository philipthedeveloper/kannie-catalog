import styled from "styled-components";

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex-1 overflow-auto md:overflow-visible flex flex-col gap-4 main-content">
      {children}
    </main>
  );
};

export const DivWithoutScrollBar = styled.div`
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
  }
`;
