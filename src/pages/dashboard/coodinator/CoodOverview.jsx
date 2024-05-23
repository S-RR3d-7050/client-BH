import React from 'react'
import styles from './styles.module.css'
//import supervisors from './supervisors.js'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo'
import Header from '../../../components/ELEMENTS/Header/Header'
import { Link } from 'react-router-dom'
import ApplicationsTable from './ApplicationsTable.jsx'
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar.jsx'
import Calendar from '../../../components/CONTAINERS/Calendar/Calendar.jsx'
import { useEffect, useState } from 'react'


export default function CoodOverview() {

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
        <div className={styles.overview}>
            <Header 
                text={'Overview'}
                fontSize={'20px'}
                fontWeight={'800'}
                color={'#003679'}
                margin={'1rem 1rem'}
            />
            <div className={styles.one}>
                <div className={styles.supes}>
                    <HeaderTwo 
                        text={'Supervisors'}
                        fontSize={'18px'}
                        fontWeight={'800'}
                        color={'#003679'}
                        margin={'0.5rem 0 1rem 1rem'}
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
                    <Link to={'/coordinator/view-all-supervisors'} className={styles.allSupesLink}>View all supervisors</Link>
                </div>
                <div className={styles.cal}>
                    <HeaderTwo 
                        text={'Calendar'}
                        fontSize={'18px'}
                        fontWeight={'800'}
                        color={'#003679'}
                        margin={'0.5rem 0 1rem 1rem'}
                    />
                    <Calendar />
                </div>
            </div>
            <div className={styles.two}>
                <ApplicationsTable />
            </div>

        </div>
    </>
  )
}
