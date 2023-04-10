import React from 'react'
import Button from '../../components/Button'
import labelStyle from '../../styles/Home/Label.module.css'
import { Link } from 'react-router-dom'

const Label = () => {
    return (
        <div className={labelStyle.content}>
            <h1>
                Get Onculture
            </h1>
            <div className={labelStyle.labelBtns}>
                <Link to="/jointhewaitlist">
                    <Button className={labelStyle.btnWhite}>
                        Join the waitlist
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default Label