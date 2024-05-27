import React from 'react'
import styles from './styles.module.css'
//import available from './available';
//import ongoingInternships from './ongoing';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';
import Footer from '../../../components/ELEMENTS/Nav/Footer';



const ViewAllApplications = () => {

    const [t, i18n] = useTranslation('global');
    const navigate = useNavigate('');
    const [applications , setApplications] = useState([])
    const [applicationsOngoing , setApplicationsOngoing] = useState([])
    const [applicationsRejected , setApplicationsRejected] = useState([])
    const [internships, setInternships] = useState([])
    const [noInt, setNoInt] = useState(false);
    const [noInt2, setNoInt2] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searchTerm2, setSearchTerm2] = useState('')
    const [searchResults2, setSearchResults2] = useState([])


    // fetch applications
    const fetchAvailableApplications = async () => {
        const res = await fetch('http://localhost:5000/api/v1/demandes-de-stage/etat/EN_ATTENTE')
        const data = await res.json()
        setApplications(data.message)
        setSearchResults(data.message)
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

    const handleSearchChange2 = (e) => {
        setSearchTerm2(e.target.value);
      };

    /*
    const fetchOngoingApplications = async () => {
        const res = await fetch('http://localhost:5000/api/v1/demandes-de-stage/etat/ACCEPTEE')
        const data = await res.json()
        setApplicationsOngoing(data.message)
        if (data.message.length === 0) {
            setNoInt(true)
        }
    }
    */
    const fetchRejectedApplications = async () => {
        const res = await fetch('http://localhost:5000/api/v1/demandes-de-stage/etat/REFUSEE')
        const data = await res.json()
        setApplicationsRejected(data.message)
        setSearchResults2(data.message)
        if (data.message.length === 0) {
            setNoInt2(true)
        }
    }
    /*

    // fetch internships
    const fetchAvailableInternships = async () => {
        const res = await fetch('http://localhost:5000/api/v1/sujets-de-stage')
        const data = await res.json()
        setInternships(data.message)
    }
    */
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
        navigate('/coordinator/view/application/'+rowData.id)
    };


    // New Applications
    const displayApplications = searchResults.map((item, index) =>
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


    /*
    // Available Internships
    const displayAvailableData = internships.map((item, index) => 
        <tr key={index}>
                <td>BH BANK</td>
                <td>{item.intitule}</td>
                <td>{item.description}</td>
                <td>{item.domaine}</td>
                <td>{formatDate(item.dateDeCreation)}</td>
        </tr>
    )

    // ONGOING & COMPLETED INTERNSHIPS
    const displayOngoingAndCompleted = ongoingInternships.map((item, index) => 
        <tr key={index} onClick={() => handleTableRowClick(item)}>
            <td>{item.stdName}</td>
            <td>{item.company}</td>
            <td>{item.country}</td>
            <td>{item.city}</td>
            <td>{item.duration}</td>
            <td>{item.start}</td>
            <td>{item.end}</td>
        </tr>
    )


    // ONGOING INTERNSHIPS
    const displayOngoing = applicationsOngoing.map((item, index) =>
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
    */
    // Rejected Internships
    const displayRejected = searchResults2.map((item, index) =>
        <tr key={index}>
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
        fetchAvailableApplications()
    }
    , [])

    /*
    useEffect(() => {
        fetchAvailableInternships()
    }
    , [])

    useEffect(() => {
        fetchOngoingApplications()
    }
    , [])
    */
    useEffect(() => {
        fetchRejectedApplications()
    }
    , [])

    useEffect(() => {
        setSearchResults(
            applications.filter((item) =>
                item.stagiaire.firstName.toLowerCase().includes(searchTerm) || item.stagiaire.lastName.toLowerCase().includes(searchTerm)
            )
            );
    }, [searchTerm, applications]);

    useEffect(() => {
        setSearchResults2(
            applicationsRejected.filter((item) =>
                item.stagiaire.firstName.toLowerCase().includes(searchTerm2) || item.stagiaire.lastName.toLowerCase().includes(searchTerm2)
            )
            );
    }, [searchTerm2, applicationsRejected]);


  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
            <HeaderTwo 
                text={'New Applications'}
                fontSize={'26px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
                              <input 
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchBar}
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
             */}
            {/* ONGOING INTERNSHIPS 
            <HeaderTwo 
                text={t('internships.ong')}
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
                            {displayOngoing}
                        </tbody>
                    }
                </table>
            </div>
            */}
            {/* COMPLETED INTERNSHIPS */}
            <HeaderTwo 
                text={t('internships.ref')}
                fontSize={'24px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
                              <input 
          type="text"
          placeholder="Search by Name"
          value={searchTerm2}
          onChange={handleSearchChange2}
          className={styles.searchBar}
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


        </section>
        <Footer />
    </>
  )
}


export default ViewAllApplications;
