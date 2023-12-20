import React from "react";

import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import { WrapperLayout } from "./layout.styles";
import { useLockedBody } from "../../hooks/useBodyLock";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  // eslint-disable-next-line
  const [locked, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  // console.log(locked);

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <WrapperLayout>
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </WrapperLayout>
    </SidebarContext.Provider>
  );
};
