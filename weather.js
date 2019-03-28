class Weather {
    constructor(){
        this.tempFlagF = true;
        this.temp = {};
        this.tempF = null;
        this.tempC = null;
        this.response = null;

        this.handleWeatherDataSuccess = this.handleWeatherDataSuccess.bind(this);
        this.handleWeatherDataError = this.handleWeatherDataError.bind(this);
        this.handleTemperature = this.handleTemperature.bind(this);
        this.clickCallBack = this.clickCallBack.bind(this);

        this.handleWeatherData();
        this.handleClick();
    }

    handleClick(){
        $(".temp").on("click", this.clickCallBack);
    }
    
    handleWeatherData(){
        $.ajax({
            url: "darksky.php",
            dataType: "json",
            method: "get",
            success: this.handleWeatherDataSuccess,
            error: this.handleWeatherDataError
        });
    }

    handleTemperature (response) {
        console.log(this);
        var apparentTempF = response.currently.apparentTemperature; //is in Farenheight
        this.temp.fahrenheit = response.currently.apparentTemperature;
        this.temp.celcius = ((response.currently.apparentTemperature - 32)*(5/9)).toFixed(2);

        this.tempF = "Temperature: "+apparentTempF+" \xB0F";
        
        var apparentTempC = (apparentTempF - 32)*(5/9);
        this.tempC = "Temperature: "+apparentTempC.toFixed(2)+ " \xB0C";
        
        //tempArray.push(tempF, tempC);
        $(".temp").append(this.tempC);
    }

    clickCallBack() {
        if (this.tempFlagF === true) {
            this.tempFlagF = false;
            $(".temp").empty();
            $(".temp").append(this.tempF);
        } else {
            this.tempFlagF = true;
            $(".temp").empty();
            $(".temp").append(this.tempC);
        }
    }

    handleWeatherDataSuccess (response) {
        weather = response;
        this.response = response;
        this.handleTemperature(response);

        var icon = response.currently.icon;
        var unixTimestamp = response.currently.time;
        var currentSummary = response.currently.summary;
        
        var unixTime = new Date(unixTimestamp*1000);
        var day = unixTime.toDateString();
        var hour = unixTime.getHours();
        var minutes = unixTime.getMinutes();
        var currentTime = new Date().toLocaleTimeString();
        var currentTime = `Current Time: ${hour}:${minutes}`
        var currentDate = `${day}`

        //Appending to div
        
        var weatherSituation = $(".weatherSituation").attr("id", icon);
        var time = $(".time").append(currentTime);
        var date = $(".date").append(currentDate).css("font-weight","bold");
        var summary = $(".summary").append(currentSummary);

        var icons = new Skycons();
        var list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
        ];

        for (var i = list.length; i--; ) {
            icons.set(list[i], list[i]);
            icons.play();
        }

    }
    
    handleWeatherDataError(response){
        console.log(response);
    }
}

