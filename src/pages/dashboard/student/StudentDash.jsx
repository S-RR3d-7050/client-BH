import React from 'react';
import styles from './styles.module.css';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import Footer from '../../../components/ELEMENTS/Nav/Footer';
import Image from '../../../components/ELEMENTS/Image/Image';
import Resource from '../../../components/CONTAINERS/Resource Library/Resource';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import Calendar from '../../../components/CONTAINERS/Calendar/Calendar';
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';
import Slider from 'react-slick';

const StudentDash = () => {
  const [t] = useTranslation('global');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.dash}>
      <Navbar user={'test'} type={'role'} />
      <SideBar />

      <section className={styles.welcome}>
        <Header text={t('welcome.title')} fontSize={'20px'} fontWeight={'700'} color={'#103561'} margin={'1rem 1.2rem'} />
        <Paragraph text={t('welcome.text')} color={'#003679'} width={'90%'} />
      </section>

      <section className={styles.resource}>
        <Header text={t('resLibrary.title')} fontSize={'20px'} fontWeight={'700'} color={'#103561'} margin={'1rem 1.2rem'} />
        
        {
          
        <Slider {...settings}>
          <Res />
          <Res />
          <Res />
        </Slider>
      
        }
      
        
        {
          /*
            <Res />
     <section className={styles.resourceCont}>
        <Resource />
        <Resource />
        <Resource />
        
        </section>
         */
        }
   
      </section>

      <section className={styles.trackerCont}>
        <section className={styles.tracker}>
          <Header 
            text={t('docManager.title')} 
            fontSize={'20px'} 
            fontWeight={'700'} 
            color={'#103561'} 
            margin={'1rem 1.2rem'} 
            textAlign={'left'}
            width={'90%'}
          /> 
          <section className={styles.performance}>
          {
            /*
             <Paragraph 
              text={'Document manager empty. Documents will be appear here when uploaded by coordinator or supervisor'}
              color={'#003679'}
              width={'90%'}
            />
            */
          }
          <Slider {...settings}>
      <ImageCont />
      
        </Slider>
           
          </section>
        </section>
        <section className={styles.calendarcont}>
          <Header 
            text={t('calendar.cal')} 
            fontSize={'20px'} 
            fontWeight={'700'} 
            color={'#103561'} 
            margin={'1rem 1.2rem'} 
          /> 
          <section className={styles.calendar}>
            <Calendar />
          </section>
        </section>
      </section>
      <Footer />
    </div>
  );
};

const Res = () => {
  return (
    <section className={styles.resourceCont}>
      <Resource />
      <Resource />
      <Resource />
    </section>
  );
}

const ImageCont = () => {
  return (
    <>
      <Image src={'../../../assets/BH/1.jpg'} style={styles.Image}/>
      <Image src={'../../../assets/BH/2.jpg'} style={styles.Image}/>
      <Image src={'../../../assets/BH/3.jpg'} style={styles.Image}/>
      <Image src={'../../../assets/BH/4.jpg'} style={styles.Image}/>
      <Image src={'../../../assets/BH/5.jpg'} style={styles.Image}/>
    </>
  );
}

export default StudentDash;
