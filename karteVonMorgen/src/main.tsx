import React from 'react';
import App from './App';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

// Use createRoot from "react-dom/client" to render your app
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" component={App} exact />
                {/* Weitere Routen können hier hinzugefügt werden */}
            </IonRouterOutlet>
        </IonReactRouter>
    </React.StrictMode>
);
