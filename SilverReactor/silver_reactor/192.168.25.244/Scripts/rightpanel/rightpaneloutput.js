function rightPanelOutput()
{
    this.init = function(a_func)
    {
        doneInitCallback = a_func;

        callbacks["init"] = mainData.registerCallback(initCallback);
        queryData();
        mainData.updateData(callbacks["init"].address);
    };

    var queryData = function()
    {
        mainData.updateData([1, 1]); // name
        mainData.updateData([1, 2]); // priority
        mainData.updateData([1, 11]); // available
        mainData.updateData([1, 17]); // output
        mainData.updateData([1, 52]); // assigned
        mainData.updateData([1, 53]); // position

        mainData.updateData([2, 1]); // name
        mainData.updateData([2, 2]); // priority
        mainData.updateData([2, 5]); // unit
        mainData.updateData([2, 6]); // domain
        mainData.updateData([2, 7]); // assigned
        mainData.updateData([2, 8]); // position
        mainData.updateData([2, 12]); // value
        mainData.updateData([2, 35]); // polarity
        mainData.updateData([2, 47]); // interlockStatus
        mainData.updateData([2, 49]); // active
        mainData.updateData([2, 50]); // setpoint

        // mainData.updateData([2, 12]); // value
        // mainData.updateData([2, 13]); // doseValue
        // mainData.updateData([2, 21]); // available
    };

    var fillStandardItems = function(a_items)
    {
        var sensorsPriority = lookup.getPrioritisedSensors();
        for(var i = 0; i < sensorsPriority.length; i++)
        {
            var sensorId = lookup.getSensorId(sensorsPriority[i]);
            var actuators = getAssignedActuatorsAndPosition(sensorId);
            for(var j = 0; j < actuators.length; j++)
            {
                // var address = [2, 12, actuators[j].id]; //value
                // registeredCallbacks.push([address, updateActuatorValue]);
                // mainData.addCallback(address, updateActuatorValue);
                // actuatorData.value(actuators[j].id, null, {add:true, caller:updateActuatorValue});
                callbacks["updateActValueOutput"+i] = mainData.registerCallback(updateActuatorValue, [2, 12, actuators[j].id]);
                actuatorData.value(actuators[j].id, null, {add:true, caller:updateActuatorValue});
                if(actuatorData.domain(actuators[j].id).num == 1)
                {
                    callbacks["updateActActive"+i] = mainData.registerCallback(updateActuatorValue, [2, 49, actuators[j].id]);
                }

                callbacks["setInterlockStatus"+i] = mainData.registerCallback(setInterlockStatus, [2, 47, actuators[j].id]);
            }
            if(sensorData.available(sensorId).num >= 4 && actuators.length > 0)
            {
                standardItems.sensorOutputItems.push({
                    type: "outputOverviewItem",
                    sensorId: sensorId,
                    actuators: actuators
                });

                // var address = [1, 17, sensorId]; //ouput
                // registeredCallbacks.push([address, updateSensorValue]);
                // mainData.addCallback(address, updateSensorValue);
                // sensorData.output(sensorId, null, {add:true, caller:updateSensorValue});

                callbacks["updateSenValueOutput"+i] = mainData.registerCallback(updateSensorValue, [1, 17, sensorId]);
                sensorData.output(sensorId, null, {add:true, caller:updateSensorValue});
            }
        }

        var actuatorsPriority = lookup.getPrioritisedActuators();
        for(var i = 0; i < actuatorsPriority.length; i++)
        {
            var actuatorId = lookup.getActuatorId(actuatorsPriority[i]);
            if(actuatorData.available(actuatorId).num == 3)
            {
                standardItems.actuatorOutputItems.push({
                    type: "outputOverviewItem",
                    actuatorId: actuatorId
                });

                // var address = [2, 12, actuatorId]; //value
                // registeredCallbacks.push([address, updateActuatorValue]);
                // mainData.addCallback(address, updateActuatorValue);
                // actuatorData.value(actuatorId, null, {add:true, caller:updateActuatorValue});
                callbacks["updateActValueOutputSec"+i] = mainData.registerCallback(updateActuatorValue, [2, 12, actuatorId]);
                actuatorData.value(actuatorId, null, {add:true, caller:updateActuatorValue});

                if(actuatorData.domain(actuatorId).num == 1)
                {
                    callbacks["updateActActive"+i] = mainData.registerCallback(updateActuatorValue, [2, 49, actuatorId]);
                }

                callbacks["setInterlockStatusSec"+i] = mainData.registerCallback(setInterlockStatus, [2, 47, actuatorId]);
            }
            // Add callbacks for the external loops added as actuator
            if(i < sensorData.getSensorCount() && sensorData.assigned(i).num != -1)
            {
                callbacks["externalSensorValue"+i] = mainData.registerCallback(updateExternalSensorValue, [1, 17, i]);
                sensorData.output(i, null, {add:true, caller:updateExternalSensorValue});
            }
        }
    };

    this.buildUp = function()
    {
        var $elements = $("<div></div>");
        var $outputArea = $("<div class='windowContent rightOutputArea'></div>");

        $outputArea.append(wi.convertItemsToElements(standardItems.sensorOutputItems));
        $outputArea.append(wi.line("sep"));
        $outputArea.append(wi.convertItemsToElements(standardItems.actuatorOutputItems));

        $elements.append($outputArea);

        return $elements.children();
    };

    this.setState = function()
    {
        if(!isInitialUpdateDone)
        {
            isInitialUpdateDone = true;
            for(var i = 0; i < standardItems.sensorOutputItems.length; i++)
            {
                updateSensorValue([0, 0, lookup.getSensorId(standardItems.sensorOutputItems[i].sensorName)], -1);
            }
            for(var i = 0; i < actuatorData.getActuatorCount(); i++)
            {
                updateActuatorValue([0, 0, i], -1);
                setInterlockStatus([2, 47, i], actuatorData.interlockStatus(i).num);
            }
        }
    };
    var setState = this.setState;

    this.cleanUp = function()
    {
        window.clearTimeout(updateTimer);
        updateTimer = null;
        mainData.remCallbacks(callbacks);
        wTools.removeCallbacks(registeredCallbacks);
    };

    //#########################################################################
    // Callbacks
    var initCallback = function()
    {
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];

        fillStandardItems(standardItems);

        // mainData.addCallback([0, 11], setState);
        // registeredCallbacks.push([[0, 11], setState]);

        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }
    };

    const updateActuatorValue = function(a_address, a_data)
    {
        // var
        var actuatorId              = a_address[2];
        if(actuatorData.polarity(actuatorId).num)
        {
            var $positive = $("#outputActuator"+actuatorId+"p");
            var $negative = $("#outputActuator"+actuatorId+"n");
            if(actuatorData.value(actuatorId).num > 0)
            {
                $positive.html(actuatorData.value(actuatorId).str);
                $negative.html(0);
            }
            else if(actuatorData.value(actuatorId).num < 0)
            {
                $positive.html(0);
                $negative.html(actuatorData.value(actuatorId).str);
            }
            else
            {
                $positive.html(0);
                $negative.html(0);
            }
        }
        else
        {
            var $value = $("#outputActuator"+actuatorId);
            if(actuatorData.domain(actuatorId).num == 1)
            {
                var status = "(Off)";
                if(actuatorData.active(actuatorId).num == 1)
                {
                    status = "(On)";
                }
                $value.html(status + " " + actuatorData.value(actuatorId).str);
            }
            else if(actuatorId == 18 || (actuatorId >= 35 && actuatorId <= 45)) // Stirrer out && MFC's
            {
                $value.html(actuatorData.value(actuatorId).str + " (" + actuatorData.setpoint(actuatorId).str + ")");
                mainData.updateData([2, 50, actuatorId]);
            }
            else
            {
                $value.html(actuatorData.value(actuatorId).str);
            }

        }
    }

    const updateSensorValue = function(a_address, a_data)
    {
        var sensorId = a_address[2];
        if(sensorId > -1)
        {
            var $value = $("#outputSensor"+sensorId);
            $value.html(sensorData.output(sensorId).str);
        }
    };

    const updateExternalSensorValue = function(a_address, a_data)
    {
        var sensorId = a_address[2];
        if(sensorId > -1)
        {
            var $external = $("div[id*='outputExternalLoop"+sensorId+"']");
            if($external.length > 0)
            {
                var elementId = $external.attr("id").replace("outputExternalLoop", "");
                elementId = elementId.substr(0, elementId.length - 1);
                if(elementId == sensorId)
                {
                    $external.html(sensorData.output(sensorId).str);
                }
            }
        }
    };

    const setInterlockStatus = function(a_address, a_data)
    {
        var actuatorId              = a_address[2];

        if(actuatorData.polarity(actuatorId).num)
        {
            var $positive = $("#outputActuator"+actuatorId+"p").parent().find(".actuatorName");
            var $negative = $("#outputActuator"+actuatorId+"n").parent().find(".actuatorName");
            if(Number(a_data) == 1)
            {
                $positive.addClass("interlocked");
                $negative.addClass("interlocked");
            }
            else
            {
                $positive.removeClass("interlocked");
                $negative.removeClass("interlocked");
            }
        }
        else
        {
            var $row = $("#outputActuator"+actuatorId).parent().find(".actuatorName");
            if(Number(a_data) == 1)
            {
                $row.addClass("interlocked");
            }
            else
            {
                $row.removeClass("interlocked");
            }
        }
    }

    //#########################################################################
    // Events

    // const updateValues = function()
    // {
    //     for(var i = 0; i < standardItems.sensorOutputItems.length; i++)
    //     {
    //         updateSensorValue([0,0,lookup.getSensorId(standardItems.sensorOutputItems[i].sensorName)], -1);
    //     }
    //     for(var i = 0; i < actuatorData.getActuatorCount(); i++)
    //     {
    //         if(actuatorData.available(i).num >= 3)
    //         {
    //             updateActuatorValue([0,0,i], -1);
    //         }
    //     }
    //
    //     if(updateTimer == null)
    //     {
    //         updateTimer = setTimeout(requestValues, UPDATEINTERVAL);
    //     }
    // };

    //#########################################################################
    // Helper functions

    const getAssignedActuatorsAndPosition = function(a_sensorId)
    {
        var actuators = [];

        if( (a_sensorId >= 0) && (a_sensorId < sensorData.getSensorCount()) )
        {
            //Check all the actuators if they are connected to the sensor
            for(var acts = 0; acts < actuatorData.getActuatorCount(); ++acts)
            {
                if(actuatorData.assigned(acts).num == a_sensorId)
                {
                    actuators.push({
                        name:actuatorData.name(acts).str,
                        id: acts,
                        position: actuatorData.position(acts).num,
                        type: "actuator"
                    });
                    if(actuatorData.polarity(acts).num)
                    {
                        actuators.push({
                            name:actuatorData.name(acts).str,
                            id: acts,
                            position: actuatorData.position(acts).num * -1,
                            type: "actuator"
                        });
                    }
                }
                if(acts < sensorData.getSensorCount() && sensorData.assigned(acts).num == a_sensorId)
                {
                    actuators.push({
                        name:sensorData.name(acts).str,
                        id: acts,
                        position: sensorData.position(acts).str,
                        type: "sensor"
                    });
                }
            }
        }
        return actuators;
    }

    // const requestValues = function()
    // {
    //     window.clearTimeout(updateTimer);
    //     updateTimer = null;
    //     registeredCallbacks.push([[0, 0 ,1], updateValues]);
    //     mainData.addCallback([0, 0 ,1], updateValues);
    //
    //     for(var i = 0; i < standardItems.sensorOutputItems.length; i++)
    //     {
    //         mainData.updateData([1, 17, lookup.getSensorId(standardItems.sensorOutputItems[i].sensorName)]); // output
    //     }
    //     for(var i = 0; i < actuatorData.getActuatorCount(); i++)
    //     {
    //         if(actuatorData.available(i).num >= 3)
    //         {
    //             mainData.updateData([2, 12, i]); // value
    //         }
    //     }
    //
    //     mainData.updateData([0, 0, 1]);
    // };

    //#########################################################################
    // Constructor
    var doneInitCallback;
    var registeredCallbacks = new Array();
    var items               = new Array();
    var wi                  = new windowItems();
    var isInitialUpdateDone = false;
    var updateTimer         = null;
    const UPDATEINTERVAL    = 1000;
    var counter = 0;
    var callbacks           = {};

    var standardItems                   = new Array();
    standardItems.sensorOutputItems     = [];
    standardItems.actuatorOutputItems   = [];
    this.standardItems                  = standardItems;

    return this;
};

