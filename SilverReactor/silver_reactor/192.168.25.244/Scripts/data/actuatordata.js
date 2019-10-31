function actuatorDataStorageAccessWrapper(a_mainData)
{
    var data = a_mainData;
    var tools = new dataTools(data);
    var dataReturn = tools.dataReturn;
    var dataHandling = tools.dataHandling;
    var dataUpdateHandling = tools.dataUpdateHandling;

    this.initializeActuators = function (a_callback)
    {
        data.updateData([2, 1]); // Name
        data.updateData([2, 21]); // Availability
        data.updateData([2, 26, 18]);  // stirrerType
    }

    this.getActuatorCount = function ()
    {
        return data.dataCount([2, 21]);
    }

    this.defaultName = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 0, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.name = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 1, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.priority = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 2, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.doseMonEnabled = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 3, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.factor = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 4, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.unit = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 5, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.domain = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 6, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.assigned = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 7, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.position = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 8, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.limitHigh = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 9, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.limitLow = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 10, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.type = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 11, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.value = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 12, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.doseValue = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 13, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.displaySyn = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 14, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.timeFactor = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 15, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.doseCalib = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 16, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.doseTime = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 17, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.doseFactor = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 18, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.isControlled = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 19, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.manualValue = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 20, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.available = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 21, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.analogRange = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 22, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.delay = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 23, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.on = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 24, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.off = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 25, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.stirrerType = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 26, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.limitLowNeg = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 27, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.limitHighNeg = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 28, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.inhibit = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 29, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licensed = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 30, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseToAdd = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 31, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseToRemove = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 32, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseVisible = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 33, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseName = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 34, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.polarity = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 35, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.alarms = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 36, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFCarrier = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 37, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFAssignment = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 38, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFStatus = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 39, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFFlow = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 40, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFMaxFlow = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 41, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFReplaceCarrier = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 42, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.uValveFlow = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 43, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.decimals = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 44, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.inhibitAlarm = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 45, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.prime = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 46, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interlockStatus = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 47, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.restoreDefaultFactor = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 48, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.active = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 49, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.setpoint = function (a_actuatorId, a_data, a_update)
    {
        var address = [2, 50, a_actuatorId];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.customStirrerEnabled = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 0];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerEnabled " + a_actuatorId);
        }
    };

    this.customStirrerEnabled = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 0];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerEnabled " + a_actuatorId);
        }
    };

    this.customStirrerMaxRPM = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 1];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerMax " + a_actuatorId);
        }
    };

    this.customStirrerP = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 2];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerP " + a_actuatorId);
        }
    };

    this.customStirrerI = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 3];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerI " + a_actuatorId);
        }
    };

    this.customStirrerD = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 4];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerD " + a_actuatorId);
        }
    };

    this.customStirrerLoop = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 5];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerLoop " + a_actuatorId);
        }
    };

    this.customStirrerLag = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 6];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerLag " + a_actuatorId);
        }
    };

    this.customStirrerCurrentLimit = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 7];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerCurrentLimit " + a_actuatorId);
        }
    };

    this.customStirrerPPR = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 8];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerPPR " + a_actuatorId);
        }
    };

    this.customStirrerTransmission = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 9];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for customStirrerTransmission " + a_actuatorId);
        }
    };

    this.brushlessMotorType = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 12];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for brushlessMotorType " + a_actuatorId);
        }
    };

    this.brushlessRealtimeCurrent = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 13];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for brushlessRealtimeCurrent " + a_actuatorId);
        }
    };

    this.brushlessRatio = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 14];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for brushlessRatio " + a_actuatorId);
        }
    };

    this.brushlessResetErrorState = function (a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 15];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for brushlessResetErrorState " + a_actuatorId);
        }
    };

    this.direction = function(a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId > 21 && a_actuatorId < 28)
        {
            var address = [6, a_actuatorId, 0];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 10];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for direction " + a_actuatorId);
        }
    };

    this.directionAllowUser = function(a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId > 21 && a_actuatorId < 28)
        {
            var address = [6, a_actuatorId, 1];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(a_actuatorId == 18)
        {
            var address = [6, a_actuatorId, 11];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for direction " + a_actuatorId);
        }
    };

    this.mfcTag = function(a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId > 37 && a_actuatorId < 46)
        {
            var address = [6, a_actuatorId, 0];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for mfcTag " + a_actuatorId);
        }
    };

    this.mfcStatus = function(a_actuatorId, a_data, a_update)
    {
        if(a_actuatorId > 37 && a_actuatorId < 46)
        {
            var address = [6, a_actuatorId, 2];
            dataHandling(address, a_data);
            dataUpdateHandling(address, a_update);
            return dataReturn(data.getData(address));
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Invalid J-Code request for mfcTag " + a_actuatorId);
        }
    };

    this.tcRest = function(a_actuatorId, a_data, a_update)
    {
        var address = [6, 37, 0];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.tcRefill = function(a_actuatorId, a_data, a_update)
    {
        var address = [6, 37, 1];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.tcFill = function(a_actuatorId, a_data, a_update)
    {
        var address = [6, 37, 2];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.tcActivate = function(a_actuatorId, a_data, a_update)
    {
        var address = [6, 37, 3];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };
};

var actuatorData = new actuatorDataStorageAccessWrapper(mainData);

