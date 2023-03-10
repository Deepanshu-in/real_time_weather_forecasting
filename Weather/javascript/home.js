const input = document.getElementById("text");
input.addEventListener('click',(e)=>{
        if(e.length === 0){
            alert("fsdf");
        }else{
            getData();
            input = "";
        }
        e.defaultPrevented();
    });
function getData() {
    var city = input.value;
    let queryUrl2 = "http://api.openweathermap.org/geo/1.0/direct?";
    let loc = "q=" + `${city}` + "&";
    let limit = "limit=10&";
    let apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
    let coordinates = queryUrl2 + loc + limit + apiKey;
    const getIP = async () => {
        let latt, name_city, longi;
        await fetch(coordinates)
            .then((response) => response.json())
            .then((geo) => {
                name_city = geo[0].name;
                longi = geo[0].lon;
                latt = geo[0].lat;
            });
        let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
        let latitude = "lat=" + latt + "&";
        let longitude = "lon=" + longi + "&";
        let apiOptions = "units=metric&exclude=minutely,alerts&";
        let file = queryUrl + latitude + longitude + apiOptions + apiKey;

        fetch(file)
            .then((response) => response.json())
            .then((data) => {
                // Weather main data
                let main = data.current.weather[0].main;
                let description = data.current.weather[0].description;
                let temp = Math.round(data.current.temp);
                let pressure = data.current.pressure;
                let humidity = data.current.humidity;
                let name = name_city;


                document.getElementById("wrapper-description").innerHTML = description;
                document.getElementById("wrapper-temp").innerHTML = temp + "°C";
                document.getElementById("wrapper-pressure").innerHTML = pressure;
                document.getElementById("wrapper-humidity").innerHTML = humidity + "°C";
                document.getElementById("wrapper-name").innerHTML = name;

                // Weather hourly data
                let hourNow = data.hourly[0].temp;
                let hour1 = data.hourly[1].temp;
                let hour2 = data.hourly[2].temp;
                let hour3 = data.hourly[3].temp;
                let hour4 = data.hourly[4].temp;
                let hour5 = data.hourly[5].temp;

                document.getElementById("wrapper-hour-now").innerHTML = hourNow + "°";
                document.getElementById("wrapper-hour1").innerHTML = hour1 + "°";
                document.getElementById("wrapper-hour2").innerHTML = hour2 + "°";
                document.getElementById("wrapper-hour3").innerHTML = hour3 + "°";
                document.getElementById("wrapper-hour4").innerHTML = hour4 + "°";
                document.getElementById("wrapper-hour5").innerHTML = hour5 + "°";

                // Time
                let timeNow = new Date().getHours();
                let time1 = timeNow + 1;
                let time2 = time1 + 1;
                let time3 = time2 + 1;
                let time4 = time3 + 1;
                let time5 = time4 + 1;

                document.getElementById("wrapper-time1").innerHTML = time1;
                document.getElementById("wrapper-time2").innerHTML = time2;
                document.getElementById("wrapper-time3").innerHTML = time3;
                document.getElementById("wrapper-time4").innerHTML = time4;
                document.getElementById("wrapper-time5").innerHTML = time5;

                // Weather daily data
                let tomorrowTemp = Math.round(data.daily[0].temp.day);
                let dATTemp = Math.round(data.daily[1].temp.day);
                let tomorrowMain = data.daily[0].weather[0].main;
                let dATTempMain = data.daily[1].weather[0].main;

                document.getElementById("wrapper-forecast-temp-today").innerHTML =
                    temp + "°";
                document.getElementById("wrapper-forecast-temp-tomorrow").innerHTML =
                    tomorrowTemp + "°";
                document.getElementById("wrapper-forecast-temp-dAT").innerHTML =
                    dATTemp + "°";

                // Icons
                let iconBaseUrl = "http://openweathermap.org/img/wn/";
                let iconFormat = ".webp";

                // Today
                let iconCodeToday = data.current.weather[0].icon;
                let iconFullyUrlToday = iconBaseUrl + iconCodeToday + iconFormat;
                document.getElementById("wrapper-icon-today").src = iconFullyUrlToday;

                // Tomorrow
                let iconCodeTomorrow = data.daily[0].weather[0].icon;
                let iconFullyUrlTomorrow = iconBaseUrl + iconCodeTomorrow + iconFormat;
                document.getElementById(
                    "wrapper-icon-tomorrow"
                ).src = iconFullyUrlTomorrow;

                // Day after tomorrow
                let iconCodeDAT = data.daily[1].weather[0].icon;
                let iconFullyUrlDAT = iconBaseUrl + iconCodeDAT + iconFormat;
                document.getElementById("wrapper-icon-dAT").src = iconFullyUrlDAT;

                // Icons hourly

                // Hour now
                let iconHourNow = data.hourly[0].weather[0].icon;
                let iconFullyUrlHourNow = iconBaseUrl + iconHourNow + iconFormat;
                document.getElementById(
                    "wrapper-icon-hour-now"
                ).src = iconFullyUrlHourNow;

                // Hour1
                let iconHour1 = data.hourly[1].weather[0].icon;
                let iconFullyUrlHour1 = iconBaseUrl + iconHour1 + iconFormat;
                document.getElementById("wrapper-icon-hour1").src = iconFullyUrlHour1;

                // Hour2
                let iconHour2 = data.hourly[2].weather[0].icon;
                let iconFullyUrlHour2 = iconBaseUrl + iconHour2 + iconFormat;
                document.getElementById("wrapper-icon-hour2").src = iconFullyUrlHour1;

                // Hour3
                let iconHour3 = data.hourly[3].weather[0].icon;
                let iconFullyUrlHour3 = iconBaseUrl + iconHour3 + iconFormat;
                document.getElementById("wrapper-icon-hour3").src = iconFullyUrlHour3;

                // Hour4
                let iconHour4 = data.hourly[4].weather[0].icon;
                let iconFullyUrlHour4 = iconBaseUrl + iconHour4 + iconFormat;
                document.getElementById("wrapper-icon-hour4").src = iconFullyUrlHour4;

                // Hour5
                let iconHour5 = data.hourly[5].weather[0].icon;
                let iconFullyUrlHour5 = iconBaseUrl + iconHour5 + iconFormat;
                document.getElementById("wrapper-icon-hour5").src = iconFullyUrlHour5;  
                // Backgrounds
                switch (main) {
                    case "Snow":
                        document.getElementById("wrapper-bg").style.backgroundImage =
                            "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
                        break;
                    case "Clouds":
                        document.getElementById("wrapper-bg").style.backgroundImage =
                            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
                        break;
                    case "Fog":
                        document.getElementById("wrapper-bg").style.backgroundImage =
                            "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
                        break;
                    case "Rain":
                        document.getElementById("wrapper-bg").style.backgroundImage =
                            "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
                        break;
                    case "Clear":
                        document.getElementById("wrapper-bg").style.backgroundImage =
                            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
                        break;
                    case "Thunderstorm":
                        document.getElementById("wrapper-bg").style.backgroundImage =
                            "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
                        break;
                    default:
                        document.getElementById("wrapper-bg").style.backgroundImage =
                            "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
                        break;
                }
            });
    };
    getIP();
}