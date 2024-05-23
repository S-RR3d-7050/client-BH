import React from 'react'
import styles from './styles.module.css'
import { t } from 'i18next';
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import CoodSidebar from '../../components/ELEMENTS/Nav/CoodSidebar';
import Image from '../../components/ELEMENTS/Image/Image';
import Paragraph from '../../components/ELEMENTS/Paragraph/Paragraph';

const ViewStudentProfile = () => {

    const [t, i18n] = useTranslation('global');


    const span = {
        color: '#101110BF',
        fontSize: "17px",
        fontWeight: "800",
    }


  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
            <HeaderTwo 
                text={t('nav.stu') + ' ' + t('profile.prof')}
                color={'#003679'}
                fontSize={'24px'}
                fontWeight={'600'}
                margin={'1rem 1.5rem'}
            />
            <section className={styles.stuProfileCont}>
                <section className={styles.contOne}>
                    <div className={styles.imgCont}>
                        <Image 
                            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzz0nwW80C5NM4wXwDvTpqYyV4RBG2h9Wfw&usqp=CAU'}
                            width={'180px'}
                            height={'180px'}
                            margin={'1rem auto'}
                            borderRadius={'50%'}
                        />
                        <h2>Name Surname</h2>
                        <h3>Student No</h3>


                        <p>
                            <span style={{color: "#101110BF", fontWeight: "800",}}>
                                Member Since:
                            </span> 09-11-2008
                        </p>
                    </div>
                    <div className={styles.supeCont}>
                        <div className={styles.ongoing}>
                            <div></div>
                            <Paragraph 
                                text={t('internships.actInt')}
                                color={'#fff'}
                                fontSize={'16px'}
                                fontWeight={'600'}
                            />
                        </div>
                        <HeaderTwo 
                            text={t('nav.supe')}
                            color={'#003679'}
                            fontSize={'22px'}
                            fontWeight={'600'}
                            margin={'1rem 1.5rem'}
                        />
                        <div>
                            <p><span style={span}>{`${t('nav.supe')} ${t('profile.name')}:`}</span></p>
                            <p><span style={span}>{`${t('profile.email')}:`}</span></p>
                            <p><span style={span}>{`${t('application.tel')}:`}</span></p>
                            <p><span style={span}>{`${t('internships.company')}:`}</span></p>
                        </div>
                    </div>
                </section>
                <div className={styles.aboutCont}>
                    <HeaderTwo 
                        text={t('profile.about')}
                        color={'#003679'}
                        fontSize={'22px'}
                        fontWeight={'600'}
                        margin={'1rem 2rem'}
                    />
                    <AboutSection />
                </div>
            </section>


        </section>
    
    </>
    
  )
}

export default ViewStudentProfile; 




const AboutSection = () => {

    const [t, i18n] = useTranslation('global');

    const span = {
        color: '#101110BF',
        fontSize: "17px",
        fontWeight: "800", 
    }
    return (
        <div className={styles.about}>
            <p><span style={span}>{`${t('profile.fname')}:`}</span></p>
            <p><span style={span}>{`${t('profile.lname')}:`}</span></p>
            <p><span style={span}>{`${t('profile.stdNo')}:`}</span></p>
            <p><span style={span}>{`${t('profile.email')}:`}</span></p>
            <p><span style={span}>{`${t('application.tel')}:`}</span></p>
        </div>
    )
}
