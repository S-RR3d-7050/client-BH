import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import SideBar from '../../components/ELEMENTS/Nav/SideBar';
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import Log from './Log';
import { FiEdit3 } from 'react-icons/fi'
import { useTranslation } from 'react-i18next';
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from 'react-router-dom';
import logs from './logs';
import { date } from 'yup';
import { use } from 'i18next';
import Footer from '../../components/ELEMENTS/Nav/Footer';

const Logbook = () => {


    // get user from localStorage

    const [logs, setLogs] = useState([]);
    let user = localStorage.getItem('user');
  //console.log(user);
    user = JSON.parse(user);
    //const fullName = user.firstName + ' ' + user.lastName;
    let id = user.id;

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

    const [t, i18n] = useTranslation("global");
    const displayLogs = logs.map((item, index) => {
        return (
            <Log 
                to={`/student/view-task/${item.id}` }
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
        <Navbar user={'Ahmed Ibrahim'} type={'Student'} />
        <SideBar />
        <section className={styles.logbook}>
            <div className={styles.header}>
                <Link to={'/student/add/new/task'} className={styles.addLogBtn}><FiEdit3 style={{marginRight: '0.3rem'}} /> {t('tasks.add')}</Link>
                <button className={styles.downloadBtn}><MdOutlineFileDownload style={{marginRight: '0.3rem', fontSize: '20px'}}  /> {t('tasks.download')}</button>
            </div>
            <main className={styles.main}>
                {displayLogs}
            </main>

        </section>
        <Footer />
    </>
  )
}

export default Logbook;