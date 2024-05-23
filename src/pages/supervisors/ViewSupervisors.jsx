import React from 'react'
import supervisors from './supervisors'
import styles from './styles.module.css'
import CoodSidebar from '../../components/ELEMENTS/Nav/CoodSidebar';
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'


const ViewSupervisors = () => {

  const [t, i18n] = useTranslation('global');
  const [supervisors, setSupervisors] = useState([])
  const fetchSupervisors = async () => {
      const response = await fetch('http://localhost:5000/api/v1/users/role/encadrant')
      const data = await response.json()
      setSupervisors(data.message)
  }

  useEffect(() => {
      fetchSupervisors()
  }
  , [])



  const displaySupervisors = supervisors.map((item, index) => 
          <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.CIN}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>+216 98 695 587</td>
              <td>BH IT Dep</td>
          </tr>
      )
  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
          <HeaderTwo 
                text={t('nav.supe') + 's'}
                fontSize={'26px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
          <table>
            <thead>
              <tr>
              <th>First Name</th>
                                <th>Last Name</th>
                                <th>CIN</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Dep</th>
              </tr>
            </thead>
            <tbody>
              {displaySupervisors}
            </tbody>
          </table>
          <Link to={'/coordinator/createsupervisor'} className={styles.addSupe}>{`${t('main.add')} ${t('nav.supe')}`}</Link>

        </section>
    </>
  )
}


export default ViewSupervisors;