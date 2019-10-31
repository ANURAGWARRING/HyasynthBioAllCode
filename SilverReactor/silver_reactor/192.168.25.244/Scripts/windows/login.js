function loginWindow(a_mainWindow)
{
    this.init = function(a_func)
    {
        doneInitCallback = a_func;

        callbacks["init"] = mainData.registerCallback(initCallback);
        // registeredCallbacks.push([[0, 0, 0], initCallback]);
        // mainData.addCallback([0, 0, 0], initCallback);
        queryData();
        mainData.updateData(callbacks["init"].address);
    };

    const queryData = function()
    {
        mainData.updateData([0, 11]);   // Login Status
        mainData.updateData([4, 0]);    // Operator users
        mainData.updateData([4, 1]);    // Engineer users
    };

    const fillStandardItems = function(a_items)
    {
        users = {operators:[], engineers:[]};
        for(var i = 0; i < 21; i++)
        {
            var operatorName = systemData.operatorName(i).str;
            var engineerName = systemData.engineerName(i).str;

            if(operatorName != "" && operatorName != undefined && operatorName != "undefined")
            {
                users.operators.push(operatorName);
            }
            if(engineerName != "" && engineerName != undefined && engineerName != "undefined")
            {
                users.engineers.push(engineerName);
            }
        }
    };

    this.buildUp = function()
    {
        return getElements();
    };

    this.cleanUp = function()
    {
        wTools.removeCallbacks(registeredCallbacks);
        $acceptRow.addClass("invisible");
        $acceptButton.off();
        $cancelButton.off();
    };

    this.setState = function()
    {
        win.setTitleText("User Panel");
        win.setTitleIcon("images/logintitle.png");
    }

    //#########################################################################
    // Callbacks
    const initCallback = function()
    {
        // registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], initCallback]),1);
        // mainData.removeCallback([0, 0, 0], initCallback);
        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];

        $acceptButton.on("click", acceptClick);
        $cancelButton.on("click", cancelClick);

        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }

        fillStandardItems();
        fillUserSelect(users.operators);
        $("#"+standardItems.password.id).focus();
    };

    const loginCallback = function()
    {
        registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], loginCallback]),1);
        mainData.removeCallback([0, 0, 0], loginCallback);
        var level = User.getLevel();
        switch(level)
        {
            case 0:
            case 1:
            case 2:
            case 3:
            {
                // Login succesfull
                // $("#windowContent").html(getElements());
                if(win.name == "windowWithTabs")
                {
                    win.html(getElements());
                    $acceptButton.off();
                    $cancelButton.off();
                    $acceptButton.on("click", acceptClick);
                    $cancelButton.on("click", cancelClick);
                    fillUserSelect(users.operators);
                    $("#"+standardItems.password.id).focus();
                }
                else
                {
                    if(level < 1)
                    {
                        espfMan.loginNotSuccessfull();
                    }
                    else
                    {
                        espfMan.loginSuccessfull();
                    }
                }

                if(claiming() && level < 1)
                {
                    switch(Number(systemData.loginClaim().str.split("|")[0]))
                    {
                        case -2:
                        {
                            // Invalid user id
                            loginError("Invalid user id.");
                        }
                        break;
                        case -3:
                        {
                            // User does not exist
                            loginError("User does not exist.");
                        }
                        break;
                        case -4:
                        {
                            // Incorrect user password combination
                            loginError("Incorrect user password combination.");
                        }
                        break;
                        default:
                        {
                            loginError("Your login level is too low to claim login.");
                        }
                        break;
                    }
                }
                setClaiming(false);
            }
            break;
            case -1:
            {
                // Invalid user level
                loginError("Invalid user level.");
            }
            break;
            case -2:
            {
                // Invalid user id
                loginError("Invalid user id.");
            }
            break;
            case -3:
            {
                // User does not exist
                loginError("User does not exist.");
            }
            break;
            case -4:
            {
                // Incorrect user password combination
                loginError("Incorrect user password combination.");
            }
            break;
            case -5:
            {
                // Claim password
                claimLevel   = $("#accessLevel .selected").attr("id").replace("accessLevel", "");
                claimUser    = $("#"+standardItems.userSelect.id).find(":selected").val();
                claimPass    = btoa($("#"+standardItems.password.id).val());

                if(win.name == "windowWithTabs")
                {
                    $acceptRow.removeClass("invisible");
                    $acceptButton.off();
                    $cancelButton.off();
                    $acceptButton.on("click", acceptClaim);
                    $cancelButton.on("click", cancelClaim);

                    win.html(wi.convertItemsToElements([standardItems.claimMessage]));
                }
                else
                {
                    espfMan.claimLogin();
                }
            }
            break;
            default:
            {
                loginError("An unknown error occurred, please try again.")
            }
        }
    }

    const checkPasswordChange = function()
    {
        registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], checkPasswordChange]),1);
        mainData.removeCallback([0, 0, 0], checkPasswordChange);
        // console.log(systemData.changePassword().str);
        if(systemData.changePassword().num > 0)
        {
            restoreLoginWindow();
            wi.convertItemsToElements([standardItems.actionSep, standardItems.passwordSucces]).insertAfter("#item_"+standardItems.logout.id);
            // wi.message("message", "Password changed succesfully").insertAfter("#item_"+standardItems.logout.id);
        }
        else
        {
            $("#"+standardItems.oldPassword.id).addClass("invalid");
            $("#"+standardItems.oldPassword.id).select();
            $("#"+standardItems.oldPassword.id).focus();
            $acceptRow.addClass("invisible");
            if($("#errorMessage")[0] != undefined)
            {
                $("#errorMessage").remove();
            }
            wi.errorMessage("errorMessage", "Incorrect password used").insertAfter("#item_"+standardItems.confirmPassword.id);
        }
    };

    const checkNewUserCreated = function()
    {
        registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], checkNewUserCreated]),1);
        mainData.removeCallback([0, 0, 0], checkNewUserCreated);
        fillStandardItems();
        restoreLoginWindow();
        wi.convertItemsToElements([standardItems.actionSep, standardItems.userSucces]).insertAfter("#item_"+standardItems.logout.id);
        // wi.message("message", "User succesfully created").insertAfter("#item_"+standardItems.logout.id);
    };

    const checkUserRemoved = function()
    {
        registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 0], checkUserRemoved]),1);
        mainData.removeCallback([0, 0, 0], checkUserRemoved);
        if(systemData.removeUser().num > 0)
        {
            restoreLoginWindow();
            wi.convertItemsToElements([standardItems.actionSep, standardItems.removeUserSucces]).insertAfter("#item_"+standardItems.logout.id);
            // wi.message("message", "Password changed succesfully").insertAfter("#item_"+standardItems.logout.id);
        }
        else
        {
            restoreLoginWindow();
            wi.convertItemsToElements([standardItems.actionSep, standardItems.removeUserFailed]).insertAfter("#item_"+standardItems.logout.id);
        }

        User.setLevel();
    };

    // const buildUserDialog = function()
    // {
    //     var items = [];
    //     // items.push
    //
    // };

    //#########################################################################
    // Events
    const acceptClick = function()
    {
        var level   = $("#accessLevel .selected").attr("id").replace("accessLevel", "");
        var user    = $("#userSelect").find(":selected").val();

        if(user == undefined)
        {
            user = 0;
        }

        win.append(wi.whiteLoader("loader", "Logging in"));
        $("#password").prop("disabled", true);
        $("#userSelect").prop("disabled", true);
        $acceptRow.addClass("invisible");

        registeredCallbacks.push([[0, 0, 0], loginCallback]);
        mainData.addCallback([0, 0, 0], loginCallback);
        systemData.login(level+"|"+user+"|"+btoa($("#password").val()));
        mainData.updateData([0, 0, 0]);
    };
    this.acceptClick = acceptClick;

    const cancelClick = function(ptr)
    {
        // console.log("[Info] Canceled");
    };

    const selectUser = function(ptr)
    {
        // not necessary?
        // maybe place focus in the password field
        // console.log("[Info] selecting");
        // console.log(ptr);
    };

    const validatePassword = function(ptr)
    {

        var inputId = ptr.target.id;
        var input = $("#"+inputId)[0];
        if(input.value.length < 1)
        {
            // $("#"+standardItems.password.id).addClass("invalid");
            // if($("#errorMessage")[0] != undefined)
            // {
                // $("#errorMessage").remove();
            // }
            // wi.errorMessage("errorMessage", "Password is too short.").insertAfter("#item_password");
            $acceptRow.addClass("invisible");
        }
        else
        {
            $("#errorMessage").remove();
            $("#"+standardItems.password.id).removeClass("invalid");
            $acceptRow.removeClass("invisible");
        }
    }
    this.validatePassword = validatePassword;

    const validateChangePassword = function(ptr)
    {
        var inputId = ptr.target.id;
        var input = $("#"+inputId)[0];
        if(input.value.length < 4)
        {
            $("#"+inputId).addClass("invalid");
            if($("#errorMessage")[0] != undefined)
            {
                $("#errorMessage").remove();
            }
            wi.errorMessage("errorMessage", "Password is too short.").insertAfter("#item_"+standardItems.confirmPassword.id);
            $acceptRow.addClass("invisible");
        }
        else
        {
            $("#errorMessage").remove();
            $("#"+inputId).removeClass("invalid");
            if( $("#"+standardItems.newPassword.id).val().length >= 4 &&
                $("#"+standardItems.confirmPassword.id).val().length >= 4 &&
                $("#"+standardItems.oldPassword.id).val().length >= 4 )
            {
                if($("#"+standardItems.newPassword.id).val() == $("#"+standardItems.confirmPassword.id).val())
                {
                    $acceptRow.removeClass("invisible");
                }
                else
                {
                    wi.errorMessage("errorMessage", "New passwords do not match").insertAfter("#item_"+standardItems.confirmPassword.id);
                }
            }
            else if($("#"+standardItems.confirmPassword.id).val().length < 4 ||
                    $("#"+standardItems.oldPassword.id).val().length < 4 )
            {
                wi.errorMessage("errorMessage", "New passwords do not match").insertAfter("#item_"+standardItems.confirmPassword.id);
            }
        }
    };

    const buttonGroup = function(event)
    {
        var buttonId = event.target.id;
        var buttonGroupId = event.target.parentElement.id;
        $("#"+buttonGroupId+" .selected").removeClass("selected");
        $("#"+buttonId).addClass("selected");
        switch (buttonId) {
            case "accessLevel1": // Operator
            {
                $("#item_"+standardItems.userSelect.id).removeClass("displayNone");
                fillUserSelect(users.operators);
            }
            break;
            case "accessLevel2": // Engineer
            {
                $("#item_"+standardItems.userSelect.id).removeClass("displayNone");
                fillUserSelect(users.engineers);
            }
            break;
            case "accessLevel3": // Service
            {
                $("#item_"+standardItems.userSelect.id).addClass("displayNone");
            }
            break;
        }
        $("#"+standardItems.password.id).focus();
    };
    this.buttonGroup = buttonGroup;

    const buttonGroupRemove = function(event)
    {
        buttonGroup(event);
        $("#"+standardItems.userSelect.id+" option").filter(function(){

            if($(this).html() == User.getUserName())
            {
                console.log($(this)[0]);
                $(this).remove();
            }
        });
    }

    const buttonGroupNewUser = function(event)
    {
        var buttonId = event.target.id;
        var buttonGroupId = event.target.parentElement.id;

        switch (buttonId) {
            case "accessLevel1": // Operator
            {
                var items = [];

                items.push(standardItems.return);
                items.push({type:"line", id:"sep"});
                if(users.operators.length < 21)
                {
                    items.push(standardItems.addUserLevel);
                    items.push(standardItems.newUser);
                    items.push(standardItems.newUserPassword);
                    items.push(standardItems.confirmUserPassword);
                }
                else
                {
                    items.push(standardItems.addUserLevel);
                    items.push(standardItems.maxUsersMessage);
                }

                win.html(wi.convertItemsToElements(items));
                $("#item_"+standardItems.userSelect.id).removeClass("displayNone");
            }
            break;
            case "accessLevel2": // Engineer
            {
                var items = [];

                items.push(standardItems.return);
                items.push({type:"line", id:"sep"});
                if(users.engineers.length < 21)
                {
                    items.push(standardItems.addUserLevel);
                    items.push(standardItems.newUser);
                    items.push(standardItems.newUserPassword);
                    items.push(standardItems.confirmUserPassword);
                }
                else
                {
                    items.push(standardItems.addUserLevel);
                    items.push(standardItems.maxUsersMessage);
                }

                win.html(wi.convertItemsToElements(items));
                $("#item_"+standardItems.userSelect.id).removeClass("displayNone");
            }
            break;
        }
        $("#"+buttonGroupId+" .selected").removeClass("selected");
        $("#"+buttonId).addClass("selected");
        $("#"+standardItems.newUser.id).focus();
        validateUserName();
        validateNewUserPassword({target:{id:standardItems.newUserPassword.id}});
        validateNewUserPassword({target:{id:standardItems.confirmUserPassword.id}});
    };

    const logout = function(ptr)
    {
        if(User.loggedIn())
        {
            registeredCallbacks.push([[0, 0, 0], loginCallback]);
            mainData.addCallback([0, 0, 0], loginCallback);
            systemData.login("0|0|");
            mainData.updateData([0, 0, 0]);
        }
    };

    const acceptClaim = function()
    {
        win.append(wi.whiteLoader("loader", "Logging in"));
        $("#password").prop("disabled", true);
        $("#userSelect").prop("disabled", true);
        $acceptRow.addClass("invisible");

        setClaiming(true);
        // console.log(claimPass);
        // console.log(getClaimPass());
        registeredCallbacks.push([[0, 0, 0], loginCallback]);
        mainData.addCallback([0, 0, 0], loginCallback);
        systemData.loginClaim(claimLevel + '|' + claimUser + '|' + claimPass);
        claimPass = undefined;
        mainData.updateData([0, 11]);
        mainData.updateData([0, 0, 0]);
    };
    this.acceptClaim = acceptClaim;

    const cancelClaim = function()
    {
        registeredCallbacks.push([[0, 0, 0], loginCallback]);
        mainData.addCallback([0, 0, 0], loginCallback);
        mainData.updateData([0, 11]);
        mainData.updateData([0, 0, 0]);
    };
    this.cancelClaim = cancelClaim;

    const clickChangePassword = function()
    {
        var items = [];

        items.push(standardItems.return);
        items.push({type:"line", id:"sep"});
        items.push(standardItems.oldPassword);
        items.push(standardItems.newPassword);
        items.push(standardItems.confirmPassword);

        win.html(wi.convertItemsToElements(items));

        $acceptButton.off();
        $cancelButton.off();
        $acceptButton.on("click", acceptChangePassword);
        $cancelButton.on("click", restoreLoginWindow);
    };

    const acceptChangePassword = function()
    {
        var oldPass = btoa($("#"+standardItems.oldPassword.id).val());
        var newPass = btoa($("#"+standardItems.newPassword.id).val());

        registeredCallbacks.push([[0, 0, 0], checkPasswordChange]);
        mainData.addCallback([0, 0, 0], checkPasswordChange);
        systemData.changePassword(oldPass + "|" + newPass);
        mainData.updateData([0, 0, 0]);
    };

    const clickAddUser = function()
    {
        if(User.getLevel() >= User.ENGINEER)
        {
            var items = [];

            items.push(standardItems.return);
            items.push({type:"line", id:"sep"});
            if(users.operators.length < 21)
            {
                items.push(standardItems.addUserLevel);
                items.push(standardItems.newUser);
                items.push(standardItems.newUserPassword);
                items.push(standardItems.confirmUserPassword);
            }
            else
            {
                items.push(standardItems.addUserLevel);
                items.push(standardItems.maxUsersMessage);
            }

            win.html(wi.convertItemsToElements(items));

            $acceptButton.off();
            $cancelButton.off();
            $acceptButton.on("click", acceptNewUser);
            $cancelButton.on("click", restoreLoginWindow);
        }
    };

    const validateUserName = function()
    {
        var level   = $("#"+standardItems.addUserLevel.groupId+" .selected").attr("id").replace(standardItems.addUserLevel.groupId, "");
        var $userInput = $("#"+standardItems.newUser.id);
        if($userInput.length > 0)
        {
            var newName = $userInput.val();

            if(newName.length < 3)
            {
                $userInput.addClass("invalid");
                if($("#errorMessageUser")[0] != undefined)
                {
                    $("#errorMessageUser").remove();
                }
                wi.errorMessage("errorMessageUser", "New username is too short. Has to be at least 3 characters.").insertAfter("#item_"+standardItems.newUser.id);
                $acceptRow.addClass("invisible");
            }
            else if(newName.search(lookup.charWhiteList) != -1)
            {
                $userInput.addClass("invalid");
                if($("#errorMessageUser")[0] != undefined)
                {
                    $("#errorMessageUser").remove();
                }
                wi.errorMessage("errorMessageUser", "No special characters allowed.").insertAfter("#item_"+standardItems.newUser.id);
                $acceptRow.addClass("invisible");
            }
            else if(!userDoesNotExist(level, newName))
            {
                $userInput.addClass("invalid");
                if($("#errorMessageUser")[0] != undefined)
                {
                    $("#errorMessageUser").remove();
                }
                wi.errorMessage("errorMessageUser", "Username already exists, please choose a different username.").insertAfter("#item_"+standardItems.newUser.id);
                $acceptRow.addClass("invisible");
            }
            else if($userInput.val() == $("#"+standardItems.newUserPassword.id).val())
            {
                $userInput.addClass("invalid");
                if($("#errorMessageUser")[0] != undefined)
                {
                    $("#errorMessageUser").remove();
                }
                wi.errorMessage("errorMessage", "Username is not allowed as password.").insertAfter("#item_"+standardItems.confirmUserPassword.id);
                $acceptRow.addClass("invisible");
            }
            else
            {
                $userInput.removeClass("invalid");
                $("#errorMessageUser").remove();
                validateNewUserPassword({target:{id:standardItems.newUserPassword.id}});
                validateNewUserPassword({target:{id:standardItems.confirmUserPassword.id}});
                if(userNameAndPasswordsOk())
                {
                    $acceptRow.removeClass("invisible");
                }
                else
                {
                    $acceptRow.addClass("invisible");
                }
            }
        }
    };

    const validateNewUserPassword = function(ptr)
    {
        var inputId = ptr.target.id;
        if($("#"+inputId).length > 0)
        {
            var input = $("#"+inputId)[0];
            if(input.value.length < 4)
            {
                $("#"+inputId).addClass("invalid");
                if($("#errorMessage")[0] != undefined)
                {
                    $("#errorMessage").remove();
                }
                wi.errorMessage("errorMessage", "Password is too short.").insertAfter("#item_"+standardItems.confirmUserPassword.id);
                $acceptRow.addClass("invisible");
            }
            else if(input.value == $("#"+standardItems.newUser.id).val())
            {
                if($("#errorMessage")[0] != undefined)
                {
                    $("#errorMessage").remove();
                }
                wi.errorMessage("errorMessage", "Username is not allowed as password.").insertAfter("#item_"+standardItems.confirmUserPassword.id);
                $acceptRow.addClass("invisible");
            }
            else
            {
                $("#errorMessage").remove();
                $("#"+inputId).removeClass("invalid");
                if( $("#"+standardItems.newUserPassword.id).val().length >= 4 &&
                    $("#"+standardItems.confirmUserPassword.id).val().length >= 4 )
                {
                    if($("#"+standardItems.newUserPassword.id).val() == $("#"+standardItems.confirmUserPassword.id).val())
                    {
                        if(userNameAndPasswordsOk())
                        {
                            $acceptRow.removeClass("invisible");
                        }
                        else
                        {
                            $acceptRow.addClass("invisible");
                        }
                    }
                    else
                    {
                        wi.errorMessage("errorMessage", "New passwords do not match").insertAfter("#item_"+standardItems.confirmUserPassword.id);
                    }
                }
                else
                {
                    wi.errorMessage("errorMessage", "New passwords do not match").insertAfter("#item_"+standardItems.confirmUserPassword.id);
                }
            }
        }
    };

    const acceptNewUser = function()
    {
        var level   = $("#"+standardItems.addUserLevel.groupId+" .selected").attr("id").replace(standardItems.addUserLevel.groupId, "");
        var newUser = $("#"+standardItems.newUser.id).val();
        var password= btoa($("#"+standardItems.newUserPassword.id).val());


        registeredCallbacks.push([[0, 0, 0], checkNewUserCreated]);
        mainData.addCallback([0, 0, 0], checkNewUserCreated);
        if(newUser != undefined || newUser != "undefined")
        {
            systemData.addUser(level + "|" + newUser + "|" + password);
        }
        queryData();
        mainData.updateData([0, 0, 0]);
    };

    const clickRemoveUser = function()
    {
        var level = User.getLevel();
        if(level >= User.ENGINEER)
        {
            if(level == User.OPERATOR)
            {
                level = "operators";
            }
            else if(level == User.ENGINEER)
            {
                level = "engineers";
            }
            else
            {
                level = undefined;
            }

            fillStandardItems();
            // console.log(users);
            fillUserSelect(users);

            var items = [];
            items.push(standardItems.return);
            items.push({type:"line", id:"sep"});
            items.push(standardItems.removeUserLevel);
            items.push(standardItems.userSelect);
            items.push(standardItems.removePassword);
            items.push(standardItems.removeUserInsctruction);
            win.html(wi.convertItemsToElements(items));


            $("#"+standardItems.userSelect.id+" option").filter(function(){
                // console.log($(this)[0]);
                if($(this).html() == User.getUserName())
                {

                    $(this).remove();
                }
            });
            $("#" + standardItems.removeUserLevel.ids[0]).click();

            $acceptButton.off();
            $cancelButton.off();
            $acceptButton.on("click", removeUser);
            $cancelButton.on("click", restoreLoginWindow);
            $acceptRow.removeClass("invisible");
        }
    };

    const removeUser = function()
    {
        var level   = $("#"+standardItems.removeUserLevel.groupId+" .selected").attr("id").replace(standardItems.removeUserLevel.groupId, "");
        var user    = $("#"+standardItems.userSelect.id).find(":selected").val();
        var password= btoa($("#"+standardItems.password.id).val());

        registeredCallbacks.push([[0, 0, 0], checkUserRemoved]);
        mainData.addCallback([0, 0, 0], checkUserRemoved);
        systemData.removeUser(level + "|" + user + "|" + password);
        queryData();
        mainData.updateData([0, 0, 0]);
    };

    //#########################################################################
    // Helpers
    const getElements = function()
    {
        var level = User.getLevel();
        var user = User.getUser();
        var userName = User.getUserName();
        var items = new Array();

        standardItems.welcomeMessage.text = "Logged in as " + User.getUserName() + " (" + User.getLevelName() + ")";

        switch(level)
        {
            case User.VIEW:
            {
                items.push(standardItems.levelSelect);
                items.push(standardItems.userSelect);
                items.push(standardItems.password);
            }
            break;
            case User.OPERATOR:
            {
                items.push(standardItems.welcomeMessage);
                items.push(standardItems.welcomeSep);
                items.push(standardItems.changePassword);
                items.push(standardItems.logout);
                items.push(standardItems.switchSep);
                items.push(standardItems.levelSelect);
                items.push(standardItems.userSelect);
                items.push(standardItems.password);
            }
            break;
            case User.ENGINEER:
            {
                var items = new Array();
                items.push(standardItems.welcomeMessage);
                items.push(standardItems.welcomeSep);
                items.push(standardItems.changePassword);
                items.push(standardItems.addUser);
                items.push(standardItems.removeUser);
                items.push(standardItems.logout);
                items.push(standardItems.switchSep);
                items.push(standardItems.levelSelect);
                items.push(standardItems.userSelect);
                items.push(standardItems.password);
            }
            break;
            case User.SERVICE:
            {
                var items = new Array();
                items.push(standardItems.welcomeMessage);
                items.push(standardItems.welcomeSep);
                items.push(standardItems.addUser);
                items.push(standardItems.removeUser);
                items.push(standardItems.logout);
                items.push(standardItems.switchSep);
                items.push(standardItems.levelSelect);
                items.push(standardItems.userSelect);
                items.push(standardItems.password);
            }
            break;
        }
        return wi.convertItemsToElements(items);
    };

    const getClaimElements = function()
    {
        var items = [];

        items.push(standardItems.claimMessage);

        return wi.convertItemsToElements(items);
    };

    // const getLoginDialogItems = function()
    // {
    //     var items = [];
    //
    //     items.push(standardItems.levelSelect);
    //     items.push(standardItems.userSelect);
    //     items.push(standardItems.password);
    //
    //     return items;
    // };

    const userNameAndPasswordsOk = function()
    {
        var level   = $("#"+standardItems.addUserLevel.groupId+" .selected").attr("id").replace(standardItems.addUserLevel.groupId, "");
        var newUser = $("#"+standardItems.newUser.id).val();

        if( $("#"+standardItems.newUserPassword.id).val() == $("#"+standardItems.confirmUserPassword.id).val() &&
            $("#"+standardItems.newUserPassword.id).val().length >= 4 &&
            $("#"+standardItems.confirmUserPassword.id).val().length >= 4 &&
            $("#"+standardItems.newUser.id).val().search(lookup.charWhiteList) == -1 &&
            $("#"+standardItems.newUser.id).val().length >= 3 &&
            $("#"+standardItems.newUser.id).val() != $("#"+standardItems.newPassword.id).val() &&
            userDoesNotExist(level, newUser))
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    const fillUserSelect = function(a_users)
    {
        // console.log(a_users);
        $options = $("<select></select>");
        for(var i = 0; i < a_users.length; i++)
        {
            // console.log(a_users[i]);
            var option = $("<option value='"+i+"'>"+a_users[i]+"</option>");
            // console.log(option[0]);
            $options.append(option);
        }
        // Replace the new options
        $("#"+standardItems.userSelect.id).html($options.children());
        // Select the first user and not the last which is default
        $("#"+standardItems.userSelect.id + ">option:eq(0)").prop("selected", true);
    };

    const userDoesNotExist = function(a_level, a_user)
    {
        var level = undefined;
        if(a_level == User.OPERATOR)
        {
            level = "operators";
        }
        else if(a_level == User.ENGINEER)
        {
            level = "engineers";
        }
        else
        {
            // return false so the user can't be made
            return false;
        }

        for(var i = 0; i < users[level].length; i++)
        {
            // console.log(users[level][i]);
            if(users[level][i] == a_user)
            {
                return false;
            }
        }
        return true;
    }

    const loginError = function(a_error)
    {
        $("#loader").remove();
        $("#"+standardItems.password.id).val("");
        $("#"+standardItems.password.id).prop("disabled", false);
        $("#"+standardItems.userSelect.id).prop("disabled", false);
        $("#"+standardItems.password.id).focus();
        // $("#windowContent").append(wi.errorMessage("errorMessage", a_error));
        $("#errorMessage").remove();
        win.append(wi.errorMessage("errorMessage", a_error));
    };

    const claiming = function()
    {
        return claimingStatus;
    };

    const setClaiming = function(a_status)
    {
        claimingStatus = a_status;
    };

    const restoreLoginWindow = function()
    {
        $acceptRow.addClass("invisible");
        $acceptButton.off();
        $cancelButton.off();
        $acceptButton.on("click", acceptClick);
        $cancelButton.on("click", cancelClick);

        fillStandardItems();
        win.html(getElements());
        fillUserSelect(users.operators);
    };

    const getClaimPass = function()
    {
        return claimPass;
    }

    //#########################################################################
    // Constructor
    var doneInitCallback;
    // var items               = new Array();
    var userLevels          = ["view","operators", "engineers"];
    var users               = {operators:[], engineers:[]};
    var $acceptRow          = $(".acceptRow");
    var $acceptButton       = $("#acceptButton");
    var $cancelButton       = $("#cancelButton");
    var wi                  = new windowItems(0);
    var claimingStatus      = false;
    var claimLevel          = -1;
    var claimUser           = -1;
    var claimPass           = undefined;
    var win                 = a_mainWindow;
    var registeredCallbacks = [];
    var callbacks           = {};

    var standardItems = {};

    standardItems.levelSelect           = { type:"buttonGroupLarge",
                                        groupName:"Choose access level:",
                                        groupId:"accessLevel",
                                        ids:["accessLevel1", "accessLevel2", "accessLevel3"],
                                        names:["Operator", "System Engineer", "Service Engineer"],
                                        selected:"accessLevel1",
                                        function:buttonGroup,
                                        windowData:this };
    standardItems.addUserLevel          = { type:"buttonGroupLarge",
                                            groupName:"Choose access level:",
                                            groupId:"accessLevel",
                                            ids:["accessLevel1", "accessLevel2"],
                                            names:["Operator", "System Engineer"],
                                            selected:"accessLevel1",
                                            function:buttonGroupNewUser,
                                            windowData:this };
    standardItems.removeUserLevel       = { type:"buttonGroupLarge",
                                            groupName:"Choose access level:",
                                            groupId:"accessLevel",
                                            ids:["accessLevel1", "accessLevel2"],
                                            names:["Operator", "System Engineer"],
                                            selected:"accessLevel1",
                                            function:buttonGroupRemove,
                                            windowData:this };
    standardItems.userSelect            = {type:"loginSelect", id:"userSelect",name:"Select User:", options:users.operators, function:selectUser, windowData:this};
    standardItems.password              = {type:"loginPassword", id:"password",name:"Enter Password:", function:validatePassword, windowData:this};
    standardItems.removePassword              = {type:"loginPassword", id:"password",name:"Enter Current User's Password:", function:validatePassword, windowData:this};
    standardItems.oldPassword           = {type:"loginPassword", id:"oldPassword",name:"Enter Old Password:", function:validateChangePassword, windowData:this};
    standardItems.newPassword           = {type:"loginPassword", id:"newPassword",name:"Enter New Password:", function:validateChangePassword, windowData:this};
    standardItems.confirmUserPassword   = {type:"loginPassword", id:"confirmUserPassword",name:"Repeat New Password:", function:validateNewUserPassword, windowData:this};
    standardItems.newUserPassword       = {type:"loginPassword", id:"newUserPassword",name:"Enter New Password:", function:validateNewUserPassword, windowData:this};
    standardItems.confirmPassword       = {type:"loginPassword", id:"confirmPassword",name:"Repeat New Password:", function:validateChangePassword, windowData:this};
    standardItems.newUser               = {type:"inputLarge",id:"newUser",name:"New User Name:", maxLength:13, function:validateUserName, windowData:this};
    standardItems.claimMessage          = {type:"message", id: "claimMessage", text:"Another user is already logged in. Do you want to override this login?"};
    standardItems.welcomeMessage        = {type:"message", id: "welcome", text:"Logged in as " + User.getUserName() + " (" + User.getLevelName() + ")"};
    standardItems.logout                = {type:"button", id:"logout", name:"Logout", function:logout, windowData:this};
    standardItems.return                = {type:"button", id:"return", name:"Return To Logpanel", function:restoreLoginWindow, windowData:this};
    standardItems.changePassword        = {type:"button", id:"changePassword", name:"Change Password", function:clickChangePassword, windowData:this};
    standardItems.addUser               = {type:"button", id:"addUser", name:"Create A New User", function:clickAddUser, windowData:this};
    standardItems.removeUser            = {type:"button", id:"removeUser", name:"Remove A User", function:clickRemoveUser, windowData:this};
    standardItems.welcomeSep            = {type:"line", id:"welcomeSep"};
    standardItems.switchSep             = {type:"line", id:"switchSep"};
    standardItems.actionSep             = {type:"line", id:"actionSep"};
    standardItems.passwordSucces        = {type:"succesMessage", id: "passwordSucces", text:"Password changed succesfully"};
    standardItems.userSucces            = {type:"succesMessage", id: "userSucces", text:"User succesfully created"};
    standardItems.removeUserInsctruction= {type:"message", id: "remUser", text:"Click Accept(✓) to remove the selected user."};
    standardItems.removeUserSucces      = {type:"succesMessage", id: "remUserSucces", text:"User removed succesfully"};
    standardItems.removeUserFailed      = {type:"errorMessage", id: "remUserFailed", text:"User deletion failed. Possible causes could be:<br>User no longer exists<br>Invalid password was entered to confirm deletion"};
    standardItems.maxUsersMessage        = {type:"errorMessage", id: "maxUsersMessage", text:"The maximum of 21 users of the selected level is reached. To create a new user please remove one first."};

    this.standardItems              = standardItems;

    return this;
};

