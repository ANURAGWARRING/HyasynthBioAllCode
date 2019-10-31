function imageManager()
{
    // this.getImageSrc = function(a_name)
    // {
    //     if(images[a_name] == undefined)
    //     {
    //         if(sources[a_name] != undefined)
    //         {
    //             images[a_name] = new Image();
    //             images[a_name].src = sources[a_name];
    //         }
    //         else
    //         {
    //             return "";
    //         }
    //     }
    //     return images[a_name].src;
    // };
    //
    // this.getImage = function(a_name)
    // {
    //     if(images[a_name] == undefined)
    //     {
    //         if(sources[a_name] != undefined)
    //         {
    //             images[a_name] = new Image();
    //             images[a_name].src = sources[a_name];
    //         }
    //         else
    //         {
    //             return "";
    //         }
    //     }
    //     return images[a_name];
    // };
    //
    // this.$getImage = function(a_name)
    // {
    //     if(images[a_name] == undefined)
    //     {
    //         if(sources[a_name] != undefined)
    //         {
    //             images[a_name] = new Image();
    //             images[a_name].src = sources[a_name];
    //         }
    //         else
    //         {
    //             return "";
    //         }
    //     }
    //     return $(images[a_name]);
    // };
    //
    // this.showImages = function()
    // {
    //     console.log(images);
    // };

    const preload = function(a_sources)
    {
        var names = Object.keys(a_sources);
        for( var i = 0; i < names.length; i++)
        {
            if(images[names[i]] == undefined)
            {
                images[names[i]] = new Image();
                images[names[i]].src = a_sources[names[i]];
            }
        }
    };

    var images = {};

    const sources = {
        "accept":"images/accept.png",
        "arrowdown":"images/arrowdown.png",
        "arrowup":"images/arrowup.png",
        "cancel":"images/cancel.png",
        // "deviceinfo":"images/deviceinfo.png",
        "inoctimer":"images/inoctimer.png",
        "logintitle":"images/logintitle.png",
        // "logo":"images/logo.png",
        "minus":"images/logintitle.png",
        "reactor":"images/synoptic/reactor.png",

        "navactuators": "images/navigationicons/actuators.png",
        "navalarm": "images/navigationicons/alarm.png",
        "navcalibrate": "images/navigationicons/calibrate.png",
        "navconfigure": "images/navigationicons/configure.png",
        "navcontrols": "images/navigationicons/controls.png",
        "navdose": "images/navigationicons/dose.png",
        "navhome": "images/navigationicons/home.png",
        "navnetwork": "images/navigationicons/network.png",
        "navservice": "images/navigationicons/service.png",
        "navsettings": "images/navigationicons/settings.png",
        "navsystem": "images/navigationicons/system.png",
        "navtgf": "images/navigationicons/tgf.png",
        "navupdate": "images/navigationicons/update.png",

        "tabaccess": "images/tabicons/access.png",
        "tabdebug": "images/tabicons/debug.png",
        "tabfactory": "images/tabicons/factory.png",
        "tabfilehandling": "images/tabicons/filehandling.png",
        "tableftdash": "images/tabicons/leftDash.png",
        "tableftdashblack": "images/tabicons/leftDashBlack.png",
        "tablicenses": "images/tabicons/licenses.png",
        "tablimits": "images/tabicons/limits.png",
        "tabloop": "images/tabicons/loop.png",
        "tabmanual": "images/tabicons/manual.png",
        "tabnetwork": "images/tabicons/network.png",
        "tabquestion": "images/tabicons/question.png",
        "tabreactortype": "images/tabicons/reactortype.png",
        "tabrightdash": "images/tabicons/rightDash.png",
        "tabrightdashblack": "images/tabicons/rightDashBlack.png",
        "tabsensor": "images/tabicons/sensor.png",
        "tabsettings": "images/tabicons/settings.png",
        "tabsetup": "images/tabicons/setup.png",

        "sensorgreenanalog": "images/sensoricons/green/analog.png",
        "sensorgreenbalance": "images/sensoricons/green/balance.png",
        "sensorgreenbiomass": "images/sensoricons/green/biomass.png",
        "sensorgreendigital": "images/sensoricons/green/digital.png",
        "sensorgreendo2": "images/sensoricons/green/do2.png",
        "sensorgreenlevel": "images/sensoricons/green/level.png",
        "sensorgreenph": "images/sensoricons/green/ph.png",
        "sensorgreenpressure": "images/sensoricons/green/pressure.png",
        "sensorgreenpuzzle": "images/sensoricons/green/puzzle.png",
        "sensorgreenredox": "images/sensoricons/green/redox.png",
        "sensorgreensensor": "images/sensoricons/green/sensor.png",
        "sensorgreenstirrer": "images/sensoricons/green/stirrer.png",
        "sensorgreentemperature": "images/sensoricons/green/temperature.png"
    };

    preload(sources);
};

// var iMan = new imageManager();

