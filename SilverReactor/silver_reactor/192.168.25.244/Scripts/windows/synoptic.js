function synoptic()
{
    this.init = function(a_func)
    {
        doneInitCallback = a_func;

        // mainData.addCallback([0, 0, 0], initCallback);
        // registeredCallbacks.push([[0, 0, 0], initCallback]);
        // queryData();
        // mainData.updateData([0, 0, 0]);

        // callbacks["init"] = mainData.addCallback([0, 0, 0], initCallback);
        callbacks["init"] = mainData.registerCallback(initCallback);
        queryData();
        mainData.updateData(callbacks["init"].address);
    };

    var queryData = function()
    {
        mainData.updateData([0, 3]); // bioreactorSelection
        mainData.updateData([1, 1]); // priority
        mainData.updateData([1, 2]); // priority
        mainData.updateData([1, 3]); // unit
        mainData.updateData([1, 11]); // Availability
        mainData.updateData([1, 15]); // value
        mainData.updateData([1, 18]); // displaySyn
        mainData.updateData([2, 1]); // priority
        mainData.updateData([2, 2]); // priority
        mainData.updateData([2, 3]); // doseMonEnabled
        mainData.updateData([2, 5]); // unit
        mainData.updateData([2, 7]); // assigned
        mainData.updateData([2, 12]); // value
        mainData.updateData([2, 13]); // doseValue
        mainData.updateData([2, 14]); // displaySyn
        mainData.updateData([2, 21]); // Availability
    };

    this.buildUp = function()
    {
        var elements        = $("<div class='tableRow synoptic '></div>");
        var sensorCell      = $("<div class='tableCell sensorCell'></div>");
        var reactorCell     = $("<div class='tableCell reactorCell'></div>");
        var reactorImage    = getReactorImage();//iMan.$getImage("reactor");
        var sensorsPriority = lookup.getPrioritisedSensors();
        var actuatorsPriority = lookup.getPrioritisedActuators();
        var itemAmount  = 0;

        // for(var i = 0; i < sensorData.getSensorCount(); i++)
        // {
        //     sensorsPriority[sensorData.priority(i).num] = sensorData.defaultName(i).str;
        // }
        // for(var i = 0; i < actuatorData.getActuatorCount(); i++)
        // {
        //     actuatorsPriority[actuatorData.priority(i).num] = actuatorData.defaultName(i).str;
        // }

        for(var i = 0; i < sensorsPriority.length; i++)
        {
            var sensorId = lookup.getSensorId(sensorsPriority[i]);
            if(sensorData.available(sensorId).num == 4 && sensorData.displaySyn(sensorId).num)
            {
                // console.log()
                var synopticItem = $("<div class='synopticItem'></div>");
                var name = $("<div class='tableRow'><div class='tableCell'><div class='tableRow'><div class='tableCell  icon'><img src='"+lookup.getSensorImageUrl(sensorId)+"'></img></div><div class='tableCell name'>"+sensorData.name(sensorId).str+"</div></div></div></div>");
                var value = $("<div class='tableRow'><div class='tableCell value' type='sensor' itemid='" + sensorId + "'>"+getSensorValue(sensorId)+"</div></div>");
                value.on("click", function( event ){ wMan.loadWindow( "sensor", "windowwithtabs", undefined, event ) });

                synopticItem.append(name);
                synopticItem.append(value);
                sensorCell.append(synopticItem);

                // var address = [1, 15, sensorId];
                // registeredCallbacks.push([address, refreshSensorValue]);
                // mainData.addCallback(address, refreshSensorValue);
                // sensorData.value(sensorId, null, {add:true, caller:this});

                var address = [1, 15, sensorId];
                callbacks["refreshSensorValueSyn"] = mainData.addCallback(address, refreshSensorValue);
                sensorData.value(sensorId, null, {add:true, caller:this});

                itemAmount++;
                if(itemAmount == 8)
                {
                    break;
                }
            }
        }

        if(itemAmount < 8)
        {

            for(var i = 0; i < actuatorsPriority.length; i++)
            {
                var actuatorId = lookup.getActuatorId(actuatorsPriority[i]);
                if(actuatorData.available(actuatorId).num >= 3 && actuatorData.displaySyn(actuatorId).num)
                {
                    var synopticItem = $("<div class='synopticItem'></div>");
                    var name = $("<div class='tableRow'><div class='tableCell'><div class='tableRow'><div class='tableCell  icon'><img src='"+lookup.getSensorImageUrl(actuatorData.assigned(actuatorId).num)+"'></img></div><div class='tableCell name'>"+actuatorData.name(actuatorId).str+"</div></div></div></div>");
                    var value = $("<div class='tableRow'><div class='tableCell value' type='actuator' itemid='" + actuatorId + "'>" + getActuatorValue(actuatorId) + "</div></div>");
                    value.on("click", function( event ){ wMan.loadWindow( "actuator", "windowwithtabs", undefined, event ) });

                    synopticItem.append(name);
                    synopticItem.append(value)
                    sensorCell.append(synopticItem);

                    // var address = [2, 12, actuatorId];
                    // registeredCallbacks.push([address, refreshActuatorValue]);
                    // mainData.addCallback(address, refreshActuatorValue);
                    // actuatorData.value(actuatorId, null, {add:true, caller:this});

                    var address = [2, 12, actuatorId];
                    callbacks["actuatorValue"] = mainData.addCallback(address, refreshActuatorValue);
                    actuatorData.value(actuatorId, null, {add:true, caller:this});

                    // address = [2, 13, actuatorId];
                    // registeredCallbacks.push([address, refreshActuatorValue]);
                    // mainData.addCallback(address, refreshActuatorValue);
                    // actuatorData.doseValue(actuatorId, null, {add:true, caller:this});

                    address = [2, 13, actuatorId];
                    callbacks["doseValue"] = mainData.addCallback(address, refreshActuatorValue);
                    actuatorData.doseValue(actuatorId, null, {add:true, caller:this});

                    itemAmount++;
                    if(itemAmount == 8)
                    {
                        break;
                    }
                }
            }
        }
        elements.append(sensorCell);
        reactorCell.append(reactorImage);
        elements.append(reactorCell);
        return elements;
    };

    this.cleanUp = function()
    {
        // wTools.removeCallbacks(registeredCallbacks);
        mainData.remCallbacks(callbacks);
    };

    //#########################################################################
    // Callbacks
    var initCallback = function()
    {
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];
        // mainData.removeCallback([0, 0, 0], initCallback);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], initCallback]),1);

        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }
    };

    var refreshActuatorValue = function(a_address, data)
    {
        var actuatorId = Number(a_address[2]);
        $(".synopticItem [type='actuator'][itemid="+actuatorId+"]").html(getActuatorValue(actuatorId));
    };

    var refreshSensorValue = function(a_address, data)
    {
        var sensorId = Number(a_address[2]);
        $(".synopticItem [type='sensor'][itemid="+sensorId+"]").html(getSensorValue(sensorId));
    };

    //#########################################################################
    // Events

    //#########################################################################
    // Helper functions
    var getActuatorValue = function(a_actuatorId)
    {
        var dosemonitor = "";
        if(actuatorData.doseMonEnabled(a_actuatorId).num)
        {
            dosemonitor = "  (Ʃ " + actuatorData.doseValue(a_actuatorId).str + " " + actuatorData.unit(a_actuatorId).str + ")"
        }
        var value = actuatorData.value(a_actuatorId).str + " " + actuatorData.unit(a_actuatorId).str + dosemonitor;
        return value;
    };

    var getSensorValue = function(a_sensorId)
    {
        var value = sensorData.value(a_sensorId).str;
        var unit = sensorData.unit(a_sensorId).str;
        if(value == "undefined")
        {
            value = "0";
        }
        return value + " " + unit;
    };

    var getReactorImage = function()
    {
        switch(systemData.bioreactorSelection().num)
        {
            case 0: // Autoclavable
            {
                return $("<img src='images/synoptic/reactor.png'></img>");
            }
            break;
            case 1: // Rocker
            {
                return $("<img src='images/synoptic/appliflex.jpg'></img>");
            }
            break;
            case 2: // CellReady
            {
                return $("<img src='images/synoptic/cellready.jpg'></img>");
            }
            break;
            case 3: // HyPerforma
            {
                return $("<img src='images/synoptic/hyperforma.jpg'></img>");
            }
            break;
            // case 5: // Pad Mini
            case 6: // iCellis nano
            {
                return $("<img src='images/synoptic/icellis.jpg'></img>");
            }
            break;
            case 4: // Pad reactor 50
            case 7: // Pad reactor 1000
            {
                return $("<img src='images/synoptic/pad.jpg'></img>");
            }
            break;
            default:
            {
                return $("<img src='images/synoptic/reactor.png'></img>");
            }
            break;
        }
    }

    //#########################################################################
    // Constructor
    var doneInitCallback;
    var registeredCallbacks = new Array();
    var wi                  = new windowItems(-1);
    var callbacks           = {};

    return this;
};

