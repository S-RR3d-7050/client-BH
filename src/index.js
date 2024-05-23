import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import global_en from "../src/components/translation/en/global.json";
import global_tr from "../src/components/translation/tr/global.json";
import global_fr from "../src/components/translation/fr/global.json";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


i18next.use(HttpApi).init({
	interpolation: { escapeValue: false },
	lng: "en",
	fallbackLng: "en",
	resources: {
		en: {
			global: global_en,
		},
		tr: {
			global: global_tr,
		},
		fr: {
			global: global_fr,
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
		<I18nextProvider i18n={i18next}>
			<App />
		</I18nextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
