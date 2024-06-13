import React from "react";
import './Description.css'

function Description() {
  return (
    <div className="Description">
      <h1>HomeSensors</h1>
      <h2>Выпускная квалификационная работа</h2>

      <div className="DescriptionBody">
        <p>HomeSensors это приложение для администрирования домашних систем сбора данных</p>
        <p>Приложение выполнено для дипломного проекта</p>

        <div className="GitHub">
          
          <h3>GitHub:</h3>
          <ul>
            <li><a href="https://github.com/GSimakov/home-sensors-build">Сборка</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-configuration-server">Сервис конфигураций</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-measurements-server">Сервис измерений</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-client">Пользовательский интерфейс</a></li>
            <li><a href="https://github.com/GSimakov/home-sensors-board">Программное обеспечение платы</a></li>
          </ul>
        </div>

        <div className="DockerHub">
          
          <h3>DockerHub:</h3>
          <ul>
            <li><a href="https://hub.docker.com/r/goshasimakov/home-sensors-client/tags">Пользовательский интерфейс</a></li>
            <li><a href="https://hub.docker.com/r/goshasimakov/home-sensors-data/tags">Сервис измерений</a></li>
            <li><a href="https://hub.docker.com/r/goshasimakov/home-sensors-configuration/tags">Сервис конфигураций</a></li>
          </ul>
        </div>

      </div>
      

      <div className="Author">
        <h3>Автор</h3>
        <p>Симаков Георгий</p>
        <p>УрТИСИ СибГУТИ</p>
        <p>2024</p>


      </div>




        

      
      
      
      
    </div>
  );
}
export default Description;