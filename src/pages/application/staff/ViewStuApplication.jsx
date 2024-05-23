import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import SIFDownload from './SIFDownload';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';
import { useParams, useNavigate } from 'react-router-dom';

const ViewStuApplication = () => {

    
    const navigate = useNavigate()
    const { id } = useParams();
    const [t, i18n] = useTranslation('global');
    //console.log((id));

    const [email, setEmail] = useState('')
    const [application, setApplication] = useState(null)
    const [app, setApp] = useState(null)
    const [cv, setCv] = useState(null)
    //const [status, setStatus] = useState('')
    const [ide, setIde] = useState(0)
    const url = 'http://localhost:8000/'
    
    const fetchApplication = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/demandes-de-stage/${id}`)
        const data = await response.json()
        //console.log(data.message);
        setApplication(data.message)
        setCv(data.message.document)
        // WE also fetch the docs
        const idS = data.message.sujetDeStage.id
        const responseS = await fetch(`http://localhost:5000/api/v1/sujets-de-stage/${idS}`)
        const dataS = await responseS.json()
        //console.log(dataS.message);
        //setApplication(prev => ({...prev, sujetDeStage: dataS.message}))
        setApp(dataS.message.document)
        console.log('Sujet : ',app);
        console.log('cv : ',cv);
        console.log('Updated : ',application);
        //console.log('C :', application.document.chemin);



    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const extractFileName = (filePath) => {
        if (typeof filePath === 'string') {
            // Use a regular expression to replace the 'public\\uploads\\' part
            return filePath.replace(/^public\\uploads\\/, '');
        } else {
            throw new TypeError('The provided filePath is not a string');
        }
    };

    const fetchEncadrant = async () => {
        const responseE = await fetch(`http://localhost:5000/api/v1/users/email/`+email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const dataE = await responseE.json()
        console.log(dataE.message);

        // cast the id to integer
        if (dataE.message) {
            const x = parseInt(dataE.message.id)
            setIde(x)
            console.log(ide);
        }
    }

    const acceptApplication = async () => {
        
        const response = await fetch(`http://localhost:5000/api/v1/demandes-de-stage/${id}/accept`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                encadrant: ide
            })
        })
        const data = await response.json()
        console.log(data.message);

        // Create an Automatic task for the student
        /*
        const url = `http://localhost:5000/api/v1/tasks`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Project Initiation',
                description: 'Auto Generated Task for Project Initiation',
                status: 'open',
                student: application.stagiaire.id,
                encadrant: ide
            })
        });
        const d = await res.json();
        console.log(d.message);
        */
    }

    const refuseApplication = async () => {
        
        const response = await fetch(`http://localhost:5000/api/v1/demandes-de-stage/${id}/refuse`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log(data.message);
    }

    const handleClickA = () => {

        return () => {
            
            acceptApplication()
            // navigate to overview page
            // wait 2 seconds before navigating
            setTimeout(() => {
                navigate('/coordinator/overview')
            }, 2000)
        }
    }

    const handleClickR = () => {

        return () => {
            
            refuseApplication()
            // navigate to overview page
            setTimeout(() => {
                navigate('/coordinator/overview')
            }, 2000)
        }
    }



    useEffect(() => {
    //console.log({} == false || null ?  "yes equal" : "no")
    //console.log([] == false || null ?  "yes equal" : "no")
        fetchApplication()
        console.log(application);

    }
    , [])
    
    useEffect(() => {
        fetchEncadrant()
        console.log(ide);
    },
    [email])
   // return <div>test render</div>

  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
            <Header 
                text={t('application.view') + 's'}
                color={'#003679'}
                fontSize={'18px'}
                fontWeight={'600'}
                margin={'1.5rem 1rem'}
            />
            <table>
                
            </table>
            {
                application && (
                    <>
                    <div className={styles.top}>
                <div className={styles.topOne}>
                    <h2 className={styles.h2}>{t('application.stuInfo')}</h2>
                    {/* std no */}
                    <label>{t('profile.stdNo')}</label>
                    <div className={styles.cont}>{application?.stagiaire?.CIN}</div>
                    {/* name */}
                    <label>{t('profile.fname')}</label>
                    <div className={styles.cont}>{application?.stagiaire?.firstName}</div>
                    {/* surname */}
                    <label>{t('profile.lname')}</label>
                    <div className={styles.cont}>{application.stagiaire.lastName}</div>
                    {/* email */}
                    <label>{t('profile.email')}</label>
                    <div className={styles.cont}>{application.stagiaire.email}</div>
                    {/* Tel */}
                    <label>{t('profile.adr')}</label>
                    <div className={styles.cont}>{application.stagiaire.address}</div>
                    {/* duration */}
                    <label>{t('internships.t')}</label>
                    <div className={styles.cont}>{application.type}</div>
                </div>
                <div className={styles.topTwo}>
                
                    <h2 className={styles.h2}>{t('internships.intInfo')}</h2>
                    {/* company name */}
                    <label>{t('internships.company') + ' ' + t('profile.name')}</label>
                    <div className={styles.cont}>BH Bank</div>
                    {/* field */}
                    <label>{t('internships.name')}</label>
                    <div className={styles.cont}>{application.sujetDeStage.intitule}</div>
                    {/* email */}
                    <label>{t('internships.do')}</label>
                    <div className={styles.cont}>{application.sujetDeStage.domaine}</div>
                    {/* Tel */}
                    <label>{t('logbook.date')}</label>
                    <div className={styles.cont}>{formatDate(application.sujetDeStage.dateDeCreation)}</div>
                    {/* duration */}
                    <label>{t('internships.desc')}</label>
                    <div className={styles.descCont}>{application.sujetDeStage.description}</div>
                </div>
            </div>
            {/* SUPERVISOR INFO */}
            <div className={styles.bottom}>
                <h2 className={styles.h2}>{t('nav.supe') + ' ' + t('main.info')}</h2>
                <div className={styles.bottomCont}>
                    <div>
                        <label>{t('profile.fname')}</label>
                        <div className={styles.bCont}>{t('profile.fname')}</div>
                    </div>
                    <div>
                        <label>{t('profile.lname')}</label>
                        <div className={styles.bCont}>{t('profile.lname')}</div>
                    </div>
                </div>
                <div className={styles.bottomCont}>
                    <div>
                        <label htmlFor='email'>{t('profile.email')}</label>
                        <input text={'email'} name={'email'} value={email} className={styles.bCont} onChange={handleChange} placeholder={t('profile.email')}/>
                    </div>
                    <div>
                        <label>{t('internships.pos')}</label>
                        <div className={styles.bCont}>BH Employe</div>
                    </div>
                </div>
            </div>
                    </>
                )
            }
            {
                /*
            <SIFDownload cv={url+extractFileName(cv?.chemin)} index={url+extractFileName(app?.chemin)}/>
                    */
                
            }
            <button className={styles.decBtn} style={{background: '#003679'}} onClick={handleClickA()}>{t('application.accept')}</button>
            <button className={styles.decBtn} style={{background: '#ff1a2f'}} onClick={handleClickR()}>{t('application.reject')}</button>
        </section>
    </>
  )
}

export default ViewStuApplication;
