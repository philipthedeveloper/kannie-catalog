import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navLinks = [
  {
    name: "HOME",
    path: "/",
  },
  {
    name: "ABOUT ME",
    path: "/about",
  },
  {
    name: "VIEW MY WORKS",
    path: "/works",
  },
  {
    name: "CONTACT",
    path: "/contact",
  },
];

const SideNav = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <SideNavContainer
      className={cn(
        {
          "left-0": isOpen,
          "-left-72": !isOpen,
          "!bg-white": location.pathname !== "/",
        },
        "flex md:hidden relative flex-col side-nav z-[10000]"
      )}
    >
      <Underlay
        className={cn("underlay", { hidden: !isOpen })}
        onClick={onClose}
      />
      <NavHeader className="">
        <Icon
          style={{
            color: "var(--primary-color)",
            cursor: "pointer",
          }}
          onClick={onClose}
          id="hideIcon"
          className="ml-auto rounded-md w-8 h-8 flex justify-center items-center"
        >
          <i
            className={cn(
              "fi fi-rr-arrow-small-left flex text-white text-3xl",
              {
                "text-blue-400": location.pathname !== "/",
              }
            )}
          ></i>
        </Icon>
      </NavHeader>
      <NavList className="flex flex-col items-stretch">
        {navLinks.map((navItem) => (
          <NavItem
            key={navItem.name.toString()}
            onClick={onClose}
            className={cn(
              "text-xs border-b border-[#0c0c0c] border-opacity-20",
              {
                "border-blue-100": location.pathname !== "/",
              }
            )}
          >
            <LinkItem to={navItem.path} title={navItem.name}>
              <span>
                <span
                  className={cn("navtext text-gray-300", {
                    "text-blue-400 font-medium": location.pathname !== "/",
                  })}
                >
                  {navItem.name}
                </span>
              </span>
            </LinkItem>
          </NavItem>
        ))}
      </NavList>
    </SideNavContainer>
  );
};

const Underlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 280px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  opacity: 0;
  animation-name: animateOpacity;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-delay: 0.4s;
  animation-fill-mode: forwards;

  @keyframes animateOpacity {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const SideNavContainer = styled.nav`
  background-color: var(--black-background);
  width: 100%;
  height: 100%;
  box-shadow: 4px 0px 10px #0c0c0e;
  transition: 0.4s ease;

  & > *:not(.underlay) {
    position: relative;
    z-index: 5;
  }

  span.navTextCont,
  #logoTextCont {
    white-space: nowrap;
    display: inline-block;
    transition: 0.4s ease;
  }

  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
  }

  @media (max-width: 928px) {
    & {
      position: fixed;
      top: 0;
      width: 280px;
      z-index: 10000;
    }
  }
`;

const NavHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
  height: 50px;
`;

const NavList = styled.ul`
  list-style: none;
  overflow: auto;

  &::-webkit-scrollbar {
    appearance: none;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
  }
`;
const NavItem = styled.li`
  color: var(--primary-color);
`;

const Icon = styled.span`
  @media (max-width: 928px) {
    & .fa-arrow-left-long {
      display: none;
    }
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  display: inline-block;
  padding: 1.2rem 1.5rem;
  width: 100%;
  border-radius: 0.8rem;
  transition: 0.4s ease;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    background-color: var(--primary-color);
    color: var(--textColor);
  }
`;

const AnchorItem = styled.a`
  text-decoration: none;
  color: var(--primary-color);
  display: inline-block;
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 0.8rem;
  transition: 0.4s ease;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    background-color: var(--primary-color);
    color: var(--textColor);
  }
`;

export default SideNav;
