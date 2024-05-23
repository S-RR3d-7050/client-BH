import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import Announcements from '../coordinator/Announcements';

const SuppAnnouncements = () => {

  const [t, i18n] = useTranslation('global')

  return (
    <>
      <Announcements sideBar={<SupeSidebar />} />
    </>
  )
}


export default SuppAnnouncements;