import React from "react";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";

import { handleErrors } from "../actions/handleError";

class Error extends React.Component {
  handleSnackClose = () => {
    this.props.handleErrors("");
  };

  render() {
    const { isError, errorMessage } = this.props;
    return (
      <div>
        <Snackbar open={isError} message={<span>{errorMessage}</span>} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isError: state.errorReducer.isError,
  errorMessage: state.errorReducer.errorMessage,
});

export default connect(mapStateToProps, { handleErrors })(Error);
