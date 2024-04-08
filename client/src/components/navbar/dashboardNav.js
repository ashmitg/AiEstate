// Navbar.js

import React from "react";
import { Flex, Spacer, Button, Heading, Box, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FiHome, FiMessageSquare, FiLogOut, FiCode } from "react-icons/fi"; // Importing icons
import { MdAttachMoney } from "react-icons/md";

import useLogout from "../../hooks/useLogOut";

const DashboardNavbar = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex p={4} bg="gray.200" color="white">
      <Heading as="h2" size="md" color="gray.700">
        <Icon as={FiHome} mr={2} />
        Estate Planning
      </Heading>
      <Spacer />
      <Link to="/dashboard">
        <Button leftIcon={<FiHome />} mr={4} variant="outline" colorScheme="gray">
          Dashboard
        </Button>
      </Link>
      <Link to="/dashboard/chat">
        <Button leftIcon={<FiMessageSquare />} mr={4} variant="outline" colorScheme="gray">
          Chat
        </Button>
      </Link>
      {/* <Link to="/dashboard/api">
        <Button leftIcon={<FiCode />} mr={4} variant="outline" colorScheme="gray">
          Api
        </Button>
      </Link> */}
      <Link to="/dashboard/assets">
        <Button leftIcon={<MdAttachMoney />} mr={4} variant="outline" colorScheme="gray">
          Assets
        </Button>
      </Link>
      <Box>
        <Button leftIcon={<FiLogOut />} onClick={handleLogout} variant="outline" colorScheme="gray">
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default DashboardNavbar;
