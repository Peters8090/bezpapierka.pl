import React from "react";

export const AppContext = React.createContext({
    pages: [
        {
            component: null,
            link: '',
            name: '',
            icon: null,
        }
    ],
    offers: [
        {
            title: '',
            description: '',
            image: '',
            author: '',
            rating: 0,
        }
    ],
});