import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import Internship from './Internship';
import { useTranslation } from 'react-i18next';
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';
import { use } from 'i18next';
import Footer from '../../../components/ELEMENTS/Nav/Footer';


const Internships = () => {

    const [t, i18n] = useTranslation('global');
    const [noInt, setNoInt] = useState(true);
    const [internshipData, setInternshipData] = useState([]);

    const internships = [
        {
          companyName: 'ABC Corp',
          country: 'USA',
          city: 'New York',
          fieldOfWork: 'IT Specialist',
          year: 2023,
        },
        {
            companyName: 'Osmancik Corp',
            country: 'TRNC',
            city: 'Lefkosa',
            fieldOfWork: 'Web Development',
            year: 2022,
        },
        {
            companyName: 'Northernland Group',
            country: 'TRNC',
            city: 'Magusa',
            fieldOfWork: 'Software Development',
            year: 2021,
        },
 
      ];

        const showCompletedInternships = internships.map((item, index) => 
            <tr key={index}>
                <td>{item.companyName}</td>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>{item.fieldOfWork}</td>
                <td>{item.year}</td>
            </tr>
        )
        
        const formatDate = (date) => {
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        }

        const fetchData = async () => {
            // fetch the data from this url https://api.example.com/sujets-de-stage under this line
            // setInternshipData(data);
            const response = await fetch("http://localhost:5000/api/v1/sujets-de-stage", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // handle the response and set the data to the state
            });
            
            const res = await response.json();
            setInternshipData(res.message);
        }

        useEffect(() => {
            fetchData();
        }
        , []);

      
  return (
    <>
        <Navbar user={'Ahmed Ibrahim'} type={'Student'} />
        <SideBar />
        <div className={styles.main}>
            <Header 
                text={t('internships.avail')}
                fontSize={'26px'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 2.5rem'}
            />
            <div className={styles.mainCont}>
            {
                internshipData.map((item, index) => (
                    <Internship key={index} name={item.intitule} domaine={item.domaine} date={'Added : '+ formatDate(item.dateDeCreation)} id={item.id} image={item?.image}/>
                ))
            }
            {
                /*
                <Internship name={'Erica'} domaine={'OPERATIONNEL'} />
                <Internship name={'Erica'} description={'150MP'} />
                <Internship name={'Erica'} description={'150MP'} />
                <Internship name={'Erica'} description={'150MP'} />
                <Internship name={'Erica'} description={'150MP'} />
                <Internship name={'Erica'} description={'150MP'} />
                <Internship name={'Erica'} description={'150MP'} />
                <Internship name={'Erica'} description={'150MP'} />
                <Internship name={'Erica'} description={'150MP'} />
                */
            }

      
            </div>
            <HeaderTwo 
                text={t('internships.compl')}
                fontSize={'26px'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 2.5rem'}
            />
            <div className={styles.completed}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('profile.companyName')}</th>
                            <th>{t('internships.country')}</th>
                            <th>{t('internships.city')}</th>
                            <th>{t('internships.field')}</th>
                            <th>{t('internships.year')}</th>
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
                            {showCompletedInternships}
                        </tbody>
                    }
                </table>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Internships;
