import React from "react";

export const PagesContext = React.createContext([
    {
        id: 0,
        component: null,
        exact: true,
        link: '',
        title: '',
        description: '',
        icon: null,
        misc: {

        },
    },
]);