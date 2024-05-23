import React, { useState } from 'react'
import styles from './styles.module.css'
import Paragraph from '../../components/ELEMENTS/Paragraph/Paragraph';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logs from './logs';
import Header from '../../components/ELEMENTS/Header/Header';

const Log = ({ to, day, date, desc }) => {

    const [t, i18n] = useTranslation("global");
    const data = {day: day, date: date, desc: desc}

  return (
    <div className={styles.log}>
        <div className={styles.uno}>
            <div>
                <div className={styles.flex}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="none">
                            <path d="M3.3 7H4.7V8.4H3.3V7ZM13.1 2.8V12.6C13.1 13.377 12.477 14 11.7 14H1.9C1.123 14 0.5 13.37 0.5 12.6V2.8C0.5 2.03 1.13 1.4 1.9 1.4H2.6V0H4V1.4H9.6V0H11V1.4H11.7C12.477 1.4 13.1 2.03 13.1 2.8ZM1.9 4.2H11.7V2.8H1.9V4.2ZM11.7 12.6V5.6H1.9V12.6H11.7ZM8.9 8.4V7H10.3V8.4H8.9ZM6.1 8.4V7H7.5V8.4H6.1ZM3.3 9.8H4.7V11.2H3.3V9.8ZM8.9 11.2V9.8H10.3V11.2H8.9ZM6.1 11.2V9.8H7.5V11.2H6.1Z" fill="#103561"/>
                        </svg>
                        <Paragraph 
                            text={date} 
                            color={'#103561'} 
                            margin={'0 0 0 0.3rem'} 
                            fontSize={'12px'} 
                            fontWeight={'800'} 
                        />
                    </div>
                    <div className={styles.line}></div>
                    <HeaderTwo 
                        text={`${t('logbook.day')} ${day}`} 
                        fontSize={'13px'} 
                        fontWeight={'800'} 
                        color={'#103561'} 
                        margin={'0'} 
                    />
                </div>
            </div>
        </div>
        <Paragraph 
            text={desc} 
            fontSize={'14px'}
            fontWeight={'300'}
            textAlign={'left'}
            color={'#fff'}
            width={'96%'}
            margin={'1rem auto'}
        />
        <Link to={{pathname: to, state: data}} className={styles.btn}>{t('tasks.view')}</Link>
    </div>
  )
}

export default Log;
