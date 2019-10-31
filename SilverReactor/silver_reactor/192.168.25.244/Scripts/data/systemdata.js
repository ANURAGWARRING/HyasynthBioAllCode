function systemDataStorageAccessWrapper(a_mainData)
{
    var data = a_mainData;
    var tools = new dataTools(data);
    var dataReturn = tools.dataReturn;
    var dataHandling = tools.dataHandling;
    var dataUpdateHandling = tools.dataUpdateHandling;

    this.initializeSystemData = function( a_callback )
    {
        data.updateData([0, 9]) // autoLogoutEnabled
        data.updateData([0, 10]) // autoLogoutTime
        data.updateData([4, 4]) // Function names
    };

    this.getFunctionCount = function ()
    {
        return data.dataCount([4, 4]);
    }

    this.systemName = function (a_data, a_update)
    {
        var address = [0, 0];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.webTimerEnabled = function (a_data, a_update)
    {
        var address = [0, 1];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.webTimerTime = function (a_data, a_update)
    {
        var address = [0, 2];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.bioreactorSelection = function (a_data, a_update)
    {
        var address = [0, 3];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.accessLevel = function (a_data, a_update)
    {
        var address = [0, 5];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.accessUser = function (a_data, a_update)
    {
        var address = [0, 6];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.language = function (a_data, a_update)
    {
        var address = [0, 7];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.webPaging = function (a_data, a_update)
    {
        var address = [0, 8];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.autoLogoutEnabled = function (a_data, a_update)
    {
        var address = [0, 9];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.autoLogoutTime = function (a_data, a_update)
    {
        var address = [0, 10];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.login = function (a_data, a_update)
    {
        var address = [0, 11];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.loginClaim = function (a_data, a_update)
    {
        var address = [0, 12];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.addUser = function (a_data, a_update)
    {
        var address = [0, 13];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.removeUser = function (a_data, a_update)
    {
        var address = [0, 14];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.changePassword = function (a_data, a_update)
    {
        var address = [0, 15];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.keyboardEnabled = function (a_data, a_update)
    {
        var address = [0, 16];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.actuatorButtonsEnabled = function (a_data, a_update)
    {
        var address = [0, 17];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.mfcType = function (a_data, a_update)
    {
        var address = [0, 18];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.powersupplyType = function (a_data, a_update)
    {
        var address = [0, 19];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.brownoutTime = function (a_data, a_update)
    {
        var address = [0, 20];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.systemTime = function (a_data, a_update)
    {
        var address = [0, 21];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.debugLogCount = function (a_data, a_update)
    {
        var address = [0, 22];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.debugLog = function (a_data, a_update)
    {
        var address = [0, 23];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.errorLogCount = function (a_data, a_update)
    {
        var address = [0, 24];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.errorLog = function (a_data, a_update)
    {
        var address = [0, 25];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.factoryCalState = function (a_data, a_update)
    {
        var address = [0, 26];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.factoryCalAdcValue = function (a_data, a_update)
    {
        var address = [0, 27];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.factoryCalAdcValueValid = function (a_data, a_update)
    {
        var address = [0, 28];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.factoryCalCompFactor = function (a_data, a_update)
    {
        var address = [0, 29];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.factoryCalSlope = function (a_data, a_update)
    {
        var address = [0, 30];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.factoryCalOffset = function (a_data, a_update)
    {
        var address = [0, 31];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.ip = function (a_data, a_update)
    {
        var address = [0, 32];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.memory = function (a_data, a_update)
    {
        var address = [0, 33];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.memoryWrite = function (a_data, a_update)
    {
        var address = [0, 34];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.licenseAvailable = function (a_data, a_update)
    {
        var address = [0, 35];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.updateAvailable = function (a_data, a_update)
    {
        var address = [0, 36];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.updateVersion = function (a_data, a_update)
    {
        var address = [0, 37];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.bootTimeCalibration = function (a_data, a_update)
    {
        var address = [0, 38];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.systemType = function (a_data, a_update)
    {
        var address = [0, 39];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.totalReset = function (a_data, a_update)
    {
        var address = [0, 40];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.systemBuildTime = function (a_data, a_update)
    {
        var address = [0, 41];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.oemSelection = function (a_data, a_update)
    {
        var address = [0, 42];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.tickCount = function (a_data, a_update)
    {
        var address = [0, 43];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.cpuLoad = function (a_data, a_update)
    {
        var address = [0, 44];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.memoryInfo = function (a_data, a_update)
    {
        var address = [0, 45];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.memoryLargestBlockSize = function (a_data, a_update)
    {
        var address = [0, 46];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.graphicsMode = function (a_data, a_update)
    {
        var address = [0, 47];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.fileCount = function (a_data, a_update)
    {
        var address = [0, 48];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.fileName = function (a_data, a_update)
    {
        var address = [0, 49];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.importExport = function (a_data, a_update)
    {
        var address = [0, 50];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.eepromTest = function (a_data, a_update)
    {
        var address = [0, 51];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.eepromTestCount = function (a_data, a_update)
    {
        var address = [0, 52];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.eepromErrorCount = function (a_data, a_update)
    {
        var address = [0, 53];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.powerfailEStop = function (a_data, a_update)
    {
        var address = [0, 54];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.cabinetTempAlarm = function (a_data, a_update)
    {
        var address = [0, 55];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFWarningDO = function (a_data, a_update)
    {
        var address = [0, 56];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFWarningpH = function (a_data, a_update)
    {
        var address = [0, 57];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFMarginDO = function (a_data, a_update)
    {
        var address = [0, 58];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFMarginpH = function (a_data, a_update)
    {
        var address = [0, 59];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFTimeDO = function (a_data, a_update)
    {
        var address = [0, 60];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFTimepH = function (a_data, a_update)
    {
        var address = [0, 61];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFWarningpHEnabled = function (a_data, a_update)
    {
        var address = [0, 62];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.TGFWarningDOEnabled = function (a_data, a_update)
    {
        var address = [0, 63];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.copyErrorLog = function (a_data, a_update)
    {
        var address = [0, 64];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.currentVersion = function (a_data, a_update)
    {
        var address = [0, 65];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.mac = function (a_data, a_update)
    {
        var address = [0, 66];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.ethernetChip = function (a_data, a_update)
    {
        var address = [0, 67];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.hardwareRev = function (a_data, a_update)
    {
        var address = [0, 68];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.fpgaRev = function (a_data, a_update)
    {
        var address = [0, 69];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.ucRev = function (a_data, a_update)
    {
        var address = [0, 70];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.touchRev = function (a_data, a_update)
    {
        var address = [0, 71];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.runningTime = function (a_data, a_update)
    {
        var address = [0, 72];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.webupdateAvailable = function (a_data, a_update)
    {
        var address = [0, 73];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.webupdateVersion = function (a_data, a_update)
    {
        var address = [0, 74];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.webupdateNoSpace = function (a_data, a_update)
    {
        var address = [0, 75];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.webupdateDone = function (a_data, a_update)
    {
        var address = [0, 76];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.ledBoard = function (a_data, a_update)
    {
        var address = [0, 77];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.updateDone = function (a_data, a_update)
    {
        var address = [0, 78];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.reboot = function (a_data, a_update)
    {
        var address = [0, 79];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.stirrerPresent = function (a_data, a_update)
    {
        var address = [0, 80];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.stepperPresent = function (a_data, a_update)
    {
        var address = [0, 81];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.startScreenCalibration = function (a_data, a_update)
    {
        var address = [0, 82];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);V
        return dataReturn(data.getData(address));
    };

    this.hardwareSlope = function (a_data, a_update)
    {
        var address = [0, 84];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.hardwareOffset = function (a_data, a_update)
    {
        var address = [0, 85];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.systemDisconnect = function (a_data, a_update)
    {
        var address = [0, 86];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.externalAlarm = function (a_data, a_update)
    {
        var address = [0, 87];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.operatorName = function (a_user, a_update)
    {
        var address = [4, 0, a_user];
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.engineerName = function (a_user, a_update)
    {
        var address = [4, 1, a_user];
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.functionLicenseToAdd = function (a_function, a_update)
    {
        var address = [4, 2, a_function];
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.functionLicenseToRemove = function (a_function, a_update)
    {
        var address = [4, 3, a_function];
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.functionLicenseName = function (a_function, a_update)
    {
        var address = [4, 4, a_function];
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.functionLicenseEnabled = function (a_function, a_update)
    {
        var address = [4, 5, a_function];
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };
};

var systemData = new systemDataStorageAccessWrapper(mainData);

