import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './modules/App.jsx';
import { ThemeProvider } from './modules/shared/ui/ThemeProvider.jsx';
import { I18nProvider } from './modules/shared/i18n/I18nProvider.jsx';

createRoot(document.getElementById('root')).render(
	<I18nProvider>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</I18nProvider>
);
