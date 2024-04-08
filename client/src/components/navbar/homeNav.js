import { ChakraProvider, Flex, Link, Button } from '@chakra-ui/react';

function HomeNavbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="blue.500"
      color="white"
    >
      <Link href="/" fontWeight="bold" fontSize="lg">
        Home
      </Link>
      <Flex>
          <Link href="/signin">
            <Button colorScheme="blue" mr={4}>Sign In</Button>
          </Link>
          <Link href="/signup">
          <Button colorScheme="green">Sign Up</Button>
          </Link>
        </Flex>
    </Flex>
  );
}
export default HomeNavbar;