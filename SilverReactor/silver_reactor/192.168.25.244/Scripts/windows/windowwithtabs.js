function windowWithTabs( a_target, a_itemId )
{
    var MAXTABS             = 9;
    var TABSWITHNAV         = 7;
    var selectedTab         = 0;
    var visibleTabIndex     = 0;
    var windowSpecification = a_target;
    var wi                  = new windowItems(-1);
    var doneInitCallback;
    var registeredCallbacks;
    var tabs;
    var windowContent;
    var oldSelectedTab;


    this.init = function( a_func )
    {
        doneInitCallback = a_func;

        var jQueries = [];

        switch(windowSpecification)
        {
            case "sensor":
            {
                jQueries.push([1, 19, a_itemId]); // type
                jQueries.push([1, 35, a_itemId]); // calibAllowed
                jQueries.push([1, 37, a_itemId]); // domain
                jQueries.push([1, 10, a_itemId]); // sampleCorEnabled
                jQueries.push([2, 7]); // assigned
                jQueries.push([2, 21]); // available
            }
            break;
            case "calibratesensors":
            {
                jQueries.push([1, 2]); // priority
                jQueries.push([1, 11]); // available
                jQueries.push([1, 35]); // calibAllowed
                jQueries.push([1, 10, a_itemId]); // sampleCorEnabled
            }
            break;
            case "limits":
            {
                jQueries.push([1, 2]); // priority
                jQueries.push([1, 11]); // available
                jQueries.push([1, 19]); // type
                jQueries.push([1, 37]); // domain
            }
            break;
            case "setup":
            {
                jQueries.push([1, 2]); // priority
                jQueries.push([1, 11]); // available
                jQueries.push([1, 19]); // type
                jQueries.push([2, 7]); // assigned
                jQueries.push([2, 21]); // available
            }
            break;
            case "manual":
            {
                jQueries.push([2, 2]); // priority
                jQueries.push([2, 21]); // available
            }
            break;
            case "loop":
            case "sensorsettings":
            {
                jQueries.push([1, 2]); // priority
                jQueries.push([1, 11]); // available
            }
            break;
            case "actuator":
            case "actuatorsettings":
            {
                jQueries.push([2, 2]); // priority
                jQueries.push([2, 21]); // available
                if(a_itemId > 21 && a_itemId < 28)
                {
                    jQueries.push([6, a_itemId, 1]); // directionAllowUser
                }
                else if(a_itemId == 18)
                {
                    jQueries.push([6, a_itemId, 11]); // directionAllowUser
                }
            }
            break;
            case "trend":
            {
                jQueries.push([1, 2]); // priority
                jQueries.push([1, 11]); // available
                jQueries.push([1, 37]); // domain
            }
            break;
            default:
            {

            }
            break;
        }

        if(jQueries.length > 0)
        {
            // mainData.addCallback([0, 0, 0], initCallback);
            callbacks["initWWT"] = mainData.registerCallback(initCallback);

            for(index in jQueries)
            {
                mainData.updateData(jQueries[index]);
            }

            mainData.updateData(callbacks["initWWT"].address);
        }
        else
        {
            initCallback(true);
        }
    };

    var initCallback = function(a_direct)
    {
        // mainData.removeCallback([0, 0, 0], initCallback);
        if(a_direct == undefined)
        {
            mainData.remCallback(callbacks["initWWT"]);
        }

        switch(windowSpecification)
        {
            case "sensor":
            {
                tabs = [];
                if(35 == a_itemId)
                {
                    tabs.push({ windowId:"calibrationmethods", name:"Calibrate", icon:"images/tabicons/sensor.png", itemId:a_itemId });
                }
                else if( 14 == a_itemId || 15 == a_itemId)
                {
                    if(sensorData.sampleCorEnabled(a_itemId).num)
                    {
                        tabs.push({ windowId:"calibrationvalues", name:"Calibrate", icon:"images/tabicons/sensor.png", itemId:a_itemId });
                    }
                }
                else if(sensorData.calibAllowed(a_itemId).num || 33 == a_itemId || 53 == a_itemId)
                {
                    tabs.push({ hasSubTabs:true, windowId:"calibrate", name:"Calibrate", icon:"images/tabicons/sensor.png", itemId:a_itemId });
                }

                var hasActuators = false;
                var onlyExternal = false;

                for (var i = 0; i < actuatorData.getActuatorCount(); i++) {
                    if (actuatorData.assigned(i).num == a_itemId) {
                        hasActuators = true;
                        break;
                    }
                }
                if (!hasActuators) {
                    for (var i = 0; i < sensorData.getSensorCount(); i++) {
                        if (sensorData.assigned(i).num == a_itemId) {
                            hasActuators = true;
                            onlyExternal = true;
                            break;
                        }
                    }
                }

                // Not allowed for stirrer and pressureswitch and when no actuators
                if(hasActuators && (!onlyExternal) && (a_itemId != 13) && (a_itemId != 31))
                {
                    tabs.push({ hasSubTabs:true, windowId:"manual", name:"Manual", icon:"images/tabicons/manual.png", itemId:a_itemId });
                }

                if(sensorData.domain(a_itemId).num == 1)
                {
                    tabs.push({ windowId:"limitsdigitalstandard", name:"Limits", icon:"images/tabicons/limits.png", itemId:a_itemId });
                }
                else
                {
                    tabs.push({ hasSubTabs:true, windowId:"limits", name:"Limits", icon:"images/tabicons/limits.png", itemId:a_itemId });
                }

                if(a_itemId != 13 && a_itemId != 31)//Stirrer In & PressureSwitch
                {
                    if(hasActuators)
                    {
                        if(sensorData.type(a_itemId).num == 4) // Flow
                        {
                            tabs.push({ hasSubTabs:true, windowId:"setup", name:"Setup", icon:"images/tabicons/setup.png", itemId:a_itemId });
                        }
                        else
                        {
                            tabs.push({ windowId:"controllersetupstandard", name:"Setup", icon:"images/tabicons/setup.png", itemId:a_itemId });
                        }
                    }
                    tabs.push({ windowId:"loopconfiguration", name:"Loop", icon:"images/tabicons/loop.png", itemId:a_itemId });
                }

                if(lookup.hasCustomSensorSettings(a_itemId))
                {
                    tabs.push({ hasSubTabs:true, windowId:"sensorsettings", name:"Settings", icon:"images/tabicons/settings.png", itemId:a_itemId });
                }
                else
                {
                    tabs.push({ windowId:"sensorsettingsstandard", name:"Settings", icon:"images/tabicons/settings.png", itemId:a_itemId });
                }

                if(!sensorData.domain(a_itemId).num)
                {
                    tabs.push({ windowId:"trend", name:"Trend", icon:"images/tabicons/trend.png", itemId:a_itemId })
                }
            }
            break;
            case "calibratesensors":
            {
                tabs = [];
                var sensorsPriority = lookup.getPrioritisedSensors();
                for(var i = 0; i < sensorsPriority.length; i++)
                {
                    var sensorId = lookup.getSensorId(sensorsPriority[i]);
                    if( (14 == sensorId && sensorData.available(sensorId).num >= 4 ) || (15 == sensorId && sensorData.available(sensorId).num >= 4 ))
                    {
                        if(sensorData.sampleCorEnabled(sensorId).num)
                        {
                            tabs.push({ windowId:"calibrationvalues", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                        }
                    }
                    else if((33 == sensorId || 53 == sensorId) && sensorData.available(sensorId).num >= 4)
                    {
                        tabs.push({ hasSubTabs:true, windowId:"calibrate", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                    }
                    else if(35 == sensorId && sensorData.available(sensorId).num >= 4)
                    {
                        tabs.push({ windowId:"calibrationmethods", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                    }
                    else if(sensorData.calibAllowed(sensorId).num && sensorData.available(sensorId).num >= 4)
                    {
                        tabs.push({ hasSubTabs:true, windowId:"calibrate", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                    }
                }
            }
            break;
            case "limits":
            {
                tabs = [];
                var sensorsPriority = lookup.getPrioritisedSensors();
                for(var i = 0; i < sensorsPriority.length; i++)
                {
                    var sensorId = lookup.getSensorId(sensorsPriority[i]);
                    if(sensorData.available(sensorId).num >= 4)
                    {
                        if(sensorData.domain(sensorId).num == 1)
                        {
                            tabs.push({ windowId:"limitsdigitalstandard", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                        }
                        else
                        {
                            tabs.push({ hasSubTabs:true, windowId:"limits", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                        }
                    }
                }
            }
            break;
            case "setup":
            {
                tabs = [];
                var sensorsPriority = lookup.getPrioritisedSensors();

                for(var i = 0; i < sensorsPriority.length; i++)
                {
                    var sensorId  = lookup.getSensorId(sensorsPriority[i]);

                    if(sensorData.available(sensorId).num >= 4 && sensorId != 13 && sensorId != 31) //Stirrer In & PressureSW
                    {
                        var hasActuators    = false;
                        var onlyExternal    = false;
                        for (var j = 0; j < actuatorData.getActuatorCount(); ++j) {
                            if (actuatorData.assigned(j).num == sensorId) {
                                hasActuators = true;
                                break;
                            }
                        }
                        if (!hasActuators) {
                            for (var j = 0; j < sensorData.getSensorCount(); j++) {
                                if (sensorData.assigned(j).num == sensorId) {
                                    hasActuators = true;
                                    onlyExternal = true;
                                    break;
                                }
                            }
                        }

                        if(hasActuators)
                        {
                            if(sensorData.type(sensorId).num == 4) // Flow
                            {
                                tabs.push({ hasSubTabs:true, windowId:"setup", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                            }
                            else
                            {
                                tabs.push({ windowId:"controllersetupstandard", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                            }
                        }
                    }
                }
            }
            break;
            case "manual":
            {
                tabs = [];
                var actuatorsPriority = lookup.getPrioritisedActuators();

                for(var i = 0; i < actuatorsPriority.length; i++)
                {
                    var actuatorId = lookup.getActuatorId(actuatorsPriority[i]);
                    if(actuatorData.available(actuatorId).num >= 3 && actuatorId != 18)
                    {
                        // console.log(actuatorData.assigned(actuatorId).num);
                        tabs.push({ windowId:"manualcontrol", name:getTabName(actuatorData.name(actuatorId).str), icon:lookup.getSensorImageUrl(actuatorData.assigned(actuatorId).num), itemId:actuatorId });
                        // tabs.push(getManualTab(actuatorsPriority[i], actuatorId, actuatorsPriority[i].substr(0, 10), ));
                    }
                }
                tabs = tabs.filter(function(element){ return element !== undefined; });
            }
            break;
            case "loops":
            {
                tabs = [];
                var sensorsPriority = lookup.getPrioritisedSensors();
                for(var i = 0; i < sensorsPriority.length; i++)
                {
                    var sensorId = lookup.getSensorId(sensorsPriority[i]);
                    if(sensorData.available(sensorId).num >= 4 && sensorId != 13 && sensorId != 31) //Stirrer In & PressureSW
                    {
                        tabs.push({ windowId:"loopconfiguration", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                    }
                }
            }
            break;
            case "sensorsettings":
            {
                tabs = [];
                var sensorsPriority = lookup.getPrioritisedSensors();
                for(var i = 0; i < sensorsPriority.length; i++)
                {
                    var sensorId = lookup.getSensorId(sensorsPriority[i]);
                    if(sensorData.available(sensorId).num >= 4 && sensorId != 13)
                    {
                        if(lookup.hasCustomSensorSettings(sensorId))
                        {
                            tabs.push({ hasSubTabs:true, windowId:"sensorsettings", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                        }
                        else
                        {
                            tabs.push({ windowId:"sensorsettingsstandard", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId });
                        }
                    }
                }
            }
            break;
            case "logpanel":
            {
                tabs = [{ windowId:"login", name:"Log Panel", icon:"images/tabicons/access.png" }];
            }
            break;
            case "network":
            {
                tabs = [{ windowId:"network", name:"Network", icon:"images/tabicons/network.png" }];
            }
            break;
            case "configure":
            {
                tabs = [];
                tabs.push({ windowId:"bioreactorselection", name:"Reactor Type", icon:"images/tabicons/reactortype.png" });
                tabs.push({ windowId:"controlloopselection", name:"Sensor Sel.", icon:"images/tabicons/sensor.png" });
                tabs.push({ windowId:"synopticconfiguration", name:"Synoptic", icon:"images/tabicons/settings.png" });
            }
            break;
            case "settings":
            {
                tabs = [];
                tabs.push({ windowId:"specificpreferences", name:"Preferences", icon:"images/navigationicons/settings.png" });
                tabs.push({ windowId:"installedlicenses", name:"Licenses", icon:"images/tabicons/licenses.png" });
                tabs.push({ windowId:"filehandling", name:"File Handling", icon:"images/tabicons/filehandling.png" });
            }
            break;
            case "dosesettings":
            {
                tabs = [];
                var actuatorsPriority = lookup.getPrioritisedActuators();

                for(var i = 0; i < actuatorsPriority.length; i++)
                {
                    var actuatorId = lookup.getActuatorId(actuatorsPriority[i]);
                    if(actuatorData.available(actuatorId).num >= 3)
                    {
                        // console.log(actuatorData.assigned(actuatorId).num);
                        tabs.push({ windowId:"dosesettings", name:getTabName(actuatorData.name(actuatorId).str), icon:lookup.getSensorImageUrl(actuatorData.assigned(actuatorId).num), itemId:actuatorId });
                        // tabs.push(getManualTab(actuatorsPriority[i], actuatorId, actuatorsPriority[i].substr(0, 10), ));
                    }
                }
                tabs = tabs.filter(function(element){ return element !== undefined; });
            }
            break;
            case "service":
            {
                tabs = [];
                tabs.push({ windowId:"filehandlingservice", name:"File Handling", icon:"images/tabicons/filehandling.png" });
                tabs.push({ windowId:"factorycalibration", name:"Factory", icon:"images/tabicons/factory.png" });
                tabs.push({ hasSubTabs:true, windowId:"installitems", name:"Install", icon:"images/tabicons/settings.png" });
                tabs.push({ hasSubTabs:true, windowId:"servicesettings", name:"Settings", icon:"images/navigationicons/settings.png" });
                tabs.push({ hasSubTabs:true, windowId:"debug", name:"Debug", icon:"images/tabicons/debug.png" });
                tabs.push({ windowId:"servicememory", name:"Manual", icon:"images/tabicons/manual.png" });
            }
            break;
            case "actuator":
            {
                tabs = [];
                if(a_itemId != 18)
                {
                    tabs.push({ windowId:"manualcontrol", name:"Manual", icon:"images/tabicons/manual.png", itemId:a_itemId });
                }
                tabs.push({ windowId:"dosesettings", name:"Dose", icon:"images/navigationicons/dose.png", itemId:a_itemId });
                if(lookup.hasCustomActuatorSettings(a_itemId))
                {
                    tabs.push({ hasSubTabs:true, windowId:"actuatorsettings", name:"Settings", icon:"images/navigationicons/actuators.png", itemId:a_itemId });
                }
                else
                {
                    tabs.push({ windowId:"actuatorsettingsstandard", name:"Settings", icon:"images/navigationicons/actuators.png", itemId:a_itemId });
                }
            }
            break;
            case "actuatorsettings":
            {
                tabs = [];
                var actuatorsPriority = lookup.getPrioritisedActuators();
                for(var i = 0; i < actuatorsPriority.length; i++)
                {
                    var actuatorId = lookup.getActuatorId(actuatorsPriority[i]);

                    if(actuatorData.available(actuatorId).num >= 3)
                    {
                        if(lookup.hasCustomActuatorSettings(actuatorId))
                        {
                            tabs.push({ hasSubTabs:true, windowId:"actuatorsettings", name:getTabName(actuatorData.name(actuatorId).str), icon:lookup.getSensorImageUrl(actuatorData.assigned(actuatorId).num), itemId:actuatorId });
                        }
                        else
                        {
                            tabs.push({ windowId:"actuatorsettingsstandard", name:getTabName(actuatorData.name(actuatorId).str), icon:lookup.getSensorImageUrl(actuatorData.assigned(actuatorId).num), itemId:actuatorId });
                        }
                    }
                }
            }
            break;
            case "tgf":
            {
                tabs = [];
                tabs.push({ windowId:"tgfalarmsettings", name:"Alarms", icon:"images/tabicons/limits.png" });
                tabs.push({ windowId:"tgfcarrierselection", name:"Carrier Sel.", icon:"images/navigationicons/settings.png" });
                tabs.push({ windowId:"tgfcarrierloopconfiguration", name:"Loop", icon:"images/tabicons/loop.png" });
            }
            break;
            case "trend":
            {
                tabs = [];
                var sensorsPriority = lookup.getPrioritisedSensors();
                for(var i = 0; i < sensorsPriority.length; i++)
                {
                    var sensorId = lookup.getSensorId(sensorsPriority[i]);
                    if(sensorData.available(sensorId).num >= 4)
                    {
                        // console.log()
                        if(!sensorData.domain(sensorId).num)
                        {
                            tabs.push({ windowId:"trend", name:getTabName(sensorData.name(sensorId).str), icon:lookup.getSensorImageUrl(sensorId), itemId:sensorId })
                        }
                    }
                }
            }
            break;
            default:
            {
                // Not found window
                tabs = [{ windowId:"template", name:"Not found", icon:"images/tabicons/question.png" }];
            }
            break;
        }

        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }
    };

    this.buildUp = function()
    {
        return getHTMLTabsWindow();
    }

    // Intended to be called after the buildUp HTML is loaded in the DOM
    this.afterLoad = function()
    {
        $("#windowTab0").click();
    }

    this.cleanUp = function()
    {
        if(undefined != windowContent)
        {
            windowContent.cleanUp();
            windowContent = undefined;
        }
        wTools.removeCallbacks(registeredCallbacks);
    };

    var getHTMLTabsWindow = function()
    {
        var $window     = $("<div></div>");
        var $titleRow   = $("<div class='tableRow '>"+
                                "<div class='tableCell windowTitleBar'>"+
                                    "<div class='tableCell icon' id='titleIcon'></div>"+
                                    "<div class='tableCell title' id='titleText'></div>"+
                                "</div>"+
                            "</div>");

        // Build the tabs
        if(tabs.length)
        {
            var $tabsRow = $("<div class='tableRow'></div>");
            var $tabsDiv = $("<div class='tableCell windowTabs'></div>");

            if(tabs.length > MAXTABS)
            {
                $tabsDiv.append(getHTMLTabsRow(TABSWITHNAV, true));
            }
            else
            {
                $tabsDiv.append(getHTMLTabsRow(tabs.length, false));
            }

            $tabsRow.append($tabsDiv);
        }
        else
        {
            // No tabs were defined so no point in creating a new window
            console.log("No tabs defined");
            return;
        }

        var $windowRow = $(  "<div class='tableRow'><div id='windowContent' class='windowContent'></div></div>");
        var $acceptRow = $(  "<div class='tableRow'>"+
                                "<div class='tableCell'>"+
                                    "<div class='acceptRow invisible'>"+
                                        "<img id='cancelButton' draggable='false' src='images/cancel.png'></img>"+
                                        "<img id='acceptButton' draggable='false' src='images/accept.png'></img>"+
                                    "</div>"+
                                "</div>"+
                            "</div>");

        $window.append($titleRow);
        $window.append($tabsRow);
        $window.append($windowRow);
        $window.append($acceptRow);

        return $window.children();
    };

    var getHTMLTabsRow = function( a_amountOfTabs, a_hasNavButtons )
    {
        if(a_hasNavButtons == undefined)
        {
            a_hasNavButtons = false;
        }
        var $tabs = $("<div></div>");
        if(a_hasNavButtons)
        {
            var $navLeft = $("<div id='windowTabNavLeft' class='tab' '><div class='navIcon'><img src='images/tabicons/leftDash.png'></img></div></div>");
            $navLeft.click(navLeftClick);
            $tabs.append($navLeft);
        }

        for(var i = visibleTabIndex; i < (a_amountOfTabs + visibleTabIndex); i++)
        {
            var tabIndex = i;
            if(i > (tabs.length - 1))
            {
                tabIndex = i - tabs.length;
            }

            var classes = "tab";
            if(tabIndex == selectedTab)
            {
                classes += " selected";
            }

            var $tab = $(   "<div id='windowTab" + tabIndex + "' class='" + classes + "' '>" +
                                "<div class='icon' id='windowTab" + tabIndex + "'>" +
                                    "<img id='windowTab" + tabIndex + "' src='" + tabs[tabIndex].icon +"'></img>" +
                                "</div>" +
                                tabs[tabIndex].name +
                            "</div>");
            $tab.click(tabClick);
            $tabs.append($tab);
        };

        if(a_hasNavButtons)
        {
            var $navRight = $("<div id='windowTabNavRight' class='tab' '><div class='navIcon'><img src='images/tabicons/rightDash.png'></img></div></div>");
            $navRight.click(navRightClick);
            $tabs.append($navRight);
        }
        return $tabs.children();
    };

    var navLeftClick = function()
    {
        if(visibleTabIndex == 0)
        {
            visibleTabIndex = (tabs.length - 1);
        }
        else
        {
            visibleTabIndex--;
        }
        $(".windowTabs").html(getHTMLTabsRow(TABSWITHNAV, true));
    };

    var navRightClick = function()
    {
        if(visibleTabIndex == (tabs.length - 1))
        {
            visibleTabIndex = 0;
        }
        else
        {
            visibleTabIndex++;
        }
        $(".windowTabs").html(getHTMLTabsRow(TABSWITHNAV, true));
    };

    var tabClick = function( event )
    {
        // Cleanup of the old window
        if(undefined != windowContent)
        {
            windowContent.cleanUp();
            windowContent = undefined;
        }

        var tabId       = event.target.id;
        var tabPrefix   = tabId.replace(/[0-9]/g, "");
        // Make sure the new tab looks selected and the old is deselected
        $("#" + tabPrefix + selectedTab).removeClass("selected");
        $("#" + tabId).addClass("selected");
        // Update the new selected tab number
        selectedTab = Number(tabId.replace(tabPrefix, ""));

        var tab = tabs[selectedTab];

        windowContent = getWindow( tab.hasSubTabs, tab.windowId, tab.itemId, mWin );
        if(undefined != windowContent)
        {
            $("#windowContent").empty();
            $("#windowContent").append( wi.loader() );
            windowContent.init( loadWindowContent );
        }
    };

    var loadWindowContent = function()
    {
        $("#windowContent").empty();
        $("#windowContent").append(windowContent.buildUp());

        if(tabs[selectedTab].hasSubTabs == true)
        {
            windowContent.afterLoad();
        }
        else
        {
            windowContent.setState();
        }
    };

    this.getWindow = function( a_hasSubTabs, a_windowId, a_itemId, a_window)
    {
        var newWindow = undefined;
        if(a_hasSubTabs == true)
        {
            newWindow = new subWindow( a_windowId, a_itemId, a_window );
        }
        else
        {
            switch(a_windowId)
            {
                case "login":
                {
                    newWindow = new loginWindow(a_window);
                }
                break;
                case "calibrationvalues":
                {
                    newWindow = new calibrationValuesStandard(a_itemId, a_window);
                }
                break;
                case "calibrationmethods":
                {
                    newWindow = new calibrationMethodsWindow(a_itemId, a_window);
                }
                break;
                case "sensorsettingsstandard":
                {
                    newWindow = new sensorSettingsStandard(a_itemId, a_window);
                }
                break;
                case "limitsprocessstandard":
                {
                    newWindow = new limitsProcessStandard(a_itemId, a_window);
                }
                break;
                case "limitsinterlocksstandard":
                {
                    newWindow = new limitsInterlocksStandard(a_itemId, a_window);
                }
                break;
                case "limitsactuatorsstandard":
                {
                    newWindow = new limitsActuatorsStandard(a_itemId, a_window);
                }
                break;
                case "limitsdigitalstandard":
                {
                    newWindow = new limitsDigitalStandard(a_itemId, a_window);
                }
                break;
                case "limitscascade":
                {
                    newWindow = new limitsCascade(a_itemId, a_window);
                }
                break;
                case "controllersetupstandard":
                {
                    newWindow = new controllerSetupStandard(a_itemId, a_window);
                }
                break;
                case "controllerfeedprofile":
                {
                    newWindow = new controllerFeedProfile(a_itemId, a_window);
                }
                break;
                case "controllerfeedsettings":
                {
                    newWindow = new controllerFeedSettings(a_itemId, a_window);
                }
                break;
                case "controllerfeedcalibration":
                {
                    newWindow = new controllerFeedCalibration(a_itemId, a_window);
                }
                break;
                case "loopconfiguration":
                {
                    newWindow = new loopConfiguration(a_itemId, a_window);
                }
                break;
                case "manualcontrol":
                {
                    newWindow = new manualControl(a_itemId, a_window);
                }
                break;
                case "network":
                {
                    newWindow = new networkSettings(a_window);
                }
                break;
                case "bioreactorselection":
                {
                    newWindow = new bioreactorSelection(a_window);
                }
                break;
                case "controlloopselection":
                {
                    newWindow = new controlLoopSelection(a_window);
                }
                break;
                case "synopticconfiguration":
                {
                    newWindow = new synopticConfiguration(a_window);
                }
                break;
                case "specificpreferences":
                {
                    newWindow = new specificPreferences(a_window);
                }
                break;
                case "installedlicenses":
                {
                    newWindow = new installedLicenses(a_window);
                }
                break;
                case "filehandling":
                {
                    newWindow = new fileHandling(a_window);
                }
                break;
                case "template":
                {
                    newWindow = new windowTemplate(a_window);
                }
                break;
                case "dosesettings":
                {
                    newWindow = new doseSettings(a_itemId, a_window);
                }
                break;
                case "filehandlingservice":
                {
                    newWindow = new fileHandlingService(a_window);
                }
                break;
                case "factorycalibration":
                {
                    newWindow = new factoryCalibration(a_window);
                }
                break;
                case "installactuators":
                {
                    newWindow = new installActuators(a_window);
                }
                break;
                case "installsensors":
                {
                    newWindow = new installSensors(a_window);
                }
                break;
                case "installmfcs":
                {
                    newWindow = new installMFCs(a_window);
                }
                break;
                case "servicesettings":
                {
                    newWindow = new serviceSettings(a_window);
                }
                break;
                case "debug":
                {
                    newWindow = new debug(a_window);
                }
                break;
                case "servicememory":
                {
                    newWindow = new serviceMemory(a_window);
                }
                break;
                case "servicerotation":
                {
                    newWindow = new serviceRotation(a_window);
                }
                break;
                case "servicepower":
                {
                    newWindow = new servicePower(a_window);
                }
                break;
                case "servicedecimals":
                {
                    newWindow = new serviceDecimals(a_window);
                }
                break;
                case "serviceoem":
                {
                    newWindow = new serviceOEM(a_window);
                }
                break;
                case "serviceerrorlog":
                {
                    newWindow = new serviceErrorLog(a_window);
                }
                break;
                case "actuatorsettingsstandard":
                {
                    newWindow = new actuatorSettingsStandard(a_itemId, a_window);
                }
                break;
                case "actuatorsettingscustom":
                {
                    newWindow = new actuatorSettingsCustom(a_itemId, a_window);
                }
                break;
                case "sensorsettingscustom":
                {
                    newWindow = new sensorSettingsCustom(a_itemId, a_window);
                }
                break;
                case "tgfalarmsettings":
                {
                    newWindow = new TGFAlarmSettings(a_itemId, a_window);
                }
                break;
                case "tgfcarrierselection":
                {
                    newWindow = new TGFCarrierSelection(a_itemId, a_window);
                }
                break;
                case "tgfcarrierloopconfiguration":
                {
                    newWindow = new TGFCarrierLoopConfiguration(a_itemId, a_window);
                }
                break;
                case "eeprom":
                {
                    newWindow = new serviceEeprom(a_window);
                }
                break;
                case "servicemisc":
                {
                    newWindow = new serviceMisc(a_window);
                }
                break;
                case "trend":
                {
                    newWindow = new trendWindow(a_itemId, a_window);
                }
                break;
                default:
                {
                    if(developing.verbose)
                    {
                        console.log("[Dev][WindowWithTabs] Window not supported yet: " + a_windowId);
                    }
                }
                break;
            }
        }

        return newWindow;
    };
    var getWindow = this.getWindow;

    this.append = function(a_content)
    {
        $("#windowContent").append(a_content);
    };

    this.html = function(a_content)
    {
        $("#windowContent").html(a_content);
    };

    this.initReloadTabs = function()
    {
        // Save the selected tab so this van be restored if a tab gets added or removed
        oldSelectedTab = tabs[selectedTab];

        // Reload the tabs
        mWin.init( reloadTabs );
    };

    var reloadTabs = function()
    {
        // Set the correct selected tab
        for(index in tabs)
        {
            if(tabs[index].windowId == oldSelectedTab.windowId && tabs[index].itemId == oldSelectedTab.itemId )
            {
                selectedTab = index;
            }
        }

        // Create the new tab HTML
        var $tabs;
        if(tabs.length > MAXTABS)
        {
            $tabs = getHTMLTabsRow(TABSWITHNAV, true);
        }
        else
        {
            $tabs = getHTMLTabsRow(tabs.length, false);
        }

        // Replace the old tabs with the newly made tabs
        $(".tableCell .windowTabs").html($tabs);
        // Click the current tab again to reload any changes
        $("#windowTab" + selectedTab).click();
    };

    this.getWindowTitleNameSensor = function( a_sensorId )
    {
        if(a_sensorId != -1)
        {
            var sensorDefaultName = sensorData.defaultName(a_sensorId).str
            var sensorName = sensorData.name(a_sensorId).str;

            if(sensorDefaultName != sensorName)
            {
                sensorName = "(" + sensorDefaultName + ") " + "<b>" + sensorName + "</b>";
            }
            else {
                sensorName = "<b>" + sensorDefaultName + "</b>";
            }
            return sensorName;
        }
        else
        {
            return "";
        }
    };

    this.getWindowTitleNameActuator = function( a_actuatorId )
    {
        if(a_actuatorId != -1)
        {
            var actuatorDefaultName = actuatorData.defaultName(a_actuatorId).str
            var actuatorName = actuatorData.name(a_actuatorId).str;

            if(actuatorDefaultName != actuatorName)
            {
                actuatorName = "(" + actuatorDefaultName + ") " + "<b>" + actuatorName + "</b>";
            }
            else {
                actuatorName = "<b>" + actuatorDefaultName + "</b>";
            }
            return actuatorName;
        }
        else
        {
            return "";
        }
    };

    this.setTitleText = function( a_titleText )
    {
        $("#titleText").html(a_titleText);
    };

    this.setTitleIcon = function( a_titleIcon )
    {
        var img = "<img src='" + a_titleIcon + "'></img>";
        $("#titleIcon").html(img);
    };

    const getTabName = function(a_name)
    {
        if(a_name.length > 11)
        {
            return a_name.substr(0, 5) + ".." + a_name.substr(a_name.length - 5, a_name.length - 1);
        }
        else
        {
            return a_name;
        }
    };

    this.name = "windowWithTabs";
    var mWin = this;
    var callbacks = {};
    return this;
}

