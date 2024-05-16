import React from "react";
import './Description.css'

function Description() {
  return (
    <div className="Description">
      <h1>HOME SENSORS</h1>
      <h2>graduation project</h2>

      <div className="DescriptionBody">
        <p>HomeSensors is a service used for managing and administering home
          data acquisition systems.</p>
        <p>The service was developed as graduation project</p>

        <div className="GitHub">
          
          <h3>GitHub:</h3>
          <ul>
            <li><a href="https://github.com/GSimakov/home-sensors-build">Build</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-configuration-server">Configuration Server</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-measurements-server">Measurements Server</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-client">User Interface</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-board">Board Software</a></li>
          </ul>
        </div>

        <div className="DockerHub">
          
          <h3>DockerHub:</h3>
          <ul>
            <li><a href="https://hub.docker.com/r/goshasimakov/home-sensors-client/tags">User Interface</a></li>
            <li><a href="https://hub.docker.com/r/goshasimakov/home-sensors-data/tags">Measurements Server</a></li>
            <li><a href="https://hub.docker.com/r/goshasimakov/home-sensors-configuration/tags">Configuration Server</a></li>
          </ul>
        </div>

      </div>
      

      <div className="Author">
        <h3>Author</h3>
        <p>Simakov Georgiy</p>
        <p>UISI</p>
        <p>2024</p>


      </div>




        

      
      
      
      
    </div>
  );
}
export default Description;