import React from 'react'
import styles from './coordinator/styles.module.css'
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import { useTranslation } from 'react-i18next';

const Announcement = ({title, desc, date}) => {

    const [t, i18n] = useTranslation('global');
    // create a function to get only the year from the date
    const getYear = (date) => {
        return date.split('-')[0];
    }
    // create a function to get the days and month from the date ( 20 Jun like this)
    const getDayMonth = (date) => {
        return date.split('-')[1];
    }





  return (
    <div className={styles.announcement}>
        <div className={styles.dateCont}>
            <HeaderTwo 
                text={getYear(date)}
                fontSize={'14px'}
                fontWeight={'600'}
                color={'#888888'}
                margin={'0 0 0 1rem'}

            />
            <HeaderTwo 
                text={getDayMonth(date)}
                fontSize={'14px'}
                fontWeight={'600'}
                color={'#888888'}
                margin={'0 0 0 1rem'}

            />
            <HeaderTwo 
                text={'BH Admin'}
                fontSize={'13px'}
                fontWeight={'600'}
                color={'#888888'}
                margin={'0 0 0 1rem'}

                // margin={'auto'}
            />
        </div>
        <div className={styles.announceDiv}>
            <HeaderTwo 
                text={title}
                fontSize={'18px'}
                fontWeight={'800'}
                color={'#003679'}
                // margin={'auto'}
            />
            <p>{desc}</p>

        </div>
    </div>
  )
}

export default Announcement;
