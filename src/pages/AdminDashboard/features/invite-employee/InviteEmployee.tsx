import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import { ThreeDots } from "react-loader-spinner";
import FormInput from "../../../../components/form-input";
import SuccessModal from "../../components/SuccessModal";
import inviteStyle from "../../../../styles/Dashboard/Invite.module.css";
import { RootState, useAppSelector } from "../../../../redux/store";
import CustomModal from "../../../../components/custom-modal";
import FailedModal from '../../components/FailedModal';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

interface employeeFormProps {
  fullName: string;
  email: string;
  role: string;
  department: string;
}

interface modalProps {
  isOpen: boolean;
  closeModal: any;
}

type ViewModal = 'Success'  | 'Invite'

export const INVITE_EMPLOYEE_FORM_SCHEMA = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),
  role: yup.string().required("Role is required"),
  department: yup.string().required("Department is required"),
});



const InviteEmployee = ({ closeModal, isOpen }: modalProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const [currentView, setCurrentView] = React.useState<ViewModal>('Invite')
  const [backendError, setBackendError] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>();
  const [apiMessage, setApiMessage] = React.useState<string>('')

  const { userToken } = useAppSelector((state: RootState) => state.user);

  const handleInputChange = (handleChange: any) => (event: any) => {
    // your custom logic here
    console.log("Input changed:", event.target.name, event.target.value);
    if (event.target.name === 'email') {
      setBackendError('')
    }
    handleChange(event);
  };

  const submitInvite = async (values: employeeFormProps) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/employee/invite`,
        {
          ...values,
        },
        config
      );

      console.log(data);
      if (data.success) {
        setSuccess(true);
        setCurrentView('Success')
      } else {
        // setFailed(true)set
        
        setApiMessage(data.message)
        if (data.statusCode === 392) {
          toast('Email already in use')
          setBackendError(data.message)
        }
        
        // setCurrentView('Failed')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderSwitchModal = () => {
    switch (currentView) {
      case 'Invite':
        return (<>
          <ToastContainer/>
          <CustomModal isOpen={isOpen} closeModal={closeModal} width="400px">
            <div className={inviteStyle.inviteBox}>
              <h4>Invite Employee</h4>

              <Formik
                validationSchema={INVITE_EMPLOYEE_FORM_SCHEMA}
                initialValues={{
                  fullName: "",
                  email: "",
                  role: "",
                  department: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
                  submitInvite(values);
                  setEmail(values.email);
                }}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <FormInput
                        label="Fullname*"
                        type="text"
                        name="fullName"
                        placeholder="Fullname"
                        value={values.fullName}
                        isInvalid={touched.fullName && !!errors.fullName}
                        validationMessage={touched.fullName && errors.fullName}
                        onChange={handleChange}
                      />

                      <FormInput
                        label="Email Address*"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        isInvalid={touched.email && !!errors.email}
                        validationMessage={touched.email && errors.email}
                        onChange={handleInputChange(handleChange)}
                        backendError={backendError}
                        isTouched={touched.email}
                      />

                      <FormInput
                        label="Job Role*"
                        type="text"
                        name="role"
                        placeholder="Job Role"
                        value={values.role}
                        isInvalid={touched.role && !!errors.role}
                        validationMessage={touched.role && errors.role}
                        onChange={handleChange}
                      />

                      <FormInput
                        label="Department*"
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={values.department}
                        isInvalid={touched.department && !!errors.department}
                        validationMessage={
                          touched.department && errors.department
                        }
                        onChange={handleChange}
                      />

                      <div>
                        <button type="submit">
                          {loading ? (
                            <ThreeDots
                              height="20"
                              width="40"
                              radius="9"
                              color="#fff"
                              ariaLabel="three-dots-loading"
                              wrapperClass={inviteStyle.loaders}
                              visible={true}
                            />
                          ) : (
                            "Invite"
                          )}
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </CustomModal>
        </>)
      case 'Success':
        return (<SuccessModal
          isOpen={isOpen}
          closeModal={closeModal}
          header="Invitation Sent Successfully"
          message={`An invitation has been sent to ${email}. They will receive an email with instructions on how to access the application`}
        />)
      default:
        return null
    }
  }
  return (
    // <div>
    //   {!success ? (
    //     <>
    //       <CustomModal isOpen={isOpen} closeModal={closeModal} width="400px">
    //         <div className={inviteStyle.inviteBox}>
    //           <h4>Invite Employee</h4>

    //           <Formik
    //             validationSchema={INVITE_EMPLOYEE_FORM_SCHEMA}
    //             initialValues={{
    //               fullName: "",
    //               email: "",
    //               role: "",
    //               department: "",
    //             }}
    //             onSubmit={(values) => {
    //               console.log(values);
    //               submitInvite(values);
    //               setEmail(values.email);
    //             }}
    //           >
    //             {({ values, errors, touched, handleChange, handleSubmit }) => {
    //               return (
    //                 <form onSubmit={handleSubmit}>
    //                   <FormInput
    //                     label="Fullname*"
    //                     type="text"
    //                     name="fullName"
    //                     placeholder="Fullname"
    //                     value={values.fullName}
    //                     isInvalid={touched.fullName && !!errors.fullName}
    //                     validationMessage={touched.fullName && errors.fullName}
    //                     onChange={handleChange}
    //                   />

    //                   <FormInput
    //                     label="Email Address*"
    //                     type="text"
    //                     name="email"
    //                     placeholder="Email"
    //                     value={values.email}
    //                     isInvalid={touched.email && !!errors.email}
    //                     validationMessage={touched.email && errors.email}
    //                     onChange={handleChange}
    //                   />

    //                   <FormInput
    //                     label="Job Role*"
    //                     type="text"
    //                     name="role"
    //                     placeholder="Job Role"
    //                     value={values.role}
    //                     isInvalid={touched.role && !!errors.role}
    //                     validationMessage={touched.role && errors.role}
    //                     onChange={handleChange}
    //                   />

    //                   <FormInput
    //                     label="Department*"
    //                     type="text"
    //                     name="department"
    //                     placeholder="Department"
    //                     value={values.department}
    //                     isInvalid={touched.department && !!errors.department}
    //                     validationMessage={
    //                       touched.department && errors.department
    //                     }
    //                     onChange={handleChange}
    //                   />

    //                   <div>
    //                     <button type="submit">
    //                       {loading ? (
    //                         <ThreeDots
    //                           height="20"
    //                           width="40"
    //                           radius="9"
    //                           color="#fff"
    //                           ariaLabel="three-dots-loading"
    //                           wrapperClass={inviteStyle.loaders}
    //                           visible={true}
    //                         />
    //                       ) : (
    //                         "Invite"
    //                       )}
    //                     </button>
    //                   </div>
    //                 </form>
    //               );
    //             }}
    //           </Formik>
    //         </div>
    //       </CustomModal>
    //     </>
    //   ) :  (
    //     <SuccessModal
    //       isOpen={isOpen}
    //       closeModal={closeModal}
    //       header="Invitation Sent Successfully"
    //       message={`An invitation has been sent to ${email}. They will receive an email with instructions on how to access the application`}
    //     />
    //     )
    //   }
    // </div>
    <div>
      {renderSwitchModal()}
    </div>
  );
};

export default InviteEmployee;
