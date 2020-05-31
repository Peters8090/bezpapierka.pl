import React from "react";
import {CircularProgress} from "@material-ui/core";
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const LoadingPage = () => {
  const styles = {
    root: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: white;
    `,
  };

  return (
      <div css={styles.root}>
        <CircularProgress disableShrink css={css`color: black`}/>
      </div>
  );
};