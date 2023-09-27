import React, { useState } from 'react';

import useEventsVerbose from '../hooks/useEventsVerbose';
// import SearchBar from '../components/searchbar';

const Tab3: React.FC = () => {
    const [filterText, setFilterText] = useState('');
    const data = useEventsVerbose();

    let filteredEvents: any[] = [];

    if (data && data.length > 0) {
        filteredEvents = data.filter((item: {
            title: string;
            description: string;
            street: string;
            zip: string;
            city: string;
            country: string;
            email: string;
            telephone: string;
            homepage: string;
            tags: any[];
            organizer: string;
        }) => {
            const searchQuery = filterText.toLowerCase();
            return (
                item.title.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery) ||
                item.street.toLowerCase().includes(searchQuery) ||
                item.zip.toLowerCase().includes(searchQuery) ||
                item.city.toLowerCase().includes(searchQuery) ||
                item.country.toLowerCase().includes(searchQuery) ||
                item.email.toLowerCase().includes(searchQuery) ||
                item.telephone.toLowerCase().includes(searchQuery) ||
                item.homepage.toLowerCase().includes(searchQuery) ||
                item.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
                item.organizer.toLowerCase().includes(searchQuery)
            );
        });
    }

    return (
        <div style={{ overflowY: 'auto', height: '100vh' }}>
            <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
            {filteredEvents.map((event) => (
                <div key={event.id}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Lat: {event.lat}</p>
                    <p>Lng: {event.lng}</p>
                    <p>Street: {event.street}</p>
                    <p>PLZ: {event.zip}</p>
                    <p>Stadt: {event.city}</p>
                    <p>Land: {event.country}</p>
                    <p>E-Mail: {event.email}</p>
                    <p>Telefon: {event.telephone}</p>
                    <p>Homepage: <a href={event.homepage}>{event.homepage}</a></p>
                    <p>Tags: {event.tags.join(', ')}</p>
                    <p>Organizer: {event.organizer}</p>
                </div>
            ))}
        </div>
    );
};

export default Tab3;
