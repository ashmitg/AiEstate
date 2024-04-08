import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Textarea,
  Button,
  VStack,
  Text,
  Avatar,
  Divider,
  Spinner, // Import Spinner component for loading indicator
} from '@chakra-ui/react';
import useSendApi from '../../hooks/useSendApi';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [canChat, setCanChat] = useState(true);
  const [assetData, setAssetData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const sendApi = useSendApi();

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const { data, error } = await sendApi('/api/assets/viewassets', {});
        if (data && data.assets) {
          setAssetData(data.assets);
          setCanChat(true);
        }
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }
    };

    fetchAssetData();
  }, [sendApi]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !canChat || isLoading) return;

    setIsLoading(true); // Start loading

    try {
      const { data, error } = await sendApi('/api/chat/receiveplan', {
        asset: assetData,
        message: newMessage.trim(),
      });

      if (data && !error && data.estatePlan) {
        const updatedMessages = [
          ...messages,
          { text: newMessage.trim(), sender: 'user' },
          { text: data.estatePlan, sender: 'assistant' },
        ];
        setMessages(updatedMessages);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false); // Stop loading after response (success or error)
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" bg="gray.100">
      <Box width="1000px" p={4} borderWidth="1px" borderRadius="lg">
        <VStack spacing={4} align="stretch">
          <Box overflowY="auto" maxHeight="400px" minHeight="400px" width="100%">
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">1. Who do you want to inherit your assets?</Text>
              <Text>Specify your beneficiaries and any specific allocations.</Text>

              <Text fontWeight="bold">2. Do you have preferences for your end-of-life care?</Text>
              <Text>Outline any medical or care directives you want to be followed.</Text>

              <Text fontWeight="bold">3. Who do you trust to make decisions on your behalf?</Text>
              <Text>Designate a person for power of attorney or healthcare proxy.</Text>
            </VStack>

            {messages.map((msg, index) => (
              <Flex key={index} alignItems={msg.sender === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
                <Avatar size="sm" name={msg.sender === 'user' ? 'User' : 'Assistant'} />
                <Box ml={2} maxWidth="80%">
                  <Text whiteSpace="pre-wrap">{msg.text}</Text>
                </Box>
              </Flex>
            ))}
          </Box>

          <Divider />

          <Flex width="100%">
            <Textarea
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder={canChat ? 'Type a message...' : 'You need more assets to chat'}
              resize="none"
              minHeight="50px"
              borderRadius="md"
              border="1px solid"
              borderColor="gray.300"
              p={2}
              disabled={!canChat || isLoading} // Disable during loading
            />
            <Button onClick={handleSendMessage} colorScheme="blue" ml={2} disabled={!canChat || isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Send'} {/* Show Spinner while loading */}
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ChatUI;
