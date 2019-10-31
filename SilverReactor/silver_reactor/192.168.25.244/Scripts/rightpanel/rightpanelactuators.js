function rightPanelActuators()
{
    this.init = function(a_func)
    {
        doneInitCallback = a_func;

        // mainData.addCallback([0, 0, 0], initCallback);
        // mainData.addCallback([0, 0 ,1], initCallback);
        // registeredCallbacks.push([[0, 0 ,1], initCallback]);
        // queryData();
        // mainData.updateData([0, 0, 1]);
        callbacks["init"] = mainData.registerCallback(initCallback);
        queryData();
        mainData.updateData(callbacks["init"].address);
    };

    var queryData = function()
    {
        mainData.updateData([2, 1]); // name
        mainData.updateData([1,52]); // assigned
        mainData.updateData([2, 2]); // priority
        mainData.updateData([2, 3]); // doseMonEnabled
        mainData.updateData([2, 5]); // unit
        mainData.updateData([2, 12]); // value
        mainData.updateData([2, 13]); // doseValue
        mainData.updateData([2, 21]); // available
        mainData.updateData([2, 7]); // assigned
        mainData.updateData([2, 47]); // interlockStatus
    };

    var fillStandardItems = function(a_items)
    {
        standardItems.actuators = [];
        var actuatorsPriority = lookup.getPrioritisedActuators();
        // console.log(actuatorsPriority);
        for(var i = 0; i < actuatorsPriority.length; i++)
        {
            var actuatorId = lookup.getActuatorId(actuatorsPriority[i]);
            // console.log(i + " " + actuatorId);
            if(actuatorData.available(actuatorId).num >= 3)
            {

                var actuator = {
                    type:"actuatorOverviewItem",
                    id: actuatorId,
                    name: actuatorData.name(actuatorId).str,
                    icon: lookup.getSensorImageUrl(actuatorData.assigned(actuatorId).num),
                    value: actuatorData.value(actuatorId).str,
                    doseValue: "<span style='font-weight:normal'>Σ </span>" + actuatorData.doseValue(actuatorId).str,
                    unit: actuatorData.unit(actuatorId).str
                };

                standardItems.actuators.push(actuator);

                // var address = [2, 12, actuatorId]; //value
                // registeredCallbacks.push([address, updateValue]);
                // mainData.addCallback(address, updateValue);
                // actuatorData.value(actuatorId, null, {add:true, caller:updateValue});
                callbacks["updateActValue" + actuatorId] = mainData.registerCallback(updateValue, [2, 12, actuatorId]);
                actuatorData.value(actuatorId, null, {add:true, caller:updateValue});

                // console.log(address);
                // address = [2, 13, actuatorId]; //doseValue
                // registeredCallbacks.push([address, updateDoseValue]);
                // mainData.addCallback(address, updateDoseValue);
                // actuatorData.doseValue(actuatorId, null, {add:true, caller:updateDoseValue});
                callbacks["updateActDoseValue" + actuatorId] = mainData.registerCallback(updateDoseValue, [2, 13, actuatorId]);
                actuatorData.doseValue(actuatorId, null, {add:true, caller:updateDoseValue});

                callbacks["setInterlockStatus" + actuatorId] = mainData.registerCallback(setInterlockStatus, [2,47, actuatorId]);
            }
        }

    };

    this.buildUp = function()
    {
        var $elements = $("<div></div>");
        var actuators = wi.convertItemsToElements(standardItems.actuators);
        var $actuatorArea = $("<div class='windowContent rightActuatorArea'></div>");
        var $buttonArea = $("<div class='windowContent rightActuatorButtons'></div>");
        var $reset = wi.convertItemsToElements([standardItems.resetDose]);

        $reset.css("border-bottom-right-radius", "10px");
        $reset.css("background", "#e0f3f1");

        $actuatorArea.append(actuators);
        $buttonArea.append($reset);
        $elements.append($actuatorArea);
        $elements.append($buttonArea);

        return $elements.children();
    };

    this.setState = function()
    {
        if(User.loggedIn())
        {
            $("#" + standardItems.resetDose.id).prop("disabled", false);
        }
        else
        {
            $("#" + standardItems.resetDose.id).prop("disabled", true);
        }
    };
    var setState = this.setState;

    this.cleanUp = function()
    {
        mainData.remCallbacks(callbacks);
        wTools.removeCallbacks(registeredCallbacks);
    };

    //#########################################################################
    // Callbacks
    var initCallback = function()
    {
        // mainData.removeCallback([0, 0, 1], initCallback);
        // registeredCallbacks.splice(registeredCallbacks.indexOf([[0, 0, 1], initCallback]),1);

        mainData.remCallback(callbacks["init"]);
        delete callbacks["init"];

        fillStandardItems(standardItems);

        // mainData.addCallback([0, 11], setState);
        // registeredCallbacks.push([[0, 11], setState]);

        callbacks["setStateRightPanelActuators"] = mainData.registerCallback(setState, [0, 11]);

        if(undefined != doneInitCallback && null != doneInitCallback)
        {
            doneInitCallback();
        }

        for(var i = 0; i < actuatorData.getActuatorCount(); ++i)
        {
            setInterlockStatus([2, 47, i], actuatorData.interlockStatus(i).num)
        }
    };

    var updateValue = function(a_address, a_data)
    {
        var actuatorId              = a_address[2];
        var $actuatorOverviewItem   = $("#actuatorOverviewItem_"+actuatorId);
        var $value                  = $actuatorOverviewItem.find(".actuatorOverviewValue");
        var value                   = actuatorData.value(actuatorId);

        $value.html(value.str);
    };

    var updateDoseValue = function(a_address, a_data)
    {
        mainData.updateData([2, 3, actuatorId]); // doseMonEnabled
        var actuatorId              = a_address[2];
        var $actuatorOverviewItem   = $("#actuatorOverviewItem_"+actuatorId);
        var $doseValue              = $actuatorOverviewItem.find(".actuatorOverviewDoseValue");
        var $unit                   = $actuatorOverviewItem.find(".actuatorOverviewUnit").eq(1);
        $doseValue.html("<span style='font-weight:normal'>Σ </span>" + actuatorData.doseValue(actuatorId).str);
        if(actuatorData.doseMonEnabled(actuatorId).num)
        {
            $doseValue.removeClass("invisible");
            $unit.removeClass("invisible");
        }
        else
        {
            $doseValue.addClass("invisible");
            $unit.addClass("invisible");
        }

    };

    const setInterlockStatus = function(a_address, a_data)
    {
        var actuatorId              = a_address[2];
        var $actuatorOverviewItem   = $("#actuatorOverviewItem_"+actuatorId);

        $actuatorOverviewItem.removeClass(function (index, className) {
            return (className.match (/(^|\s)border\S+/g) || []).join(' ');
        });

        if(Number(a_data) == 1)
        {
            $actuatorOverviewItem.addClass("borderRed");
        }
        else
        {
            $actuatorOverviewItem.addClass("borderGray");
        }
    }

    //#########################################################################
    // Events
    var resetDoseConfirmation = function()
    {
        // console.log("test");
        // mainData.removeCallback([0, 0, 6], displayUpdate);
        $(".infoPanel").remove();
        if($("#resetDosePanel").length == 0)
        {
            $body = $(document.body);

            var $panel              = $('<div id="resetDosePanel" class="card windowContent infoPanel"></div>');
            var $card               = $("<div class='windowContent frame'></div>");
            var $title              = $("<div class='row'><div class='item message title'>Reset All Dose Monitors</div></div>");
            var $instructions       = wi.message("instructions", "Clicking accept(✓) will reset all dose monitors. Are you sure you want to continue?");
            var $apply              = $("<img action='accept' src='images/accept.png'></img>");
            var $cancel             = $("<img action='cancel' src='images/cancel.png'></img>");
            var $acceptRow          = $("<div class='row acceptButtons'></div>");

            $apply.on("click", resetDose);
            $cancel.on("click", removeDoseConfirmation);
            $acceptRow.append($apply);
            $acceptRow.append($cancel);

            $card.append($instructions);
            $panel.append($title);
            $panel.append($card);
            $panel.append($acceptRow);

            $body.append($panel);

            $panel.draggable();

            $("#resetDosePanel").slideDown(200);
        }
    };

    const resetDose = function()
    {
        for(var actuatorId = 0; actuatorId < actuatorData.getActuatorCount(); actuatorId++)
        {
            actuatorData.doseValue(actuatorId, 1);
        }
        removeDoseConfirmation();
    };

    const removeDoseConfirmation = function()
    {
        $("#resetDosePanel").slideUp(100, function(){
            $("#resetDosePanel").remove();
        });
    }



    //#########################################################################
    // Helper functions



    //#########################################################################
    // Constructor
    var doneInitCallback;
    var registeredCallbacks = new Array();
    var items               = new Array();
    var wi                  = new windowItems();
    var isInitialUpdateDone = false;
    var callbacks           = {};

    var counter = 0;
    // var win                 = a_mainWindow;

    var standardItems               = new Array();
    standardItems.actuatorTemplate  = { type:"actuatorOverviewItem", id:"actuator0", icon:lookup.getSensorImageUrl(0), name:"valve 1"};
    standardItems.actuators         = [];
    standardItems.resetDose         = {type: "button", id:"resetDose", name:"Reset All Dose Monitors", function:resetDoseConfirmation, windowData:this};
    this.standardItems              = standardItems;

    return this;
};

