import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Nav from "../components/Nav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/FAQ/FormSignup.module.css";
import FormInput from "../components/form-input";
import CustomButton from "../components/custom-button";
import checkMark from '../Assets/Images/Frame.svg'
import tweetIco from '../Assets/Images/soTweet.svg'
import linkedinIco from '../Assets/Images/soLinkedin.svg'
import instagramIco from '../Assets/Images/soInstagram.svg'
import fProgramStyles from "../styles/Home/FeaturesPrograms.module.css";



const SuccessJoinList = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const navigate = useNavigate();


   
    return (
        <>
            <Nav showButton={false} />
            <div className={Styles.content}>
                <div className={Styles.mainBox2}>
                    <div className={Styles.mainBox2Img}>
                        <img src={checkMark} alt="check-mark" />
                    </div>
                    <div>
                        <h1>Successful !</h1>
                    </div>
                    <div>
                        <p>Thank you for joining our waitlist! We're thrilled to see your interest and can't wait to bring our product to you. We're working hard to make it available as soon as possible.</p>
                    </div>
                    <div className={Styles.socials}>
                        <h5>Follow Us</h5>
                        <div className={Styles.socialIcos}>
                            <div className={Styles.bgIcos}>
                                <img src={instagramIco} alt="onculture-instagram" />
                            </div>
                            <div className={Styles.bgIcos}>
                                <img src={linkedinIco} alt="onculture-linkedin" />
                            </div>
                            <div className={Styles.bgIcos}>
                                <img src={tweetIco} alt="onculture-twitter" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={fProgramStyles.bgBlurObject}></div>
        </>
    );
};

export default SuccessJoinList;
