// Make this var false before release!!!
var developing = { verbose:false, jcodes:false, callbacks:false, callbackCounter:false };
//######################

//######################
var User = null;
var wMan = null;
var nMan = null;
var iMan = null;
var rightPanel = null;
var alarmPanel = null;
var overlay = null;
var espfMan = null;
var topPanel = null;
var lookup = null;

// var autoLogout = null; // Implement autologout timer

$(document).ready(function()
{
    initManagers();
    mainData.connect(defsocaddress, atConnected, atReconnected, atDisconnected);
});

const initManagers = function()
{
    User        = new userManager();
    wMan        = new windowManager();
    nMan        = new navigationManager();

    rightPanel  = new rightPanelWindow();
    alarmPanel  = new alarmManager();
    overlay     = new overlayManager();
    espfMan     = new espfManager();
    topPanel    = new topPanelManager();
    uMan        = new updateManager();
};

const atConnected = function()
{
    systemData.initializeSystemData();
    sensorData.initializeSensors();
    actuatorData.initializeActuators();
    controlData.initializeControls();

    // Basic information used in multiple classes e.g.:
    // How many sensors and actuators and what are their names
    lookup =  new lookupInformation(mainData, systemData, sensorData, actuatorData, controlData);
    lookup.init(atLookupDataInitialized);
};

const atLookupDataInitialized = function()
{
    espfMan.init();
    topPanel.init();
    alarmPanel.init();
    uMan.init();

    wMan.loadWindow("synoptic", "fullwindow");

    rightPanel.setup();

    overlay.hide();

    setTimeout(loadNonCriticalFiles, 1000);
};

const atDisconnected = function()
{
    var wi = new windowItems();
    overlay.html(wi.convertItemsToElements([{type:"message", id:"noConnectionMessage", text: "<b>Not connected, trying to connect</b>"},
                                        {type: "whiteLoader", id:"loader", text:""}]));
    overlay.show();
};

const atReconnected = function()
{
    initManagers();
    atConnected();
};

function loadNonCriticalFiles()
{
    $.getScript("Scripts/updatemanager.js");
    $.getScript("Scripts/imagemanager.js");

    iMan = new imageManager();


    // $.getScript("Scripts/rightpanel/rightpaneloutput.js");
    // $.getScript("Scripts/rightpanel/rightpanelactuators.js");

    // // $.getScript("Scripts/windows/login.js");
    $.getScript("Scripts/windows/loopconfiguration.js");
    $.getScript("Scripts/windows/manualcontrol.js");
    $.getScript("Scripts/windows/networksettings.js");
    $.getScript("Scripts/windows/dosesettings.js");

    $.getScript("Scripts/windows/calibration/values/standard.js");
    $.getScript("Scripts/windows/calibration/values/presensph.js");
    $.getScript("Scripts/windows/calibration/values/hamiltonph.js");
    $.getScript("Scripts/windows/calibration/values/mettler.js");
    $.getScript("Scripts/windows/calibration/methods/standard.js");
    $.getScript("Scripts/windows/calibration/methods/hamiltonph.js");
    $.getScript("Scripts/windows/calibration/methods/hamiltonpo2.js");

    $.getScript("Scripts/windows/sensorsettings/standard/standard.js");
    $.getScript("Scripts/windows/sensorsettings/standard/do.js");
    $.getScript("Scripts/windows/sensorsettings/standard/level.js");
    $.getScript("Scripts/windows/sensorsettings/standard/analog.js");
    $.getScript("Scripts/windows/sensorsettings/standard/presens.js");
    $.getScript("Scripts/windows/sensorsettings/standard/hamiltonpo2.js");
    $.getScript("Scripts/windows/sensorsettings/standard/lumisens.js");

    $.getScript("Scripts/windows/sensorsettings/custom/aber.js");
    $.getScript("Scripts/windows/sensorsettings/custom/balance.js");
    $.getScript("Scripts/windows/sensorsettings/custom/buglab.js");
    $.getScript("Scripts/windows/sensorsettings/custom/custom.js");
    $.getScript("Scripts/windows/sensorsettings/custom/hamiltonph.js");
    $.getScript("Scripts/windows/sensorsettings/custom/hamiltonpo2.js");
    $.getScript("Scripts/windows/sensorsettings/custom/lumisens.js");
    $.getScript("Scripts/windows/sensorsettings/custom/polestar.js");
    $.getScript("Scripts/windows/sensorsettings/custom/presensdo.js");
    $.getScript("Scripts/windows/sensorsettings/custom/presensph.js");
    $.getScript("Scripts/windows/sensorsettings/custom/mettler.js");

    $.getScript("Scripts/windows/limits/limitsprocessstandard.js");
    $.getScript("Scripts/windows/limits/limitsinterlocksstandard.js");
    $.getScript("Scripts/windows/limits/limitsactuatorsstandard.js");
    $.getScript("Scripts/windows/limits/limitsdigitalstandard.js");
    $.getScript("Scripts/windows/limits/limitscascade.js");

    $.getScript("Scripts/windows/controllersetup/controllersetupstandard.js");
    $.getScript("Scripts/windows/controllersetup/controllerfeedprofile.js");
    $.getScript("Scripts/windows/controllersetup/controllerfeedsettings.js");
    $.getScript("Scripts/windows/controllersetup/controllerfeedcalibration.js");

    $.getScript("Scripts/windows/systemconfiguration/bioreactorselection.js");
    $.getScript("Scripts/windows/systemconfiguration/controlloopselection.js");
    $.getScript("Scripts/windows/systemconfiguration/synopticconfiguration.js");

    $.getScript("Scripts/windows/settings/specificpreferences.js");
    $.getScript("Scripts/windows/settings/installedlicenses.js");
    $.getScript("Scripts/windows/settings/filehandling.js");

    $.getScript("Scripts/windows/actuatorsettings/actuatorsettingsstandard.js");
    $.getScript("Scripts/windows/actuatorsettings/actuatorsettingscustom.js");
    $.getScript("Scripts/windows/actuatorsettings/customstirrersettings.js");
    $.getScript("Scripts/windows/actuatorsettings/custombrushlesssettings.js");
    $.getScript("Scripts/windows/actuatorsettings/customtcsettings.js");

    $.getScript("Scripts/windows/tgf/alarmsettings.js");
    $.getScript("Scripts/windows/tgf/carrierselection.js");
    $.getScript("Scripts/windows/tgf/carrierloopconfiguration.js");

    $.getScript("Scripts/windows/service/filehandlingservice.js");
    $.getScript("Scripts/windows/service/factorycalibration.js");
    $.getScript("Scripts/windows/service/installactuators.js");
    $.getScript("Scripts/windows/service/installsensors.js");
    $.getScript("Scripts/windows/service/installmfcs.js");
    $.getScript("Scripts/windows/service/servicesettings.js");
    $.getScript("Scripts/windows/service/servicememory.js");
    $.getScript("Scripts/windows/service/debug.js");
    $.getScript("Scripts/windows/service/serviceerrorlog.js");
    $.getScript("Scripts/windows/service/servicedecimals.js");
    $.getScript("Scripts/windows/service/serviceoem.js");
    $.getScript("Scripts/windows/service/servicepower.js");
    $.getScript("Scripts/windows/service/servicerotation.js");
    $.getScript("Scripts/windows/service/eeprom.js");
    $.getScript("Scripts/windows/service/misc.js");

    $.getScript("Scripts/windows/trend.js");
    $.getScript("Scripts/windows/windowtemplate.js");

    // $.getScript("Scripts/bioreactormanager.js");

    // $.getScript("Scripts/testing.js");
};

$(document).keyup(function(event)
{
    // Enter key clicked
    if(event.which == 13)
    {
        if($("#espfOverlay").css("display") != "none" && $("#login").length > 0)
        {
            $("#login").click();
        }
        else if($(".infoPanel").length > 0 && !$(".infoPanel").hasClass("invisible") && $(".infoPanel").is(":visible"))
        {
            $(".infoPanel img[action=accept]").click();
        }
        else if($("#setpointAcceptArea").length > 0 && !$("#acceptSetpoint").hasClass("invisible"))
        {
            $("#acceptSetpoint").click();
        }
        else
        {
            $acceptRow = $(".acceptRow");
            if($acceptRow[0] != undefined && !$acceptRow.hasClass("invisible"))
            {
                $("#acceptButton").click();
            }
        }
    }
    // Escape key clicked
    else if(event.which == 27)
    {
        if($(".infoPanel").length > 0 && !$(".infoPanel").hasClass("invisible"))
        {
            $(".infoPanel img[action=cancel]").click();
        }
        else if($("#setpointAcceptArea").length > 0)
        {
            $("#cancelSetpoint").click();
        }
        else
        {
            $acceptRow = $(".acceptRow");
            if($acceptRow[0] != undefined && !$acceptRow.hasClass("invisible"))
            {
                $("#cancelButton").click();
            }
        }
    }
    // Left & right arrow key
    else if(event.which == 37 || event.which == 39)
    {
        if(($(':focus')[0] != undefined && $(':focus')[0].nodeName == "INPUT") || $(".windowTabs")[0] == undefined )
        {
            return;
        }
        var selectedTabId = Number($(".windowTabs .selected").attr("id").replace("windowTab", ""));
        var $tabs = $(".windowTabs .tab");
        var amountOfTabs = $tabs.length;
        var selectedTabNumber = 0;

        if(amountOfTabs > 1)
        {
            for(var i = 0; i < amountOfTabs; i++)
            {
                if($tabs.eq(i).hasClass("selected"))
                {
                    selectedTabNumber = i;
                    break;
                }
            }
            // Left arrow key
            if(event.which == 37)
            {
                var $navLeft = $("#windowTabNavLeft");
                if($navLeft[0] != undefined)
                {
                    if(selectedTabNumber == 1)
                    {
                        $navLeft.click();
                        $tabs = $(".windowTabs .tab");
                        $tabs.eq(selectedTabNumber).click();
                    }
                    else
                    {
                        $tabs.eq(selectedTabNumber - 1).click();
                    }
                }
                else
                {
                    if(selectedTabId == 0)
                    {
                         $("#windowTab" + (amountOfTabs - 1)).click()
                    }
                    else
                    {
                        $("#windowTab" + (selectedTabId - 1)).click();
                    }
                }
            }
            // Right arrow key
            else if(event.which == 39)
            {
                var $navRight = $("#windowTabNavRight");
                if($navRight[0] != undefined)
                {
                    if(selectedTabNumber == (amountOfTabs - 2))
                    {
                        $navRight.click();
                        $tabs = $(".windowTabs .tab");
                        $tabs.eq(selectedTabNumber).click();
                    }
                    else
                    {
                        $tabs.eq(selectedTabNumber + 1).click();
                    }
                }
                else
                {
                    if(selectedTabId == (amountOfTabs - 1))
                    {
                         $("#windowTab0").click();
                    }
                    else
                    {
                        $("#windowTab" + (selectedTabId + 1)).click();
                    }
                }
            }
        }
    }
});

