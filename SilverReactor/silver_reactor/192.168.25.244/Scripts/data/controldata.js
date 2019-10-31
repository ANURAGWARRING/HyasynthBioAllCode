function controlDataStorageAccessWrapper(a_mainData)
{
    var data = a_mainData;
    var tools = new dataTools(data);
    var dataReturn = tools.dataReturn;
    var dataHandling = tools.dataHandling;
    var dataUpdateHandling = tools.dataUpdateHandling;

    this.initializeControls = function ()
    {
        data.updateData([1,13]);
    }

    this.getControlCount = function ()
    {
        return data.dataCount([1, 13]);
    }

    this.setpoint = function (a_control, a_data, a_update, a_update)
    {
        var address = [1, 13, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.p = function (a_control, a_data, a_update)
    {
        var address = [3, 0, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.pMax = function (a_control, a_data, a_update)
    {
        var address = [3, 1, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.pMin = function (a_control, a_data, a_update)
    {
        var address = [3, 2, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.i = function (a_control, a_data, a_update)
    {
        var address = [3, 3, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.iMax = function (a_control, a_data, a_update)
    {
        var address = [3, 4, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.iMin = function (a_control, a_data, a_update)
    {
        var address = [3, 5, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.d = function (a_control, a_data, a_update)
    {
        var address = [3, 6, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.dMax = function (a_control, a_data, a_update)
    {
        var address = [3, 7, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.dMin = function (a_control, a_data, a_update)
    {
        var address = [3, 8, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.deadband = function (a_control, a_data, a_update)
    {
        var address = [3, 9, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.deadbandMax = function (a_control, a_data, a_update)
    {
        var address = [3, 10, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.deadbandMin = function (a_control, a_data, a_update)
    {
        var address = [3, 11, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.interval = function (a_control, a_data, a_update)
    {
        var address = [3, 12, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.intervalMax = function (a_control, a_data, a_update)
    {
        var address = [3, 13, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.intervalMin = function (a_control, a_data, a_update)
    {
        var address = [3, 14, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.padapt = function (a_control, a_data, a_update)
    {
        var address = [3, 15, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleMax = function (a_control, a_data, a_update)
    {
        var address = [3, 16, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleMaxMax = function (a_control, a_data, a_update)
    {
        var address = [3, 17, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleMaxMin = function (a_control, a_data, a_update)
    {
        var address = [3, 18, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleMin = function (a_control, a_data, a_update)
    {
        var address = [3, 19, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleMinMax = function (a_control, a_data, a_update)
    {
        var address = [3, 20, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleMinMin = function (a_control, a_data, a_update)
    {
        var address = [3, 21, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.pulseTime = function (a_control, a_data, a_update)
    {
        var address = [3, 22, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.pulseTimeMax = function (a_control, a_data, a_update)
    {
        var address = [3, 23, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.pulseTimeMin = function (a_control, a_data, a_update)
    {
        var address = [3, 24, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.deadTime = function (a_control, a_data, a_update)
    {
        var address = [3, 25, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.deadTimeMax = function (a_control, a_data, a_update)
    {
        var address = [3, 26, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.deadTimeMin = function (a_control, a_data, a_update)
    {
        var address = [3, 27, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMinSamples = function (a_control, a_data, a_update)
    {
        var address = [3, 28, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMinSamplesMax = function (a_control, a_data, a_update)
    {
        var address = [3, 29, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMinSamplesMin = function (a_control, a_data, a_update)
    {
        var address = [3, 30, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedSensitivity = function (a_control, a_data, a_update)
    {
        var address = [3, 31, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedSensitivityMax = function (a_control, a_data, a_update)
    {
        var address = [3, 32, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedSensitivityMin = function (a_control, a_data, a_update)
    {
        var address = [3, 33, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedBuffer = function (a_control, a_data, a_update)
    {
        var address = [3, 34, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedBufferMax = function (a_control, a_data, a_update)
    {
        var address = [3, 35, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedBufferMin = function (a_control, a_data, a_update)
    {
        var address = [3, 36, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedSlope = function (a_control, a_data, a_update)
    {
        var address = [3, 37, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedSlopeMax = function (a_control, a_data, a_update)
    {
        var address = [3, 38, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedSlopeMin = function (a_control, a_data, a_update)
    {
        var address = [3, 39, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedOffset = function (a_control, a_data, a_update)
    {
        var address = [3, 40, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedOffsetMax = function (a_control, a_data, a_update)
    {
        var address = [3, 41, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedOffsetMin = function (a_control, a_data, a_update)
    {
        var address = [3, 42, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMinimalOutput = function (a_control, a_data, a_update)
    {
        var address = [3, 43, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMinimalOutputMax = function (a_control, a_data, a_update)
    {
        var address = [3, 44, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMinimalOutputMin = function (a_control, a_data, a_update)
    {
        var address = [3, 45, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedOutlierRem = function (a_control, a_data, a_update)
    {
        var address = [3, 46, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedOutlierRemMax = function (a_control, a_data, a_update)
    {
        var address = [3, 47, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedOutlierRemMin = function (a_control, a_data, a_update)
    {
        var address = [3, 48, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.levelFirstAction = function (a_control, a_data, a_update)
    {
        var address = [3, 49, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.actuatorAddPos = function (a_control, a_data, a_update)
    {
        var address = [3, 51, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.actuatorAddNeg = function (a_control, a_data, a_update)
    {
        var address = [3, 52, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.actuatorRemove = function (a_control, a_data, a_update)
    {
        var address = [3, 53, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedTimeBase = function (a_control, a_data, a_update)
    {
        var address = [3, 54, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMassBase = function (a_control, a_data, a_update)
    {
        var address = [3, 55, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.repeat = function (a_control, a_data, a_update)
    {
        var address = [3, 56, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.discontinous = function (a_control, a_data, a_update)
    {
        var address = [3, 57, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedCalib = function (a_control, a_data, a_update)
    {
        var address = [3, 58, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedSlope = function (a_control, a_data, a_update)
    {
        var address = [3, 59, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedOffset = function (a_control, a_data, a_update)
    {
        var address = [3, 60, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedTempSlope = function (a_control, a_data, a_update)
    {
        var address = [3, 61, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedTempOffset = function (a_control, a_data, a_update)
    {
        var address = [3, 62, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedItemCount = function (a_control, a_data, a_update)
    {
        var address = [3, 63, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedItemAdd = function (a_control, a_data, a_update)
    {
        var address = [3, 64, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedItemInsert = function (a_control, a_data, a_update)
    {
        var address = [3, 65, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedItemRemove = function (a_control, a_data, a_update)
    {
        var address = [3, 66, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMaxFlow = function (a_control, a_data, a_update)
    {
        var address = [3, 67, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedMaxTime = function (a_control, a_data, a_update)
    {
        var address = [3, 68, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedItemUpdate = function (a_control, a_data, a_update)
    {
        var address = [3, 69, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedItemRead = function (a_control, a_data, a_update)
    {
        var address = [3, 70, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.adaptiveSettlingTime = function (a_control, a_data, a_update)
    {
        var address = [3, 71, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.restoreDefaults = function (a_control, a_data, a_update)
    {
        var address = [3, 72, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedCalibTime = function (a_control, a_data, a_update)
    {
        var address = [3, 73, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedCalibWeight = function (a_control, a_data, a_update)
    {
        var address = [3, 74, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedFlowToFactor = function (a_control, a_data, a_update)
    {
        var address = [3, 75, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.judgeStatus = function (a_control, a_data, a_update)
    {
        var address = [3, 76, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleParamMax = function (a_control, a_data, a_update)
    {
        var address = [3, 77, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleParamMaxMax = function (a_control, a_data, a_update)
    {
        var address = [3, 78, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleParamMaxMin = function (a_control, a_data, a_update)
    {
        var address = [3, 79, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleParamMin = function (a_control, a_data, a_update)
    {
        var address = [3, 80, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleParamMinMax = function (a_control, a_data, a_update)
    {
        var address = [3, 81, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.scaleParamMinMin = function (a_control, a_data, a_update)
    {
        var address = [3, 82, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedPaused = function (a_control, a_data, a_update)
    {
        var address = [3, 83, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedCurrentTime = function (a_control, a_data, a_update)
    {
        var address = [3, 84, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.cascadeLimitLow = function (a_control, a_data, a_update)
    {
        var address = [3, 85, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.cascadeLimitHigh = function (a_control, a_data, a_update)
    {
        var address = [3, 86, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };

    this.feedInputUnit = function (a_control, a_data, a_update)
    {
        var address = [3, 87, a_control];
        dataHandling(address, a_data);
        dataUpdateHandling(address, a_update);
        return dataReturn(data.getData(address));
    };
}

var controlData = new controlDataStorageAccessWrapper(mainData);

