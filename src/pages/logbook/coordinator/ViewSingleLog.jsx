import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';

const ViewSingleLog = () => {

    const [t, i18n] = useTranslation('global');

  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <main className={styles.main}>
            <Header 
                text={t('nav.stu') + t('sidebar.logbook')}
                color={'#003679'}
                fontSize={'20px'}
                fontWeight={'600'}
                margin={'1.5rem 1rem'}
            />
            <div className={styles.singleLogCont}>
                <div className={styles.sides}>
                    {/* DAY */}
                    <label>{t('logbook.day')}</label>
                    <div className={styles.leftDiv}></div>
                    {/* DATE */}
                    <label>{t('logbook.date')}</label>
                    <div className={styles.leftDiv}></div>
                    {/* DEPARTMENT */}
                    <label>{t('logbook.department')}</label>
                    <div className={styles.leftDiv}></div>
                </div>
                <div className={styles.sides}>
                    {/* DESCRIPTION */}
                    <label>{t('logbook.descLabel')}</label>
                    <div className={styles.rightDiv}></div>
                </div>
            </div>
        </main>
    </>
  )
}

export default ViewSingleLog;


