import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "../../services/axios";

export default function CustomEnquiry({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending || sent) return;
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      await axios.post(
        "/subscription-enquiries",
        Object.fromEntries(
          ["name", "email", "company", "message"].map((key) => [
            key,
            String(form.get(key) ?? "").trim(),
          ]),
        ),
      );
      setSent(true);
    } catch {
      setError("We couldn't submit your request. Please try again shortly.");
    } finally {
      setPending(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request a Custom plan</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {sent ? (
            <Text role="status">
              Your request has been received. Our team will contact you by
              email.
            </Text>
          ) : (
            <form onSubmit={submit}>
              <Stack spacing={4}>
                <Text>
                  Tell us what your organization needs and our team will prepare
                  a quote.
                </Text>
                {(
                  [
                    ["name", "Your name"],
                    ["email", "Work email"],
                    ["company", "Company name"],
                  ] as const
                ).map(([name, label]) => (
                  <FormControl key={name} isRequired>
                    <FormLabel htmlFor={`enquiry-${name}`}>{label}</FormLabel>
                    <Input
                      id={`enquiry-${name}`}
                      name={name}
                      type={name === "email" ? "email" : "text"}
                      maxLength={name === "email" ? 254 : 150}
                      required
                      disabled={pending}
                    />
                  </FormControl>
                ))}
                <FormControl isRequired>
                  <FormLabel htmlFor="enquiry-message">
                    What do you need?
                  </FormLabel>
                  <Textarea
                    id="enquiry-message"
                    name="message"
                    required
                    maxLength={3000}
                    disabled={pending}
                  />
                </FormControl>
                {error && (
                  <Text role="alert" color="red.600">
                    {error}
                  </Text>
                )}
                <Button type="submit" isLoading={pending} colorScheme="purple">
                  Request quote
                </Button>
              </Stack>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
