import React, { useState } from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';

const CoodStdEvaluation = () => {

  const [t, i18n] = useTranslation('global');
  const [criteria, setCriteria] = useState([
    'Quality of student internship report', 
    'Experience gained',
    'Presentation',
    'Visual presentation aid',
    t('eval.overall')
  ]);

  const displayEvalFields = criteria.map((item, index) => 
        <tr key={index}>
            <td>{item + ':'}</td>
            <td>
              <input type='checkbox' className={styles.checkBox} />
            </td>
            <td>
              <input type='checkbox' className={styles.checkBox} />
            </td>
            <td>
              <input type='checkbox' className={styles.checkBox} />
            </td>
            <td>
              <input type='checkbox' className={styles.checkBox} />
            </td>
        </tr>
  )
return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
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
                        <th style={{width: '60%', textAlign: 'left', fontSize: '20px'}} style={{textAlign: 'left'}}>{t('eval.crit')}</th>
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
          <form className={styles.evalForm}>
            <label htmlFor='comments'>{t('eval.comm')}:</label>
            <textarea />
            <button className={styles.submitEvalBtn}>{t('eval.submit') + ' ' + t('eval.eval')}</button>
          </form>
        </main>
    </>
  )
}


export default CoodStdEvaluation;