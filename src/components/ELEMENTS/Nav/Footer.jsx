import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import Image from '../Image/Image';

const Footer = () => {
    const [t] = useTranslation("global");
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <Image 
                    src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BH_BANK.png/600px-BH_BANK.png?20190723102945'}
                    height={'50px'} 
                    width={'50px'} 
                    borderRadius={'50%'} 
                    alt={'Footer Logo'} 
                    margin={'0 0.5rem 0 0'}
                />
                <div>
                    <p className={styles.footerText}>{t("footer.text")}</p>
                    <p className={styles.footerTime}>{currentTime}</p>
                </div>
            </div>
            <div className={styles.footerLinks}>
                <a href="/contact-us" className={styles.footerLink}>{t("footer.contact")}</a>
                <a href="https://www.bhbank.tn/" target='_blank' className={styles.footerLink}>{t("footer.about")}</a>
            </div>
        </footer>
    );
}

export default Footer;
