import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import Announcements from '../coordinator/Announcements';

const StudAnnouncements = () => {

  const [t, i18n] = useTranslation('global')

  return (
    <>
      <Announcements sideBar={<SideBar />} />
    </>
  )
}


export default StudAnnouncements;