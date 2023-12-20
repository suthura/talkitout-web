import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";

import { SidebarItem } from "./sidebar-item";

import { useSidebarContext } from "../layout/layout-context";

import { Box } from "../common/box";
import { Flex } from "../common/flex";
import { Calendar, Home, People, Category } from "react-iconly";
import { Image } from "@nextui-org/react";
import { UserData } from "../../models/userData";
import useUser from "../../hooks/useUser";

export const SidebarWrapper = () => {
  // const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  // const [user, setUser] = useState<UserData>();
  const json = localStorage.getItem("currentUser");

  const { user } = useUser();

  useEffect(() => {
    if (json) {
      const data = JSON.parse(json);
      if (data) {
        // setUser(data);
      }
    }
  }, [json]);

  return (
    <Box
      as="aside"
      css={{
        height: "100vh",
        zIndex: 202,
        position: "sticky",
        top: "0",
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header>
          <Image src="/assets/logo_text.png" alt="logo" width={150} />
        </Sidebar.Header>
        <Flex direction={"column"} justify={"between"} css={{ height: "100%" }}>
          <Sidebar.Body className="body sidebar">
            <SidebarItem
              title="Home"
              icon={<Home />}
              // isActive={router.pathname === "/"}
              href="/#/dashboard"
            />
            {user && user.ac_super === true && (
              <SidebarItem
                title="Counsellors"
                icon={<Category />}
                // isActive={router.pathname === "/"}
                href="/#/counsellors"
              />
            )}

            {user && user.ac_super === true && (
              <SidebarItem
                title="Patients"
                icon={<People />}
                // isActive={router.pathname === "/"}
                href="/#/patients"
              />
            )}

            <SidebarItem
              title="Sessions"
              icon={<Calendar />}
              // isActive={router.pathname === "/"}
              href="/#/appointments"
            />

            {/* <SidebarMenu title="General">
              <SidebarItem
                // isActive={router.pathname === "/developers"}
                title="Developers"
                icon={<Game />}
              />
              <SidebarItem
                // isActive={router.pathname === "/view"}
                title="View Test Data"
                icon={<Show />}
              />
              <SidebarItem
                // isActive={router.pathname === "/settings"}
                title="Settings"
                icon={<Setting />}
              />
            </SidebarMenu> */}

            {/* <SidebarMenu title="Updates">
              <SidebarItem
                // isActive={router.pathname === "/changelog"}
                title="Changelog"
                icon={<Paper />}
              />
            </SidebarMenu> */}
          </Sidebar.Body>
          <Sidebar.Footer>
            {/* <Tooltip content={"Settings"} rounded color="primary">
              <Setting />
            </Tooltip> */}
            {/* <Tooltip content={"Adjustments"} rounded color="primary">
              <Filter2 />
            </Tooltip> */}
            {/* <Tooltip content={"Profile"} rounded color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size={"sm"}
              />
            </Tooltip> */}
            <p>&copy; 2023 Talk it Out</p>
          </Sidebar.Footer>
        </Flex>
      </Sidebar>
    </Box>
  );
};
