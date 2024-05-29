import React, { useState, useEffect } from 'react';
import styles from '../coordinator/styles.module.css';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Footer from '../../../components/ELEMENTS/Nav/Footer';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/ELEMENTS/Header/Header';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';

const ViewAssessment = () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    const id = user.id;

    const [noEval, setNoEval] = useState(true);
    const [evaluation, setEvaluation] = useState({
        qualityOfStudentInternshipReport: '',
        experienceGained: '',
        presentation: '',
        visualPresentationAid: '',
        overall: '',
        comments: ''
    });
    const [t, i18n] = useTranslation('global');

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/evaluations/student/last/' + id);
                const data = await response.json();
                setEvaluation(data.message);
                setNoEval(data.message.length === 0);  // Update noEval based on whether data.message is an empty array
            } catch (error) {
                console.error('Error fetching evaluation:', error);
                setNoEval(true);
            }
        };

        fetchEvaluation();
    }, [id]);

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
            {value === criterion ? '✔' : null}
        </div>
    );

    const displayEvalFields = evaluation && [
        { name: 'Quality of student internship report', value: evaluation?.qualityOfStudentInternshipReport },
        { name: 'Experience gained', value: evaluation?.experienceGained },
        { name: 'Presentation', value: evaluation?.presentation },
        { name: 'Visual presentation aid', value: evaluation?.visualPresentationAid },
        { name: t('eval.overall'), value: evaluation?.overall }
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
                {noEval ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '60%', textAlign: 'left', fontSize: '20px' }}>{t('eval.crit')}</th>
                                    <th>{t('eval.poor')}</th>
                                    <th>{t('eval.fair')}</th>
                                    <th>{t('eval.good')}</th>
                                    <th>{t('eval.exc')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p className="noEvalMessage">No evaluation found</p></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>

                        </table>
                    </>                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '60%', textAlign: 'left', fontSize: '20px' }}>{t('eval.crit')}</th>
                                    <th>{t('eval.poor')}</th>
                                    <th>{t('eval.fair')}</th>
                                    <th>{t('eval.good')}</th>
                                    <th>{t('eval.exc')}</th>
                                </tr>
                            </thead>
                            <tbody>
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
                                    {evaluation?.comments}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </section>
            <Footer />
        </>
    );
};

export default ViewAssessment;
