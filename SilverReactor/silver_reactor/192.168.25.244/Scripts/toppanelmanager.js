function topPanelManager()
{
    this.init = function()
    {
        // mainData.addCallback([0, 0, 5], initCallback);
        callbacks["init"] = mainData.registerCallback(initCallback);

        mainData.updateData([0, 0]); //systemName
        mainData.updateData([0, 1]); //webTimerEnabled
        mainData.updateData([0, 2]); //webTimerTime
        mainData.updateData([0, 77]); //ledBoard

        // mainData.updateData([0, 0, 5]);
        mainData.updateData(callbacks["init"].address);
    };

    const initCallback = function()
    {
        // mainData.removeCallback([0, 0, 5], initCallback);
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];

        mainData.addCallback([0, 0], updateSystemName);
        mainData.addCallback([0, 11], setDisabled);
        mainData.addCallback([0, 77], updateSystemNameColor);

        $systemName.on("focusout", validateSystemName);
        $start.on("click", start);
        $pause.on("click", pause);
        $reset.on("click", reset);
        $info.on("click", clickInfo);


        updateSystemName();
        updateTimer();
        updateSystemNameColor();
    };

    const updateSystemName = function()
    {
        var ip = document.location.href.split("/")[2];
        var systemName = systemData.systemName().str;
        // var windowTitle = ip + " - " + systemName;
        $(document).attr("title", ip + " - " + systemName);
        $systemName.val(systemName);
    };

    const validateSystemName = function()
    {
        var oldName = systemData.systemName().str;
        var newName = $systemName.val();

        if(oldName == newName)
        {
            return;
        }
        if(User.getLevel() >= User.OPERATOR)
        {
            if (newName.length > 0 && newName.search(lookup.charWhiteList) != -1)
            {
                $systemName.val(systemData.systemName().str);
            }
            else
            {
                systemData.systemName(newName);
            }
        }
        else
        {
            $systemName.val(systemData.systemName().str);
        }
    };

    const updateSystemNameColor = function()
    {
        switch (systemData.ledBoard().num)
        {
            case 0:
            {
                $systemName.css("background","#D3D3D3");
            }
            break;
            case 1:
            {
                $systemName.css("background","#228B22");
            }
            break;
            case 2:
            {
                // $systemName.css("background","rgba(188, 178, 43, 1)");
            }
            break;
            case 3:
            {
                $systemName.css("background","#B22222");
            }
            break;
        }
    };

    const setDisabled = function()
    {
        if(User.getLevel() >= User.OPERATOR)
        {
            $systemName.attr("disabled", false);
            $start.attr("disabled", false);
            $pause.attr("disabled", false);
            $reset.attr("disabled", false);
        }
        else
        {
            $systemName.attr("disabled", true);
            $start.attr("disabled", true);
            $pause.attr("disabled", true);
            $reset.attr("disabled", true);
        }
    };

    const start = function()
    {
        systemData.webTimerEnabled(1);
        $inocTimer.addClass("started");
        inocTimerPaused = false;
    };

    const pause = function()
    {
        systemData.webTimerEnabled(0);
        inocTimerPaused = true;
        $inocTimer.removeClass("started");
    };

    const reset = function()
    {
        systemData.webTimerTime(0);
    };

    const requestInocTimer = function()
    {
        mainData.addCallback([0, 0, 5], updateTimer);
        mainData.updateData([0, 2]); //webTimerTime
        mainData.updateData([0, 0, 5]);
    }

    const updateTimer = function()
    {
        mainData.removeCallback([0, 0, 5], updateTimer);
        mainData.updateData([0, 1]); //webTimerEnabled

        var webTimer = systemData.webTimerTime().num;

        var minutes = formatTime(Math.floor((webTimer % 3600) / 60));
        var seconds = formatTime(webTimer % 60);
        var hours   = formatTime(Math.floor(webTimer / 3600));

        if(systemData.webTimerEnabled().num && !inocTimerPaused)
        {
            $inocTimer.addClass("started");
        }
        else {
            $inocTimer.removeClass("started");
        }
        $inocTimer.html(hours+":"+minutes+":"+seconds);

        if(inocTimer != null)
        {
            window.clearTimeout(inocTimer);
            inocTimer = null;
        }
        inocTimer = setTimeout(requestInocTimer, 200);
    };

    const formatTime = function(number)
    {
        return ((number < 10) ? '0' + number : number);
    };

    const clickInfo = function()
    {
        if($("#"+deviceInfoId).length > 0)
        {
            $("#"+deviceInfoId).slideUp(200,function(){
                    $("#"+deviceInfoId).remove();
            });
        }
        else
        {
            callbacks["displaySystemInfo"] = mainData.registerCallback(displaySystemInfo);
            mainData.updateData([0, 1]); //webTimerTime
            mainData.updateData([0, 42]); //oemSelection
            mainData.updateData([0, 65]); //currentVersion
            mainData.updateData([0, 66]); //mac
            mainData.updateData([0, 67]); //ethernetChip
            mainData.updateData([0, 68]); //hardwareRev
            mainData.updateData([0, 69]); //fpgaRev
            mainData.updateData([0, 70]); //ucRev
            mainData.updateData([0, 71]); //touchRev
            mainData.updateData([0, 72]); //runningTime
            mainData.updateData(callbacks["displaySystemInfo"].address);
        }
    }

    const displaySystemInfo = function()
    {
        mainData.remCallback(callbacks["displaySystemInfo"]);
        delete callbacks["displaySystemInfo"];
        $body = $(document.body);
        // $info = $('<div id="infoPanel"></div>');

        var $panel              = $('<div id="'+deviceInfoId+'" class="card windowContent infoPanel"></div>');
        var $card               = $("<div class='windowContent frame'></div>");
        var $title              = $("<div class='row'><div class='item message title'>Device Information</div></div>");
        var $deviceName         = $("<div class='row'><div class='item messageLeft'>Device Name</div><div class='item messageLeft'>"+systemData.systemName().str+"</div></div>");
        var $webVersion         = $("<div class='row'><div class='item messageLeft'>Web-Interface Version</div><div class='item messageLeft'>"+myversion+"</div></div>");
        var $controllerVersion  = $("<div class='row'><div class='item messageLeft'>Controller Software Version</div><div class='item messageLeft'>"+systemData.currentVersion().str+"</div></div>");
        var $mac                = $("<div class='row'><div class='item messageLeft'>MAC Address</div><div class='item messageLeft'>"+systemData.mac().str+"</div></div>");
        var $ethernet           = $("<div class='row'><div class='item messageLeft'>Ethernet Device</div><div class='item messageLeft'>"+systemData.ethernetChip().str+"</div></div>");
        var $hwVersion          = $("<div class='row'><div class='item messageLeft'>Hardware Version</div><div class='item messageLeft'>"+systemData.hardwareRev().str+"</div></div>");
        var $fpga               = $("<div class='row'><div class='item messageLeft'>FPGA Version</div><div class='item messageLeft'>"+systemData.fpgaRev().str+"</div></div>");
        var $uCVersion          = $("<div class='row'><div class='item messageLeft'>Microcontroller Version</div><div class='item messageLeft'>"+systemData.ucRev().str+"</div></div>");
        // var $touch              = $("<div class='row'><div class='item messageLeft'>Touchscreen Controller Firmware Version</div><div class='item messageLeft'>"+systemData.touchRev().str+"</div></div>");
        var $uptime             = $("<div class='row'><div class='item messageLeft'>Uptime</div><div class='item messageLeft'>"+systemData.runningTime().str+"</div></div>");
        var $oem                = $("<div class='row'><div class='item messageLeft'>Distributed By</div><div class='item messageLeft'>"+getOemName()+"</div></div>");
        var $hide               = wi.button("closeInfoPanel", "Close Device Information", clickInfo, this)

        // $card.append($title);
        $card.append($deviceName);
        $card.append($webVersion);
        $card.append($controllerVersion);
        $card.append($mac);
        $card.append($ethernet);
        $card.append($hwVersion);
        $card.append($fpga);
        $card.append($uCVersion);
        // $card.append($touch);
        $card.append($uptime);
        $card.append($oem);
        $card.append($hide);

        $panel.append($title);
        $panel.append($card);
        $panel.append($hide);

        $body.append($panel);

        $panel.draggable({cancel: ".messageLeft"});

        $("#"+deviceInfoId).slideDown(200);
    };

    const getOemName = function()
    {
        var oem = systemData.oemSelection().num;
        switch(oem)
        {
            case 1:
            {
                return "Millipore";
            }
            default:
            {
                return "Applikon Biotechnology";
            }
        }
    };

    var $systemName = $("#systemName");
    var $start      = $("#innoculationTimerPanel .start");
    var $pause      = $("#innoculationTimerPanel .pause");
    var $reset      = $("#innoculationTimerPanel .reset");
    var $inocTimer  = $("#innoculationTimer");
    var $info       = $(".header .info");
    var inocTimer   = null;
    var inocTimerPaused = false;
    const deviceInfoId = "deviceInfoPanel";
    var wi          = new windowItems(-1);
    var callbacks   = {};
};

