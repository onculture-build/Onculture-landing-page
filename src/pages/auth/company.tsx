import ViewportContainer from "../../layouts/container";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import { CompanySchema } from "../../lib/schema";
import { AuthType, CompanySignupType } from "../../lib/types";
import { Box, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyValuesInput from "../../components/company-values";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { authCompany, authUser } from "../../services/store/selectors";
import { useRegisterCompany } from "../../services/mutations";
import { PageRoutes } from "../../lib/constants";
import { clearEntries } from "../../services/store/slices/auth";
import toast from "react-hot-toast";

const CompanyOnboarding = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(authUser);
  const companyData = useAppSelector(authCompany);

  const { mutate: signup, isPending } = useRegisterCompany();

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanySignupType>({
    resolver: yupResolver(CompanySchema),
    defaultValues: {
      name: companyData.name,
      code: companyData.code,
      email: companyData.email,
      values: companyData.values,
    },
  } as unknown as { resolver: Resolver<CompanySignupType> });

  const submitHandler = ({ values, ...data }: CompanySignupType) => {
    const validValues = (values || []).filter((val) => val.value !== "");

    const signupData: AuthType = {
      userInfo,
      companyInfo: {
        ...data,
        ...(validValues.length && { values: validValues }),
      },
    };
    signup(signupData, {
      onSuccess: (res: any) => {
        sessionStorage.removeItem("auth");
        dispatch(clearEntries);

        if (res.message && res.message.toLowerCase().includes("waitlist")) {
          navigate(`/${PageRoutes.signup}/${PageRoutes.signupFailure}`);
        } else {
          navigate(`/${PageRoutes.signupSuccess}`);
        }
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const companyDomain = import.meta.env.VITE_COMPANY_DOMAIN;

  return (
    <ViewportContainer>
      <Box
        p={{ base: 10, md: 24 }}
        maxW={{ base: "100%", md: "70%", xl: "50%" }}
        mx={"auto"}
        my={"10vh"}
      >
        <Heading
          textAlign="center"
          fontSize={"heading2"}
          fontWeight={"bold"}
          mb={5}
        >
          Create Company Profile
        </Heading>
        <Text textAlign={"center"}>Enter your company's information</Text>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack mt={20} gap={10}>
            <CustomInput
              {...register("name", {
                onBlur(event) {
                  const { value } = event.target;
                  setValue(
                    "code",
                    value.split(" ").join("-").substring(0, 20).toLowerCase(),
                  );
                },
              })}
              placeholder="Company Name"
              label="Company Name"
              isRequired
              p={"2rem"}
              errorMessage={errors.name?.message}
            />
            <CustomInput
              {...register("email")}
              placeholder="Email Address"
              label="Email Address"
              isRequired
              p={"2rem"}
              errorMessage={errors.email?.message}
            />
            <Stack>
              <Flex alignItems={"end"} gap={5}>
                <CustomInput
                  {...register("code", {
                    onBlur(event) {
                      const { value } = event.target;
                      setValue(
                        "code",
                        value.split(" ").join("-").toLowerCase(),
                      );
                    },
                  })}
                  placeholder="Your Company's custom URL"
                  label="Company Domain (20 characters max)"
                  isRequired
                  p={"2rem"}
                  errorMessage={errors.code?.message}
                  maxLength={20}
                />
                <Text pb={3} fontSize={"heading5"}>
                  .{companyDomain || "onculture.io"}
                </Text>
              </Flex>
            </Stack>
            <CompanyValuesInput
              title="values"
              label="Company Values"
              errors={errors}
              register={register}
              control={control}
            />

            <Flex mt={12} w={{ md: "80%" }} mx={"auto"} gap={4}>
              <CustomButton
                type="button"
                variant="outline"
                py={7}
                onClick={() => navigate(-1)}
                w={"100%"}
              >
                Back
              </CustomButton>
              <CustomButton type="submit" py={7} w={"100%"} gap={3}>
                {isPending && <Spinner color="#FFF" speed="0.5s" />}
                Next
              </CustomButton>
            </Flex>
          </Stack>
        </form>
      </Box>
    </ViewportContainer>
  );
};

export default CompanyOnboarding;
