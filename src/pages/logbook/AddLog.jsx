import React, { useState } from 'react'
import styles from './styles.module.css'
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../components/ELEMENTS/Nav/SideBar';
import Header from '../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CoodSidebar from '../../components/ELEMENTS/Nav/CoodSidebar';
// import * as fs from 'fs' 
import Footer from '../../components/ELEMENTS/Nav/Footer';


const AddLog = () => {


    const navigate = useNavigate();
    const [t, i18n] = useTranslation("global");
    //const [id, setId] = useState(1);
    let user = localStorage.getItem('user');
    //console.log(user);
    user = JSON.parse(user);
    let id = user.id;
  
    const [logData, setLogData] = useState({
        title: '',
        description: '',
        status: 'open',
        student: id,
        encadrant: 0

    })

  

    // FUNCTION TO HANDLE FORM INPUT STATE CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const AddTask = async () => {
        const url = `http://localhost:5000/api/v1/tasks`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logData)
        });
        const data = await response.json();
        console.log(data.message);
    }

    const getSuper = async (id) => {
        const url = `http://localhost:5000/api/v1/demandes-de-stage/student/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Super ID: ",data.message[0].encadrant.id);
        return data.message[0].encadrant.id
    }


    // FUNCTION TO HANDLE FORM SUBMIT
    const handleLogSubmit = async (e) => {
        e.preventDefault();
        console.log(logData);
        const encadrant = await getSuper(id);
        console.log(encadrant);
        logData.encadrant = encadrant;
        /*
        setLogData((prev) => {
            return {
                ...prev,
                encadrant: encadrant,
                student: id
            }
        })
        */
        AddTask();
        //console.log(logData);
        // navigate to tasks page
        // wait for 5 then navigate
        setTimeout(() => {
            navigate('/student/tasks');
        }, 1000)


    }


  return (
    <>
        <Navbar user={'Ahmed Ibrahim'} type={'Student'} />
        <SideBar />
        <main className={styles.addCont}>
            <Header text={t('tasks.Daily')} fontSize={'28px'} color={'#103561'} margin={'1rem 2rem'} />
            <section className={styles.addContMain}>
                <div className={styles.formCont}>
                    <form className={styles.form}>
                        <label htmlFor='title'>{`${t('tasks.t')}:`}</label>
                        <input type='text' name='title' value={logData.title} onChange={handleInputChange} />
                        { /*



                        <label htmlFor='date'>{`${t('logbook.date')}:`}</label>
                        <input type='date' name='date' value={logData.date} onChange={handleInputChange} />

                        <label htmlFor='dept'>{`${t('logbook.department')}:`}</label>
                        <input type='text' name='dept' value={logData.dept} onChange={handleInputChange} placeholder={'Department'} />
                            */ }
                        <label htmlFor='description'>{`${t('logbook.description')}:`}</label>
                        <textarea name='description' value={logData.description} onChange={handleInputChange} placeholder={'Description of work done'} />

                        <button onClick={handleLogSubmit}>{t('tasks.add')}</button>
                    </form>
                </div>
                <div className={styles.calendar}>
                    <div>

                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </>
  )
}

export default AddLog;  
