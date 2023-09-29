import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" component={App} exact />
                {/* Weitere Routen können hier hinzugefügt werden */}
            </IonRouterOutlet>
        </IonReactRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
