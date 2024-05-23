import React, { useState } from 'react'
import styles from './styles.module.css'
import { FaCheck } from "react-icons/fa6";
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';

const ViewStdSupeEvaluation = () => {

    const [t, i18n] = useTranslation('global');
    const [criteria, setCriteria] = useState([
        t('eval.int'), 
        t('eval.attend'),
        t('eval.techKnow'),
        t('eval.genBhv'),
        t('eval.overall')
    ]);


    const evalBox = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25px',
        width: '25px',
        border: '1px solid #000',
        borderRadius: '10px',
        margin: '0 auto'
    }


    // IF evalBox is filled, display <FaCheck />
    const displayEvalFields = criteria.map((item, index) => 
        <tr key={index}>
            <td>{item + ':'}</td>
            <td><div style={evalBox}></div></td>
            <td><div style={evalBox}></div></td>
            <td><div style={evalBox}></div></td>
            <td><div style={evalBox}>{<FaCheck />}</div></td>
        </tr>
    )
  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
            <Header 
                text={t('eval.supe')}
                color={'#003679'}
                fontSize={'22px'}
                fontWeight={'600'}
                margin={'1.5rem 1.5rem'}
            />
            <table>
                <thead>
                    <tr>
                        <th style={{width: '60%', textAlign: 'left', fontSize: '20px'}}>{t('eval.crit')}</th>
                        <th>{t('eval.poor')}</th>
                        <th>{t('eval.fair')}</th>
                        <th>{t('eval.good')}</th>
                        <th>{t('eval.exc')}</th>
                    </tr>
                </thead>
                <tbody>
                    {displayEvalFields}
                </tbody>
            </table>
            <section className={styles.summNcomm}>
                <div className={styles.summary}>
                    <HeaderTwo 
                        text={t('eval.summary') + ':'}
                        color={'#003679'}
                        fontSize={'20px'}
                        fontWeight={'600'}
                        margin={'1rem 1rem'}
                    />
                    <div className={styles.summaryCont}>
                        Summary goes in here!
                    </div>
                </div>
                <div className={styles.summary}>
                    <HeaderTwo 
                        text={t('eval.comm') + ':'}
                        color={'#003679'}
                        fontSize={'20px'}
                        fontWeight={'600'}
                        margin={'1rem 1rem'}
                    />
                    <div className={styles.summaryCont}>
                        Comment goes in here!
                    </div>
                </div>

            </section>
        </section>
    </>
  )
}

export default ViewStdSupeEvaluation;
