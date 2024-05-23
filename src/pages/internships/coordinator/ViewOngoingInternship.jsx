import React from 'react'
import styles from './styles.module.css'
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';

const ViewOngoingInternship = () => {

    const [t, i18n] = useTranslation('global');


  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
            <Header 
                text={t('internships.intInfo')}
                color={'#003679'}
                fontSize={'20px'}
                fontWeight={'600'}
                margin={'1.5rem 1rem'}
            />
            <div className={styles.top}>
                <div className={styles.topOne}>
                    <h2 className={styles.h2}>{t('application.stuInfo')}</h2>
                    {/* std no */}
                    <label>{t('profile.stdNo')}</label>
                    <div className={styles.cont}>20910069</div>
                    {/* name */}
                    <label>{t('profile.fname')}</label>
                    <div className={styles.cont}>Ahmed</div>
                    {/* surname */}
                    <label>{t('profile.lname')}</label>
                    <div className={styles.cont}>Ibrahim</div>
                    {/* email */}
                    <label>{t('profile.email')}</label>
                    <div className={styles.cont}>20910069@emu.edu.tr</div>
                    {/* Tel */}
                    <label>{t('application.tel')}</label>
                    <div className={styles.cont}>05338353123</div>
                    {/* duration */}
                    <label>{t('application.dur')}</label>
                    <div className={styles.cont}>40</div>
                </div>
                <div className={styles.topTwo}>
                    <h2 className={styles.h2}>{t('application.companyInfo')}</h2>
                    {/* company name */}
                    <label>{t('internships.company') + ' ' + t('profile.name')}</label>
                    <div className={styles.cont}>Northernland Group</div>
                    {/* field */}
                    <label>{t('internships.field')}</label>
                    <div className={styles.cont}>Software Engineering</div>
                    {/* email */}
                    <label>{t('profile.email')}</label>
                    <div className={styles.cont}>info@northernland.tr</div>
                    {/* Tel */}
                    <label>{t('application.tel')}</label>
                    <div className={styles.cont}>05338353123</div>
                    {/* duration */}
                    <label>{t('internships.desc')}</label>
                    <div className={styles.descCont}>Brief description of the work student is carry out during training period.</div>
                </div>
            </div>
            {/* SUPERVISOR INFO */}
            <div className={styles.bottom}>
                <h2 className={styles.h2}>{t('nav.supe') + ' ' + t('main.info')}</h2>
                <div className={styles.bottomCont}>
                    <div>
                        <label>{t('profile.fname')}</label>
                        <div className={styles.bCont}>John</div>
                    </div>
                    <div>
                        <label>{t('profile.lname')}</label>
                        <div className={styles.bCont}>Doe</div>
                    </div>
                </div>
                <div className={styles.bottomCont}>
                    <div>
                        <label>{t('profile.email')}</label>
                        <div className={styles.bCont}>jdoe@northernland.com</div>
                    </div>
                    <div>
                        <label>{t('internships.pos')}</label>
                        <div className={styles.bCont}>Senior Software Engineer</div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default ViewOngoingInternship;
