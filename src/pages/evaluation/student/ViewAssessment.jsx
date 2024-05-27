import React, { useState, useEffect } from 'react';
import styles from '../coordinator/styles.module.css';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/ELEMENTS/Header/Header';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
// import { FaCheck } from 'react-icons/fa'; // Uncomment this line if you use react-icons
//import { useParams } from 'react-router-dom'
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Footer from '../../../components/ELEMENTS/Nav/Footer';


const ViewAssessment = () => {
    //const { id } = useParams();

    let user = localStorage.getItem('user');
    //console.log(user);
    user = JSON.parse(user);
    //console.log(user.id);
    const id = user.id;

    const [noEval , setNoEval] = useState(true);
    const [t, i18n] = useTranslation('global');
    const [evaluation, setEvaluation] = useState({
        qualityOfStudentInternshipReport: '',
        experienceGained: '',
        presentation: '',
        visualPresentationAid: '',
        overall: '',
        comments: ''
    });

    useEffect(() => {
        // Fetch the evaluation data from the backend
        const fetchEvaluation = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/evaluations/student/last/'+id); // Adjust the URL as necessary
                const data = await response.json();
                setEvaluation(data.message);
                if(data.message === []){
                    setNoEval(true);
                }
            } catch (error) {
                console.error('Error fetching evaluation:', error);
            }
        };

        fetchEvaluation();
    }, []);

    const evalBox = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25px',
        width: '25px',
        border: '1px solid #000',
        borderRadius: '10px',
        margin: '0 auto'
    };

    const getCheckBoxContent = (value, criterion) => (
        <div style={evalBox}>
            {value === criterion ? '✔' : null} {/* Replace '✔' with <FaCheck /> if using react-icons */}
        </div>
    );

    const displayEvalFields = [
        { name: 'Quality of student internship report', value: evaluation.qualityOfStudentInternshipReport },
        { name: 'Experience gained', value: evaluation.experienceGained },
        { name: 'Presentation', value: evaluation.presentation },
        { name: 'Visual presentation aid', value: evaluation.visualPresentationAid },
        { name: t('eval.overall'), value: evaluation.overall }
    ].map((item, index) => (
        <tr key={index}>
            <td>{item.name + ':'}</td>
            <td>{getCheckBoxContent(item.value, 'poor')}</td>
            <td>{getCheckBoxContent(item.value, 'fair')}</td>
            <td>{getCheckBoxContent(item.value, 'good')}</td>
            <td>{getCheckBoxContent(item.value, 'excellent')}</td>
        </tr>
    ));

    return (
        <>
            <Navbar />
            <SideBar />
            <section className={styles.main}>
                <Header 
                    text={t('eval.stud')}
                    color={'#003679'}
                    fontSize={'22px'}
                    fontWeight={'600'}
                    margin={'1.5rem 1.5rem'}
                />
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '60%', textAlign: 'left', fontSize: '20px'}}>{t('eval.crit')}</th>
                            <th>{t('eval.poor')}</th>
                            <th>{t('eval.fair')}</th>
                            <th>{t('eval.good')}</th>
                            <th>{t('eval.exc')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        noEval ? <tr><td colSpan="5">No evaluation found</td></tr> : null
                    }
                        {displayEvalFields}
                    </tbody>
                </table>
                <section className={styles.summNcomm}>
                    <div className={styles.summary}>
                        <HeaderTwo 
                            text={t('eval.summary') + ':'}
                            color={'#003679'}
                            fontSize={'20px'}
                            fontWeight={'600'}
                            margin={'1rem 1rem'}
                        />
                        <div className={styles.summaryCont}>
                            Summary goes in here!
                        </div>
                    </div>
                    <div className={styles.summary}>
                        <HeaderTwo 
                            text={t('eval.comm') + ':'}
                            color={'#003679'}
                            fontSize={'20px'}
                            fontWeight={'600'}
                            margin={'1rem 1rem'}
                        />
                        <div className={styles.summaryCont}>
                            {evaluation.comments}
                        </div>
                    </div>
                </section>
            </section>
            <Footer />
        </>
    );
};

export default ViewAssessment;
