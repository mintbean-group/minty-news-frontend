import React, { Component } from "react";
import "./App.css";

class Footer extends Component {

  render() {
    return (
      <footer>
        <div className="wrapper">
          <div className="mintyLinks">
            <h3>Links</h3>
            <div>
              <a href="https://www.youtube.com/channel/UCg8dJs-WeArbtwjp1kpFaXw/">
                Take a Tour
              </a>
              <a href="https://github.com/mintbean-group/Merge">
                View the Code
              </a>
            </div>
          </div>
          <div className="mintyCreators">
            <div className="mintyTeams">
              <div>
                <h3> Front End Team</h3>
                <a href="https://www.kaystocks.com/"> Kay Evans-Stocks</a>
                <a href="https://kneestoosharp.com/"> Jim Wang </a>
              </div>
              <div>
                <h3> Back End Team </h3>
                <a href="https://aniapienio.com"> Ania Pienio </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
