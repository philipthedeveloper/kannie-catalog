import { cn } from "@/lib/utils";
import styled from "styled-components";

type Props = {
  iconClass: string;
  info: string;
  linkTo?: string;
};

export const ContactCard = ({ iconClass, info, linkTo }: Props) => {
  return (
    <CardComp className="p-8 bg-white border border-gray-300 rounded-lg cursor-pointer items-center flex justify-center flex-col">
      <i className={cn(iconClass, "text-center text-blue-600 text-2xl")}></i>
      {linkTo ? (
        <a
          href={linkTo}
          id="service_desc"
          target={linkTo.startsWith("http") ? "_blank" : "_self"}
          className="block mt-2 font-jost text-sm text-gray-600"
        >
          {info}
        </a>
      ) : (
        <p id="service_desc" style={{ marginTop: "0.5rem" }}>
          {info}
        </p>
      )}
    </CardComp>
  );
};

const CardComp = styled.div`
  // opacity: 0;
  // transform: scale(0.9);
  // transition: transform 0.4s, opacity 0.7s ease;
  min-width: 250px;
  text-align: center;
`;
