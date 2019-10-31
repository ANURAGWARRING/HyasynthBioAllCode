function sensorDataStorageAccessWrapper(a_mainData)
{
    var data = a_mainData;
    var tools = new dataTools(data);
    var dataReturn = tools.dataReturn;
    var dataHandling = tools.dataHandling;
    var dataUpdateHandling = tools.dataUpdateHandling;

    this.initializeSensors = function (a_callback)
    {
        data.updateData([1, 11]); // Availability
        data.updateData([1, 0]); // defaultName
        data.updateData([1, 1]); // Name
    }

    this.getSensorCount = function ()
    {
        return data.dataCount([1, 11]);
    }

    this.defaultName = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 0, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.name = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 1, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.priority = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 2, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.unit = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 3, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.alarmLimitHigh = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 4, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.alarmLimitLow = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 5, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.max = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 6, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.min = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 7, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.slope = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 8, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.offset = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 9, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.sampleCorEnabled = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 10, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.available = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 11, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    // this.levelType = function (a_sensorId, a_data, a_update)
    // {
    //     var address = [1, 12, a_sensorId];
    //     dataHandling(address, a_data);
    //     dataUpdateHandling(address, a_update);
    //     return dataReturn(data.getData(address));
    // };

    this.active = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 14, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.value = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 15, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.inLoop = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 16, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.output = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 17, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.displaySyn = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 18, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.type = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 19, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockLimitHigh = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 20, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockLimitLow = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 21, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.alarmState = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 22, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockState = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 23, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.levelReactState = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 24, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.affectedActHigh = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 25, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.affectedActLow = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 26, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockDeadband = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 27, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockHoldTime = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 28, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.deadbandEnabled = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 29, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibStartStop = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 30, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibState = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 31, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibValue = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 32, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibTempSlope = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 33, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibTempOffset = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 34, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibAllowed = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 35, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibTwoPointAllowed = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 36, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.domain = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 37, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.sampleCor = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 38, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licensed = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 39, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseToAdd = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 40, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseToRemove = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 41, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseVisible = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 42, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseName = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 43, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.slopeMin = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 44, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.slopeMax = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 45, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.offsetMin = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 46, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.offsetMax = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 47, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockStatus = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 48, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.alarmStatus = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 49, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.connected = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 50, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.possibleActuator = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 51, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.assigned = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 52, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.position = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 53, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.slopeRaw = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 54, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.offsetRaw = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 55, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibRaw = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 56, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.rawValue = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 57, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.decimals = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 58, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.alertStatus = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 59, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockAdvAllowed = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 60, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockType = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 61, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockAdvLowActuator = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 62, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockAdvLowSetpoint = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 63, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.digitalNameHigh = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 64, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.digitalNameLow = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 65, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.viewLimitHigh = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 66, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.viewLimitLow = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 67, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.PVViewLimitHigh = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 66, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.PVViewLimitLow = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 67, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.COViewLimitHigh = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 68, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.COViewLimitLow = function (a_sensorId, a_data, a_update)
    {
        var address = [1, 69, a_sensorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    // CUSTOM

    this.doTempCompensation = function(a_data, a_update)
    {
        var address = [5, 1, 0];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.doSensitivity = function(a_data, a_update)
    {
        var address = [5, 1, 1];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.levelType = function(a_sensorId, a_data, a_update)
    {
        if(a_sensorId == 3 || a_sensorId == 4)
        {
            // J5.3.0 | J5.4.0
            var address = [5, a_sensorId, 0];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for levelType " + a_sensorId);
        }
    };

    this.levelSensitivity = function(a_sensorId, a_data, a_update)
    {
        if(a_sensorId == 3 || a_sensorId == 4)
        {
            // J5.3.1 | J5.4.1
            var address = [5, a_sensorId, 1];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for levelSensitivity " + a_sensorId);
        }
    };

    this.samplingEnabled = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://preph
            case 15://predo
            case 16://polph
            case 17://poldo
            case 34://lumisens
            {
                // J5.14.0 | J5.15.0 | J5.16.0 | J5.17.0 | J5.34.0
                var address = [5, a_sensorId, 0];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for samplingEnabled " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.sampleRate = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://preph
            case 15://predo
            case 16://polph
            case 17://poldo
            case 34://lumisens
            {
                // J5.14.1 | J5.15.1 | J5.16.1 | J5.17.1 | J5.34.1
                var address = [5, a_sensorId, 1];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for sampleRate " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.phase0 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://pH presens
            {
                // J5.14.3
                var address = [5, a_sensorId, 3];
            }
            break;
            case 15://dopresens
            {
                // J5.15.2
                var address = [5, a_sensorId, 2];
            }
            break;
            case 34://lumisens
            {
                // J5.34.4
                var address = [5, a_sensorId, 4];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for phase0 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.temp0 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 15://DO presens
            {
                // J5.15.3
                var address = [5, a_sensorId, 3];
            }
            break;
            case 34://lumisens
            {
                // J5.34.5
                var address = [5, a_sensorId, 5];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for temp0 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.phase100 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://pH presens
            {
                // J5.14.2
                var address = [5, a_sensorId, 2];
            }
            break;
            case 15://DO presens
            {
                // J5.15.4
                var address = [5, a_sensorId, 4];
            }
            break;
            case 34://lumisens
            {
                // J5.34.6
                var address = [5, a_sensorId, 6];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for phase100 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.temp100 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 15://DO presens
            {
                // J5.15.5
                var address = [5, a_sensorId, 5];
            }
            break;
            case 34://lumisens
            {
                // J5.34.7
                var address = [5, a_sensorId, 7];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for temp100 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.cal0 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 15://DO presens
            {
                // J5.15.9
                var address = [5, a_sensorId, 9];
            }
            break;
            case 34://lumisens
            {
                // J5.34.8
                var address = [5, a_sensorId, 8];
            }
            break;
            case 35://Hamilton PO2
            case 36://Hamilton pH
            {
                // J5.35.0 | J5.36.0
                var address = [5, a_sensorId, 0];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for calib0 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.cal100 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 15://DO presens
            {
                // J5.15.10
                var address = [5, a_sensorId, 10];
            }
            break;
            case 34://lumisens
            {
                // J5.34.9
                var address = [5, a_sensorId, 9];
            }
            break;
            case 35://Hamilton PO2
            case 36://Hamilton pH
            {
                // J5.35.1 | J5.36.1
                var address = [5, a_sensorId, 1];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for calib100 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.pressure = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 15://presens do
            {
                // J5.15.6
                var address = [5, a_sensorId, 6];
            }
            break;
            case 34://lumisens
            {
                // J5.34.12
                var address = [5, a_sensorId, 12];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for pressure " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.temperature = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 15://dopresens
            {
                // J5.15.13
                var address = [5, a_sensorId, 13];
            }
            break;
            case 34://lumisens
            {
                // J5.34.2
                var address = [5, a_sensorId, 2];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for temperature " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.tip = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 34://lumisens
            {
                // J5.34.3
                var address = [5, a_sensorId, 3];
            }
            break;
            case 35://hamilton PO2
            case 36://hamilton pH
            {
                // J5.35.12 | J5.36.12
                var address = [5, a_sensorId, 12];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for temperature " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.reset = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://presens ph
            {
                // J5.14.9
                var address = [5, a_sensorId, 9];
            }
            break;
            case 15://presens do
            case 36://hamilton pH
            {
                // J5.15.11 | J5.36.11
                var address = [5, a_sensorId, 11];
            }
            break;
            case 16://polph
            case 17://poldo
            {
                // J5.16.2 | J5.17.2
                var address = [5, a_sensorId, 2];
            }
            break;
            case 33://Buglab BE2100
            case 53://Buglab BE3000
            {
                // J5.33.3 | J5.53.3
                var address = [5, a_sensorId, 3];
            }
            break;
            case 34://lumisens
            case 35://hamilton PO2
            {
                // J5.34.10 | J5.35.10
                var address = [5, a_sensorId, 10];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for reset " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibrationStatus = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.34.2
                var address = [5, a_sensorId, 2];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.9
                var address = [5, a_sensorId, 9];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for calibrationStatus " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.upTime = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.35.3
                var address = [5, a_sensorId, 3];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.2
                var address = [5, a_sensorId, 2];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for upTime " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.serial = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.35.4
                var address = [5, a_sensorId, 4];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.3
                var address = [5, a_sensorId, 3];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for serial " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.version = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.35.5
                var address = [5, a_sensorId, 5];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.4
                var address = [5, a_sensorId, 4];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for version " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.sipCount = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.35.6
                var address = [5, a_sensorId, 6];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.5
                var address = [5, a_sensorId, 5];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for sipCount " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.cipCount = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.35.7
                var address = [5, a_sensorId, 7];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.6
                var address = [5, a_sensorId, 6];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for version " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.errorCount = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.35.8
                var address = [5, a_sensorId, 8];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.7
                var address = [5, a_sensorId, 7];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for errorCount " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.error = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            {
                // J5.35.9
                var address = [5, a_sensorId, 9];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.8
                var address = [5, a_sensorId, 8];
            }
            break;
            case 57://Mettler pH
            case 58://Mettler dO2
            case 59://Mettler CO2
            {
                // J5.57.1
                // J5.58.1
                // J5.59.1
                var address = [5, a_sensorId, 1];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for error " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.setCP6 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 35://hamilton PO2
            case 36://hamilton pH
            {
                // J5.35.13 | J5.36.13
                var address = [5, a_sensorId, 13];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for setCP6 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.setRecommendedCP1 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 36://hamilton pH
            {
                // J5.36.14
                var address = [5, a_sensorId, 14];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for setRecommendedCP1 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.setRecommendedCP2 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 36://hamilton pH
            {
                // J5.36.15
                var address = [5, a_sensorId, 15];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for setRecommendedCP1 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.buglabAvr = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 33://BuglabBE2100
            case 53://BuglabBE3000
            {
                // J5.33.0 | J5.53.0
                var address = [5, a_sensorId, 0];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for buglabAvr " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.buglabBaseline = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 33://BuglabBE2100
            case 53://BuglabBE3000
            {
                // J5.33.2 | J5.53.2
                var address = [5, a_sensorId, 2];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for buglabBaseline " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.buglabBaselineReset = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 33://BuglabBE2100
            case 53://BuglabBE3000
            {
                // J5.33.2 | J5.53.2
                var address = [5, a_sensorId, 3];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for buglabBaselineReset " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.balanceTag = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 18://Balance 1
            case 19://Balance 2
            case 20://Balance 3
            case 21://Balance 4
            {
                // J5.18.0 | J5.19.0 | J5.20.0 | J5.21.0
                var address = [5, a_sensorId, 0];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for balanceTag " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.balanceTare = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 18://Balance 1
            case 19://Balance 2
            case 20://Balance 3
            case 21://Balance 4
            {
                // J5.18.0 | J5.19.0 | J5.20.0 | J5.21.0
                var address = [5, a_sensorId, 1];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for balanceTare " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.presenspHpH0 = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://presens ph
            {
                // J5.14.4
                var address = [5, a_sensorId, 4];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for presenspHpH0 " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.presenspHdpH = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://presens ph
            {
                // J5.14.5
                var address = [5, a_sensorId, 5];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for presenspHdpH " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calTemp = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://presens ph
            {
                // J5.14.6
                var address = [5, a_sensorId, 6];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for calTemp " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.averagingSamples = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://presens ph
            case 15://presens do
            {
                // J5.14.7 | J5.15.7
                var address = [5, a_sensorId, 7];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for averagingSamples " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.ledCurrent = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 14://presens ph
            case 15://presens do
            {
                // J5.14.8 | J5.15.8
                var address = [5, a_sensorId, 8];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for ledCurrent " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.phase = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 15://presens do
            {
                // J5.15.12
                var address = [5, a_sensorId, 12];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for ledCurrent " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.calibrationTimer = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 36://HamiltonpH
            {
                // J5.36.10
                var address = [5, a_sensorId, 10];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for ledCurrent " + a_sensorId);
                }
                return;
            }
            break;
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.futuraMode = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.0
                // J5.54.0
                var address = [5, a_sensorId, 0];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraMode " + a_sensorId);
                }
            }
        }
    };

    this.futuraProbeUpTime = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.1
                // J5.54.1
                var address = [5, a_sensorId, 1];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraProbeUpTime " + a_sensorId);
                }
            }
        }

    };

    this.futuraProbeId = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.2
                // J5.54.2
                var address = [5, a_sensorId, 2];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraProbeId " + a_sensorId);
                }
            }
        }
    };

    this.futuraAmplifierId = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.3
                // J5.54.3
                var address = [5, a_sensorId, 3];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraAmplifierId " + a_sensorId);
                }
            }
        }
    };

    this.futuraCapacitance = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.4
                // J5.54.4
                var address = [5, a_sensorId, 4];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraCapacitance " + a_sensorId);
                }
            }
        }
    };

    this.futuraConductivity = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.5
                // J5.54.5
                var address = [5, a_sensorId, 5];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraConductivity " + a_sensorId);
                }
            }
        }
    };

    this.futuraZero = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.6
                // J5.54.6
                var address = [5, a_sensorId, 6];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraZero " + a_sensorId);
                }
            }
        }
    };

    this.futuraClearZero = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.7
                // J5.54.7
                var address = [5, a_sensorId, 7];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraClearZero " + a_sensorId);
                }
            }
        }
    };

    this.futuraCleanPulse = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.8
                // J5.54.8
                var address = [5, a_sensorId, 8];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraClearPulse " + a_sensorId);
                }
            }
        }
    };

    this.futuraStatus = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.9
                // J5.54.9
                var address = [5, a_sensorId, 9];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraStatus " + a_sensorId);
                }
            }
        }
    };

    this.futuraFrequency = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.10
                // J5.54.10
                var address = [5, a_sensorId, 10];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraFrequency " + a_sensorId);
                }
            }
        }
    };

    this.futuraFrequencyDual = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.11
                // J5.54.11
                var address = [5, a_sensorId, 11];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraFrequencyDual " + a_sensorId);
                }
            }
        }
    };

    this.futuraPolarization = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.12
                // J5.54.12
                var address = [5, a_sensorId, 12];
                dataHandling(address, a_data);
                dataUpdateHandling(address, a_update);
                return dataReturn(data.getData(address));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for futuraPolarization " + a_sensorId);
                }
            }
        }
    };

    this.modbusAddress = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 22://Aber Futura
            case 54://Aber Futura Conductivity
            {
                // J5.22.13
                // J5.54.13
                var address = [5, a_sensorId, 13];
            }
            break;
            case 35://hamilton PO2
            {
                // J5.35.14
                var address = [5, a_sensorId, 14];
            }
            break;
            case 36://hamilton pH
            {
                // J5.36.16
                var address = [5, a_sensorId, 16];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for modbusAddress " + a_sensorId);
                    return;
                }
            }
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.dli = function(a_sensorId, a_data, a_update)
    {
        switch(a_sensorId)
        {
            case 57://Mettler pH
            case 58://Mettler dO2
            case 59://Mettler CO2
            {
                // J5.57.0
                // J5.58.0
                // J5.59.0
                var address = [5, a_sensorId, 0];
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Invalid J-Code request for dli " + a_sensorId);
                    return;
                }
            }
        }
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };
};



var sensorData = new sensorDataStorageAccessWrapper(mainData);

