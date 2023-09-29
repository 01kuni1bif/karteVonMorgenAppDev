import React from 'react';
import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
import { useIonViewDidEnter } from '@ionic/react';

const App: React.FC = () => {
    return (
        <div>
            <SearchBar />
            <MapContainer />
        </div>
    );
};

export default App;
