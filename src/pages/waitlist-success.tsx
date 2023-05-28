import React from 'react'
import Nav from "../components/Nav";
import WaitlistSvg from '../Assets/Images/waitlist-success.svg'
import { RiLinkedinBoxLine, RiInstagramLine } from 'react-icons/ri'
import { BsTwitter } from 'react-icons/bs'
import Style from '../styles/Home/waitlist-success.module.css'


const WaitlistSuccess = () => {
    return (
        <>
            <Nav showButton={false} />
            <div className={Style.waitlist}>
                <div className={Style.container}>
                    <img src={WaitlistSvg} alt="waitlist" />
                    <h1>Successful !</h1>
                    <p>Thank you for joining our waitlist! We're thrilled to see your interest and can't wait to bring our product to you. We're working hard to make it available as soon as possible.</p>
                    <span>Follow us</span>
                    <div className={Style.waitlist_icons}>
                        <a href='https://www.instagram.com/onculture_/' target="blank" >
                            <div><RiInstagramLine color='#5C00DD' /></div>
                        </a>
                        <a href='https://www.linkedin.com/company/onculture-global/' target="blank" >
                            <div><RiLinkedinBoxLine color='#5C00DD' /></div>
                        </a>
                        <a href='https://twitter.com/OnCulture_' target="blank" >
                            <div><BsTwitter color='#5C00DD' /></div>
                        </a>
                    </div>
                </div>
            </div>
        </>

    )
}

export default WaitlistSuccess