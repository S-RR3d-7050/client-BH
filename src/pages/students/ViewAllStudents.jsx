import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import CoodSidebar from '../../components/ELEMENTS/Nav/CoodSidebar';
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/ELEMENTS/Nav/Footer';


export default function ViewAllStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [t, i18n] = useTranslation('global');

  const fetchStudents = async () => {
    const response = await fetch('http://localhost:5000/api/v1/users/role/intern');
    const data = await response.json();
    setStudents(data.message);
    setFilteredStudents(data.message);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter(student => 
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students]);

  const displayStudents = filteredStudents.map((item, index) => 
    <tr key={index}>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.CIN}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
      <td>{item.role}</td>
    </tr>
  );

  return (
    <>
      <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
      <CoodSidebar />
      <section className={styles.main}>
        {/* ALL STUDENTS TABLE */}
        <HeaderTwo 
          text={t('nav.stu') + 's'}
          fontSize={'26px'}
          fontWeight={'800'}
          color={'#003679'}
          width={'100%'}
          margin={'1.5rem 1.5rem'}
        />
        <input 
          type="text"
          placeholder="Search by First Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchBar}
        />
        <table>
          <thead>
            <tr>
              <th>{t('profile.fname')}</th>
              <th>{t('profile.lname')}</th>
              <th>{t('profile.cin')}</th>
              <th>{t('profile.email')}</th>
              <th>{t('profile.adr')}</th>
              <th>{t('profile.r')}</th>
            </tr>
          </thead>
          <tbody>
            {displayStudents}
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
}
