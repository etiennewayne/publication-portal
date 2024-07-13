// import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PrimeReactProvider value={{ unstyled: false }}>
                <App {...props} /> 
            </PrimeReactProvider>
            
        );
    },
    progress: {
        color: '#4B5563',
    },
});
