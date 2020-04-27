import NoSsr from "@material-ui/core/NoSsr";
import React, {useContext} from 'react';

/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {useTheme} from "@material-ui/core";

export const WaveBorder = props => {
    const theme = useTheme();

    const styles = {
        root: {
            width: '100%',
            marginTop: `${theme.misc.headerHeight}`,
            minHeight: `calc(${theme.misc.waveBorderHeight} - 4px)`,
            maxHeight: `calc(${theme.misc.waveBorderHeight} - 4px)`,
            transform: 'translateY(4px)',
        },
        parallax: css`
            use {
              @keyframes move-forever {
                0% {
                  transform: translate3d(-90px, 0, 0);
                }
                100% {
                  transform: translate3d(85px, 0, 0);
                }
              }
              
              animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
              
              &:nth-of-type(1) {
                animation-delay: -2s;
                animation-duration: 7s;
              }
              &:nth-of-type(2) {
                animation-delay: -3s;
                animation-duration: 10s;
              }
              &:nth-of-type(3) {
                animation-delay: -4s;
                animation-duration: 13s;
              }
              &:nth-of-type(4) {
                animation-delay: -5s;
                animation-duration: 20s;
              }
            }
        `
    };

    return (
        <svg style={styles.root}
             viewBox="0 24 150 28"
             preserveAspectRatio="none">
            <defs>
                <path id="gentle-wave"
                      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
            </defs>
            <g css={styles.parallax}>
                <use href="#gentle-wave"
                     x="48"
                     y="0"
                     fill="rgba(255,255,255,0.7"/>
                <use href="#gentle-wave"
                     x="48"
                     y="3"
                     fill="rgba(255,255,255,0.5)"/>
                <use href="#gentle-wave"
                     x="48"
                     y="5"
                     fill="rgba(255,255,255,0.3)"/>
                <use href="#gentle-wave"
                     x="48"
                     y="7"
                     fill="#fff"/>
            </g>
        </svg>
    );
};