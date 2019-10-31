function networkSettings(a_mainWindow)
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
        mainData.updateData([0, 32]); // name
    };

    var fillStandardItems = function(a_items)
    {
        var ipSettings              = systemData.ip().str.split("|");

        standardItems.ip.value      = hex2ip(ipSettings[0]);
        standardItems.subnet.value  = hex2ip(ipSettings[1]);
        standardItems.gateway.value = hex2ip(ipSettings[2]);

    };

    this.buildUp = function()
    {

        items = new Array();

        // items.push({type:"message", id:"underConstruction", text:"Not supported yet"});
        items.push(standardItems.ip);
        items.push(standardItems.subnet);
        items.push(standardItems.gateway);

        return wi.convertItemsToElements(items);
    };

    this.setState = function()
    {
        if(User.getLevel() >= User.ENGINEER)
        {
            // Intentionally left blank
        }
        else
        {
            wTools.disableActionItems();
        }
    };

    this.cleanUp = function()
    {
        wTools.removeCallbacks(registeredCallbacks);
        mainData.remCallbacks(callbacks);
        $acceptRow.addClass("invisible");
        $acceptButton.off();
        $cancelButton.off();
    };

    //#########################################################################
    // Callbacks
    var initCallback = function()
    {
        // mainData.removeCallback([0, 0, 0], initCallback);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([0, 0, 0], initCallback),1);
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];


        fillStandardItems(standardItems);
        $acceptButton.on("click", acceptClick);
        $cancelButton.on("click", cancelClick);

        win.setTitleIcon("images/tabicons/network.png");
        win.setTitleText("Network Configuration");


        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }
    };

    var acceptCallback = function()
    {
        mainData.removeCallback([0, 0, 0], acceptCallback);
        registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], acceptCallback]),1);
        // mWin.reload();
        fillStandardItems(standardItems);
        wTools.restoreValues(items);

        // if(newIP)
        // {
        //     newIP = false;
        //     window.location.replace("http://" + hex2ip(systemData.ip().str.split("|")[0]) + "/");
        // }

    };

    //#########################################################################
    // Events
    var acceptClick = function(ptr)
    {
        mainData.addCallback([0, 0, 0], acceptCallback);
        registeredCallbacks.push([[0, 0, 0], acceptCallback]);

        // wTools.submitValidItems(sensorId);
        submitNetworkSettings();

        queryData();
        mainData.updateData([0, 0, 0]);
    };

    var cancelClick = function(ptr)
    {
        wTools.restoreValues(items);
    };

    var validateIp = function()
    {
        var validator   = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        var inputId     = event.target.id;
        var input       = $("#"+inputId)[0];
        var inputValue  = input.value;
        var $input      = $("#"+inputId);

        // console.log();
        if(validator.test(inputValue))
        {
            // valid
            $input.addClass("valid");
            $input.removeClass("invalid");
            if($('.row .invalid').length == 0)
            {
                $(".acceptRow").removeClass("invisible");
            }
        }
        else
        {
            // invalid
            $input.addClass("invalid");
            $input.removeClass("valid");
            $(".acceptRow").addClass("invisible");
        }
    };

    //#########################################################################
    // Helper functions
    const hex2ip = function(a_hex)
    {
        var ip = parseInt(a_hex, 16);
        return ((ip >> 24) & 0x0FF) + '.' + ((ip >> 16) & 0x0FF) + '.' + ((ip >> 8) & 0x0FF) + '.' + (ip & 0x0FF);
    };

    const ip2hex = function(a_ip)
    {
        var ipArray = a_ip.split('.');
        var str     = '';
        var hex     = '';

        // a_padding = (typeof (a_padding) === 'undefined' || a_padding === null) ? a_padding = 2 : a_padding;

        for (var i = 0; i < ipArray.length; i++)
        {
            hex = (parseInt(ipArray[i])).toString(16);
            while (hex.length < 2)
            {
                hex = '0' + hex;
            }
            str += hex;
        }

        return str;
    };

    var submitNetworkSettings = function()
    {
        hexIp = ip2hex($("#" + standardItems.ip.id).val());
        hexSubnet = ip2hex($("#" + standardItems.subnet.id).val());
        hexGateway = ip2hex($("#" + standardItems.gateway.id).val());

        systemData.ip(hexIp + "|" + hexSubnet + "|" + hexGateway);
    };


    //#########################################################################
    // Constructor
    var doneInitCallback;
    var registeredCallbacks = new Array();
    var $acceptRow          = $(".acceptRow");
    var $acceptButton       = $("#acceptButton");
    var $cancelButton       = $("#cancelButton");
    var items               = new Array();
    var wi                  = new windowItems();
    var win                 = a_mainWindow;
    var newIP               = false;
    var callbacks           = {};

    var standardItems       = new Array();
    standardItems.ip        = {type: "input",   value: undefined, id:"ip",      name:"IP Address",      jCodeGroup: undefined, jCodeId: undefined, function:validateIp, windowData: this, length:15};
    standardItems.subnet    = {type: "input",   value: undefined, id:"subnet",  name:"Subnet Mask",     jCodeGroup: undefined, jCodeId: undefined, function:validateIp, windowData: this, length:15};
    standardItems.gateway   = {type: "input",   value: undefined, id:"gateway", name:"Default Gateway", jCodeGroup: undefined, jCodeId: undefined, function:validateIp, windowData: this, length:15};
    this.standardItems      = standardItems;

    return this;
};

