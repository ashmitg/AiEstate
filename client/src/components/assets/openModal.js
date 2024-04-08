import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import useSendApi from '../../hooks/useSendApi';

const OpenModal = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Name, setName] = useState('');
  const [Assignment, SetAssignment] = useState('');
  const [Value, setValue] = useState('');
  const [optStr, setOptStr] = useState('');
  const sendApi = useSendApi();

  useEffect(() => {
    // Update input fields when props change
    if (props && props.inputData) {

      setName(props.inputData.Name || '');
      setValue(props.inputData.Value || '');
      SetAssignment(props.inputData.Assignment || '')
      setOptStr(props.inputData.OptString || '')

    }
  }, [props]);

  const handleSave = () => {
    const trimmedValue = String(Value).trim();
    const trimmedAssignment = String(Assignment).trim();

    if (Name.trim() === '' || isNaN(trimmedValue) || trimmedAssignment.trim()=='') {
      if (Name.trim() === '') {
        alert('Please enter a valid Name or Assignment.');
      } else {
        alert('Please enter a valid Value (must be a number).');
      }
      return;
    }

    const {data, error} = sendApi(props?.url, {keyId: props?.keyId, "assetName": props?.assetName, Name : Name, Assignment: Assignment, [props?.ReqVal]: Value , [props?.OptString]: optStr});
    
    // Close the modal after saving
    onClose();
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        {Name=='' ? props?.assetName : Name}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Input Data</ModalHeader>
          <ModalBody>
            <input
              type="text"
              placeholder={props?.FormVals[0]}
              value={Name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
            />
            <input
              type="text"
              placeholder={props?.FormVals[1]}
              value={Assignment}
              onChange={(e) => SetAssignment(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
            />
            <input
              type="text"
              placeholder={props?.FormVals[2]}
              value={Value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
            />
            <input
              type="text"
              placeholder={props?.FormVals[3]}
              value={optStr}
              onChange={(e) => setOptStr(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OpenModal;
