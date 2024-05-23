import React from 'react'
import Announcements from './Announcements';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';

const CoodAnnouncements = () => {
  return (
    <>
        <Announcements sideBar={<CoodSidebar />} />
    </>
  )
}


export default CoodAnnouncements; 