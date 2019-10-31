function windowTools()
{
    this.validateInput = function(ptr)
    {
        var inputId     = ptr.target.id;
        var input       = $("#"+inputId)[0];
        var inputValue  = Number(input.value);
        var inputMax    = Number(input.max);
        var inputMin    = Number(input.min);
        var $input      = $("#"+inputId);
        var step        = $input.attr("step");
        // console.log(step);

        if(inputValue <= inputMax && inputValue >= inputMin && $input.val() != "")
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

    this.validateButtonGroup = function(ptr)
    {
        var buttonId        = ptr.target.id;
        var buttonGroupId   = event.target.parentElement.id;

        $("#"+buttonGroupId+" .selected").removeClass("selected");
        $("#"+buttonId).addClass("selected");

        if($('.row .invalid').length == 0)
        {
            $(".acceptRow").removeClass("invisible");
        }
    };

    this.validateToggle = function(ptr)
    {
        if($('.row .invalid').length == 0)
        {
            $(".acceptRow").removeClass("invisible");
        }
    }

    this.checkItem = function(ptr)
    {
        if(!$(this).find("input").prop("disabled"))
        {
            if($(this).hasClass("checklistItemSelected"))
            {
                $(this).removeClass("checklistItemSelected");
                // $(this).attr("selected", "false");
                if(ptr.target.nodeName == "DIV")
                {
                    $(this).find("input").prop("checked", false);
                }
            }
            else
            {
                $(this).addClass("checklistItemSelected");
                if(ptr.target.nodeName == "DIV")
                {
                    $(this).find("input").prop("checked", true);
                }
            }
            $(".acceptRow").removeClass("invisible");
        }
    };

    this.selectListItem = function(  )
    {
        // console.log(event);
        // $(this.parentElement).find(".checklistItemSelected").removeClass("checklistItemSelected");
        // $(this).addClass("checklistItemSelected");
        $(event.currentTarget.parentElement).find(".listItemSelected").removeClass("listItemSelected");
        $(event.currentTarget).addClass("listItemSelected");
    };

    this.restoreValues = function(a_items)
    {
        var items = a_items;

        for(var i = 0; i < items.length; i++)
        {
            switch(items[i].type)
            {
                case "sideBySide":
                {
                    this.restoreValues([items[i].left, items[i].right]);
                }
                break;
                case "buttonGroup":
                case "buttonGroupLarge":
                {
                    var buttonId        = items[i].selected;
                    var buttonGroupId   = items[i].groupId;

                    $("#"+buttonGroupId+" .selected").removeClass("selected");
                    $("#"+buttonId).addClass("selected");
                }
                break;
                case "inputNumber":
                case "input":
                case "inputBig":
                case "mfcItem":
                case "disabledInput":
                {
                    var $item = $("#"+items[i].id);
                    $item.val(items[i].value);
                    $item.removeClass('valid');
                    $item.removeClass('invalid');
                }
                break;
                case "select":
                {
                    var selectId        = items[i].id;
                    var selectedOption  = items[i].selected;

                    $("#" + selectId).find(":selected").removeProp("selected");
                    $("#" + selectId + " option[value='" + selectedOption + "']").prop("selected","selected");
                    $("#" + selectId).change();
                }
                break;
                case "checklist":
                {
                    var id          = items[i].id;
                    var selected    = items[i].selected;
                    var $inputs     = $("#item_" + id + " input");
                    var $items      = $("#item_" + id + " .checklistItem");

                    for(var j = 0; j < items[i].options.length; j++)
                    {
                        if(selected.indexOf(items[i].values[j]) > -1)
                        {
                            $inputs.eq(j).prop("checked", true);
                            $items.eq(j).addClass("checklistItemSelected");
                        }
                        else
                        {
                            $inputs.eq(j).prop("checked", false);
                            $items.eq(j).removeClass("checklistItemSelected");
                        }
                    }
                }
                break;
                case "toggle":
                {
                    var selectId        = items[i].id;
                    var value           = items[i].value;
                    var $toggle         = $("#"+ selectId);

                    if(value)
                    {
                        $toggle.prop("checked", true);
                    }
                    else
                    {
                        $toggle.prop("checked", false);
                    }
                }
                break;
                case "button":
                case "line":
                case "message":
                case "messageLeft":
                {
                    // Intentionally left blank
                }
                break;
                default:
                {
                    if(developing.verbose)
                    {
                        console.log("[Dev] Reset for "+items[i].name+ " not supported yet.");
                    }
                }
                break;
            }
        }
        $(".acceptRow").addClass("invisible");
    };

    this.submitValidItems = function(a_sensorId)
    {
        // Inputs
        $validItems         = $('.valid');
        for(var i = 0; i < $validItems.length; i++)
        {
            var $item = $validItems.eq(i);
            switch($item.prop("nodeName"))
            {
                case "INPUT":
                {
                    var jCodeGroup  = Number($item.attr("jcodegroup"));
                    var jCodeId     = Number($item.attr("jcodeid"));
                    var value       = $item.val();
                    var address     = [jCodeGroup, jCodeId];
                    if(a_sensorId != undefined)
                    {
                        address.push(a_sensorId);
                    }
                    if(jCodeGroup == 5 || jCodeGroup == 6)
                    {
                        address = [jCodeGroup, a_sensorId, jCodeId];
                    }
                    mainData.setData(address, value);
                }
                break;
                case "BUTTON":
                case undefined:
                {
                    // Intentionally left blank
                }
                break;
                default:
                {
                    console.log("[Error] Reset for "+items[i].name+ " not supported yet.");
                }
                break;
            }
        }
    };

    this.submitButtonGroups = function(a_sensorId)
    {
        // Button Groups
        var $buttonGroups = $('.buttonGroup');
        for(var i = 0; i < $buttonGroups.length; i++)
        {
            var $group      = $buttonGroups.eq(i);
            var groupId     = $group.attr("id");
            var jCodeGroup  = Number($group.attr("jcodegroup"));
            var jCodeId     = Number($group.attr("jcodeid"));
            var value       = $group.find(".selected").attr("id").replace(groupId, "");
            var address     = [jCodeGroup, jCodeId, a_sensorId];
            if(jCodeGroup == 0)
            {
                address = [jCodeGroup, jCodeId];
            }
            else if(jCodeGroup == 5 || jCodeGroup == 6)
            {
                address     = [jCodeGroup, a_sensorId, jCodeId];
            }


            mainData.setData(address, value);
        }
    };

    this.submitSelects = function(a_sensorId)
    {
        // Selects
        var $selects = $("#windowContent select");
        for(var i = 0; i < $selects.length; i++)
        {
            var $select         = $selects.eq(i);
            var jCodeGroup      = Number($select.attr("jcodegroup"));
            var jCodeId         = Number($select.attr("jcodeid"));
            var oldSelection    = Number($select.attr("original"));
            var newSelection    = Number($select.find(":selected").val());
            var address         = [jCodeGroup, jCodeId, a_sensorId];

            if(oldSelection != newSelection)
            {
                mainData.setData(address, newSelection);
            }
        }
    };

    this.submitToggles = function(a_sensorId)
    {
        var $toggles = $("#windowContent .onoffswitch-checkbox");
        for (var i = 0; i < $toggles.length; i++)
        {
            var $toggle         = $toggles.eq(i);
            var jCodeGroup      = Number($toggle.attr("jcodegroup"));
            var jCodeId         = Number($toggle.attr("jcodeid"));
            var value           = $toggle.prop("checked");
            var jCodeValue      = undefined;
            var address         = [jCodeGroup, jCodeId];
            if(a_sensorId != undefined)
            {
                address.push(a_sensorId);
            }

            if(jCodeGroup == 5 || jCodeGroup == 6)
            {
                address = [jCodeGroup, a_sensorId, jCodeId];
            }

            if(value)
            {
                jCodeValue = 1;
            }
            else {
                jCodeValue = 0;
            }

            mainData.setData(address, jCodeValue);
        }
    };

    this.removeCallbacks = function(a_callbacks)
    {
        for(index in a_callbacks)
        {
            // if(developing.callbacks && a_callbacks[index][1].name != undefined)
            // {
            //     console.log("[Dev] Removing callback " + index + " - "+ a_callbacks[index][0] + " | " + a_callbacks[index][1].name + "()");
            // }
            if(a_callbacks[index][1] != "undefined")
            {
               mainData.removeCallback(a_callbacks[index][0], a_callbacks[index][1]);
            }
            else if(developing.callbacks)
            {
               console.log("[Dev][Callbacks][wTools] Removing callback failed it did not exist");
            }
        }
    };

    // Disabled all items that require user interaction
    // Currently supported item:
    // Input, InputNumber, Button, ButtonGroup, ButtonGroupLarge, Toggle, Select, Checklist
    this.disableActionItems = function()
    {
        // Input, InputNumber
        $('#windowContent .inputField input').prop("disabled", true);
        $('#windowContent .inputFieldBig input').prop("disabled", true);
        // Button, ButtonGroup ButtonGroupLarge
        $('#windowContent button').prop("disabled", true);
        // Toggle
        $("#windowContent .onoffswitch input").prop("disabled", true);
        $("#windowContent .onoffswitch .onoffswitch-inner").addClass("onoffswitchDisabled");
        // Select
        $("#windowContent select").prop("disabled", true);
        // checklist
        $("#windowContent .checklist input").prop("disabled", true);
        $("#windowContent .checklistItem").prop("disabled", true);
    };

    this.enableActionItems = function()
    {
        // Input, InputNumber
        $('#windowContent .inputField input').prop("disabled", false);
        $('#windowContent .inputFieldBig input').prop("disabled", false);
        // Button, ButtonGroup ButtonGroupLarge
        $('#windowContent button').prop("disabled", false);
        // Toggle
        $("#windowContent .onoffswitch input").prop("disabled", false);
        $("#windowContent .onoffswitch .onoffswitch-inner").removeClass("onoffswitchDisabled");
        // Select
        $("#windowContent select").prop("disabled", false);
        // checklist
        $("#windowContent .checklist input").prop("disabled", false);
        $("#windowContent .checklistItem").prop("disabled", false);
    };
};

var wTools = new windowTools();

