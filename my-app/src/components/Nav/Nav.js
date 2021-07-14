import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { RiDashboardFill } from "react-icons/ri";

import {
  WrapItem,
  Avatar,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";

export default function Nav() {
  const { auth } = useAuth();
  return (
    <Flex
      background={"#315CFD"}
      width={"100%"}
      maxHeight={"60px"}
      minHeight={"60px"}
      alignItems={"center"}
      justifyContent={"end"}
      padding={"2rem"}
      color={"white"}
    >
      <Link href="/feed">Home </Link>
      <Link px="8" paddingY="4" my="12" href="/explore">
        Explore
      </Link>
      <Link>Profile</Link>
      {/* <Link>{auth ? auth.user : `Profile`}</Link> */}
    </Flex>
  );
}
