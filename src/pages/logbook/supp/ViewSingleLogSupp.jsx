import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import { useParams } from 'react-router-dom';
import { use } from 'i18next';
import { useEffect, useState } from 'react';

const ViewSingleLogSupp = () => {

    const [task, setTask] = useState({});
    const [t, i18n] = useTranslation('global');
    const { id } = useParams();
    console.log(id);

    const fetchData = async () => {
        const url = `http://localhost:5000/api/v1/tasks/${id}/`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.message);
        setTask(data.message);
    }

    const extractDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        fetchData();
    }
    , []);

  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <SupeSidebar />
        <main className={styles.main}>
            <Header 
                text={t('nav.stu') +' '+ t('tasks.st')}
                color={'#003679'}
                fontSize={'20px'}
                fontWeight={'600'}
                margin={'1.5rem 1rem'}
            />
            <div className={styles.singleLogCont}>
                <div className={styles.sides}>
                    {/* DAY */}
                    <label>{t('tasks.day')}</label>
                    <div className={styles.leftDiv}>
                        <p>{ `Day ${task.id}`}</p>
                    </div>
                    {/* DATE */}
                    <label>{t('tasks.date')}</label>
                    <div className={styles.leftDiv}>
                        <p>{extractDate(task.createdAt)}</p>
                    </div>
                    {/* DEPARTMENT */}
                    <label>{t('tasks.t')}</label>
                    <div className={styles.leftDiv}>
                        <p>{task.title}</p>
                    </div>
                </div>
                <div className={styles.sides}>
                    {/* DESCRIPTION */}
                    <label>{t('tasks.descLabel')}</label>
                    <div className={styles.rightDiv}>
                        <p>{task.description}</p>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default ViewSingleLogSupp;


