import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

export default function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="footer-logo" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente natus minus est!</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="facebook_icon" />
                        <img src={assets.twitter_icon} alt="twitter_icon" />
                        <img src={assets.twitter_icon} alt="twitter_icon" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-704-931-2123</li>
                        <li>aanuragmaheahswari02@gamil.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright © 2024. All Rights Reserved.</p>
            <p className='footer-copyright'>Designed and Developed by Anurag Mahehswari</p>
            <p className='footer-copyright'>Powered by ReactJS</p>
        </div>
    )
}
