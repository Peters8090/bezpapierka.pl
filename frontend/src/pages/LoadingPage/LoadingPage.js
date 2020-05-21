import {CircularProgress} from "@material-ui/core";
import React from "react";
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