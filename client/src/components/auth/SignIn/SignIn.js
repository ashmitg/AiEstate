import React, { useState } from 'react';
import { Container, Box, Heading, Input, Button, FormControl, FormLabel, FormHelperText, Link } from '@chakra-ui/react';
import useSignIn from '../../../hooks/SignIn';
const SignInPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signin = useSignIn();
  const handleSignIn = (e) => {
    e.preventDefault();
    signin(formData);
  }
  return (
    <Container maxW="xl" centerContent>
      <Box mt={8}>
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Sign In
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </FormControl>
        {error && <FormHelperText color="red.500">{error}</FormHelperText>}
        <Button colorScheme="blue" width="full" mt={4} onClick={handleSignIn}>
          Sign In
        </Button>

        <Link mt={2} textAlign="center" color="blue.500" href="/signup">Don't have an account? Sign up here</Link>
      </Box>
    </Container>
  );
};

export default SignInPage;
