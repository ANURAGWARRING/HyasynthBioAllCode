// This function should be set up after the navigationManager
function alarmManager()
{
    this.init = function(a_func)
    {
        doneInitCallback = a_func;

        // mainData.addCallback([0, 0, 2], initCallback);
        // registeredCallbacks.push([[0, 0, 2], initCallback]);
        // queryData();
        // mainData.updateData([0, 0, 2]);

        callbacks["init"] = mainData.registerCallback(initCallback);
        queryData();
        mainData.updateData(callbacks["init"].address);
    };

    const initCallback = function()
    {
        // mainData.removeCallback([0, 0, 2], initCallback);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 2], initCallback]),1);
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];

        setAlarmCallbacks();
        // webVersionCheck();
        // handleSystemAlarm(65);
        handleAlarm([0,65],0);
        // handleLicenseAvailable(undefined, systemData.licenseAvailable().num);
        // handleUpdateAvailable(undefined, systemData.updateAvailable().num);
        // handleWebUpdateAvailable(undefined, systemData.webupdateAvailable().num);
    }

    const queryData = function()
    {
        mainData.updateData([0, 35]);
        mainData.updateData([0, 36]);
        mainData.updateData([0, 55]);
        mainData.updateData([0, 56]);
        mainData.updateData([0, 57]);
        mainData.updateData([0, 65]);
        mainData.updateData([0, 73]);
        mainData.updateData([0, 87]);

        mainData.updateData([1, 48]);
        mainData.updateData([1, 49]);
        mainData.updateData([1, 50]);

        mainData.updateData([2, 36]);
        mainData.updateData([2, 45]);
    };

    const createPanel = function()
    {
        var $title = $("<div class='row'><div class='item message title'>Alarms</div></div>");
        var $alarms = $("<div id='alarms' class='windowContent'></div>");
        var $button = wi.convertItemsToElements([standardItems.hideAlarmPanel]);
        // var $button = wi.button("hideAlarmPanel", "Hide Alarms", hideAlarmPanel, this);

        $alarmPanel.empty();
        $alarmPanel.append($title);
        $alarmPanel.append($alarms);
        $alarmPanel.append($button);

        // Make the div draggable
        $alarmPanel.draggable({cancel:"#alarms"});
    };

    const showHide = function()
    {
        if($alarmPanel.css("display") == "none" && $("#alarms .row").length > 0)
        {
            $alarmPanel.slideDown(100).css({
                top: "25vh",
                left: "50%"
            });
        }
        else if(User.loggedIn())
        {
            $alarmPanel.slideUp(100);
        }
    };
    this.showHide = showHide;

    const show = function()
    {
        $alarmPanel.slideDown(100).css({
            top: "25vh",
            left: "50%"
        });
    };

    const hide = function()
    {
        $alarmPanel.slideUp(100);
    };

    const setState = function()
    {
        if(!User.loggedIn())
        {
            $("#"+standardItems.hideAlarmPanel.id).prop("disabled", true);
            // if($alarmPanel.css("display") == "none")
            // {
            //     showHide();
            // }
        }
        else
        {
            $("#"+standardItems.hideAlarmPanel.id).prop("disabled", false);
        }

    };

    const setAlarmCallbacks = function()
    {
        for(var i = 0; i < sensorData.getSensorCount(); i++)
        {
            var address = [1, 48, i]; //interlockStatus
            // console.log(address);
            registeredCallbacks.push([address, handleAlarm]);
            mainData.addCallback(address, handleAlarm);
            handleAlarm(address, sensorData.interlockStatus(i).num);

            address = [1, 49, i]; //alarmStatus
            // console.log(address);
            registeredCallbacks.push([address, handleAlarm]);
            mainData.addCallback(address, handleAlarm);
            handleAlarm(address, sensorData.alarmStatus(i).num);

            address = [1, 50, i]; //connected
            // console.log(address);
            registeredCallbacks.push([address, handleAlarm]);
            mainData.addCallback(address, handleAlarm);
            handleAlarm(address, sensorData.connected(i).num);
        }

        for(var i = 0; i < actuatorData.getActuatorCount(); i++)
        {
            var address = [2, 36, i]; //alarms
            registeredCallbacks.push([address, handleAlarm]);
            mainData.addCallback(address, handleAlarm);
            handleAlarm(address, actuatorData.alarms(i).num);

            address = [2, 45, i]; //inhibitAlarm
            registeredCallbacks.push([address, handleAlarm]);
            mainData.addCallback(address, handleAlarm);
            handleAlarm(address, actuatorData.inhibitAlarm(i).num);
        }

        var address = [0, 55]; //cabinetTempAlarm
        registeredCallbacks.push([address, handleAlarm]);
        mainData.addCallback(address, handleAlarm);
        handleAlarm(address, systemData.cabinetTempAlarm().num);

        address = [0, 56]; //TGFWarningDO
        registeredCallbacks.push([address, handleAlarm]);
        mainData.addCallback(address, handleAlarm);
        handleAlarm(address, systemData.TGFWarningDO().num);

        address = [0, 57]; //TGFWarningpH
        registeredCallbacks.push([address, handleAlarm]);
        mainData.addCallback(address, handleAlarm);
        handleAlarm(address, systemData.TGFWarningpH().num);

        address = [0, 87]; //ExternalAlarm
        registeredCallbacks.push([address, handleAlarm]);
        mainData.addCallback(address, handleAlarm);
        handleAlarm(address, systemData.externalAlarm().num);
        // console.log(registeredCallbacks);

        // var address = [0, 35]; //licenseAvalable
        // registeredCallbacks.push([address, handleLicenseAvailable]);
        // mainData.addCallback(address, handleLicenseAvailable);
        // // handleAlarm(address, systemData.licenseAvalable().num);
        //
        // var address = [0, 36]; //updateAvalable
        // registeredCallbacks.push([address, handleUpdateAvailable]);
        // mainData.addCallback(address, handleUpdateAvailable);
        // // handleAlarm(address, systemData.updateAvalable().num);
        //
        // var address = [0, 73]; //webupdateAvailable
        // registeredCallbacks.push([address, handleWebUpdateAvailable]);
        // mainData.addCallback(address, handleWebUpdateAvailable);
        // // handleAlarm(address, systemData.webupdateAvailable().num);
    };

    const handleAlarm = function(a_address, a_data)
    {
        switch(Number(a_address[0]))
        {
            case 0:
            {
                handleSystemAlarm(Number(a_address[1]));
            }
            break;
            case 1:
            {
                handleSensorAlarm(Number(a_address[1]), Number(a_address[2]));
            }
            break;
            case 2:
            {
                // console.log(a_address)
                handleActuatorAlarm(Number(a_address[1]), Number(a_address[2]));
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Alarm unknown " + a_address);
                }
            }
            break;
        }

        if($("#alarms .row").length > 0)
        {
            nMan.addAlarmButton();
        }
        else
        {

            nMan.removeAlarmButton();
            hide();
        }
    };

    const handleSystemAlarm = function(a_alarm)
    {
        var addAlarm = false;
        var doNothing = false;
        var message = "";
        switch(a_alarm)
        {
            case 55: //interlockStatus
            {
                var alarm = systemData.cabinetTempAlarm().num;
                if(alarm)
                {
                    message = "<span style='color:red; font-weight:bold'>Warning:</span> Internal cabinet temperature is too high";
                    addAlarm = true;
                }
            }
            break;
            case 56: //TGFWarningDO
            {
                var alarm = systemData.TGFWarningDO().num;
                if(alarm)
                {
                    message = "Total Gas Flow regime might be limiting dO₂ control";
                    addAlarm = true;
                }
            }
            break;
            case 57: //TGFWarningpH
            {
                var alarm = systemData.TGFWarningpH().num;
                if(alarm)
                {
                    message = "Total Gas Flow regime might be limiting pH control";
                    addAlarm = true;
                }
            }
            break;
            case 65: //currentVersion
            {
                var controller = systemData.currentVersion().str.split(".");
                var allowed = versionAllowed.split(".");
                // var controllerVersionIsValid = true;

                if(allowed.length == controller.length)
                {
                    var correctSoftware = true;
                    if(allowed[0] != controller[0])
                    {
                        correctSoftware = false;
                    }
                    else if(Number(allowed[1]) > Number(controller[1]))
                    {
                        correctSoftware = false;
                    }
                    else if(Number(allowed[1]) < Number(controller[1]))
                    {
                        //intentionally left empty
                    }
                    else
                    {
                        if(Number(allowed[2]) > Number(controller[2]))
                        {
                            correctSoftware = false;
                        }
                        else if(Number(allowed[2]) < Number(controller[2]))
                        {
                            //intentionally left empty
                        }
                        else
                        {
                            if(Number(allowed[3]) > Number(controller[3]))
                            {
                                correctSoftware = false;
                            }
                            else if(Number(allowed[3]) < Number(controller[3]))
                            {
                                //intentionally left empty
                            }
                            else
                            {
                                if(Number(allowed[4]) > Number(controller[4]))
                                {
                                    correctSoftware = false;
                                }
                            }
                        }
                    }
                }

                if( correctSoftware )  // Check build number
                {
                    $("#versionWarning").css("display","none");
                }
                else
                {
                    $("#versionWarning").css("display","table-cell");
                    message = "Wrong controller software used. Expected <b>" + versionAllowed + "</b> or newer";
                    addAlarm = true;
                }

            }
            break;
            case 87: //externalAlarm
            {
                var alarm = systemData.externalAlarm().num;
                if(alarm == 1)
                {
                    message = "External alarm activated";
                    addAlarm = true;
                }
            }
            break;
        }
        if(addAlarm)
        {
            if($("#alarm-"+a_alarm).length == 0)
            {
                // var message     = name + alarm;
                var $row        = $("<div class='row attentionRed' id='alarm-" + a_alarm + "'></div>");
                var $itemText   = $("<div class='item messageLeft'>" + message + "</div>");

                $row.append($itemText);
                $alarms.append($row);
                show();
            }
        }
        else
        {
            removeAlarm(a_alarm);
        }
        return;
    };

    const handleSensorAlarm = function(a_type, a_id)
    {
        var name = "<b>" + sensorData.name(a_id).str + "</b>";
        var alarm = "";
        var addAlarm = false;
        var doNothing = false;
        switch(a_type)
        {
            case 48: //interlockStatus
            {
                var type = "<span style='color:red'>interlock alarm:</span>";
                var interlockStatus = sensorData.interlockStatus(a_id).num;
                var direction = "";
                if(interlockStatus == 2)
                {
                    direction = "high";
                    addAlarm = true;
                }
                else if(interlockStatus == 1)
                {
                    direction = "low";
                    addAlarm = true;
                }

                alarm = " - " + type + " limit " + direction;

            }
            break;
            case 49: //alarmStatus
            {
                var type = "process value alarm:";
                var alarmStatus = sensorData.alarmStatus(a_id).num;
                var direction = "";
                if(alarmStatus == 2)
                {
                    direction = "high";
                    addAlarm = true;
                }
                else if(alarmStatus == 1)
                {
                    direction = "low";
                    addAlarm = true;
                }

                alarm = " - " + type + " limit " + direction;
            }
            break;
            case 50: //connected
            {
                var connected = sensorData.connected(a_id).num;
                if(!connected)
                {
                    alarm = " is not connected";
                    if($("#alarm-"+a_type+"-"+a_id).length == 0)
                    {
                        addAlarm = true;
                    }
                    else{
                        doNothing = true;
                    }
                }
            }
            break;
        }
        if(addAlarm)
        {
            // if($("#alarm-"+a_type+"-"+a_id).length > 0)
            // {
            //     // Alarm already exists
            // }
            // else
            // {
            $("#alarm-"+a_type+"-"+a_id).remove()
            var message     = name + alarm;
            var $row        = $("<div class='row attentionRed' id='alarm-"+a_type+"-"+a_id+"'></div>");
            var $itemText   = $("<div class='item messageLeft'>" + message + "</div>");

            $row.append($itemText);
            $alarms.append($row);
            show();
            // }

        }
        else if(!doNothing)
        {
            removeAlarm(a_type, a_id);
        }
        return;
    };

    const handleActuatorAlarm = function(a_type, a_id)
    {
        var name = "<b>" + actuatorData.name(a_id).str + "</b>";
        var alarm = "";
        var addAlarm = false;
        switch(a_type)
        {
            case 36: //alarms
            {
                actuatorAlarm = actuatorData.alarms(a_id).num;
                if (a_id == 37)
                {

                    switch (actuatorAlarm)
                    {
                        case 1:
                        {
                            alarm = " is overheating";
                        }
                        break;
                        case 2:
                        {
                            alarm = " has a water failure";
                        }
                        break;
                        case 3:
                        {
                            alarm = " is overheating and has a water failure";
                        }
                        break;
                        case 4:
                        {
                            alarm = " is trying to heat without being activated";
                        }
                        break;
                        case 5:
                        {
                            alarm = " is overheating and has not been activated";
                        }
                        break;
                        case 6:
                        {
                            alarm = " has a water failure and has not been activated";
                        }
                        break;
                        case 7:
                        {
                            alarm = " has a water failure, is overheating and has not been activated";
                        }
                        break;
                        case 8:
                        {
                            alarm = " has overpressure failure";
                        }
                        break;
                        default:
                        {
                            alarm = " has raised exception code: " + actuatorAlarm;
                        }
                        break;
                    }
                }
                else
                {
                    alarm = " has raised exception code: " + actuatorAlarm;
                }
                if(actuatorAlarm != 0)
                {
                    addAlarm = true;
                }

            }
            break;
            case 45: //inhibitAlarm
            {
                // var type = "process value alarm:";
                var inhibitAlarm = actuatorData.inhibitAlarm(a_id).num;
                // console.log(inhibitAlarm);
                if(inhibitAlarm != 0)
                {
                    addAlarm = true;
                    alarm = " - gas flow is too low";
                }
            }
            break;
        }
        if(addAlarm)
        {
            // if($("#alarm-"+a_type+"-"+a_id).length == 0)
            // {
            $("#alarm-"+a_type+"-"+a_id).remove;
            var message     = name + alarm;
            var $row        = $("<div class='row attentionRed' id='alarm-"+a_type+"-"+a_id+"'></div>");
            var $itemText   = $("<div class='item messageLeft'>" + message + "</div>");

            $row.append($itemText);
            $alarms.append($row);
            show();
            // }
        }
        else
        {
            removeAlarm(a_type, a_id);
        }
    };

    const removeAlarm = function(a_type, a_id)
    {
        if(a_id == undefined)
        {
            $("#alarm-"+a_type).remove();
        }
        else
        {
            $("#alarm-"+a_type+"-"+a_id).remove();
        }
    };

    const webVersionCheck = function()
    {
        // console.log(myversion);
        // console.log();
        // console.log(versionAllowed);
        if(systemData.currentVersion().str != versionAllowed)
        {
            handleSystemAlarm(65);
        }
    };

    // const handleLicenseAvailable = function(a_address, a_data)
    // {
    //     if(Number(a_data))
    //     {
    //         nMan.addLicenseButton();
    //     }
    //     else
    //     {
    //         nMan.removeLicenseButton();
    //     }
    // };
    //
    // const handleUpdateAvailable = function(a_address, a_data)
    // {
    //     if(Number(a_data))
    //     {
    //         nMan.addUpdateButton();
    //     }
    //     else
    //     {
    //         nMan.removeUpdateButton();
    //     }
    // };
    //
    // const handleWebUpdateAvailable = function(a_address, a_data)
    // {
    //
    //     if(Number(a_data))
    //     {
    //         nMan.addWebUpdateButton();
    //     }
    //     else
    //     {
    //         nMan.removeWebUpdateButton();
    //     }
    // };

    const checkBrowser = function()
    {
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;

        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        if(!isIE && !isChrome)
        {
            console.log("[Info] Browser is not supported");
        }
    };


    var wi          = new windowItems();
    var $alarmPanel = $("#alarmPanel");
    var standardItems = {};
    var registeredCallbacks = [];
    var callbacks = {};
    var oldLoggedIn = false;
    standardItems.hideAlarmPanel = {type: "button", id:"hideAlarmPanel", name:"Hide Alarms", function:showHide, windowData:this};

    createPanel();
    var $alarms = $("#alarms");
    setState();
    checkBrowser();
    // init();
    // setAlarmCallbacks();

    mainData.addCallback([0, 11], setState);

    return this;
};

