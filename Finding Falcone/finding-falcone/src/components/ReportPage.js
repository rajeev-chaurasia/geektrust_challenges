import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { Grid, Paper, withStyles } from "@material-ui/core";

const styles = () => ({
  root: {
    height: "inherit",
    overflow: "auto",
  },
});

class ReportPage extends React.Component {
  render() {
    const { classes, totalTime, planetFound, searchStatus, token } = this.props;
    return (
      <div style={{ height: "inherit", marginTop: "20px" }}>
        {token !== "" ? (
          <Paper
            className={classes.root}
            style={{
              background: "linear-gradient(45deg, #FDC830 30%, #F37335 90%)",
            }}
          >
            {searchStatus === "success" ? (
              <Grid container justify="center">
                <Grid item xs={12}>
                  <h2 style={{ color: "white" }} align="center">
                    Success! Congratulations on Finding Falcone! King Shan is
                    mighty pleased!
                  </h2>
                </Grid>
                <Grid item xs={12}>
                  <h3 style={{ color: "white" }} align="center">
                    Time Taken : {totalTime}
                  </h3>
                </Grid>
                <Grid item xs={12}>
                  <h3 style={{ color: "white" }} align="center">
                    Planet found : {planetFound}
                  </h3>
                </Grid>
              </Grid>
            ) : (
              <Grid container justify="center">
                <Grid item xs={12}>
                  <h2 style={{ color: "white" }} align="center">
                    Failure! Unable to locate Falcone!
                  </h2>
                </Grid>
              </Grid>
            )}
            <Grid container justify="center">
              <Grid item xs={12}>
                <h2 style={{ color: "white" }} align="center">
                  <Link to="/">Try another search</Link>
                </h2>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          this.props.history.push("/")
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  totalTime: state.timeReducer.totalSearchTime,
  planetFound: state.main.findFalconeResult.planet_name,
  searchStatus: state.main.findFalconeResult.status,
});

export default connect(mapStateToProps)(
  compose(withStyles(styles), withRouter)(ReportPage)
);
