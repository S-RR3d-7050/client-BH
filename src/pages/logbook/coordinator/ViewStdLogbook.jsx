import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar'
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import Header from '../../../components/ELEMENTS/Header/Header'
import { useTranslation } from 'react-i18next'
import { BsArrowRight } from "react-icons/bs";
import Log from '../Log'
import { Link } from 'react-router-dom'
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar'

export default function ViewStdLogbook() {

    const [t, i18n] = useTranslation('global');

  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <SupeSidebar />
        <section className={styles.main}>
            <Header 
                text={t('nav.stu') + ' ' + t('sidebar.logbook')}
                color={'#003679'}
                fontSize={'20px'}
                fontWeight={'600'}
                margin={'1.5rem 1rem'}
            />
            <section className={styles.logCont}>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
                <Log to={'/coordinator/view/student-name/log/day'}/>
            </section>
            <div className={styles.linksCont}>
                <Link to={'/coordinator/evaluate/student'} className={styles.evalBtn}>Evaluate Student <BsArrowRight className={styles.icon} /></Link>
                <Link to={'/coordinator/view-supervisor-evaluation'} className={styles.supeEvalBtn}>View Supervisor Evaluation <BsArrowRight className={styles.icon} /></Link>
            </div>

        </section>
    </>
  )
}
