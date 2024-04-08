import React, { useEffect } from 'react';
import { Flex, Heading, Text, Button, Box, Grid, GridItem, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <Flex minHeight="100vh" flexDirection="column" padding={8}>

      {/* Main Content */}
      <Flex flex="1" justifyContent="center" alignItems="center" flexDirection="column">
        <Heading size="2xl" textAlign="center" mb={6}>
          Welcome to Estate AI
        </Heading>
        <Text fontSize="xl" textAlign="center" mb={8}>
          Declare assets and get a personalized estate plan with Estate AI.
        </Text>
        <Button as={Link} to="/estate-ai" colorScheme="blue" size="lg" mb={8}>
          Get Your Estate Plan
        </Button>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {/* Feature: Declare Assets */}
          <GridItem colSpan={1}>
            <Box p={4} borderWidth="1px" borderRadius="lg">
              <Image src="https://via.placeholder.com/150" alt="Declare Assets" mb={4} />
              <Heading size="lg" mb={4}>Declare Assets</Heading>
              <Text fontSize="md">
                Easily declare your assets online using our intuitive platform.
              </Text>
            </Box>
          </GridItem>
          {/* Feature: Personalized Questions */}
          <GridItem colSpan={1}>
            <Box p={4} borderWidth="1px" borderRadius="lg">
              <Image src="https://via.placeholder.com/150" alt="Personalized Questions" mb={4} />
              <Heading size="lg" mb={4}>Answer Personalized Questions</Heading>
              <Text fontSize="md">
                Answer a series of personalized questions to tailor your estate plan according to your needs and preferences.
              </Text>
            </Box>
          </GridItem>
          {/* Feature: Custom Estate Plan */}
          <GridItem colSpan={1}>
            <Box p={4} borderWidth="1px" borderRadius="lg">
              <Image src="https://via.placeholder.com/150" alt="Custom Estate Plan" mb={4} />
              <Heading size="lg" mb={4}>Custom Estate Plan</Heading>
              <Text fontSize="md">
                Receive a comprehensive and custom estate plan generated based on your declared assets and responses.
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
