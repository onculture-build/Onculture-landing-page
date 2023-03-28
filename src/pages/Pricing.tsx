import React from "react";
import Nav from "../components/Nav";
import { BiCheck } from "react-icons/bi";
import Footer from "../layouts/Home/Footer";
import usePricing from "../hooks/usePricing";
import styles from "../styles/Pricing/pricing.module.css";
import LoadingState from "./AdminDashboard/components/loadingState";

const Pricing = () => {
  const [checkTwo, setCheckTwo] = React.useState<boolean>(false);

  const { data: pricingData, isLoading, isSuccess } = usePricing();

  const renderView = () => {
    if (isLoading) {
      return (
        <>
          <div
            style={{
              width: "100%",
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingState />
          </div>
        </>
      );
    }

    if (isSuccess) {
      return (
        <div className={styles.pricing_content}>
          {pricingData.map((plans: any, i: number) => {
            return (
              <div key={i} className={styles.package}>
                {plans.recommend && (
                  <div className={styles.recommended}>Recommended</div>
                )}
                <div className={styles.top}>
                  <span className={styles.name}>{plans.planName}</span>
                  <span className={styles.price}>${plans.price}</span>
                  <p className={styles.pm}>per user per month</p>
                  <p className={styles.intro}>
                    For teams looking for better data visualization and
                    customization
                  </p>
                </div>

                <ul>
                  {plans.benefits.map((item: any, i: number) => (
                    <li key={i} className={styles.item}>
                      <BiCheck />
                      <span>{item.addsonTitle}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.bottom}>
                  <button className={styles.btn}>Get Started</button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <>
      <Nav />
      <div className={styles.pricing_container}>
        <h2>Our plan are tailored for unique teams</h2>
        <div className={styles.toggleSub}>
          <h4 className={!checkTwo ? styles.hashCol : ""}>Yearly</h4>
          <input
            type="checkbox"
            id="switch"
            onClick={() => setCheckTwo(!checkTwo)}
          />
          <label htmlFor="switch">Toggle</label>
          <h4 className={checkTwo ? styles.hashCol : ""}>Monthly</h4>
        </div>
        {renderView()}
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
