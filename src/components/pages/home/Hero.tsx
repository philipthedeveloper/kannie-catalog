import heroImage from "@/assets/images/me.jpg";
import styled from "styled-components";

export const Hero = () => {
  return (
    <div className="w-[100dvw] h-[100dvh] absolute z-0 top-0 left-0 right-0 bottom-0">
      <div className="w-full h-full">
        <HeroImageContainer className="w-full h-full bg-[#131313]">
          <div
            className="w-full md:w-1/2 h-full absolute right-0 top-0 bottom-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </HeroImageContainer>
      </div>
    </div>
  );
};

const HeroImageContainer = styled.div`
  position: relative;
  background-size: cover;

  &:after {
    position: absolute;
    content: "";
    width: 50%;
    height: 100%;
    right: 0;
    top: 0;
    bottom: 0;
    background: radial-gradient(
      at center,
      //   #00000080,
      #00000099,
      #131313,
      #131313
    );
  }

  @media screen and (max-width: 768px) {
    &:after {
      width: 100%;
      height: 100%;
      left: 0;
    }
  }
`;
