import downArrow from "@/assets/svgs/down-arrow.svg";
import styled from "styled-components";

export const Introduction = () => {
  return (
    <div
      className="mx-auto w-[85%] max-w-[1100px] relative z-10 h-dvh"
      // style={{ height: "calc(100dvh - 80px)" }}
    >
      <GridBox className="w-full h-full">
        <div className="flex flex-col items-center gap-2 md:gap-5">
          <p
            id="intro_jobrole"
            className="self-start flex flex-col gap-3 text-3xl md:text-5xl lg:text-6xl font-bold uppercase"
          >
            <span className="font-bold text-blue-600 font-great-vibe">
              Kannie
            </span>
            <span className="ml-16 font-bold text-white font-great-vibe">
              Strene
            </span>
          </p>
          <p className="py-3 md:py-8 intro_description text-white">
            <span className="font-jost font-normal">
              I'm is an emerging artist from Ibadan, Nigeria, known for his
              impressive catalog of over <Stylish>100 recorded songs</Stylish>.
              With a sound that blends <Stylish>Afrobeat</Stylish>,{" "}
              <Stylish>Afro-fusion</Stylish>, and{" "}
              <Stylish>contemporary influences</Stylish>. My ability to craft
              captivating melodies and poignant lyrics speaks to the heart of
              the Nigerian experience, making me a promising voice in the
              evolving music scene.
            </span>
          </p>
          <a
            className="w-auto h-auto mt-8 md:mt-0 relative animate-bounce inline-block"
            href="#works"
          >
            <img src={downArrow} className="w-12 h-12 blur-[4px] absolute" />
            <img src={downArrow} className="w-12 h-12" />
          </a>
        </div>
      </GridBox>
    </div>
  );
};

const GridBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 3rem;

  @media screen and (max-width: 600px) {
    justify-content: center;
    align-items: flex-start;
  }

  .intro_description {
    font-size: 0.9rem;
    font-weight: lighter;
    line-height: 1.7rem;
    margin: 0.5rem 0;
    overflow: hidden;
    max-width: 500px;
  }

  .intro_description > span {
    display: block;
    transform: translateY(-125%);
    animation: slide-from-top 0.4s ease 0.6s 1 normal forwards;
  }

  @keyframes slide-from-top {
    0% {
      opacity: 0;
      transform: translateY(-110%);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

const Stylish = styled.span`
  font-style: italic;
  font-weight: bold;
  color: #155dfc;
  font-weight: 700;
  white-space: nowrap;
`;
