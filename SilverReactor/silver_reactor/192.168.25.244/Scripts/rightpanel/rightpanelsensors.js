function rightPanelSensors()
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
        data.updateData([1, 0]); // default name
        data.updateData([1, 1]); // name
        data.updateData([1, 2]); // priority
        data.updateData([1, 3]); // unit
        data.updateData([1, 11]); // available
        data.updateData([1, 13]); // ctrData.setpoint
        data.updateData([1, 14]); // active
        data.updateData([1, 15]); // value
        data.updateData([1, 16]); // inLoop
        data.updateData([1, 17]); // output
        data.updateData([1, 19]); // type
        data.updateData([1, 37]); // domain
        data.updateData([1, 52]); // assigned
        data.updateData([1, 58]); // decimals
        data.updateData([1, 59]); // alertStatus
        data.updateData([2, 4]); // factor
        data.updateData([2, 7]); // assigned
        data.updateData([2, 8]); // position
        data.updateData([2, 37]);  // TGFCarrier
        data.updateData([2, 39]);  // TGFStatus
        data.updateData([3, 58]); // feedCalib
        data.updateData([3, 83]); // feedPaused
    };

    var fillStandardItems = function(a_items)
    {
        standardItems.sensors = [];
        var sensorsPriority = lkup.getPrioritisedSensors();
        // console.log(sensorsPriority);
        for(var i = 0; i < sensorsPriority.length; i++)
        {

            var sensorId = lkup.getSensorId(sensorsPriority[i]);
            if(senData.available(sensorId).num >= 4)
            {
                var inputEnabled = true;
                if(senData.domain(sensorId).num == 1) // digital
                {
                    inputEnabled = false;
                }

                var sensor = {
                    type:"sensorOverviewItem",
                    id: sensorId,
                    name: senData.name(sensorId).str,
                    icon: lkup.getSensorImageUrl(sensorId),
                    unit: senData.unit(sensorId).str.substr(0, 6),
                    inputEnabled: inputEnabled,
                    start: startControlLoop,
                    pause: pauseControlLoop,
                    stop: stopControlLoop,
                    input: requestSetpointDialogInformation,
                    windowData:this
                };

                standardItems.sensors.push(sensor);

                callbacks["alertStatus" + i] = data.registerCallback(updateActiveStatus, [1, 59, sensorId]);
                // senData.alertStatus(sensorId, null, {add:true, caller:this});

                callbacks["sensorValue" + i] = data.registerCallback(updateActiveStatus, [1, 14, sensorId]);
                // senData.active(sensorId, null, {add:true, caller:this});

                callbacks["sensorActive" + i] = data.registerCallback(updateValue, [1, 15, sensorId]);
                senData.value(sensorId, null, {add:true, caller:updateValue});

                callbacks["feedActive" + i] = data.registerCallback(updateActiveStatus, [3, 83, sensorId]);
                // ctrData.feedPaused(sensorId, null, {add:true, caller:this});
            }
        }

        for(var i = 0; i < actuatorData.getActuatorCount(); i++)
        {
            callbacks["TGFStatus" + i] = data.registerCallback(updateTGFStatus, [2, 39, i]);
        }

    };

    this.buildUp = function()
    {
        var $elements = $("<div></div>");
        var sensors = wi.convertItemsToElements(standardItems.sensors);
        var $sensorArea = $("<div class='windowContent rightSensorArea'></div>");
        var $buttonArea = $("<div class='windowContent rightSensorsButtons'></div>");
        $sensorArea.append(sensors);
        $buttonArea.append(wi.convertItemsToElements([standardItems.allControllers, standardItems.gasFlow]));
        // standardItems.allControllers
        $elements.append($sensorArea);
        $elements.append($buttonArea);
        return $elements.children();
    };

    // this.setState = function()
    const setState = function()
    {
        if(!isInitialUpdateDone)
        {
            // console.log(standardItems.sensors.length);
            isInitialUpdateDone = true;
            for(var i = 0; i < standardItems.sensors.length; i++)
            {
                updateActiveStatus([0, 0, standardItems.sensors[i].id], -1);
                updateValue([0, 0, standardItems.sensors[i].id], -1)
            }
        }

        if(user.loggedIn())
        {
            for(var i = 0; i < standardItems.sensors.length; i++)
            {
                updateActiveStatus([0, 0, standardItems.sensors[i].id], -1);
                updateValue([0, 0, standardItems.sensors[i].id], -1)
            }

            setGeneralControls();
            setTGFControls();
        }
        else
        {
            $(".rightPanel .start").prop("disabled", true);
            $(".rightPanel .pause").prop("disabled", true);
            $(".rightPanel .stop").prop("disabled", true);
            $(".rightPanel .sensorOverviewInput input").prop("disabled", true);
        }
    };
    this.setState = setState;

    this.cleanUp = function()
    {
        // for(var i = 0; i < actuatorData.getActuatorCount(); i++)
        // {
        //     var address = [2, 39, i]; //TGFStatus
        //     // registeredCallbacks.push([address, updateTGFStatus]);
        //     // data.addCallback(address, updateTGFStatus);
        //     actData.TGFStatus(i, null, {add:false, caller:this});
        //
        // }
        wTools.removeCallbacks(registeredCallbacks);
        data.remCallbacks(callbacks);
    };

    //#########################################################################
    // Callbacks
    var initCallback = function()
    {
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];

        fillStandardItems(standardItems);


        // data.addCallback([0, 11], setState);
        // registeredCallbacks.push([[0, 11], setState]);
        callbacks["setStateRightPanelSensors"] = data.registerCallback(setState, [0, 11]);

        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }

        alterGeneralControls()
        updateTGFStatus();
    };

    const updateActiveStatus = function(a_address, a_data)
    {


        var sensorId            = a_address[2];
        var active              = senData.active(sensorId).num;
        var interlockStatus     = senData.interlockStatus(sensorId).num;
        var alarmStatus         = senData.alarmStatus(sensorId).num;
        var alertStatus         = senData.alertStatus(sensorId).num;
        var setpoint            = ctrData.setpoint(sensorId).str;
        var calibrationRunning  = !(senData.calibState(sensorId).num == 0);
        var $sensorOverviewItem = $("#sensorOverviewItem_"+sensorId);
        var $startButton        = $sensorOverviewItem.find(".start");
        var $stopButton         = $sensorOverviewItem.find(".stop");
        var $pauseButton         = $sensorOverviewItem.find(".pause");
        var $input              = $sensorOverviewItem.find("input");

        data.updateData([1, 17, sensorId]); // ctrData.output

        // data.updateData([1,13, sensorId]); // ctrData.setpoint

        if($input.length && user.loggedIn())
        {
            $input.prop("disabled", false);
            // $input.val(setpoint);
        }

        if(lkup.hasActuators(sensorId) || lkup.isInLoop(sensorId))
        {
            if(senData.type(sensorId).num == 4)
            {
                if(!$input.hasClass("invisible"))
                {
                    $input.addClass("invisible");
                }
            }
            else
            {
                $input.removeClass("invisible");
            }
            if(active == 1)
            {

                if(senData.type(sensorId).num == 4) // feed
                {
                    if(ctrData.feedPaused(sensorId).num)
                    {
                        if($pauseButton.length > 0)
                        {
                            $pauseButton.prop("disabled", false);
                            $pauseButton.removeClass("pause");
                            $pauseButton.addClass("start");
                            $pauseButton.off();
                            $pauseButton.on("click", startControlLoop);
                        }
                        // $startButton.prop("disabled", false);
                        // $pauseButton.prop("disabled", true);
                        $stopButton.prop("disabled", false);

                    }
                    else
                    {
                        if($startButton.length > 0)
                        {
                            $startButton.prop("disabled", false);
                            $startButton.removeClass("start");
                            $startButton.addClass("pause");
                            $startButton.off();
                            $startButton.on("click", pauseControlLoop);
                        }
                        // $startButton.prop("disabled", true);
                        // $pauseButton.prop("disabled", false);
                        $stopButton.prop("disabled", false);
                    }
                }
                else
                {
                    $startButton.prop("disabled", true);
                    $pauseButton.prop("disabled", true);
                    $stopButton.prop("disabled", false);
                }
            }
            else
            {
                if(senData.type(sensorId).num == 4 && $pauseButton.length > 0) // feed
                {
                    $pauseButton.prop("disabled", false);
                    $pauseButton.removeClass("pause");
                    $pauseButton.addClass("start");
                    $pauseButton.off();
                    $pauseButton.on("click", startControlLoop);
                }
                $startButton.prop("disabled", false);
                $pauseButton.prop("disabled", true);
                $stopButton.prop("disabled", true);
            }

            if( senData.type(sensorId).num == 2 ) // If an external loop is configured (type = 2)
            {
                //Hide the button for stirrer when it is added as an loop sensor
                var assignedSensor = senData.assigned(sensorId).num;
                if( ( assignedSensor != -1 ) && senData.active(assignedSensor).num == 1 )
                {

                    if($input.length)
                    {
                        // var controllerOutput = Number(senData.output(sensorId).num);
                        var firstAct = 0;
                        for(var actuatorId = 0; actuatorId < actData.getActuatorCount(); actuatorId++)
                        {
                            //find the first positive actuator assigned to the loop and get its factor
                            if( (actData.assigned(actuatorId).num == sensorId) && (actData.position(actuatorId).num > 0) )
                            {
                                firstAct = actuatorId;
                                break;
                            }
                        }

                        // var convertedOutput = controllerOutput * (factorFirstAct / 100);
                        data.updateData([2, 50, firstAct]);
                        if(actData.setpoint(firstAct).str != "undefined")
                        {
                            $input.val(actData.setpoint(firstAct).num.toFixed(senData.decimals(sensorId).num));
                        }
                        $input.prop("disabled", true);
                    }
                    $startButton.prop("disabled", true);
                    $stopButton.prop("disabled", true);
                }
                else
                {
                    if(active == 1)
                    {
                        $startButton.prop("disabled", true);
                        $stopButton.prop("disabled", false);
                    }
                    else
                    {
                        $startButton.prop("disabled", false);
                        $stopButton.prop("disabled", true);
                    }

                }
            }
            else
            {
                if($input.length && user.loggedIn())
                {
                    $input.prop("disabled", false);
                }
            }
        }
        else
        {
            // console.log(sensorId + " " + hasActuators(sensorId) + " " + isInLoop(sensorId));
            $startButton.prop("disabled", true);
            // $pauseButton.prop("disabled", true);
            $stopButton.prop("disabled", true);
            $input.addClass("invisible");
        }

        if(!user.loggedIn())
        {
            $startButton.prop("disabled", true);
            $pauseButton.prop("disabled", true);
            $stopButton.prop("disabled", true);
        }
        else
        {
            setGeneralControls();
            // setTGFControls();
        }


        $sensorOverviewItem.removeClass(function (index, className) {
            return (className.match (/(^|\s)border\S+/g) || []).join(' ');
        });

        switch(alertStatus)
        {
            case 1:
            {
                $sensorOverviewItem.addClass("borderGreen");
            }
            break;
            case 2:
            {
                $sensorOverviewItem.addClass("borderYellow");
            }
            break;
            case 3:
            {
                $sensorOverviewItem.addClass("borderRed");
            }
            break;
            default:
            {
                $sensorOverviewItem.addClass("borderGray");
            }
            break;
        }
    };

    const updateValue = function(a_address, a_data)
    {
        var sensorId = a_address[2];
        data.updateData([1,13, sensorId]); // ctrData.setpoint
        data.updateData([1,17]); // ctrData.output
        data.updateData([1, 52]); // assigned

        var $sensorOverviewItem     = $("#sensorOverviewItem_"+sensorId);
        var $input                  = $sensorOverviewItem.find("input");
        var $sensorOverviewValue    = $sensorOverviewItem.find(".sensorOverviewValue");


        $sensorOverviewValue.html(senData.value(sensorId).str);

        if( senData.type(sensorId).num == 2 ) // If an external loop is configured (type = 2)
        {
            //Hide the button for stirrer when it is added as an loop sensor
            var assignedSensor = senData.assigned(sensorId).num;
            if( ( assignedSensor != -1 ) && senData.active(assignedSensor).num == 1 )
            {

                if($input.length)
                {
                    // var controllerOutput = Number(senData.output(sensorId).num);
                    var firstAct = 0;
                    for(var actuatorId = 0; actuatorId < actData.getActuatorCount(); actuatorId++)
                    {
                        //find the first positive actuator assigned to the loop and get its factor
                        if( (actData.assigned(actuatorId).num == sensorId) && (actData.position(actuatorId).num > 0) )
                        {
                            firstAct = actuatorId;
                            break;
                        }
                    }

                    // var convertedOutput = controllerOutput * (factorFirstAct / 100);
                    data.updateData([2, 50, firstAct]);
                    if(actData.setpoint(firstAct).str != "undefined")
                    {
                        $input.val(actData.setpoint(firstAct).num.toFixed(senData.decimals(sensorId).num));
                    }
                }
            }
            else
            {
                $input.val(ctrData.setpoint(sensorId).str);
            }
        }
        else
        {
            $input.val(ctrData.setpoint(sensorId).str);
        }
    };

    const updateTGFStatus = function(a_address, a_data)
    {
        var $element = $("#sensorOverviewItem_"+standardItems.gasFlow.id);
        if(isTGFActive())
        {
            $element.removeClass("borderAppBlue");
            $element.addClass("borderGreen");
        }
        else
        {
            $element.addClass("borderAppBlue");
            $element.removeClass("borderGreen");
        }

        setTGFControls();
    };

    //#########################################################################
    // Events
    const startControlLoop = function()
    {
        var $startButton = $(this);
        // var $pauseButton = $(this).parent().find(".pause");
        var $stopButton = $(this).parent().find(".stop");
        var sensorId = Number($startButton.attr("sensorid"));

        if(senData.type(sensorId).num == 4) // feed
        {
            $startButton.prop("disabled", false);
            $startButton.removeClass("start");
            $startButton.addClass("pause");
            $startButton.off();
            $startButton.on("click", pauseControlLoop);

            if( ctrData.feedPaused(sensorId).num && senData.active(sensorId).num )
            {
                $stopButton.prop("disabled", false);
                ctrData.feedPaused(sensorId, 0);
            }
            else
            {
                $stopButton.prop("disabled", false);
                senData.active(sensorId, 1);
            }
        }
        else
        {
            $startButton.prop("disabled", true);
            $stopButton.prop("disabled", false);

            senData.active(sensorId, 1);
        }
    };

    const pauseControlLoop = function()
    {
        // var $startButton = $(this).parent().find(".start");
        var $pauseButton = $(this);
        var $stopButton = $(this).parent().find(".stop");
        var sensorId = Number($pauseButton.attr("sensorid"));

        $pauseButton.removeClass("pause");
        $pauseButton.addClass("start");
        $pauseButton.off();
        $pauseButton.on("click", startControlLoop);

        // $startButton.prop("disabled", false);
        // $pauseButton.prop("disabled", true);
        $stopButton.prop("disabled", false);

        // console.log(sensorId);
        ctrData.feedPaused(sensorId, 1);
    };

    const stopControlLoop = function()
    {
        var $startButton = $(this).parent().find(".start");
        var $pauseButton = $(this).parent().find(".pause");
        var $stopButton = $(this);
        var sensorId = Number($stopButton.attr("sensorid"));

        // if($pauseButton.length > 0)
        // {
        //     $pauseButton.removeClass("pause");
        //     $pauseButton.addClass("start");
        //     $pauseButton.off();
        //     $pauseButton.on("click", startControlLoop);
        // }
        // $startButton.prop("disabled", false);
        $stopButton.prop("disabled", true);

        ctrData.feedPaused(sensorId, 0);
        senData.active(sensorId, 0);
    };

    const requestStartControllerCodes = function()
    {
        // registeredCallbacks.push([[0, 0 ,1], startAllControllers]);
        // data.addCallback([0, 0 ,1], startAllControllers);
        callbacks["startAllControllers"] = data.registerCallback(startAllControllers);
        data.updateData([1,11]); // available
        data.updateData([1,14]); // active
        data.updateData([1,16]); // inLoop
        data.updateData([3,58]); // feedCalib
        data.updateData(callbacks["startAllControllers"].address);
    };

    const startAllControllers = function()
    {
        // data.removeCallback(CALLBACKADDRESS, startAllControllers);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([CALLBACKADDRESS, startAllControllers]),1);
        data.remCallback(callbacks["startAllControllers"]);
        for (var i = 0; i < senData.getSensorCount(); ++i)
        {
            if(!senData.active(i).num && senData.available(i).num == 4 && senData.inLoop(i).num && ctrData.feedCalib(i).num == 0)
            {
                senData.active(i, 1);
            }
        }
    };

    const requestStopControllerCodes = function()
    {
        // registeredCallbacks.push([[0, 0 ,1], stopAllControllers]);
        // data.addCallback([0, 0 ,1], stopAllControllers);
        callbacks["stopAllControllers"] = data.registerCallback(stopAllControllers);
        data.updateData([1,14]); // active
        data.updateData([1,19]); // type
        data.updateData([3,83]); // feedPaused
        data.updateData(callbacks["stopAllControllers"].address);

        // stopTGF();
    };

    const stopAllControllers = function()
    {
        // data.removeCallback(CALLBACKADDRESS, stopAllControllers);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([CALLBACKADDRESS, stopAllControllers]),1);
        data.remCallback(callbacks["stopAllControllers"]);
        for (var i = 0; i < senData.getSensorCount(); ++i)
        {
            if(senData.active(i).num)
            {
                if(senData.type(i).num == 4 && ctrData.feedPaused(i).num)
                {
                    ctrData.feedPaused(i, 0);
                }
                senData.active(i, 0);
            }
        }
    };

    const requestStartTGFCodes = function()
    {
        var $gasFlowControllers = $("#sensorOverviewItem_" + standardItems.gasFlow.id);
        var $startButton = $gasFlowControllers.find(".start");
        var $stopButton = $gasFlowControllers.find(".stop");

        // $startButton.prop("disabled", true);
        // $stopButton.prop("disabled", false);

        // registeredCallbacks.push([[0, 0 ,1], startTGF]);
        // data.addCallback([0, 0 ,1], startTGF);
        callbacks["startTGF"] = data.registerCallback(startTGF);
        for (var i = 38; i < 46; ++i) // MFCs
        {
            data.updateData([2,4,i]); // factor
            data.updateData([2,37,i]); // TGFCarrier
            data.updateData([2,39,i]); // TGFStatus
            data.updateData([2,40,i]); // TGFFlow
            data.updateData([2,41,i]); // TGFMaxFlow
        }
        data.updateData(callbacks["startTGF"].address);
        // startTGF();
    };

    const startTGF = function()
    {
        // data.removeCallback(CALLBACKADDRESS, startTGF);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([CALLBACKADDRESS, startTGF]),1);
        data.remCallback(callbacks["startTGF"]);
        var isOutsideLimits = false;
        var actuators = [];
        for (var i = 38; i < 46; ++i) // MFCs
        {
            if(actData.TGFCarrier(i).num == 1 && actData.TGFStatus(i).num == 0)
            {
                var val = actData.TGFFlow(i).num;
                var min = actData.TGFMaxFlow(i).num;
                var max = actData.factor(i).num;
                if (val >= min && val <= max)
                {
                    actuators.push(i);
                    // actData.TGFStatus(i, 1);
                }
                else
                {
                    // console.log("Outside of limits");
                    isOutsideLimits = true;
                }
            }
        }
        if(actuators.length > 0)
        {
            if(callbacks["setTGFControls"] != undefined)
            {
                data.remCallback(callbacks["setTGFControls"]);
            }
            callbacks["setTGFControls"] = data.registerCallback(setTGFControls);
            // registeredCallbacks.push([[0, 0 ,1], setTGFControls]);
            // data.addCallback([0, 0 ,1], setTGFControls);
            for(var i = 0; i < actuators.length; i++)
            {
                actData.TGFStatus(actuators[i], 1);
            }
            data.updateData(callbacks["setTGFControls"].address);
        }

        // setTGFControls();
    };

    const requestStopTGFCodes = function()
    {
        var $gasFlowControllers = $("#sensorOverviewItem_" + standardItems.gasFlow.id);
        var $startButton = $gasFlowControllers.find(".start");
        var $stopButton = $gasFlowControllers.find(".stop");

        // $startButton.prop("disabled", false);
        // $stopButton.prop("disabled", true);

        // registeredCallbacks.push([[0, 0 ,1], stopTGF]);
        // data.addCallback([0, 0 ,1], stopTGF);
        callbacks["stopTGF"] = data.registerCallback(stopTGF);
        for (var i = 38; i < 46; ++i) // MFCs
        {
            data.updateData([2,37,i]); // TGFCarrier
            data.updateData([2,39,i]); // TGFStatus
        }
        data.updateData(callbacks["stopTGF"].address);
        stopTGF();
    };

    const stopTGF = function()
    {
        // data.removeCallback(CALLBACKADDRESS, stopTGF);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([CALLBACKADDRESS, startTGF]),1);
        data.remCallback(callbacks["stopTGF"]);
        var actuators = [];
        for (var i = 38; i < 46; ++i) // MFCs
        {
            if(actData.TGFCarrier(i).num == 1 && actData.TGFStatus(i).num == 1)
            {
                actuators.push(i);
                actData.TGFStatus(i, 0);
            }
        }
        if(actuators.length > 0)
        {
            if(callbacks["setTGFControlsStop"] != undefined)
            {
                data.remCallback(callbacks["setTGFControlsStop"]);
            }
            callbacks["setTGFControlsStop"] = data.registerCallback(setTGFControls);
            // registeredCallbacks.push([[0, 0 ,1], setTGFControls]);
            // data.addCallback([0, 0 ,1], setTGFControls);
            for(var i = 0; i < actuators.length; i++)
            {
                actData.TGFStatus(actuators[i], 0);
            }
            data.updateData(callbacks["setTGFControlsStop"].address);
        }

        // setTGFControls();
    };

    const requestSetpointDialogInformation = function()
    {
        requestedSensor    = Number($(this).attr("sensorid"));
        callbacks["createSetpointDialog"] = data.registerCallback(createSetpointDialog);
        // data.addCallback([0, 0 ,1], createSetpointDialog);
        // registeredCallbacks.push([[0, 0 ,1], createSetpointDialog]);
        data.updateData([1, 4, requestedSensor]); // alarmLimitLow
        data.updateData([1, 5, requestedSensor]); // alarmLimitHigh
        data.updateData([1, 13, requestedSensor]); // setpoint
        data.updateData([2, 4]); // factor
        data.updateData([2, 7]); // assigned
        data.updateData([2, 9]); // limitHigh
        data.updateData([2, 10]); // limitLow
        data.updateData(callbacks["createSetpointDialog"].address);
    };

    const createSetpointDialog = function()
    {
        // data.removeCallback(CALLBACKADDRESS, createSetpointDialog);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([CALLBACKADDRESS, createSetpointDialog]),1);
        data.remCallback(callbacks["createSetpointDialog"]);
        var sensorId    = requestedSensor;
        // console.log();
        var text        = "Enter setpoint";
        if(actuatorLimitsActive(sensorId))
        {
            text += "<br><span style='color:red'>Actuator limits are set</span>";
        }
        var min         = senData.alarmLimitLow(sensorId);
        var max         = senData.alarmLimitHigh(sensorId);
        var $row        = $("<div class='row sensorOverviewItem borderBlue' id='sensorOverviewSetpoint_"+sensorId+"'></div>");
        var $itemText   = $("<div class='item enterSetpointText'>" + text + "</div>");
        var $limitNames = $("<div class='item limitNames'><div class='max'>Max</div><div class='min'>Min</div></div>");
        var $limits     = $("<div class='item limits'><div class='max'>: "+max.str +"</div><div class='min'>: "+ min.str +"</div></div>");
        var $inputField = $("<div class='item sensorOverviewInput'><input id='sensorOverviewSetpoint_"+ sensorId +"' min='"+ min.num +"' max='"+ max.num +"' type='text' value='"+ ctrData.setpoint(sensorId).str +"' jcodegroup='1' jcodeid='13'></input></div>");
        var $unit       = $("<div class='item sensorOverviewUnit'>"+ senData.unit(sensorId).str +"</div>");
        var $acceptArea = $("<div id='setpointAcceptArea' class='item setpointAcceptArea'></div>");
        var $cancel     = $("<img id='cancelSetpoint' src='images/cancel.png'></img>");
        var $accept     = $("<img id='acceptSetpoint' src='images/accept.png'></img>");

        $inputField.on("keyup", validateSetpoint);

        $cancel.on("click", function(){
            removeSetpointDialog(sensorId);
        });
        $accept.on("click", function(){
            acceptSetpoint(sensorId);
        });

        $accept.attr("tabindex", -1);
        $cancel.attr("tabIndex", -1);
        $acceptArea.append($accept);
        $acceptArea.append($cancel);

        $row.append($itemText);
        $row.append($limitNames);
        $row.append($limits);
        $row.append($inputField);
        $row.append($unit);

        $row.append($acceptArea);

        $row.on("focusout", function(){
            var parent = this;
            // add small delay so the active element can be established
            setTimeout(function(){
                if($(parent).has(document.activeElement).length == 0)
                {
                    removeSetpointDialog(sensorId);
                }
            }, 1);
        });
        // Hide the row so it can be animated
        $row.css("display", "none");
        $row.insertAfter($("#sensorOverviewItem_"+sensorId));
        $row.fadeIn(250);
        // Select the input text
        $("#sensorOverviewSetpoint_"+ sensorId + " input").keyup();
        $("#sensorOverviewSetpoint_"+ sensorId + " input").select();
    };

    const removeSetpointDialog = function(a_sensorId)
    {
        $("#sensorOverviewSetpoint_"+a_sensorId).fadeOut(250, function(){
                $("#sensorOverviewSetpoint_"+a_sensorId).remove();
        });
    };

    const acceptSetpoint = function(a_sensorId)
    {
        // console.log($("#sensorOverviewSetpoint_" + a_sensorId + " input").val());
        ctrData.setpoint(a_sensorId, $("#sensorOverviewSetpoint_" + a_sensorId + " input").val());
        removeSetpointDialog(a_sensorId);
    };

    const validateSetpoint = function(ptr)
    {
        // console.log(a_input);
        var inputId     = ptr.target.id;
        var input       = $("#"+inputId + " input")[0];
        var inputValue  = Number(input.value);
        var inputMax    = Number(input.max);
        var inputMin    = Number(input.min);
        var $input      = $("#"+inputId + " input");
        var step        = $input.attr("step");
        // console.log(step);

        if(inputValue <= inputMax && inputValue >= inputMin && $input.val() != "")
        {
            // valid
            $input.addClass("valid");
            $input.removeClass("invalid");
            $("#acceptSetpoint").removeClass("invisible");
        }
        else
        {
            // invalid
            $input.addClass("invalid");
            $input.removeClass("valid");
            $("#acceptSetpoint").addClass("invisible");
        }
    }

    const allControlsClick = function()
    {
        $("#navCellControls .navigationButton").click();
        $("#leftNavCellSensors").click();
    };

    const gasFlowClick = function()
    {
        $("#navCellControls .navigationButton").click();
        $("#leftNavCellGas").click();
    };

    //#########################################################################
    // Helper functions

    const actuatorLimitsActive = function(a_sensorId)
    {
        // console.log("checking " + senData.name(a_sensorId).str);
        if(a_sensorId != undefined && a_sensorId < senData.getSensorCount() && a_sensorId > -1)
        {
            for(var actuator = 0; actuator < actData.getActuatorCount(); actuator++)
            {
                // console.log("Assigned? " + actData.name(actuator).str);
                if(a_sensorId === actData.assigned(actuator).num)
                {
                    // console.log("checking " + actData.name(actuator).str);
                    var convMax = (actData.limitHigh(actuator).num / actData.factor(actuator).num ) * 100;
                    var convMin = (actData.limitLow(actuator).num / actData.factor(actuator).num ) * 100;

                    if (convMax < 100 || convMin > 0)
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const setGeneralControls = function()
    {
        // data.removeCallback(CALLBACKADDRESS, setGeneralControls);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([CALLBACKADDRESS, setGeneralControls]),1);

        var isCarrier = false;
        var isAllActive = true;
        var isNonActive = true;

        for (var i = 0; i < senData.getSensorCount(); ++i)
        {
            if (senData.available(i).num == 4)
            {
                isCarrier = true;
                if (senData.active(i).num == 0 && senData.inLoop(i).num)
                {
                    isAllActive = false;
                }
                if (senData.active(i).num == 1)
                {
                    isNonActive = false;
                }
            }
        }

        var $allControllers = $("#sensorOverviewItem_" + standardItems.allControllers.id);
        var $startButton = $allControllers.find(".start");
        var $pauseButton = $allControllers.find(".pause");
        var $stopButton = $allControllers.find(".stop");

        if (isCarrier && user.loggedIn())
        {
            if (isAllActive)
            {
                $startButton.prop("disabled", true);
            }
            else
            {
                $startButton.prop("disabled", false);
            }

            if (isNonActive)
            {
                $stopButton.prop("disabled", true);
            }
            else
            {
                $stopButton.prop("disabled", false);
            }
        }
        else
        {
            $startButton.prop("disabled", true);
            $stopButton.prop("disabled", true);
        }
    };

    const setTGFControls = function()
    {
        var isCarrier = false;
        var isAllActive = true;
        var isNonActive = true;

        // for (var i = 38; i < 46; ++i) // MFCs
        // {
        for (var i = 0; i < actData.getActuatorCount(); i++)
        {
            if (actData.TGFCarrier(i).num == 1)
            {
                isCarrier = true;
                var status = actData.TGFStatus(i).num
                if (status == 0)
                {
                    isAllActive = false;
                }
                else if (status == 1)
                {
                    isNonActive = false;
                }
            }
        }

        var $gasFlowControllers = $("#sensorOverviewItem_" + standardItems.gasFlow.id);
        var $startButton = $gasFlowControllers.find(".start");
        var $pauseButton = $gasFlowControllers.find(".pause");
        var $stopButton = $gasFlowControllers.find(".stop");

        if (isCarrier && user.getLevel() >= user.OPERATOR)
        {
            if (isAllActive)
            {
                $startButton.prop("disabled", true);
            }
            else
            {
                $startButton.prop("disabled", false);
            }

            if (isNonActive)
            {
                $stopButton.prop("disabled", true);
            }
            else
            {
                $stopButton.prop("disabled", false);
            }
        }
        else
        {
            $startButton.prop("disabled", true);
            $stopButton.prop("disabled", true);
        }
    };

    const alterGeneralControls = function()
    {
        $allControls    = $("#sensorOverviewItem_" + standardItems.allControllers.id);
        $gasFlow        = $("#sensorOverviewItem_" + standardItems.gasFlow.id);

        $allControls.removeClass("borderGray").addClass("borderAppBlue");
        $gasFlow.removeClass("borderGray").addClass("borderAppBlue");

        $allControls.find(".sensorOverviewIcon").off().on("click", allControlsClick);
        $allControls.find(".sensorOverviewText").off().on("click", allControlsClick);
        $allControls.find(".sensorOverviewValue").off().on("click", allControlsClick);

        $gasFlow.find(".sensorOverviewIcon").off().on("click", gasFlowClick);
        $gasFlow.find(".sensorOverviewText").off().on("click", gasFlowClick);
        $gasFlow.find(".sensorOverviewValue").off().on("click", gasFlowClick);
    };

    const isTGFActive = function()
    {
        TGFActive = false;
        for (var i = 0; i < actuatorData.getActuatorCount(); ++i)
        {
            if (actuatorData.TGFStatus(i).num == 1)
            {
                TGFActive = true;
                break;
            }
        }
        return TGFActive;
    };
    //#########################################################################
    // Constructor
    var doneInitCallback;
    var CALLBACKADDRESS   = [0, 0, 1];
    var registeredCallbacks = [];
    var items               = [];
    var wi                  = new windowItems();
    var isInitialUpdateDone = false;
    var data                = mainData;
    var sysData             = systemData;
    var senData             = sensorData;
    var actData             = actuatorData;
    var ctrData             = controlData;
    var lkup                = lookup;
    var user                = User;
    var callbacks           = {};
    var requestedSensor;
    // var win                 = a_mainWindow;

    var standardItems               = new Array();
    standardItems.sensorTemplate    = { type:"sensorOverviewItem", id:"sensor0", icon:lkup.getSensorImageUrl(0), name:"pH", start:startControlLoop, pause:pauseControlLoop, stop:stopControlLoop, windowData:this};
    standardItems.sensors           = [];
    standardItems.allControllers    = {
        type:"sensorOverviewItem",
        id: "all",
        name: "All Controllers",
        icon: "images/tabicons/settings.png",
        unit: "",
        inputEnabled: false,
        start: requestStartControllerCodes,
        stop: requestStopControllerCodes,
        input: requestSetpointDialogInformation,
        windowData:this
    };

    standardItems.gasFlow    = {
        type:"sensorOverviewItem",
        id: "gas",
        name: "Total Gas Flow",
        icon: "images/sensoricons/green/do2.png",
        unit: "",
        inputEnabled: false,
        start: requestStartTGFCodes,
        stop: requestStopTGFCodes,
        input: requestSetpointDialogInformation,
        windowData:this
    };

    this.standardItems              = standardItems;

    return this;
};

