import React, { ReactEventHandler, useEffect, useState } from "react";
import Styles from "../../styles/CompanyOnboarding/Company.module.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { calculateTotalSelect } from "../../utils/helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateProfileInfo } from "../../redux/users";
import FormSelectBox from "../../components/form-select-box";

type CheckoutProp = {
  step: number;
  setStep: (val: number) => void;
};

const planOptions = [
  {
    value: "free",
    label: "Free",
    price: 0,
    planId: "2e0fbe26-95a9-4d4e-b4e9-54167be47a92",
  },
  {
    value: "basic",
    label: "Basic",
    price: 1,
    planId: "a666e3ed-1e8a-4673-8660-86a46b1fabe8",
  },
  {
    value: "standard",
    label: "Standard",
    price: 2,
    planId: "a4a5a8cf-f3a0-408a-a1cd-fe90bf3627be",
  },
  {
    value: "premium",
    label: "Premium",
    price: 3.5,
    planId: "e1407b1f-e6b4-4c1d-b579-d6dc607ddc7b",
  },
];

const Checkout = ({ step, setStep }: CheckoutProp) => {
  const [selectedPlan, setSelectedPlan] = useState<any>(planOptions[0]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPay, setTotalPay] = useState<number>(0);
  const [tax, setTax] = useState<number>(9);

  const { userToken, profileInfo } = useAppSelector(
    (state: RootState) => state.user
  );

  console.log(userToken, profileInfo);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedPlan: currentPlan } = useAppSelector(
    (state: RootState) => state.subscription
  );

  React.useEffect(() => {
    const data = planOptions.filter(
      (plan, i) => plan.value === currentPlan.planName
    );
    setSelectedPlan(data[0]);
  }, []);

  // useEffect(() => {
  //   setCourseSelect([...selections]);

  //   const additions = calculateTotalSelect(selections);

  //   setSubTotal(additions);
  //   setTotalCost(additions + tax);
  // }, [selections]);

  const handleSubmit = () => {
    if (selectedPlan.value !== "free" && totalUser > 0) {
      handleSubscription();
    } else if (selectedPlan.value === "free") {
      navigate("/dashboard/overview");
    }
  };

  const handleSubscription = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        mode: "cors",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_PROXY}/users/subscribeToPlan`,
      {
        planId: selectedPlan.planId,
        noOfUser: totalUser,
        totalPrice: totalPrice,
      },
      config
    );

    // console.log({
    //   planId: selectedPlan.planId,
    //   noOfUser: totalUser,
    //   totalPrice: totalPrice,
    // });

    console.log(data, "data");
    if (data.success) {
      // localStorage.setItem("userDetails", JSON.stringify(data.payload));
      // dispatch(updateProfileInfo(data.payload));
      toast(data.message);
      navigate("/dashboard/overview");
    } else {
      toast("Payment Failed");
    }
  };

  const handlePlanSelection = (selected: any, meta: any) => {
    setSelectedPlan(selected);
    // console.log("selected", selected);
    // console.log("meta", meta);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target) {
      setTotalUser(Number(target.value));
      setTotalPrice(selectedPlan.price * Number(target.value));
      setTotalPay(selectedPlan.price * Number(target.value) + tax);
    }
  };

  React.useEffect(() => {
    setTotalPrice(0);
    setTotalPrice(selectedPlan.price * totalUser);
    setTotalPay(selectedPlan.price * totalUser + tax);
  }, [selectedPlan]);

  return (
    <>
      <div className={Styles.checkout_container}>
        {/* <div className={Styles.tableHead}>
          <span>Plan</span>
          <span>Price per User</span>
          <span>No of User</span>
          <span>Total</span>
        </div> */}
        <table className={Styles.checkoutTable}>
          <thead className={Styles.thead}>
            <tr>
              <th>Plan</th>
              <th className={Styles.priceHead}>Price per User</th>
              <th>No of User</th>
              <th className={Styles.totalHead}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className={Styles.selectBox}
                // style={{ paddingRight: "100px" }}
              >
                <FormSelectBox
                  name="plan"
                  value={selectedPlan}
                  options={planOptions}
                  placeholder="select plan"
                  onChange={handlePlanSelection}
                />
              </td>
              <td className={Styles.priceBody}>
                ${selectedPlan && selectedPlan.price}
              </td>
              <td>
                <input type="text" name="noOfUsers" onChange={handleChange} />
              </td>
              <td className={Styles.totalBody}>${totalPrice}</td>
            </tr>

            {/* mobile */}
            <tr className={Styles.mobileTableRow}>
              <td>
                <span>$2</span>
                <span>per user per month</span>
              </td>
              <td>$1000</td>
            </tr>
          </tbody>
        </table>

        {/* bottom part */}
        <div className={Styles.bottom_section}>
          <div className={Styles.sub} onClick={() => setStep(step - 1)}>
            <MdOutlineKeyboardArrowLeft fontSize={25} />
            <span>Subscription Plan</span>
          </div>

          <div className={Styles.calcContainer}>
            <div className={Styles.calcValues}>
              <div className={Styles.calcTitles}>
                <p>Subtotal:</p>
                <p>Tax:</p>
              </div>
              <div className={Styles.calcDigits}>
                <p>${totalPrice}</p>
                <p>${tax}</p>
              </div>
            </div>

            <div className={Styles.total}>
              <p>Total</p>
              <p>${totalPay}</p>
            </div>

            <button className={Styles.totalBtn} onClick={handleSubmit}>
              {selectedPlan.value === "free" ? "Continue" : "Pay"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
