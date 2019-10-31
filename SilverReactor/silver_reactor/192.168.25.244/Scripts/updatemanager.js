function updateManager()
{
    this.init = function(a_func)
    {
        doneInitCallback = a_func;

        callbacks["init"] = mainData.registerCallback(initCallback);
        queryData();
        mainData.updateData(callbacks["init"].address);
    };

    const initCallback = function()
    {
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];

        setCallbacks();
    }

    const queryData = function()
    {
        mainData.updateData([0, 35]);
        mainData.updateData([0, 36]);
        mainData.updateData([0, 73]);
    };

    const setState = function()
    {
        if(User.loggedIn())
        {
            if($("#" + webUIPanelId).length)
            {
                $("#" + webUIPanelId).remove();
                clickWebUpdate();
            }
            if($("#" + updatePanelId).length)
            {
                $("#" + updatePanelId).remove();
                clickUpdate();
            }
        }
        else
        {
            if($("#" + webUIPanelId).length)
            {
                hideWebUpdatePanel();
            }
            if($("#" + updatePanelId).length)
            {
                hideUpdatePanel();
            }
        }

    };

    const setCallbacks = function()
    {
        var address = [0, 35]; //updateAvalable
        // registeredCallbacks.push([address, handleLicenseAvailable]);
        // mainData.addCallback(address, handleLicenseAvailable);
        callbacks["handleLicenseAvailable"] = mainData.registerCallback(handleLicenseAvailable, address);
        handleLicenseAvailable(address, systemData.licenseAvailable().num);

        address = [0, 36]; //updateAvalable
        // registeredCallbacks.push([address, handleUpdateAvailable]);
        // mainData.addCallback(address, handleUpdateAvailable);
        callbacks["handleUpdateAvailable"] = mainData.registerCallback(handleUpdateAvailable, address);
        handleUpdateAvailable(address, systemData.updateAvailable().num);

        address = [0, 73]; //webupdateAvailable
        // registeredCallbacks.push([address, handleWebUpdateAvailable]);
        // mainData.addCallback(address, handleWebUpdateAvailable);
        callbacks["handleWebUpdateAvailable"] = mainData.registerCallback(handleWebUpdateAvailable, address);
        handleWebUpdateAvailable(address, systemData.webupdateAvailable().num);

        address = [0, 76]; //webupdateDone
        // registeredCallbacks.push([address, webUpdateDone]);
        // mainData.addCallback(address, webUpdateDone);
        callbacks["webUpdateDone"] = mainData.registerCallback(webUpdateDone, address);

        address = [0, 78]; //updateDone
        // registeredCallbacks.push([address, updateDone]);
        // mainData.addCallback(address, updateDone);
        callbacks["updateDone"] = mainData.registerCallback(updateDone, address);
    };

    // ###### Callbacks

    const handleLicenseAvailable = function(a_address, a_data)
    {
        if(Number(a_data))
        {
            nMan.addLicenseButton();
        }
        else
        {
            nMan.removeLicenseButton();
            hideLicensePanel();
        }
    };

    const handleUpdateAvailable = function(a_address, a_data)
    {
        if(Number(a_data))
        {
            nMan.addUpdateButton();
        }
        else
        {
            nMan.removeUpdateButton();
            hideUpdatePanel();
        }
    };

    const handleWebUpdateAvailable = function(a_address, a_data)
    {
        if(Number(a_data))
        {
            nMan.addWebUpdateButton();
        }
        else
        {
            nMan.removeWebUpdateButton();
            hideWebUpdatePanel();
        }
    };

    const displayUpdate = function()
    {
        // mainData.removeCallback([0, 0, 6], displayUpdate);
        mainData.remCallback(callbacks["displayUpdate"]);
        delete callbacks["displayUpdate"];
        $(".infoPanel").remove();
        var $body = $(document.body);

        var $panel              = $('<div id="'+updatePanelId+'" class="card windowContent infoPanel"></div>');
        var $card               = $("<div class='windowContent frame'></div>");
        var $title              = $("<div class='row'><div class='item message title'>Controller Update Available</div></div>");
        var $currentVersion     = $("<div class='row'><div class='item messageLeft'>Current Version</div><div class='item messageLeft'>"+systemData.currentVersion().str+"</div></div>");
        var $updateVersion      = $("<div class='row'><div class='item messageLeft'>Update Version</div><div class='item messageLeft'>"+systemData.updateVersion().str+"</div></div>");
        var $instructions       = wi.message("instructions", "Click Accept(✓) to apply the update. After applying the update, the controller will be rebooted.");
        var $login              = wi.message("loginMessage", "Please log in as Engineer to apply the update.");
        var $noSpace            = wi.message("noSpace", "Insufficient memory. Updating is not possible.");
        var $apply              = $("<img action='accept' src='images/accept.png'></img>");
        var $cancel             = $("<img action='cancel' src='images/cancel.png'></img>");
        var $acceptRow          = $("<div class='row acceptButtons'></div>");

        $apply.on("click", applyUpdate);
        $cancel.on("click", hideUpdatePanel);


        $card.append($currentVersion);
        $card.append($updateVersion);

        if(User.getLevel() >= User.ENGINEER)
        {
            $card.append($instructions);

            $panel.append($title);
            $panel.append($card);
            $acceptRow.append($apply);
            $acceptRow.append($cancel);
            $panel.append($acceptRow);
        }
        else
        {
            $card.append($login);

            $panel.append($title);
            $panel.append($card);
            $acceptRow.append($cancel);
            $panel.append($acceptRow);
        }

        $body.append($panel);

        $panel.draggable();

        $("#"+updatePanelId).slideDown(200);
    };

    const displayWebUpdate = function()
    {
        // mainData.removeCallback([0, 0, 6], displayWebUpdate);
        mainData.remCallback(callbacks["displayWebUpdate"]);
        delete callbacks["displayWebUpdate"];

        $(".infoPanel").remove();
        var $body = $(document.body);

        var $panel              = $('<div id="'+webUIPanelId+'" class="card windowContent infoPanel"></div>');
        var $card               = $("<div class='windowContent frame'></div>");
        var $title              = $("<div class='row'><div class='item message title'>WebUI Update Available</div></div>");
        var $currentVersion     = $("<div class='row'><div class='item messageLeft'>Current Version</div><div class='item messageLeft'>"+myversion+"</div></div>");
        var $updateVersion      = $("<div class='row'><div class='item messageLeft'>Update Version</div><div class='item messageLeft'>"+systemData.webupdateVersion().str+"</div></div>");
        var $instructions       = wi.message("instructions", "Click Accept(✓) to apply the update.");
        var $login              = wi.message("loginMessage", "Please in as Engineer to apply the update.");
        var $noSpace            = wi.message("noSpace", "Insufficient memory. Updating is not possible.");
        var $apply              = $("<img action='accept' src='images/accept.png'></img>");
        var $cancel             = $("<img action='cancel' src='images/cancel.png'></img>");
        var $acceptRow          = $("<div class='row acceptButtons'></div>");

        $apply.on("click",applyWebUpdate);
        $cancel.on("click",hideWebUpdatePanel);

        $card.append($currentVersion);
        $card.append($updateVersion);

        if(User.getLevel() >= User.ENGINEER)
        {
            if(systemData.webupdateNoSpace().num)
            {
                $card.append($noSpace);

                $panel.append($title);
                $panel.append($card);
                $acceptRow.append($cancel);
                $panel.append($acceptRow);
            }
            else
            {
                $card.append($instructions);

                $panel.append($title);
                $panel.append($card);
                $acceptRow.append($apply);
                $acceptRow.append($cancel);
                $panel.append($acceptRow);
            }
        }
        else
        {
            $card.append($login);

            $panel.append($title);
            $panel.append($card);
            $acceptRow.append($cancel);
            $panel.append($acceptRow);
        }

        $body.append($panel);

        $panel.draggable();

        $("#"+webUIPanelId).slideDown(200);
    };

    const displayLicense = function()
    {
        // mainData.removeCallback([0, 0, 6], displayLicense);
        mainData.remCallback(callbacks["displayLicense"]);
        delete callbacks["displayLicense"];

        $(".infoPanel").remove();

        var systemIOLicenseAdd = false;
        var systemIOLicenseRemove = false;

        var add = [];
        var remove = [];
        for(var i = 0; i < sensorData.getSensorCount();i++)
        {
            var visible = sensorData.licenseVisible(i).num;
            if(sensorData.licenseToAdd(i).num && visible)
            {
                add.push(sensorData.licenseName(i).str);
            }
            else if(sensorData.licenseToRemove(i).num && visible)
            {
                remove.push(sensorData.licenseName(i).str);
            }
            else if(sensorData.licenseToAdd(i).num && !systemIOLicenseAdd)
            {
                add.push(systemIOLicenseText);
                systemIOLicenseAdd = true;
            }
            else if(sensorData.licenseToRemove(i).num && !systemIOLicenseRemove)
            {
                remove.push(systemIOLicenseText);
                systemIOLicenseRemove = true;
            }
        }
        for(var i = 0; i < actuatorData.getActuatorCount();i++)
        {
            var visible = actuatorData.licenseVisible(i).num;

            if(actuatorData.licenseToAdd(i).num && visible)
            {
                add.push(actuatorData.licenseName(i).str);
            }
            else if(actuatorData.licenseToRemove(i).num && visible)
            {
                remove.push(actuatorData.licenseName(i).str);
            }
            else if(actuatorData.licenseToAdd(i).num && !systemIOLicenseAdd)
            {
                add.push(systemIOLicenseText);
                systemIOLicenseAdd = true;
            }
            else if(actuatorData.licenseToRemove(i).num && !systemIOLicenseRemove)
            {
                remove.push(systemIOLicenseText);
                systemIOLicenseRemove = true;
            }
        }
        var functionCount = mainData.dataCount([4,2]);
        for(var i = 0; i < functionCount;i++)
        {
            if(systemData.functionLicenseToAdd(i).num)
            {
                add.push(systemData.functionLicenseName(i).str);
            }
            else if(systemData.functionLicenseToRemove(i).num)
            {
                remove.push(systemData.functionLicenseName(i).str);
            }
        }
        standardItems.addList.options = add;
        standardItems.addList.values = Array(standardItems.addList.options.length);
        standardItems.removeList.options = remove;
        standardItems.removeList.values = Array(standardItems.removeList.options.length);

        var $body = $(document.body);

        var $panel              = $('<div id="'+licensePanelId+'" class="card windowContent infoPanel"></div>');
        var $card               = $("<div class='windowContent frame'></div>");
        var $title              = $("<div class='row'><div class='item message title'>Licenses</div></div>");
        // var $currentVersion     = $("<div class='row'><div class='item messageLeft'>Current Version</div><div class='item messageLeft'>"+systemData.currentVersion().str+"</div></div>");
        // var $updateVersion      = $("<div class='row'><div class='item messageLeft'>Update Version</div><div class='item messageLeft'>"+systemData.updateVersion().str+"</div></div>");
        var $instructions       = wi.message("instructions", "Click Accept(✓) to apply the license. After applying the license, the webUI will be reloaded.");
        var $login              = wi.message("loginMessage", "Please log in as Engineer to apply the licenses.");
        var $hideButton         = wi.convertItemsToElements([standardItems.hideLicensePanel]);
        // var $noSpace            = wi.message("noSpace", "Insufficient memory. Updating is not possible.");
        var $apply              = $("<img action='accept' src='images/accept.png'></img>");
        var $cancel             = $("<img action='cancel' src='images/cancel.png'></img>");
        var $acceptRow          = $("<div class='row acceptButtons'></div>");

        $apply.on("click", applyLicense);
        $cancel.on("click", hideLicensePanel);


        // $card.append($currentVersion);
        // $card.append($updateVersion);
        $card.append(wi.sideBySide(standardItems.addList, standardItems.removeList));

        if(User.getLevel() >= User.ENGINEER)
        {
            $card.append($instructions);

            $panel.append($title);
            $panel.append($card);
            $acceptRow.append($apply);
            $acceptRow.append($cancel);
            $panel.append($acceptRow);
        }
        else
        {
            $card.append($login);

            $panel.append($title);
            $panel.append($card);
            $acceptRow.append($cancel);
            $panel.append($acceptRow);
            // $panel.append($hideButton);
        }

        $body.append($panel);

        $panel.draggable();

        $("#"+licensePanelId).slideDown(200);
    };

    const showUpdateOverlay = function()
    {
        // mainData.removeCallback([0, 0, 6], showUpdateOverlay);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], showUpdateOverlay]),1);
        mainData.remCallback(callbacks["showUpdateOverlay"]);
        delete callbacks["showUpdateOverlay"];

        $("#alarmPanel").hide();

        overlay.html(wi.convertItemsToElements([standardItems.applyingUpdate, standardItems.loader]));
        overlay.show();
    }

    const updateDone = function(a_address, a_data)
    {
        if(Number(a_data) == 1 )
        {
            systemData.reboot(1);
        }
    };

    const webUpdateDone = function(a_address, a_data)
    {
        // console.log("update done: " + a_address + " " + a_data);
        if(Number(a_data) == 1)
        {
            window.location.reload(true);
        }
    };

    const licenseApplied = function()
    {
        window.location.reload(true);
    };

    // ###### Events
    const clickLicense = function()
    {
        if($("#" + licensePanelId).length)
        {
            hideLicensePanel();
        }
        else
        {
            // mainData.addCallback([0, 0, 6], displayLicense);
            // registeredCallbacks.push([[0, 0, 6], displayLicense]);
            callbacks["displayLicense"] = mainData.registerCallback(displayLicense);

            mainData.updateData([1, 40]);//licenseToAdd
            mainData.updateData([1, 41]);//licenseToRemove
            mainData.updateData([1, 42]);//licenseVisible
            mainData.updateData([1, 43]);//licenseName

            mainData.updateData([2, 31]);//licenseToAdd
            mainData.updateData([2, 32]);//licenseToRemove
            mainData.updateData([2, 33]);//licenseVisible
            mainData.updateData([2, 34]);//licenseName

            mainData.updateData([4, 2]);//functionLicenseToAdd
            mainData.updateData([4, 3]);//functionLicenseToRemove
            mainData.updateData([4, 4]);//functionLicenseName

            mainData.updateData(callbacks["displayLicense"].address);
        }
    };
    this.clickLicense = clickLicense;


    const clickUpdate = function()
    {
        if($("#" + updatePanelId).length)
        {
            hideUpdatePanel();
        }
        else
        {
            // mainData.addCallback([0, 0, 6], displayUpdate);
            // registeredCallbacks.push([[0, 0, 6], displayUpdate]);
            callbacks["displayUpdate"] = mainData.registerCallback(displayUpdate);

            mainData.updateData([0, 37]);//updateVersion
            mainData.updateData([0, 65]);//currentVersion
            mainData.updateData(callbacks["displayUpdate"].address);
        }
    };
    this.clickUpdate = clickUpdate;

    const applyUpdate = function()
    {
        hideUpdatePanel();
        standardItems.applyingUpdate.text = "<b> Applying Controller Update: " + systemData.updateVersion().str + "</b>";
        // mainData.addCallback([0, 0, 6], showUpdateOverlay);
        // registeredCallbacks.push([[0, 0, 6], showUpdateOverlay]);
        callbacks["showUpdateOverlay"] = mainData.registerCallback(showUpdateOverlay);
        systemData.updateAvailable(1);
        mainData.updateData(callbacks["showUpdateOverlay"].address);
    };

    const clickWebUpdate = function()
    {
        // console.log("clicked webupdate");
        if($("#" + webUIPanelId).length)
        {
            hideWebUpdatePanel();
        }
        else
        {
            // mainData.addCallback([0, 0, 6], displayWebUpdate);
            // registeredCallbacks.push([[0, 0, 6], displayWebUpdate]);
            callbacks["displayWebUpdate"] = mainData.registerCallback(displayWebUpdate);
            mainData.updateData([0, 74]);//webupdateVersion
            mainData.updateData([0, 75]);//webupdateNoSpace
            mainData.updateData(callbacks["displayWebUpdate"].address);
        }
    };
    this.clickWebUpdate = clickWebUpdate;

    const applyWebUpdate = function()
    {
        hideWebUpdatePanel();
        standardItems.applyingUpdate.text = "<b> Applying Web Update: " + systemData.webupdateVersion().str + "</b>";
        // mainData.addCallback([0, 0, 6], showUpdateOverlay);
        // registeredCallbacks.push([[0, 0, 6], showUpdateOverlay]);
        callbacks["showUpdateOverlay"] = mainData.registerCallback(showUpdateOverlay);
        systemData.webupdateAvailable(1);
        mainData.updateData(callbacks["showUpdateOverlay"].address);
    };

    const applyLicense = function()
    {
        // mainData.addCallback([0, 0, 6], licenseApplied);
        // registeredCallbacks.push([[0, 0, 6], licenseApplied]);
        callbacks["licenseApplied"] = mainData.registerCallback(licenseApplied);
        systemData.licenseAvailable(1);
        mainData.updateData(callbacks["licenseApplied"].address);
        // mainData.updateData([0, 0, 6]);
        // standardItems.applyingUpdate.text = "<b> Applying Controller Update: " + systemData.updateVersion().str + "</b>";
        // mainData.addCallback([0, 0, 6], showUpdateOverlay);
        // registeredCallbacks.push([[0, 0, 6], showUpdateOverlay]);
        // systemData.updateAvailable(1);
        // mainData.updateData([0, 0, 6]);
    };

    const selectLicenseItem = function()
    {

    };
    // ######## Helpers
    const hideWebUpdatePanel = function()
    {

        $("#" + webUIPanelId).slideUp(100, function(){
            $("#" + webUIPanelId).remove();
        });
    };

    const hideUpdatePanel = function()
    {
        $("#" + updatePanelId).slideUp(100, function(){
            $("#" + updatePanelId).remove();
        });
    };

    const hideLicensePanel = function()
    {
        $("#" + licensePanelId).slideUp(100, function(){
            $("#" + licensePanelId).remove();
        });
    };

    // ####### Constructor (sort of)

    var wi = new windowItems();
    var standardItems = {};
    standardItems.applyingUpdate    = {type: "message", id:"applyingUpdate", text:""};
    standardItems.progressBar       = {type: "progressBar", id:"importProgress"};
    standardItems.loader            = {type: "whiteLoader", id:"applyingLoader", text:""};
    standardItems.addList           = {type:"list", id:"licenseAddList", name:"Licenses to Add:",  options:undefined, values:undefined, maxHeight:"450px", function:selectLicenseItem,   windowData:this};
    standardItems.removeList        = {type:"list", id:"licenseRemoveList", name:"Licenses to Remove:",  options:undefined, values:undefined, maxHeight:"450px", function:selectLicenseItem,   windowData:this};
    standardItems.hideLicensePanel  = {type: "button", id:"hideLicensePanel", name:"Hide Licenses", function:hideLicensePanel, windowData:this};


    var registeredCallbacks     = [];
    var callbacks               = {}
    const webUIPanelId          = "webUIPanel";
    const updatePanelId         = "updatePanel";
    const licensePanelId        = "licensePanel";
    const systemIOLicenseText   = "System IO License";

    mainData.addCallback([0, 11], setState);

    return this;
};

