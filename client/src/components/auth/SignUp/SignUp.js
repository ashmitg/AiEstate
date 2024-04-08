import { useState } from 'react';
import { Flex, FormControl, FormLabel, Input, Button, Heading, Link } from '@chakra-ui/react'; // Import Link from Chakra UI
import useSignUp from '../../../hooks/SignUp'; // Assuming you have the useSignUp hook implemented as in the previous example
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const signupTrigger = useSignUp();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!formData.name.trim()) {
            toast.error('Please enter a name.');
            return;
        }
        
        if (!formData.email.match(emailPattern)) {
            toast.error('Please enter a valid email address.');
            return;
        }
    
        if (formData?.password?.length<8) {
            toast.error("Password must be 8 characters long!");
            return;
        }
    
        // If validation passes, proceed with signup
        signupTrigger(formData);
    };

    return (
        <Flex align="center" justify="center" h="100vh">
            <Flex direction="column" p={8} rounded={6} w="400px" bg="gray.100">
                <Heading mb={6}>Sign Up</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="name" mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="password" mb={6}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </FormControl>
                    <Button type="submit" colorScheme="blue">Sign Up</Button>
                </form>
                {/* Add sign-in option with link */}
                <Link mt={4} href="/signin" color="blue.500">Already have an account? Sign in</Link>
            </Flex>
        </Flex>
    );
};

export default Signup;
