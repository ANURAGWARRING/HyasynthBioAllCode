function lookupInformation(a_mainData, a_systemData, a_sensorData, a_actuatorData, a_controlData)
{
    var doneInitCallback;
    var data = a_mainData;
    var sysData = a_systemData;
    var senData = a_sensorData;
    var actData = a_actuatorData;
    var ctrData = a_controlData;
    var callbacks = {};

    this.init = function(a_func)
    {
        doneInitCallback = a_func;
        // data.addCallback([0, 0, 3], initCallback);
        callbacks["init"] = data.registerCallback(initCallback)

        data.updateData([0, 68])//hardwareRev
        data.updateData([1, 0]); // Default names for creating tabs
        data.updateData([1, 1]); // Default names for creating tabs
        data.updateData([2, 0]); // Default names for creating tabs
        data.updateData([2, 1]); // Default names for creating tabs

        // data.updateData([0, 0, 3]);
        data.updateData(callbacks["init"].address);
    };

    var initCallback = function()
    {
        // data.removeCallback([0, 0, 3], initCallback);
        data.remCallback(callbacks["init"]);
        delete callbacks["init"];

        fillActuatorIndex();
        fillSensorIndex();

        // for(var i = 0; i < senData.getSensorCount(); i++)
        // {
        //     data.addCallback([1, 1, i], fillSensorIndex);
        // }
        //
        // for(var i = 0; i < actData.getActuatorCount(); i++)
        // {
        //     data.addCallback([2, 1, i], fillActuatorIndex);
        // }


        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }
    };

    this.toExpo = function(a_number, a_decimals)
    {
        var epxoThreshold = 10000;
        var value = Number(a_number);

        if(value >= epxoThreshold || value <= (epxoThreshold * -1))
        {

            return value.toExponential(a_decimals);
        }
        else
        {
            return a_number;
        }
    };

    this.hasActuators = function(a_sensorId)
    {
        if( (a_sensorId >= 0) && (a_sensorId < senData.getSensorCount()) )
        {
            //Check all the actuators if they are connected to the sensor
            for(var acts = 0; acts < actData.getActuatorCount(); ++acts)
            {
                if(actData.assigned(acts).num == a_sensorId)
                {
                    return true;
                }
            }
        }
        return false;
    };

    this.isInLoop = function(a_sensorId)
    {
        if( (a_sensorId >= 0) && (a_sensorId < senData.getSensorCount()) )
        {
            //Check al the sensors for the assigned sensor
            for(var sens = 0; sens < senData.getSensorCount(); ++sens)
            {
                if(senData.assigned(sens).num == a_sensorId)
                {
                    return true;
                }
            }
        }
        return false;
    };

    this.hasCustomSensorSettings = function(a_sensor)
    {
        switch(a_sensor)
        {
            // case 1: // dO
            // case 3: // level 1
            // case 4: // level 2
            case 14: // Presens pH
            case 15: // presense DO
            case 16: // polestart pH
            case 17: // polestar DO
            case 18: // balance 1
            case 19: // balance 2
            case 20: // balance 3
            case 21: // balance 4
            case 22: // futura
            case 33: // Buglab BE2000
            case 34: // Lumisens
            case 35: // Hamilton DO
            case 36: // Hamilton pH
            case 53: // Buglab BE3000
            case 54: // futura conductivity
            case 57: // ph mettler
            case 58: // do2 mettler
            case 59: // co2 mettler
            {
                return true;
            }
            break;
            default:
            {
                return false;
            }
            break;
        }
    };

    this.hasCustomActuatorSettings = function(a_actuator)
    {
        switch(a_actuator)
        {
            case 18: // stirrer
            {
                var hardwareRevMain = Number(sysData.hardwareRev().str.split(".")[0]);
                if( actData.stirrerType(a_actuator).num == 9 || hardwareRevMain >= 2)
                {
                    return true;
                }
            }
            break;
            case 37:
            {
                return true;
            }
            break;
            default:
            {
                return false;
            }
            break;
        }
    };

    this.hasRawCalibrationValues = function(a_sensor)
    {
        switch(a_sensor)
        {
            case 0: // pH
            case 1: // dO
            case 5: // Intentional fallthrough
            case 6: // Intentional fallthrough
            case 7: // Intentional fallthrough
            case 8: // Intentional fallthrough
            case 9: // Intentional fallthrough
            case 10:// Intentional fallthrough
            case 11:// Intentional fallthrough
            case 12:// Intentional fallthrough
            case 37:// Intentional fallthrough
            case 38:// Intentional fallthrough
            case 39:// Intentional fallthrough
            case 40:// Intentional fallthrough
            case 41:// Intentional fallthrough
            case 42:// Intentional fallthrough
            case 43:// Intentional fallthrough
            case 44:// Analog inputs
            {
                return true;
            }
            break;
            default:
            {
                return false;
            }
            break;
        }
    };

    this.hasRawSlopeAndOffset = function(a_sensor)
    {
        switch(a_sensor)
        {
            case 0: // pH
            case 1: // dO
            {
                return true;
            }
            break;
            default:
            {
                return false;
            }
            break;
        }
    };

    this.rawSlopeUnits = function(a_sensor)
    {
        switch(a_sensor)
        {
            case 0:
            { // pH
                return 'mV/pH';
            }
            break;
            case 1:
            { // dO
                return 'nA';
            }
            break;
            case 5:     // Intentional fallthrough
            case 6:     // Intentional fallthrough
            case 7:     // Intentional fallthrough
            case 8:     // Intentional fallthrough
            case 9:     // Intentional fallthrough
            case 10:    // Intentional fallthrough
            case 11:    // Intentional fallthrough
            case 12:    // Intentional fallthrough
            case 37:    // Intentional fallthrough
            case 38:    // Intentional fallthrough
            case 39:    // Intentional fallthrough
            case 40:    // Intentional fallthrough
            case 41:    // Intentional fallthrough
            case 42:    // Intentional fallthrough
            case 43:    // Intentional fallthrough
            case 44:
            {   // Analog in 1 - 8 & 9 - 16
                return 'V';
            }
            break;
            default:
            {
                return '';
            }
        }
    };

    this.rawOffsetUnits = function(a_sensor)
    {
        switch(a_sensor)
        {
            case 0:
            { // pH
                return 'mV';
            }
            break;
            case 1:
            { // dO
                return 'nA';
            }
            break;
            case 5:     // Intentional fallthrough
            case 6:     // Intentional fallthrough
            case 7:     // Intentional fallthrough
            case 8:     // Intentional fallthrough
            case 9:     // Intentional fallthrough
            case 10:    // Intentional fallthrough
            case 11:    // Intentional fallthrough
            case 12:    // Intentional fallthrough
            case 37:    // Intentional fallthrough
            case 38:    // Intentional fallthrough
            case 39:    // Intentional fallthrough
            case 40:    // Intentional fallthrough
            case 41:    // Intentional fallthrough
            case 42:    // Intentional fallthrough
            case 43:    // Intentional fallthrough
            case 44:
            {   // Analog in 1 - 8 & 9 - 16
                return 'V';
            }
            break;
            default:
            {
                return '';
            }
        }
    };

    this.segmentType = function(a_type)
    {
        switch(Number(a_type))
        {
            case 0:
            {
                return "None";
            }
            break;
            case 1:
            {
                return "Constant";
            }
            break;
            case 2:
            {
                return "Linear";
            }
            break;
            case 3:
            {
                return "Exponential";
            }
            break;
            case 4:
            {
                return "Logarithmic";
            }
            break;
            case 5:
            {
                return "Growth Rate";
            }
            break;
        }
    };

    this.getTimeUnit = function(a_timeBaseEnum)
    {
        var timeUnit = "";
        switch(Number(a_timeBaseEnum))
        {
            case 0:
            {
                timeUnit = "s";
            }
            break;
            case 1:
            {
                timeUnit = "min";
            }
            break;
            case 2:
            {
                timeUnit = "h";
            }
            break;
        }
        return timeUnit;
    }

    this.getMassUnit = function(a_massBaseEnum)
    {
        var massUnit = "";
        switch(Number(a_massBaseEnum))
        {
            case 0:
            {
                massUnit = "mg";
            }
            break;
            case 1:
            {
                massUnit = "g";
            }
            break;
            case 2:
            {
                massUnit = "kg";
            }
            break;
        }
        return massUnit;
    };

    var actuatorNames = new Array();
    this.getActuatorId = function(a_actuatorName)
    {
        return actuatorNames.indexOf(a_actuatorName);
    };

    const fillActuatorIndex = function()
    {
        actuatorNames = new Array();
        for(var i = 0; i < actData.getActuatorCount(); i++)
        {
            actuatorNames.push(actData.defaultName(i).str);
        }
    };

    var sensorNames = new Array();
    this.getSensorId = function(a_sensorName)
    {
        return sensorNames.indexOf(a_sensorName);
    };

    const fillSensorIndex = function()
    {
        sensorNames = new Array();
        for(var i = 0; i < senData.getSensorCount(); i++)
        {
            sensorNames.push(senData.defaultName(i).str);
        }
    };

    this.getSensorImageUrl = function(a_sensorId, a_color)
    {
        if(a_color == undefined)
        {
            a_color = "green";
        }

        if(a_sensorId == undefined)
        {
            if(developing.verbose == true)
            {
                console.log("[Dev] No sensorId specified");
            }
            return "images/sensoricons/" + a_color + "/puzzle.png";
        }
        switch(a_sensorId)
        {
            case 0:
            case 14:
            case 16:
            case 36:
            case 57:
            {
                return "images/sensoricons/" + a_color + "/ph.png";
            }
            break;
            case 1:
            case 15:
            case 17:
            case 34:
            case 35:
            case 58:
            case 59:
            {
                return "images/sensoricons/" + a_color + "/do2.png";
            }
            break;
            case 2:
            {
                return "images/sensoricons/" + a_color + "/temperature.png";
            }
            break;
            case 3:
            case 4:
            {
                return "images/sensoricons/" + a_color + "/level.png";
            }
            break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            {
                return "images/sensoricons/" + a_color + "/analog.png";
            }
            break;
            case 13:
            {
                return "images/sensoricons/" + a_color + "/stirrer.png";
            }
            break;
            case 18:
            case 19:
            case 20:
            case 21:
            {
                return "images/sensoricons/" + a_color + "/balance.png";
            }
            break;
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            {
                return "images/sensoricons/" + a_color + "/digital.png";
            }
            break;
            case 22: // Aber
            case 33: // Buglab 2100
            case 53: // buglab 3000
            case 54: // Aber conductivity
            {
                return "images/sensoricons/" + a_color + "/biomass.png";
            }
            break;
            case 31:
            {
                return "images/sensoricons/" + a_color + "/digital.png";
            }
            break;
            case 32:
            {
                return "images/sensoricons/" + a_color + "/redox.png";
            }
            break;
            default:
            {
                return "images/sensoricons/" + a_color + "/puzzle.png";
            }
        }
    };

    this.getActuatorImageUrl = function(a_actuatorId, a_color)
    {
        if(a_color == undefined)
        {
            a_color = "green";
        }

        if(a_actuatorId == undefined)
        {
            if(developing.verbose == true)
            {
                console.log("[Dev] No actuatorId specified");
            }
            return "images/sensoricons/" + a_color + "/puzzle.png";
        }
        switch(a_actuatorId)
        {

            default:
            {
                return "images/sensoricons/" + a_color + "/puzzle.png";
            }
        }
    };

    this.getMonthByNumber = function(a_month)
    {
        switch(Number(a_month))
        {
            case 1:
            {
                return "Jan"
            }
            break;
            case 2:
            {
                return "Feb"
            }
            break;
            case 3:
            {
                return "Mar"
            }
            break;
            case 4:
            {
                return "Apr"
            }
            break;
            case 5:
            {
                return "May"
            }
            break;
            case 6:
            {
                return "Jun"
            }
            break;
            case 7:
            {
                return "Jul"
            }
            break;
            case 8:
            {
                return "Aug"
            }
            break;
            case 9:
            {
                return "Sep"
            }
            break;
            case 10:
            {
                return "Oct"
            }
            break;
            case 11:
            {
                return "Nov"
            }
            break;
            case 12:
            {
                return "Dec"
            }
            break;
            default:
            {
                return "Unknown Month";
            }
        }
    };

    this.getMonthByName = function(a_monthName)
    {
        switch(a_monthName)
        {
            case "Jan":
            {
                return 1;
            }
            break;
            case "Feb":
            {
                return 2;
            }
            break;
            case "Mar":
            {
                return 3;
            }
            break;
            case "Apr":
            {
                return 4;
            }
            break;
            case "May":
            {
                return 5;
            }
            break;
            case "Jun":
            {
                return 6;
            }
            break;
            case "Jul":
            {
                return 7;
            }
            break;
            case "Aug":
            {
                return 8;
            }
            break;
            case "Sep":
            {
                return 9;
            }
            break;
            case "Oct":
            {
                return 10;
            }
            break;
            case "Nov":
            {
                return 11;
            }
            break;
            case "Dec":
            {
                return 12;
            }
            break;
            default:
            {
                return 1;
            }
        }
    };

    this.getPrioritisedSensors = function()
    {
        var sensorsPriority = new Array();

        for(var i = 0; i < senData.getSensorCount(); i++)
        {
            sensorsPriority[senData.priority(i).num] = senData.defaultName(i).str;
        }

        return sensorsPriority;
    };

    this.getPrioritisedActuators = function()
    {
        var actuatorsPriority = new Array();

        for(var i = 0; i < actData.getActuatorCount(); i++)
        {
            actuatorsPriority[actData.priority(i).num] = actData.defaultName(i).str;
        }

        return actuatorsPriority;
    }
    this.charWhiteList = new RegExp("([^A-Za-z0-9\\/\\.\\-_%\xAE\xB0 ])", "g");
};

