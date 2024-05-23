import React, { useState } from 'react';
import styles from '../coordinator/styles.module.css';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useParams } from 'react-router-dom';

const SupeStdEvaluation = () => {
    const { id } = useParams();
    const [t, i18n] = useTranslation('global');
    const [criteria, setCriteria] = useState([
        { name: 'Quality of student internship report', value: '' },
        { name: 'Experience gained', value: '' },
        { name: 'Presentation', value: '' },
        { name: 'Visual presentation aid', value: '' },
        { name: t('eval.overall'), value: '' }
    ]);
    const [comments, setComments] = useState('');
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    const handleChange = (index, value) => {
        const updatedCriteria = criteria.map((item, i) => 
            i === index ? { ...item, value } : item
        );
        setCriteria(updatedCriteria);
    };

    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    };

    const transformData = () => {
        const data = {
            qualityOfStudentInternshipReport: criteria[0].value,
            experienceGained: criteria[1].value,
            presentation: criteria[2].value,
            visualPresentationAid: criteria[3].value,
            overall: criteria[4].value,
            comments: comments,
            encadrant : user.id,
            stagiaire : Number(id)
        };
        return data;
    };

    const AddEvaluation = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/evaluations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });
            const res = await response.json();
            console.log(res);

            // Redirect to the evaluations page after 2 seconds
            setTimeout(() => {
                window.location.href = '/supervisor/view-evaluations';
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }
        

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = transformData();

        //console.log(data);
        AddEvaluation(JSON.stringify(data))
        // Make API call to save the evaluation
        // axios.post('/api/evaluations', data)

    };

    const displayEvalFields = criteria.map((item, index) => (
        <tr key={index}>
            <td>{item.name + ':'}</td>
            <td>
                <input 
                    type='checkbox' 
                    className={styles.checkBox}
                    checked={item.value === 'poor'}
                    onChange={() => handleChange(index, item.value === 'poor' ? '' : 'poor')}
                />
            </td>
            <td>
                <input 
                    type='checkbox' 
                    className={styles.checkBox}
                    checked={item.value === 'fair'}
                    onChange={() => handleChange(index, item.value === 'fair' ? '' : 'fair')}
                />
            </td>
            <td>
                <input 
                    type='checkbox' 
                    className={styles.checkBox}
                    checked={item.value === 'good'}
                    onChange={() => handleChange(index, item.value === 'good' ? '' : 'good')}
                />
            </td>
            <td>
                <input 
                    type='checkbox' 
                    className={styles.checkBox}
                    checked={item.value === 'excellent'}
                    onChange={() => handleChange(index, item.value === 'excellent' ? '' : 'excellent')}
                />
            </td>
        </tr>
    ));

    return (
        <>
            <Navbar />
            <SupeSidebar />
            <main className={styles.main}>
                <Header 
                    text={t('nav.stu') + ' ' + t('eval.eval')}
                    color={'#003679'}
                    fontSize={'22px'}
                    fontWeight={'600'}
                    margin={'1.5rem 1.5rem'}
                />
                <div className={styles.guideCont}>
                    <div>{t('eval.sat') + ' (S)'}</div>
                    <div>{t('eval.unsat') + ' (U)'}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '60%', textAlign: 'left', fontSize: '20px'}}>{t('eval.crit')}</th>
                            <th style={{textAlign: 'left'}}>{t('eval.poor')}</th>
                            <th style={{textAlign: 'left'}}>{t('eval.fair')}</th>
                            <th style={{textAlign: 'left'}}>{t('eval.good')}</th>
                            <th style={{textAlign: 'left'}}>{t('eval.exc')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayEvalFields}
                    </tbody>
                </table>
                <form className={styles.evalForm} onSubmit={handleSubmit}>
                    <label htmlFor='comments'>{t('eval.comm')}:</label>
                    <textarea value={comments} onChange={handleCommentsChange} />
                    <button type='submit' className={styles.submitEvalBtn}>{t('eval.submit') + ' ' + t('eval.eval')}</button>
                </form>
            </main>
        </>
    )
}

export default SupeStdEvaluation;
