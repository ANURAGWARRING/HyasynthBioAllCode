function espfManager()
{
    this.init = function()
    {
        // login = new loginWindow($("#espfOverlay .card"));
        login.init();

        mainData.addCallback([0, 0, 4], initCallback);

        mainData.updateData([0, 11]); // login
        mainData.updateData([0, 54]); // powerfailEStop
        mainData.updateData([4, 0]);  // Operator users
        mainData.updateData([4, 1]);  // Engineer users
        // mainData.updateData([0, 11]);   // Login Status
        // mainData.updateData([4, 0]);    // Operator users
        // mainData.updateData([4, 1]);    // Engineer users

        mainData.updateData([0, 0, 4]);
    };

    var initCallback = function()
    {
        mainData.removeCallback([0, 0, 4], initCallback);
        // mainData.addCallback([0, 54], handlePowerFailEStopState);
        // mainData.addCallback([0, 11], handlePowerFailEStopState);

        var address = [0, 54]; //alertStatus
        // registeredCallbacks.push([address, handlePowerFailEStopState]);
        mainData.addCallback(address, handlePowerFailEStopState);
        // systemData.powerfailEStop(null, {add:true, caller:this});

        handlePowerFailEStopState();
    };

    var show = function(a_function)
    {
        if(a_function != undefined)
        {
            $("#espfOverlay").slideDown(OVERLAYTRANSITIONTIME, a_function);
        }
        else
        {
            $("#espfOverlay").slideDown(OVERLAYTRANSITIONTIME);
        }
    };

    var hide = function(a_function)
    {
        if(a_function != undefined)
        {
            $("#espfOverlay").slideUp(OVERLAYTRANSITIONTIME, a_function);
        }
        else
        {
            $("#espfOverlay").slideUp(OVERLAYTRANSITIONTIME);
        }
    };

    var html = function(a_content)
    {
        $("#espfOverlay .card").html(a_content);
    };

    var handlePowerFailEStopState = function()
    {
        // mainData.removeCallback([0, 0, 4], handlePowerFailEStopState);

        var $espfOverlay    = $("#espfOverlay");
        var overlayPresent  = ($espfOverlay.css("display") == "none") ? false : true;
        // var $card           = $("#espfOverlay .card");
        var powerFailEStopState = systemData.powerfailEStop().str.split("|");
        switch(Number(powerFailEStopState[0]))
        {
            case 1: // estop
            {
                if(User.getLevel() < User.ENGINEER)
                {

                    if(!claimingLogin)
                    {
                        html(wi.convertItemsToElements([eStopMessage,
                                                        removeEStop,
                                                        loginSep,
                                                        levelSelect,
                                                        standardItems.userSelect,
                                                        standardItems.password]));
                        $("#"+levelSelect.ids[0]).click();
                    }
                }
                else
                {
                    claimingLogin = false;
                    html(wi.convertItemsToElements([eStopMessage,
                                                    removeEStop,
                                                    resumeButton,
                                                    haltButton]));
                }
                if(!overlayPresent)
                {
                    $espfOverlay.show();
                }
            }
            break;
            case 2: // powerfail
            {
                if(User.getLevel() < User.ENGINEER)
                {
                    if(!claimingLogin)
                    {
                        html(wi.convertItemsToElements([powerFailMessage,
                                                        loginSep,
                                                        levelSelect,
                                                        standardItems.userSelect,
                                                        standardItems.password]));
                        $("#"+levelSelect.ids[0]).click();
                    }
                }
                else
                {
                    claimingLogin = false;
                    html(wi.convertItemsToElements([powerFailMessage,
                                                    resumeButton,
                                                    haltButton]));
                }
                if(!overlayPresent)
                {
                    $espfOverlay.show();
                }
            }
            break;
            case 0:
            default:
            {
                if(overlayPresent)
                {
                    $espfOverlay.hide();
                }
            }
            break;
        }
    };

    var validatePassword = function(ptr)
    {
        var inputId = ptr.target.id;
        var input = $("#"+inputId)[0];
        if(input.value.length < 1)
        {
            // $("#"+standardItems.password.id).addClass("invalid");
            $("#item_"+loginButton.id).remove();
            // if($("#errorMessage")[0] != undefined)
            // {
            //     $("#errorMessage").remove();
            // }
            // wi.errorMessage("errorMessage", "Password is too short.").insertAfter("#item_"+standardItems.password.id);

        }
        else
        {
            $("#errorMessage").remove();
            $("#"+standardItems.password.id).removeClass("invalid");
            if($("#"+loginButton.id).length == 0)
            {
                wi.convertItemsToElements([loginButton]).insertAfter("#item_"+standardItems.password.id);
            }
        }
    };

    var loginSuccessfull = function()
    {
        handlePowerFailEStopState();
    };
    this.loginSuccessfull = loginSuccessfull;

    var loginNotSuccessfull = function()
    {
        claimingLogin = false;
        handlePowerFailEStopState();
    };
    this.loginNotSuccessfull = loginNotSuccessfull;

    var loginClick = function()
    {
        // claimingLogin = true;
        login.acceptClick();
    };

    var claimLogin = function()
    {
        claimingLogin = true;
        $("#item_"+levelSelect.groupId).remove();
        $("#item_"+standardItems.userSelect.id).remove();
        $("#item_"+standardItems.password.id).remove();
        $("#item_"+loginButton.id).remove();
        $("#loader").remove();
        // console.log(standardItems.claimMessage);
        wi.convertItemsToElements([standardItems.claimMessage, overrideButton, cancelButton]).insertAfter($("#item_"+loginSep.id));
    };
    this.claimLogin = claimLogin;

    var cancelClaim = function()
    {
        claimingLogin = false;
        // registeredCallbacks.push([[0, 0, 4], handlePowerFailEStopState]);
        mainData.addCallback([0, 0, 4], handlePowerFailEStopState);
        mainData.updateData([0, 11]);
        mainData.updateData([0, 0, 4]);
    };

    var resume = function()
    {
        // mainData.addCallback([0, 0, 4], test);
        systemData.powerfailEStop(1);
        // mainData.updateData([0, 11]); // login
        // mainData.updateData([0, 54]); // powerfailEStop
        // mainData.updateData([0, 0, 4]);
    };

    var halt = function()
    {
        systemData.powerfailEStop(0);
    };

    var OVERLAYTRANSITIONTIME = 500;
    var wi                  = new windowItems();
    var login               = new loginWindow($("#espfOverlay .card"));;
    var standardItems       = $.extend({}, login.standardItems);
    var claimingLogin = false;

    standardItems.password.function = validatePassword;

    var loginSep            = {type:"line", id:"loginSep"};
    var levelSelect         = {type:"buttonGroupLarge",
                                groupName:"Choose access level:",
                                groupId:"accessLevel",
                                ids:["accessLevel2", "accessLevel3"],
                                names:["System Engineer", "Service Engineer"],
                                selected:"accessLevel2",
                                function:login.buttonGroup,
                                windowData:this};
    var powerFailMessage    = {type: "errorMessage", id:"powerFailMessage", text:"<b>Power Failure Detected</b>"};
    var eStopMessage        = {type: "errorMessage", id:"eStopMessage", text:"<b>Emergency Stop</b>"};
    var removeEStop         = {type: "message", id:"removeEStop", text:"Remove the cause of the ES first, before resetting the ES-button"};
    var loginButton         = {type:"button", id:"login", name:"Login", function:loginClick, windowData:this};
    var resumeButton        = {type:"button", id:"resume", name:"Resume", function:resume, windowData:this};
    var haltButton          = {type:"button", id:"halt", name:"Halt", function:halt, windowData:this};
    var overrideButton      = {type:"button", id:"overrideButton", name:"Override Login", function:login.acceptClaim, windowData:this};
    var cancelButton        = {type:"button", id:"cancelButton", name:"Cancel", function:cancelClaim, windowData:this};

};

