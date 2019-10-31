// function subWindow(a_tabs, a_mainWindow)
function subWindow(a_windowId, a_itemId, a_mainWindow)
{
    var MAXTABS             = 5;
    var TABSWITHNAV         = 4;
    var mWin                = a_mainWindow;
    var selectedTab         = 0;
    var visibleTabIndex     = 0;
    var wi                  = new windowItems(-1);
    var doneInitCallback;
    var registeredCallbacks;
    var windowContent;
    var tabs;

    this.init = function( a_func )
    {
        doneInitCallback = a_func;

        var jQueries = [];

        switch(a_windowId)
        {
            case "limits":
            {
                jQueries.push([1, 19, a_itemId]); // type
            }
            break;
            case "manual":
            {
                jQueries.push([2, 7]); // assigned
                jQueries.push([2, 21]); // available
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
            callbacks["initSW"] = mainData.registerCallback(initCallback);

            for(index in jQueries)
            {
                mainData.updateData(jQueries[index]);
            }

            mainData.updateData(callbacks["initSW"].address);
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
            mainData.remCallback(callbacks["initSW"]);
        }
        tabs = [];
        switch(a_windowId)
        {
            case "calibrate":
            {
                if(a_itemId == 35) // Hamilton DO2 does not have a values window
                {
                    if(sensorData.sampleCorEnabled(a_itemId).num)
                    {
                        tabs.push({ name:"Values", windowId:"calibrationvalues", itemId:a_itemId });
                    }
                }
                else
                {
                    tabs.push({ name:"Values", windowId:"calibrationvalues", itemId:a_itemId });
                }
                tabs.push({ name:"Methods", windowId:"calibrationmethods", itemId:a_itemId });
            }
            break;
            case "manual":
            {
                for (var i = 0; i < actuatorData.getActuatorCount(); i++) {
                    if (actuatorData.available(i).num >= 4 && actuatorData.assigned(i).num == a_itemId) {
                        tabs.push({ name:actuatorData.name(i).str, windowId:"manualcontrol", itemId:i });
                    }
                }
            }
            break;
            case "limits":
            {
                tabs.push({ name:"Process", windowId:"limitsprocessstandard", itemId:a_itemId });
                tabs.push({ name:"Interlocks", windowId:"limitsinterlocksstandard", itemId:a_itemId });
                tabs.push({ name:"Actuators", windowId:"limitsactuatorsstandard", itemId:a_itemId });
                if(sensorData.type(a_itemId).num == 2) // External
                {
                    tabs.push({ name:"Cascade", windowId:"limitscascade", itemId:a_itemId })
                }
            }
            break;
            case "setup":
            {
                tabs.push({ name:"Configuration", windowId:"controllersetupstandard", itemId:a_itemId });
                tabs.push({ name:"Flow Profile", windowId:"controllerfeedprofile", itemId:a_itemId });
                tabs.push({ name:"Flow Settings", windowId:"controllerfeedsettings", itemId:a_itemId });
                tabs.push({ name:"Calibration", windowId:"controllerfeedcalibration", itemId:a_itemId });
            }
            break;
            case "installitems":
            {
                tabs.push({ name:"Sensors", windowId:"installsensors" });
                tabs.push({ name:"Actuators", windowId:"installactuators", itemId:a_itemId });
                tabs.push({ name:"MFC's", windowId:"installmfcs" });
            }
            break;
            case "servicesettings":
            {
                tabs.push({ name:"Settings", windowId:"servicesettings" });
                tabs.push({ name:"Rotation", windowId:"servicerotation" });
                tabs.push({ name:"Power", windowId:"servicepower" });
                tabs.push({ name:"Decimals", windowId:"servicedecimals" });
                tabs.push({ name:"Set OEM", windowId:"serviceoem" });
            }
            break;
            case "debug":
            {
                tabs.push({ name:"Debug", windowId:"debug" });
                tabs.push({ name:"Error", windowId:"serviceerrorlog" });
                tabs.push({ name:"EEPROM", windowId:"eeprom" });
                tabs.push({ name:"Misc.", windowId:"servicemisc" });
            }
            break;
            case "sensorsettings":
            {
                tabs.push({ name:"Standard", windowId:"sensorsettingsstandard", itemId:a_itemId });
                tabs.push({ name:"Custom", windowId:"sensorsettingscustom", itemId:a_itemId });
            }
            break;
            case "actuatorsettings":
            {
                tabs.push({ name:"Standard", windowId:"actuatorsettingsstandard", itemId:a_itemId });
                tabs.push({ name:"Custom", windowId:"actuatorsettingscustom", itemId:a_itemId });
            }
            break;
            default:
            {
                // Not found window
                tabs = [{ windowId:"template", name:"Not found" }];
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
        return getHTMLSubTabsWindow();
    }

    // Intended to be called after the buildUp HTML is loaded in the DOM
    this.afterLoad = function()
    {
        $("#subWindowTab0").click();
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

    var getHTMLSubTabsWindow = function()
    {
        var $subWindow = $("<div class='subWindow'></div>");
        // Build the tabs
        if(tabs != undefined)
        {
            var $tabsRow = $("<div class='tableRow'></div>");
            var $tabsDiv = $("<div class='tableCell subWindowTabs'></div>");

            if(tabs.length > MAXTABS)
            {
                $tabsDiv.append(getHTMLSubTabsRow(TABSWITHNAV, true));
            }
            else
            {
                $tabsDiv.append(getHTMLSubTabsRow(tabs.length, false));
            }

            $tabsRow.append($tabsDiv);
        }
        else
        {
            // No tabs were defined so no point in creating a new window
            console.log("[Error] No tabs defined");
            return;
        }

        var $subWindowRow = $("<div class='tableRow'></div>");
        var $subWindowCell = $("<div class='tableCell'></div>");
        var $subWindowContent = $("<div id='subWindowContent' class='subWindowContent'></div>");

        $subWindowCell.append($subWindowContent);
        $subWindowRow.append($subWindowCell);
        $subWindow.append($tabsRow);
        $subWindow.append($subWindowRow);

        return $subWindow;
    };

    var getHTMLSubTabsRow = function( a_amountOfTabs, a_hasNavButtons )
    {
        if(a_hasNavButtons == undefined)
        {
            a_hasNavButtons = false;
        }

        var $tabs = $("<div></div>");
        if(a_hasNavButtons)
        {
            var $navLeft = $("<div id='subWindowTabLeft' class='tab navigationTabLeft' '><div class='navIcon'><img width='18px' height='18px' src='images/tabicons/leftDashBlack.png'></img></div></div>\n");
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

            var $tab = $("<div id='subWindowTab"+ tabIndex +"' class='" + classes + "' '>" + tabs[tabIndex].name + "</div>\n");
            $tab.click(subTabClick);
            $tabs.append($tab);
        };

        if(a_hasNavButtons)
        {
            var $navRight = $("<div id='subWindowTabRight' class='tab navigationTabRight' '><div class='navIcon'><img width='18px' height='18px' src='images/tabicons/rightDashBlack.png'></img></div></div>\n");
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
        $(".subWindowTabs").html(getHTMLSubTabsRow(TABSWITHNAV, true));
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
        $(".subWindowTabs").html(getHTMLSubTabsRow(TABSWITHNAV, true));
    };

    var subTabClick = function( event )
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
        var tab     = tabs[selectedTab];

        // console.log(mWin);
        windowContent = mWin.getWindow( false, tab.windowId, tab.itemId, sWin );
        // console.log( windowContent );
        if(undefined != windowContent)
        {
            windowContent.init( loadSubWindowContent );
            $("#subWindowContent").empty();
            $("#subWindowContent").append( wi.loader() );
        }
    };

    var loadSubWindowContent = function()
    {
        $("#subWindowContent").empty();
        $("#subWindowContent").append(windowContent.buildUp());

        windowContent.setState();
    };


    // this.setTitleText = function(a_titleText)
    // {
    //     mWin.setTitleText(a_titleText);
    // };
    //
    // this.setTitleIcon = function(a_iconPath)
    // {
    //     mWin.setTitleIcon(a_iconPath);
    // };

    this.reload = function()
    {
        $("#subWindowTab"+selectedTab).click();
    };
    //
    // this.empty = function()
    // {
    //     $("#subWindowContent").empty();
    // };
    //
    this.html = function(a_content)
    {
        $("#subWindowContent").html(a_content);
    };
    //
    this.append = function(a_content)
    {
        $("#subWindowContent").append(a_content);
    };
    //
    // this.getSelectedTabNumber = function()
    // {
    //     return mWin.getSelectedTabNumber();
    // };
    //
    this.getSelectedSubTabId = function()
    {
        return tabs[selectedTab].windowId;
    };
    //
    // this.getTabs = function()
    // {
    //     return mWin.getTabs();
    // };
    //
    // this.getSelectedTab = function()
    // {
    //     return mWin.getSelectedTab();
    // };
    //
    // this.setTabs = function(a_tabs)
    // {
    //     mWin.setTabs(a_tabs);
    // }
    //
    // this.setSelectedTab = function(a_tab)
    // {
    //     mWin.setSelectedTab(a_tab);
    // };
    //
    // this.rebuild = function()
    // {
    //     mWin.rebuild();
    // };
    //
    // var sWin = this;

    this.initReloadTabs = function()
    {
        mWin.initReloadTabs();
    };

    this.getWindowTitleNameSensor = function( a_sensorId )
    {
        return mWin.getWindowTitleNameSensor( a_sensorId );
    };

    this.getWindowTitleNameActuator = function( a_sensorId )
    {
        return mWin.getWindowTitleNameActuator( a_sensorId );
    };

    this.setTitleText = function( a_titleText )
    {
        mWin.setTitleText( a_titleText );
    };

    this.setTitleIcon = function( a_titleIcon )
    {
        mWin.setTitleIcon( a_titleIcon );
    };

    var sWin = this;
    var callbacks = {};
    return this;
};

