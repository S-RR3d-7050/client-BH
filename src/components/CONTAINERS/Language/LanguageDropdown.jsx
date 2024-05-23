import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = ({ handleChange }) => {

    const [t, i18n] = useTranslation('global');
    
 return (
    <select name="language" id="language" onChange={handleChange}>
      <option value="en">{t("nav.en")}</option>
      <option value="tr">{t("nav.tr")}</option>
      <option value="fr">{t("nav.fr")}</option>
    </select>
 );
};

export default LanguageDropdown;
