var userManager = function()
{
    var level                   = 0;
    var user                    = -1;
    var logoutTimerCheckSpeed   = 1000;
    var loggedInStamp;
    var loggedInTimer           = null;
    this.VIEW                   = 0;
    this.OPERATOR               = 1;
    this.ENGINEER               = 2;
    this.SERVICE                = 3;


    this.getUser = function()
    {
        // var login = sysData.login().str.split("|");
        // user = Number(login[1]);
        return user;
    };

    this.getUserName = function()
    {
        switch (level) {
            case 0:
            {
                return "View";
            }
            break;
            case 1:
            {
                return sysData.operatorName(user).str;
            }
            break;
            case 2:
            {
                return sysData.engineerName(user).str;
            }
            break;
            case 3:
            {
                return "Service Engineer";
            }
            break;
        }
    }
    var getUserName = this.getUserName;

    const getLevel = function()
    {
        // var login = sysData.login().str.split("|");
        // level = Number(login[0]);

        return level;
    };
    this.getLevel = getLevel;


    this.getLevelName = function()
    {
        switch (level) {
            case 0:
            {
                return "View";
            }
            break;
            case 1:
            {
                return "Operator";
            }
            break;
            case 2:
            {
                return "Engineer";
            }
            break;
            case 3:
            {
                return "Service Engineer";
            }
            break;
        }
    }
    var getLevelName = this.getLevelName;

    this.loggedIn = function()
    {
        if(level > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    var setLevel = function()
    {
        var login = ["0", "-1", ""];
        if (data.isConnected())
        {
            login = sysData.login().str.split("|");
        }

        var newLevel = Number(login[0]);
        var newUser = Number(login[1]);
        if(login.length != 3)
        {
            console.log("[Error] Login went wrong. Invalid J-Code reply.")
        }
        else
        {
            var oldLevel = getLevel();
            level = newLevel;
            // setLevel(newLevel);
            user = newUser;
            if(level > 0)
            {
                $(".rightPanelTabs .selected").click();
                if(level == 3)
                {
                    if($("#navCellSystem .navigationButton").hasClass("selected"))
                    {
                        nMan.addServiceButton();
                    }
                    $("#userMessage").html("Welcome, Service Engineer");
                }
                else
                {
                    nMan.removeServiceButton();
                    $("#userMessage").html("Welcome, " + getUserName() + " (" + getLevelName() + ")");
                }
                if(oldLevel != newLevel && newLevel > 0)
                {
                    initializeLogoutTimer();
                }

            }
            if(0 == newLevel && oldLevel > 0)
            {
                cleanUpLogoutTimer();
                // wMan.loadWindow("synoptic", "fullwindow");
                $("#navCellHome .navigationButton").click();
                $("#userMessage").html("Welcome");

                if($(".infoPanel").length > 0 && !$(".infoPanel").hasClass("invisible"))
                {
                    $(".infoPanel img")[1].click();
                }
                // $("#leftNavCellService").remove();
            }
        }
    };
    this.setLevel = setLevel;

    var initializeLogoutTimer = function()
    {
        var date = new Date();
        loggedInStamp = date.getTime();

        $(document).off("mousemove", resetLoggedInCount);
        $(document).off("keypress", resetLoggedInCount);
        $(document).on("mousemove", resetLoggedInCount);
        $(document).on("keyup", resetLoggedInCount);

        window.clearTimeout(loggedInTimer);
        loggedInTimer = setTimeout( checkLoggedInTimer , logoutTimerCheckSpeed);
    };

    var checkLoggedInTimer = function()
    {
        window.clearTimeout(loggedInTimer);
        if((sysData.autoLogoutEnabled().num == 1))
        {
            var date = new Date();
            var stampNow = date.getTime();
            var minutesPassed = ((stampNow - loggedInStamp) / 1000) / 60;
            // console.log(minutesPassed);
            if(minutesPassed >= sysData.autoLogoutTime().num)
            {
                sysData.login("0|0|");
            }
            else
            {
                loggedInTimer = setTimeout( checkLoggedInTimer , logoutTimerCheckSpeed);
            }
        }
    };

    var resetLoggedInCount = function()
    {
        var date = new Date();
        loggedInStamp = date.getTime();
        window.clearTimeout(loggedInTimer);
        loggedInTimer = null;
        if(level > 0)
        {
            loggedInTimer = setTimeout( checkLoggedInTimer , logoutTimerCheckSpeed);
        }
        else
        {
            $(document).off("mousemove", resetLoggedInCount);
            $(document).off("keypress", resetLoggedInCount);
        }
    };

    var cleanUpLogoutTimer = function()
    {
        window.clearTimeout(loggedInTimer);
        loggedInTimer = null;
        $(document).off("mousemove", resetLoggedInCount);
        $(document).off("keypress", resetLoggedInCount);
    };

    var data = mainData;
    this.setData = function(a_mainData)
    {
        data = a_mainData;
    };

    var sysData = systemData;
    this.setSysData = function(a_systemData)
    {
        sysData = a_systemData;
    };

    data.addCallback([0, 11], setLevel);
}

