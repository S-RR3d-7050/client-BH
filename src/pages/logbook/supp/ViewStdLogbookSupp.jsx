import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar'
import SideBar from '../../../components/ELEMENTS/Nav/SideBar'
import Header from '../../../components/ELEMENTS/Header/Header'
import { useTranslation } from 'react-i18next'
import { BsArrowRight } from "react-icons/bs";
import Log from '../Log'
import { Link } from 'react-router-dom'
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ViewStdLogbookSupp() {

    const [t, i18n] = useTranslation('global');
    const { id } = useParams();
    const [logs, setLogs] = useState([]);


    const fetchLogs = async () => {
        const url = `http://localhost:5000/api/v1/students/${id}/tasks`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.message);
        setLogs(data.message);
    }

    // Create a function that extract days from a date
    const extractDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };


    const displayLogs = logs.map((item, index) => {
        return (
            <Log 
                to={`/supervisor/view/single/tasks/${item.id}` }
                day={item.id} 
                date={extractDate(item.createdAt)} 
                desc={item.title} 
                key={index}
            />
        )
    })

    useEffect(() => {
        fetchLogs();
    }
    , []);
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
                {displayLogs}
                {
                    /*
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
                    */
                }

            </section>
            <div className={styles.linksCont}>
                <Link to={'/supervisor/student/assessment/'+id} className={styles.evalBtn}>Evaluate Student <BsArrowRight className={styles.icon} /></Link>
                <Link to={'/supervisor/view/evaluation/latest/'+id} className={styles.supeEvalBtn}>View Latest Evaluation <BsArrowRight className={styles.icon} /></Link>
            </div>

        </section>
    </>
  )
}
