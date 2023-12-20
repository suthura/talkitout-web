import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { Box } from "../common/box";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Navbar
        variant="sticky"
        isBordered
        css={{
          borderBottom: "1px solid $border",
          justifyContent: "space-between",
          width: "100%",
          "@md": {
            justifyContent: "space-between",
          },

          "& .nextui-navbar-container": {
            border: "none",
            maxWidth: "100%",

            gap: "$6",
            "@md": {
              justifyContent: "space-between",
            },
          },
        }}
      >
        <Navbar.Content showIn="md">
          <BurguerButton />
        </Navbar.Content>
        <Navbar.Content
          hideIn={"md"}
          css={{
            width: "100%",
          }}
        >
          {/* <Input
            clearable
            contentLeft={<Search size={16} />}
            contentLeftStyling={false}
            css={{
              w: "100%",
              transition: "all 0.2s ease",
              "@xsMax": {
                w: "100%",
                // mw: '300px',
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..."
          /> */}
        </Navbar.Content>
        <Navbar.Content>
          {/* <Navbar.Content hideIn={"md"}>
            <Flex align={"center"} css={{ gap: "$4" }}>
              <People />
              <Text span>Feedback?</Text>
            </Flex>
          </Navbar.Content> */}

          {/* <Navbar.Content>
            <NotificationsDropdown />
          </Navbar.Content> */}

          {/* <Navbar.Content hideIn={"md"}>
            <Chat />
          </Navbar.Content> */}
          {/* <Navbar.Content>
                  <Link
                     href="https://github.com/"
                     target={'_blank'}
                  >
                     <GithubIcon />
                  </Link>
               </Navbar.Content> */}
          <Navbar.Content>
            {/* <UserDropdown /> */}
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src="https://picsum.photos/seed/picsum/150"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                onAction={(actionKey) => {
                  // console.log({ actionKey });
                  if (actionKey === "logout") {
                    localStorage.clear();
                    navigate("/");
                  } else {
                    navigate(`/${actionKey}`);
                  }
                }}
              >
                {/* <Dropdown.Item key="email" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {user.email}
                  </Text>
                </Dropdown.Item> */}
                <Dropdown.Item key="profile">Profile</Dropdown.Item>
                <Dropdown.Item key="settings">Settings</Dropdown.Item>
                {/* <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item> */}
                {/* <Dropdown.Item key="analytics" withDivider>
               Analytics
            </Dropdown.Item> */}
                {/* <Dropdown.Item key="system">System</Dropdown.Item> */}
                {/* <Dropdown.Item key="configurations">Configurations</Dropdown.Item> */}
                {/* <Dropdown.Item key="help_and_feedback" withDivider>
               Help & Feedback
            </Dropdown.Item> */}
                <Dropdown.Item key="logout" withDivider color="warning">
                  <Text>Log Out</Text>
                </Dropdown.Item>
                <Dropdown.Item key="switch" withDivider>
                  <DarkModeSwitch />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        </Navbar.Content>

        {/* <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse> */}
      </Navbar>
      {children}
    </Box>
  );
};
