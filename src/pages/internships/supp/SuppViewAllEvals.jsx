import React from 'react'
import styles from './styles.module.css'
//import available from './available';
//import ongoingInternships from './ongoing';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';


const SuppViewAllEvals = () => {

    const [t, i18n] = useTranslation('global');
    const navigate = useNavigate('');
    const [noInt, setNoInt] = useState(false);


    /*
    // fetch applications
    const fetchAvailableApplications = async () => {
        const res = await fetch('http://localhost:5000/api/v1/demandes-de-stage/etat/EN_ATTENTE')
        const data = await res.json()
        setApplications(data.message)
    }
    */

    const [data, setData] = useState([])
    let user = localStorage.getItem('user');
    //console.log(user);
    user = JSON.parse(user);
    const id = user.id;
    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/demandes-de-stage/encadrant/${id}`)
        const data = await response.json()
        setData(data.message)
    }

    useEffect(() => {
        fetchData()
    }
    , [])

 
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const formatFullName = (firstName, lastName) => {
        return firstName + ' ' + lastName
    }

    const handleTableRowClick = (rowData) => {
        // Implement your logic here
        console.log('Row clicked:', rowData);
        //console.log(rowData.id)
        navigate('/supervisor/view/student/tasks/'+rowData.stagiaire.id)
    };


    const displayData = data.map((item, index) =>
        <tr key={index} onClick={() => handleTableRowClick(item)}>
            <td>{formatFullName(item.stagiaire.firstName , item.stagiaire.lastName)}</td>
            <td>{item.stagiaire.email}</td>
            <td>{item.stagiaire.CIN}</td>
            <td>{item?.sujetDeStage?.intitule}</td>
            <td>{item.type}</td>
            <td>{item.etat}</td>
            <td>{formatDate(item.dateSoumission)}</td>
        </tr>
    )

    useEffect(() => {
        fetchData()
    }
    , [])

    /*

    useEffect(() => {
        fetchRejectedApplications()
    }
    , [])
    */


  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <SupeSidebar />
        <section className={styles.main}>
            {/* NEW APPLICATIONS 
            <HeaderTwo 
                text={'New Applications'}
                fontSize={'26px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('nav.stu') + ' ' + t('profile.name')}</th>
                            <th>{t('profile.email')}</th>
                            <th>{t('profile.cin')}</th>
                            <th>{t('internships.name')}</th>
                            <th>{t('internships.t')}</th>
                            <th>{t('internships.stat')}</th>
                            <th>{t('internships.sub')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayApplications}
                    </tbody>
                </table>
            </div>
            */}
            {/* AVAILABLE INTERNSHIPS
            <HeaderTwo 
                text={t('internships.avail')}
                fontSize={'26px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('internships.company')}</th>
                            <th>{t('internships.name')}</th>
                            <th>{t('internships.desc')}</th>
                            <th>{t('internships.field')}</th>
                            <th>{t('logbook.date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayAvailableData}
                    </tbody>
                </table>

            </div>
            <br />
            <Link to={'/coordinator/add-internship'} className={styles.addSupe}>{t('main.add') +' '+ t('sidebar.internships')}</Link>
             */}
            {/* ONGOING INTERNSHIPS */}
            <HeaderTwo 
                text={t('internships.e')}
                fontSize={'24px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('nav.stu') + ' ' + t('profile.name')}</th>
                            <th>{t('profile.email')}</th>
                            <th>{t('profile.cin')}</th>
                            <th>{t('internships.name')}</th>
                            <th>{t('internships.t')}</th>
                            <th>{t('internships.stat')}</th>
                            <th>{t('internships.sub')}</th>
                        </tr>
                    </thead>
                    { noInt ? 
                        <Paragraph 
                            text={t('internships.noData')}
                            fontSize='18px'
                            fontWeight={'600'}
                            margin={'2rem 0'}
                        /> :
                        <tbody>
                            {displayData}
                        </tbody>
                    }
                </table>
            </div>
            {/* COMPLETED INTERNSHIPS 
            <HeaderTwo 
                text={t('internships.ref')}
                fontSize={'24px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('nav.stu') + ' ' + t('profile.name')}</th>
                            <th>{t('profile.email')}</th>
                            <th>{t('profile.cin')}</th>
                            <th>{t('internships.name')}</th>
                            <th>{t('internships.t')}</th>
                            <th>{t('internships.stat')}</th>
                            <th>{t('internships.sub')}</th>
                        </tr>
                    </thead>
                    { noInt2 ? 
                        <Paragraph 
                            text={t('internships.noData')}
                            fontSize='18px'
                            fontWeight={'600'}
                            margin={'2rem 0'}
                        /> :
                        <tbody>
                            {displayRejected}
                        </tbody>
                    }
                </table>
            </div>
            */}


        </section>
    </>
  )
}


export default SuppViewAllEvals;
