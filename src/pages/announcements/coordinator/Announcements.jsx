import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import { useTranslation } from 'react-i18next';
import Announcement from '../Announcement';
import { useEffect, useState } from 'react';


const Announcements = ({ sideBar, navbar }) => {

  const [t, i18n] = useTranslation('global');
  const [announcements, setAnnouncements] = useState([]);

  // create a fetch request to get the announcements
   const fetchAnnouncements = async () => {
       const response = await fetch('http://localhost:5000/api/v1/announcements');
       const data = await response.json();
       console.log(data);
       setAnnouncements(data.message);
   }

    useEffect(() => {
        fetchAnnouncements();
    }
    , [])
  

  return (
    <>
        <Navbar />
        {sideBar}
        <main className={styles.main}>
          <HeaderTwo 
            text={t('announcements.title')}
            fontSize={'24px'}
            fontWeight={'700'}
            color={'#003679'}
            margin={'1rem 2rem'}
          />
          <div className={styles.announceCont}>

          {
            // map through the announcements and display them
             announcements.map((announcement, index) => {
                 return <Announcement key={index} title={announcement.title} desc={announcement.content} date={announcement.createdAt} />
             })
          }
          { /*
            <Announcement title={'Eryka 150'} date={'2024-05-06T18:50:31.000Z'} desc={'Hello eazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaze azeazeazeaze aze azeazeaze'}/>
            <Announcement title={'Eryka 150'} date={'2024-05-06T18:50:31.000Z'} desc={'Hello eazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaze azeazeazeaze aze azeazeaze'}/>
            <Announcement title={'Eryka 150'} date={'2024-05-06T18:50:31.000Z'} desc={'Hello eazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaze azeazeazeaze aze azeazeaze'}/>
            <Announcement title={'Eryka 150'} date={'2024-05-06T18:50:31.000Z'} desc={'Hello eazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaze azeazeazeaze aze azeazeaze'}/>
            <Announcement title={'Eryka 150'} date={'2024-05-06T18:50:31.000Z'} desc={'Hello eazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaze azeazeazeaze aze azeazeaze'}/>
            <Announcement title={'Eryka 150'} date={'2024-05-06T18:50:31.000Z'} desc={'Hello eazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaze azeazeazeaze aze azeazeaze'}/>
            <Announcement title={'Eryka 150'} date={'2024-05-06T18:50:31.000Z'} desc={'Hello eazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaze azeazeazeaze aze azeazeaze'}/>

           
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            */
          }
          </div>
        </main>
    </>
  )
}

export default Announcements;


