import React from "react";
import { Paper, Grid } from "@material-ui/core";

const Footer = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Paper
        style={{
          background: "linear-gradient(45deg, #FDC830 30%, #F37335 90%)",
        }}
      >
        <Grid container justify="center">
          <Grid item xs={12}>
            <h4 style={{ color: "white" }} align="center">
              Made by Rajeev
            </h4>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Footer;

