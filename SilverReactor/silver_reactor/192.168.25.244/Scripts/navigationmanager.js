function navigationManager( )
{
    const navigate = function( a_target, a_type, event )
    {
        switch(a_target)
        {
            // Top panel buttons
            case "calibrate":
            case "controls":
            case "system":
            {

                $("#topNavigationPanel .selected").removeClass("selected");
                $("#leftPanelBottom .selected").removeClass("selected");
                setButtonSelected( event );
                loadLeftPanelButtons( a_target );
            }
            break;

            // Left panel buttons
            case "dosesettings":
            case "calibratesensors":
            case "limits":
            case "setup":
            case "manual":
            case "loops":
            case "sensorsettings":
            case "configure":
            case "network":
            case "settings":
            case "actuatorsettings":
            case "tgf":
            case "trend":
            {
                $("#leftPanelTop .selected").removeClass("selected");
                $("#leftPanelBottom .selected").removeClass("selected");
                setButtonSelected( event );
                // wMan.cleanUpCurrentWindow();
                wMan.loadWindow( a_target, a_type, undefined, event );
            }
            break;
            case "service":
            {
                var areLoopsRunning = false;
                for (var i = 0; i < sensorData.getSensorCount(); ++i)
                {
                    if(sensorData.active(i).num && sensorData.available(i).num == 4 && sensorData.inLoop(i).num && controlData.feedCalib(i).num == 0)
                    {
                        areLoopsRunning = true;
                        break;
                    }
                }
                if(!areLoopsRunning)
                {
                    for (var i = 0; i < actuatorData.getActuatorCount(); ++i)
                    {
                        if (actuatorData.manualValue(i).num > 0 || (actuatorData.assigned(i).num > -1 && sensorData.active(actuatorData.assigned(i).num).num))
                        {
                            areLoopsRunning = true;
                            break;
                        }
                    }
                }

                if(areLoopsRunning)
                {
                    $(".infoPanel").remove();
                    if($("#serviceRunningLoops").length == 0)
                    {
                        var wi = new windowItems();
                        $body = $(document.body);

                        var $panel              = $('<div id="serviceRunningLoops" class="card windowContent infoPanel"></div>');
                        var $card               = $("<div class='windowContent frame'></div>");
                        var $title              = $("<div class='row'><div class='item message title'>Active Control Loops Detected</div></div>");
                        var $instructions       = wi.message("instructions", "System has detected that there are active control loops/ouputs. Do you want to stop the control loops/outputs and continue to the Service Menu(✓)?");
                        var $apply              = $("<img action='accept' src='images/accept.png'></img>");
                        var $cancel             = $("<img action='cancel' src='images/cancel.png'></img>");
                        var $acceptRow          = $("<div class='row acceptButtons'></div>");

                        $apply.on("click", function(){

                            // Stop all sensors
                            for (var i = 0; i < sensorData.getSensorCount(); ++i)
                            {
                                if (sensorData.active(i).num)
                                {
                                    sensorData.active(i, 0);

                                    if (sensorData.type(i).num == 4 && controllerData.feedPaused(i).num)
                                    {
                                        controllerData.feedPaused(i, 0);
                                    }
                                }
                            }
                            // Stop all actuators
                            for (var i = 0; i < actuatorData.getActuatorCount(); ++i)
                            {
                                if (actuatorData.manualValue(i).num > 0 || actuatorData.value(i).num > 0 || actuatorData.isControlled(i).num)
                                {
                                    actuatorData.value(i, 0);
                                    actuatorData.manualValue(i, 0);
                                }
                            }
                            if(actuatorData.tcFill(37).num)
                            {
                                actuatorData.tcFill(37, 0);
                            }

                            $("#leftPanelTop .selected").removeClass("selected");
                            $("#leftPanelBottom .selected").removeClass("selected");
                            setButtonSelected( event );
                            // wMan.cleanUpCurrentWindow();
                            wMan.loadWindow( a_target, a_type, undefined, event );

                            $("#serviceRunningLoops").slideUp(100, function(){
                                $("#serviceRunningLoops").remove();
                            });
                        });

                        $cancel.on("click", function(){
                            $("#serviceRunningLoops").slideUp(100, function(){
                                $("#serviceRunningLoops").remove();
                            });
                        });

                        $acceptRow.append($apply);
                        $acceptRow.append($cancel);

                        $card.append($instructions);
                        $panel.append($title);
                        $panel.append($card);
                        $panel.append($acceptRow);

                        $body.append($panel);

                        $panel.draggable();

                        $("#serviceRunningLoops").slideDown(200);
                    }
                }
                else
                {
                    $("#leftPanelTop .selected").removeClass("selected");
                    $("#leftPanelBottom .selected").removeClass("selected");
                    setButtonSelected( event );
                    // wMan.cleanUpCurrentWindow();
                    wMan.loadWindow( a_target, a_type, undefined, event );
                }
            }
            break;

            case "synoptic":
            case "logpanel":
            {
                $("#topNavigationPanel .selected").removeClass("selected");
                $("#leftPanelBottom .selected").removeClass("selected");
                setButtonSelected( event );

                $ ("#leftPanelTop").html("");

                wMan.loadWindow( a_target, a_type, undefined, event );
            }
            break;
            case "alarm":
            {
                if(alarmPanel != null)
                {
                    alarmPanel.showHide();
                }
            };
            break;
            case "license":
            {
                uMan.clickLicense();
            }
            break;
            case "update":
            {
                uMan.clickUpdate();
            }
            break;
            case "webupdate":
            {
                uMan.clickWebUpdate();
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Navigation button not supported");
                }
            }
            break;
        }
    };

    //#########################################################################
    // Button Functions
    const createTopNavButton = function(a_text, a_icon, a_target, a_type)
    {
        if((a_text == undefined || a_icon == undefined || a_target == undefined) && developing.verbose)
        {
            console.log("[Dev][nMan] createButton: Missing argument");
            return;
        }

        var $cell   = $('<div class="tableCell" id="navCell'+a_text+'"></div>');
        var $button = $('<div class="navigationButton"></div>');
        var $image  = $('<img  src="' + a_icon + '"></img>');

        $button.on('click', function(event){ navigate( a_target, a_type, event ) });
        // $button.on('click', a_function);

        $button.append($image);
        $button.append(a_text);

        $cell.append($button);
        return $cell;
    };

    const createLeftNavButton = function(a_text, a_icon, a_target, a_type)
    {
        if((a_text == undefined || a_icon == undefined || a_target == undefined || a_type == undefined) && developing.verbose)
        {
            console.log("[Dev][nMan] createButton: Missing argument");
            return;
        }

        // var $cell   = $('<div class="tableCell"></div>');
        var id = a_text.split(" ")[0];
        var $button = $('<div id="leftNavCell'+id+'" class="navigationButtonLeft"></div>');
        var $image  = $('<img  src="' + a_icon + '"></img>');

        $button.on('click', function(event){ navigate( a_target, a_type, event ) });
        // $button.on('click', setButtonSelected);

        $button.append($image);
        $button.append(a_text);


        // $cell.append($button);
        return $button;
    };

    const setButtonSelected = function( a_event )
    {
        var target = a_event.target;
        if(target.tagName == "IMG")
        {
            target = target.parentElement;
        }

        $(target).addClass("selected");
    };

    const loadTopPanelButtons = function()
    {
        var elements = $("<div></div>");

        elements.append(createTopNavButton("Home", "images/navigationicons/home.png", "synoptic", "fullwindow"));
        elements.append(createTopNavButton("Calibrate", "images/navigationicons/calibrate.png", "calibrate"));
        elements.append(createTopNavButton("Controls", "images/navigationicons/controls.png", "controls"));
        elements.append(createTopNavButton("System", "images/navigationicons/system.png", "system"));
        // elements.append(createTopNavButton("Alarms", "images/navigationicons/alarm.png", "alarm"));

        $("#topNavigationPanel").html(elements.children());
    };

    const loadLogPanelButton = function()
    {
        $("#leftPanelBottom").html(createLeftNavButton("Logpanel", "images/tabicons/access.png", "logpanel", "windowwithtabs"));
    };

    const loadLeftPanelButtons = function(a_target)
    {
        var elements = $("<div></div>");

        switch(a_target)
        {
            case "calibrate":
            {
                elements.append(createLeftNavButton("Sensors", "images/tabicons/sensor.png", "calibratesensors", "windowwithtabs"));
                elements.append(createLeftNavButton("Dose", "images/navigationicons/dose.png", "dosesettings", "windowwithtabs"));
            }
            break;
            case "controls":
            {
                elements.append(createLeftNavButton("Limits", "images/tabicons/limits.png", "limits", "windowwithtabs"));
                elements.append(createLeftNavButton("Setup", "images/tabicons/setup.png", "setup", "windowwithtabs"));
                elements.append(createLeftNavButton("Manual", "images/tabicons/manual.png", "manual", "windowwithtabs"));
                elements.append(createLeftNavButton("Loops", "images/tabicons/loop.png", "loops", "windowwithtabs"));
                elements.append(createLeftNavButton("Actuators", "images/navigationicons/actuators.png", "actuatorsettings", "windowwithtabs"));
                elements.append(createLeftNavButton("Sensors", "images/tabicons/settings.png", "sensorsettings", "windowwithtabs"));
                elements.append(createLeftNavButton("Gas Flow", "images/navigationicons/tgf.png", "tgf", "windowwithtabs"));
                elements.append(createLeftNavButton("Trends", "images/tabicons/trend.png", "trend", "windowwithtabs"));
            }
            break;
            case "system":
            {
                elements.append(createLeftNavButton("Network", "images/navigationicons/network.png", "network", "windowwithtabs"));
                elements.append(createLeftNavButton("Configure", "images/navigationicons/configure.png", "configure", "windowwithtabs"));
                elements.append(createLeftNavButton("Settings", "images/navigationicons/settings.png", "settings", "windowwithtabs"));
                if(User.getLevel() == User.SERVICE)
                {
                    elements.append(createLeftNavButton("Service", "images/navigationicons/service.png", "service", "windowwithtabs"));
                }
            }
            break;
            default:
            {
                if(developing.verbose)
                {
                    console.log("[Dev] Left panel button not supported");
                }
            }
            break;
        }
        $("#leftPanelTop").html("");
        $("#leftPanelTop").html(elements.children());
    };

    this.addAlarmButton = function()
    {
        if($("#navCellAlarms").length == 0)
        {
            // $("#topNavigationPanel").append();
            createTopNavButton("Alarms", "images/navigationicons/alarm.png", "alarm").insertAfter("#navCellSystem");
        }
    }

    this.removeAlarmButton = function()
    {
        $("#navCellAlarms").remove();
    }

    this.addLicenseButton = function()
    {
        if($("#navCellLicenses").length == 0)
        {
            $("#topUpdatePanel").append(createTopNavButton("Licenses", "images/navigationicons/update.png", "license"));
        }
    };

    this.removeLicenseButton = function()
    {
        $("#navCellLicenses").remove();
    };

    this.addUpdateButton = function()
    {
        if($("#navCellUpdate").length == 0)
        {
            $("#topUpdatePanel").append(createTopNavButton("Update", "images/navigationicons/update.png", "update"));
        }
    };

    this.removeUpdateButton = function()
    {
        $("#navCellUpdate").remove();
    };

    this.addWebUpdateButton = function()
    {
        if($("#navCellWebUI").length == 0)
        {
            $("#topUpdatePanel").append(createTopNavButton("WebUI", "images/navigationicons/update.png", "webupdate"));
        }
    };

    this.removeWebUpdateButton = function()
    {
        $("#navCellWebUI").remove();
    }


    this.addServiceButton = function()
    {
        if($("#leftNavCellService").length == 0)
        {
            $("#leftPanelTop").append(createLeftNavButton("Service", "images/navigationicons/service.png", "service", "windowwithtabs"));
        }
    }

    this.removeServiceButton = function()
    {
        $("#leftNavCellService").remove();
    }

    //#########################################################################
    // Constructor
    loadTopPanelButtons();
    loadLogPanelButton();

    return this;
};

