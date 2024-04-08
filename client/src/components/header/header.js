// Header.js
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Flex justifyContent="flex-end" p={4}>
      <Link to="/auth/signin">
        <Button variant="outline" colorScheme="blue" mr={4}>Sign In</Button>
      </Link>
      <Link to="/auth/signup">
        <Button colorScheme="blue">Sign Up</Button>
      </Link>
    </Flex>
  );
};

export default Header;
