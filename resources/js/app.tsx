// import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ConfigProvider } from 'antd';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider
            theme={{
                components: {
                    Input: {
                        activeBorderColor: "#06750b"
                    },

                    Button: {
                        defaultBg: '#244a3d',
                        defaultActiveBg: '#3d8069', //color when hover after click
                        defaultHoverBorderColor: '#244a3d',
                        defaultHoverColor: 'white', //Text color of default button when hover
                        linkHoverBg: '#244a3d', //Background color of link button when hover
                        defaultHoverBg: '#1b382e', //Background color of default button when hover

                        defaultActiveBorderColor: '#244a3d',
                        defaultGhostBorderColor: '#244a3d',
                        textHoverBg: 'white', //	Background color of text button when hover
                        primaryColor: '#244a3d',
                        defaultColor: 'white'
                    }
                },
                token: {
                    // Seed Token
                    colorPrimary: '#d9dcdb',
                    borderRadius: 2,
                  
            
                    // Alias Token
                    colorBgContainer: '#ffff',
                },
              }}>
                <App {...props} /> 
            </ConfigProvider>
           
        );
    },
    progress: {
        color: '#4B5563',
    },
});
