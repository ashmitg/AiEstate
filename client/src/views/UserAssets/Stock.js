import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Heading, Stack, Box, Text, IconButton, Flex } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md'; // Import close icon
import OpenModal from '../../components/assets/openModal';
import useSendApi from '../../hooks/useSendApi'
import { v4 as uuidv4 } from 'uuid';

const Stock = ({props}) => {

  const [modals, setModals] = useState([]);

  useEffect(() => {
    // When props change (initially or on subsequent updates), populate modals
    if (props && props.length > 0) {
      const newModals = props.map(property => ({
        id: property._id, // Use the _id field as the modal ID
        inputData: property
      }));
      setModals(newModals);
    }
  }, [props]);

  const generateMongoDBId = () => {
    const uuid = uuidv4().replace(/-/g, ''); // Generate UUID and remove dashes
    return uuid.slice(0, 24); // Take the first 24 characters
  };

  const api = useSendApi()


  const addModal = () => {
    const newModals = [...modals];
    console.log()
    newModals.push({ id: generateMongoDBId() }); // Using Date.now() as a unique identifier
    setModals(newModals);
  };

  // Function to remove a modal from the list
  const removeModal = (idToRemove) => {
    const updatedModals = modals.filter((modal) => modal.id !== idToRemove);
    setModals(updatedModals);
  };

  return (
    <Card>
      <CardBody>
        <Heading size = 'sm'>Stocks</Heading>
            <Text
              pt='2'
              fontSize='sm'
              color='teal.500'
              cursor='pointer'
              onClick={addModal}
            >
              + Add Stock Modal
            </Text>
        <Stack direction='row' spacing='4'>

          {modals.map((modal) => (
            <Box key={modal.id} borderWidth='1px' borderRadius='md' p='4' boxShadow='md'>
              <OpenModal keyId={modal.id} inputData={modal.inputData} assetName="Stock" url = {"/api/assets/updateaddassets"} ReqVal={"Value"} OptString={"OptString"} FormVals={["Enter Stock Portfolio Name", "Set your Asset Assignment", "Enter Stock Value", "Enter your clauses (optional)"] } />

              {/* Flex container for delete button */}
              <Flex justify='center' align='center' mt='2'>
                {/* Delete button as an icon */}
                <IconButton
                  icon={<MdClose />}
                  variant='ghost'
                  colorScheme='red'
                  aria-label='Delete'
                  onClick={() => removeModal(modal.id)}
                />
              </Flex>
            </Box>
          ))}
        </Stack>
        
      </CardBody>
    </Card>
  );
};

export default Stock;
