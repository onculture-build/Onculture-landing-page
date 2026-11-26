import {
  Avatar,
  Box,
  chakra,
  Flex,
  Text,
  UseRadioProps,
  useRadio,
  useTheme,
} from "@chakra-ui/react";
import { FC, forwardRef, memo, Ref } from "react";

interface CustomRadioButtonProps extends UseRadioProps {
  label?: string;
  image?: string;
  subLabel?: string;
  display?: "horizontal" | "vertical";
  variant?: "default" | "card";
}

const CustomRadioButton: FC<
  CustomRadioButtonProps & { ref?: Ref<HTMLInputElement> }
> = memo(
  forwardRef(
    (
      {
        label,
        image,
        subLabel,
        display = "horizontal",
        variant = "default",
        ...radioProps
      },
      ref,
    ) => {
      const theme = useTheme();
      const { getInputProps, getRadioProps, state } = useRadio(radioProps);
      const inputProps = getInputProps({ ref });
      const radioPropsFromHook = getRadioProps();
      const isDisabled = radioProps.isDisabled ?? false;
      const isVertical = display === "vertical";
      const isCard = variant === "card";

      return (
        <chakra.label
          display="flex"
          flexDirection={isVertical ? "column" : "row"}
          alignItems={isCard ? "flex-start" : "center"}
          columnGap={isVertical ? undefined : isCard ? "12px" : "1rem"}
          rowGap={isVertical ? "0.5rem" : undefined}
          cursor={isDisabled ? "not-allowed" : "pointer"}
          w={isVertical ? "auto" : "100%"}
          p={isCard ? "14px" : undefined}
          border={isCard ? "1px solid" : undefined}
          borderColor={
            isCard
              ? state.isChecked
                ? "brand.primary.600"
                : "gray.200"
              : undefined
          }
          borderRadius={isCard ? "4px" : undefined}
          {...radioPropsFromHook}
        >
          <input {...inputProps} hidden />

          <Flex
            alignItems="center"
            justifyContent="center"
            border="2px solid"
            borderColor={
              isDisabled
                ? "gray.300"
                : state.isChecked
                  ? (theme.colors.brand?.primary?.[600] ?? "blue.500")
                  : (theme.colors.brand?.gray?.[700] ?? "gray.500")
            }
            borderRadius="50%"
            w={isCard ? "18px" : "24px"}
            h={isCard ? "18px" : "24px"}
            flexShrink={0}
            position="relative"
            mt={isCard ? "2px" : undefined}
            _after={
              state.isChecked
                ? {
                    content: '""',
                    w: isCard ? "8px" : "12px",
                    h: isCard ? "8px" : "12px",
                    borderRadius: "50%",
                    bgColor: theme.colors.brand?.primary?.[600] ?? "blue.500",
                  }
                : undefined
            }
          />

          {image && <Avatar size="md" name={label} src={image} />}

          {(label || subLabel) && (
            <Box textAlign={isVertical ? "center" : "left"}>
              {label && (
                <Text fontWeight={isCard ? 600 : "regular"} fontSize="14px">
                  {label}
                </Text>
              )}

              {subLabel && (
                <Text
                  fontSize="14px"
                  lineHeight="1.45"
                  color={theme.colors.brand?.gray?.[900] ?? "gray.600"}
                >
                  {subLabel}
                </Text>
              )}
            </Box>
          )}
        </chakra.label>
      );
    },
  ),
);

CustomRadioButton.displayName = "CustomRadioButton";

export default CustomRadioButton;
