import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ResponsiveValue,
} from '@chakra-ui/react';
import React from 'react';

interface CustomModalProps {
  header?: string;
  isOpen: boolean;
  onClose: () => void;
  size?: string;
  h?: ResponsiveValue<number | (string & {})>;
  w?: ResponsiveValue<number | (string & {})>;
  children: React.ReactNode;
  p?: ResponsiveValue<number | (string & {})>;
}

const CustomModal = ({
  isOpen,
  onClose,
  size = '6xl',
  header,
  w,
  h,
  p = 4,
  children,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
      size={size}
      onEsc={onClose}
    >
      <ModalOverlay bg='rgba(9, 18, 39, 0.51)' backdropFilter='blur(4px)' />
      <ModalContent
        w={w}
        h={h}
        minH={'30vh'}
        maxH={'90vh'}
        maxW={'1240px'}
        overflowY={'auto'}
      >
        {header && (
          <ModalHeader fontSize={'paragraph'} p={p}>
            {header}
          </ModalHeader>
        )}
        <ModalCloseButton
          size={'xl'}
          color={'brand.primary.600'}
          outline={'none !important'}
          cursor={'pointer'}
          p={2}
        />
        <ModalBody p={p}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
