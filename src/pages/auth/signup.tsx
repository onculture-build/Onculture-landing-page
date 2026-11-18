import { useState } from "react";
import CustomInput from "../../components/custom-input";
import CustomCheckbox from "../../components/custom-checkbox";
import CustomButton from "../../components/custom-button";
import { Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Resolver } from "react-hook-form";
import { UserSignUpType } from "../../lib/types";
import { UserSignUpSchema } from "../../lib/schema";
import { useCheckAllowedUser } from "../../services/mutations";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { authUser } from "../../services/store/selectors";
import { saveUserInfo } from "../../services/store/slices/auth";
import toast from "react-hot-toast";
import SignupShell, { SignupLogin } from "./signup-shell";
import { PageRoutes } from "../../lib/constants";

export default function SignUp() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(authUser);
  const [acknowledged, setAcknowledged] = useState(false);
  const { mutate: checkUser, isPending } = useCheckAllowedUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    resolver: yupResolver(
      UserSignUpSchema,
    ) as unknown as Resolver<UserSignUpType>,
    defaultValues: user,
  });
  const submit = (data: UserSignUpType) => {
    if (isPending) return;
    if (!acknowledged) return;
    checkUser(data, {
      onSuccess: () => {
        dispatch(saveUserInfo(data));
        sessionStorage.setItem("signup-legal-accepted", "true");
        navigate(
          `/${PageRoutes.signup}/${PageRoutes.companyOnboarding}?${params.toString()}`,
        );
      },
      onError: (error: any) =>
        toast.error(
          error?.data?.message || "Unable to continue. Please try again.",
        ),
    });
  };
  return (
    <SignupShell
      step={0}
      title="Sign Up"
      subtitle="Sign up to OnCulture with your workspace"
    >
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={5}>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
            <CustomInput
              label="First name"
              placeholder="First name"
              h="4rem"
              {...register("firstName")}
              errorMessage={errors.firstName?.message}
              isRequired
            />
            <CustomInput
              label="Last name"
              placeholder="Last name"
              h="4rem"
              {...register("lastName")}
              errorMessage={errors.lastName?.message}
              isRequired
            />
          </SimpleGrid>
          <CustomInput
            label="Work email"
            placeholder="amaka@company.com"
            type="email"
            h="4rem"
            {...register("email")}
            errorMessage={errors.email?.message}
            isRequired
          />
          <CustomCheckbox
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
            required
            name="signup-agreements"
            label={
              <Text fontSize="14px">
                I agree to OnCulture’s{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand.primary.600"
                  textDecoration="underline"
                >
                  Terms of Service
                </Link>
                ,{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand.primary.600"
                  textDecoration="underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/data-processing"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand.primary.600"
                  textDecoration="underline"
                >
                  Data Processing Agreement
                </Link>
                .
              </Text>
            }
          />
          <CustomButton
            type="submit"
            w="full"
            h="48px"
            padding="12px"
            loading={isPending}
          >
            Continue
          </CustomButton>
        </Stack>
      </form>
      <SignupLogin />
    </SignupShell>
  );
}
