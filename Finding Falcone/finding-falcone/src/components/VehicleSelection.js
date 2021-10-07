import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { increaseVehicle } from "../actions/update";

class VehicleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlanet: "",
      selectedVehicle: this.props.currentVehicle,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentVehicle !== this.state.selectedVehicle) {
      this.setState({ selectedVehicle: nextProps.currentVehicle });
    }
  }

  onPlanetSelect = (e) => {
    const { onPlanetChange, combination, resetAll } = this.props;
    if (this.state.selectedVehicle) {
      resetAll(combination);
    }
    onPlanetChange(e, combination);
    this.setState({ selectedPlanet: e.value });
  };

  onVehicleSelect = (e) => {
    const { onVehicleCountUpdate, combination } = this.props;
    const prevSelectedVehicle =
      this.state.selectedVehicle !== e.target.name
        ? this.state.selectedVehicle
        : null;

    if (e.target.checked) {
      this.setState(
        { selectdVehicle: e.target.name },
        onVehicleCountUpdate(
          e.target.name,
          e.target.checked,
          prevSelectedVehicle,
          combination
        )
      );
    } else {
      this.setState(
        { selectedVehicle: "" },
        onVehicleCountUpdate(
          e.target.name,
          e.target.checked,
          prevSelectedVehicle,
          combination
        )
      );
    }
  };

  checkDistancePossible = (vehicle) => {
    const selectedPlanetDetails = this.props.planets.filter(
      (planet) => planet.name === this.state.selectedPlanet
    );

    if (vehicle) {
      if (selectedPlanetDetails[0].distance > vehicle.max_distance) {
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    const { selectedPlanets, planets, vehicles, currentVehicle } = this.props;
    const { selectedPlanet, selectedVehicle } = this.state;
    const planetList = planets.filter(
      (planet) =>
        selectedPlanets &&
        selectedPlanets.length &&
        selectedPlanets.indexOf(planet.name) < 0
    ).length
      ? planets.filter(
          (planet) =>
            selectedPlanets &&
            selectedPlanets.length &&
            selectedPlanets.indexOf(planet.name) < 0
        )
      : planets;

    return (
      <div>
        <Select
          options={
            planetList &&
            planetList.map((planet) => ({
              value: planet.name,
              label: planet.name,
            }))
          }
          onChange={this.onPlanetSelect}
        />
        {selectedPlanet &&
          vehicles.map((vehicle) => (
            <div>
              <input
                type="checkbox"
                name={vehicle && vehicle.name}
                disabled={
                  this.checkDistancePossible(vehicle) ||
                  (!this.checked &&
                    !vehicle.total_no &&
                    selectedVehicle !== vehicle.name)
                }
                checked={
                  currentVehicle !== "" && selectedVehicle === vehicle.name
                }
                onChange={this.onVehicleSelect}
              />
              <label>
                {vehicle.name}({vehicle.total_no})
              </label>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  planets: state.main.planets,
  vehicles: state.main.vehicles,
});

export default connect(mapStateToProps, { increaseVehicle })(VehicleSelection);
