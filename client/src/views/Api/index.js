import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSendApi from "../../hooks/useSendApi";
import { toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  useAuth();
  
  const sendApi = useSendApi();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await sendApi("/api/apiupdate/viewapi", {});
      setLoading(false);
      if (!error) {
        // Handle response data
        setApiKey(data.apiKey)

      } else {
        // Handle error
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const handleSaveApiKey = async () => {
    setLoading(true);
    const { data, error } = await sendApi("/api/apiupdate/updateapi", {
      apiKey: apiKey,
    });
    setLoading(false);
    if (data?.status) {
      // Success
      toast.success("API Key saved successfully");
    } else {
      // Error
      toast.error("Failed to save API Key");
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Heading mb={4}>API Key</Heading>
      <FormControl>
        <FormLabel>API Key</FormLabel>
        <InputGroup>
          <Input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              onClick={handleToggleShowApiKey}
              aria-label={showApiKey ? "Hide API Key" : "Show API Key"}
              icon={showApiKey ? <ViewOffIcon /> : <ViewIcon />}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button onClick={handleSaveApiKey} mt={4} colorScheme="blue" isLoading={loading}>
        Save
      </Button>
    </Box>
  );
};

export default ApiKeyPage;
