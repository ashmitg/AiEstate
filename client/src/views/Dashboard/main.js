import React from 'react';
import { Box, Flex, Text, Grid, GridItem, Heading, Divider, Button, Avatar } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';

const MainDashboard = () => {
  const navigate = useNavigate();
  const { data, loading } = useAuth();

  const handleLogout = () => {
    // Perform logout action
    navigate('/login');
  };

  return (
    <Flex direction="column" align="center" py={8}>
      {loading ? (
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Text>Loading...</Text>
        </Flex>
      ) : data ? (
        <Box w="80%" maxW="800px">
          <Flex align="center" mb={6}>
            <Avatar size="lg" name={data.user} mr={4} />
            <Heading size="lg">Welcome, {data.user}!</Heading>
          </Flex>
          <Divider my={6} />

          <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
            <GridItem>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <Text fontWeight="bold">Email:</Text>
                <Text>{data.email}</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <Text fontWeight="bold">Username:</Text>
                <Text>{data.username}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <Text fontWeight="bold">Bio:</Text>
                <Text>{data.bio || 'No bio provided'}</Text>
              </Box>
            </GridItem>
          </Grid>

          <Divider my={6} />

          <Flex justifyContent="flex-end">
            <Button 
              leftIcon={<FiLogOut />} 
              colorScheme="red" 
              variant="outline" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        </Box>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Text>No user data found. Please login.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default MainDashboard;
