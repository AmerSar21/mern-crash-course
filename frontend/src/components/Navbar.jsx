import {
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  MenuGroup,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import {
  SettingsIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  BsActivity,
  BsFillHouseFill,
  BsFillHousesFill,
  BsFillPersonFill,
  BsPeopleFill,
} from "react-icons/bs";
import { useAuth } from "../context/auth";
import { useLoginStore } from "../store/login";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user, decodeToken } = useLoginStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        await decodeToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getLoggedUser();
    } else navigate("/");
  }, [token, user, navigate]);

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Menu>
          <Button
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                {user && user.user ? user.user.name : "Guest"}{" "}
              </DrawerHeader>
              <DrawerBody>
                {user && user.user ? (
                  <MenuGroup>
                    {user.user.role === "admin" && (
                      <>
                        <MenuItem icon={<BsFillHouseFill />}>
                          Dashboard
                        </MenuItem>
                        <MenuItem icon={<BsPeopleFill />}>Accounts</MenuItem>
                        <MenuItem icon={<BsFillHousesFill />}>
                          Departments
                        </MenuItem>
                      </>
                    )}
                    {user.user.role === "chairman" && (
                      <>
                        <MenuItem icon={<BsFillHouseFill />}>
                          Dashboard
                        </MenuItem>
                        <MenuItem icon={<BsPeopleFill />}>Accounts</MenuItem>
                        <MenuItem icon={<BsFillHousesFill />}>
                          Departments
                        </MenuItem>
                        <MenuItem icon={<BsActivity />}>Activities</MenuItem>
                      </>
                    )}
                    {user.user.role === "secretary" && (
                      <>
                        <MenuItem icon={<BsFillHouseFill />}>
                          Dashboard
                        </MenuItem>
                        <MenuItem icon={<BsPeopleFill />}>Accounts</MenuItem>
                        <MenuItem icon={<BsActivity />}>Activities</MenuItem>
                      </>
                    )}
                    {["teacher", "student"].includes(user.user.role) && (
                      <>
                        <MenuItem icon={<BsFillHouseFill />}>
                          Dashboard
                        </MenuItem>
                        <MenuItem icon={<BsActivity />}>Activities</MenuItem>
                      </>
                    )}
                  </MenuGroup>
                ) : (
                  <p>...</p>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Menu>
        <HStack spacing={2} alignItems={"center"}>
          <Menu>
            <MenuButton as={IconButton} aria-label="Account Name">
              {user && user.user ? user.user.name : "Guest"}{" "}
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem icon={<BsFillPersonFill />}>My Account</MenuItem>
                <MenuItem icon={<SettingsIcon />}>Account Settings</MenuItem>
              </MenuGroup>
              {/* <MenuItem onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
                {colorMode === "light" ? "  Dark Mode" : "  Light Mode"}
              </MenuItem> */}
              <MenuItem icon={<ChevronRightIcon />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
