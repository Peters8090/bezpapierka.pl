import React from "react";

export const AppContext = React.createContext({
    pages: [
        {
            id: 0,
            component: null,
            exact: true,
            link: '',
            name: '',
            icon: null,
            misc: {

            }
        },
    ],
    offers: [
        {
            id: 0,
            title: '',
            slug: '',
            description: '',
            image: '',
            author: '',
            rating: 0,
            steps: [
                {
                    name: '',
                    description: '',
                },
            ],
        },
    ],
});
