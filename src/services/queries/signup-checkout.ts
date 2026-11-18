import axios from "../axios";
export const signupRequest = async (
  token: string,
  path = "",
  body?: unknown,
) => {
  const config = { headers: { "x-signup-token": token } };
  const response =
    body === undefined
      ? await axios.get(`/signup-checkout${path}`, config)
      : await axios.post(`/signup-checkout${path}`, body, config);
  return response.data.data;
};
export const signupError = (error: any) => {
  const message =
    error?.data?.message ?? error?.response?.data?.message ?? error?.message;
  return Array.isArray(message)
    ? message.join(". ")
    : typeof message === "string"
      ? message
      : "Unable to continue. Please try again.";
};
