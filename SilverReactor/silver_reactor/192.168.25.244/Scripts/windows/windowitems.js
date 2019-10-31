function windowItems(a_id)
{
    var id = a_id
    //#########################################################################
    // Support functions
    // Add item with item object
    this.addItem = function(a_item)
    {
        // console.log(a_item);
        if(a_item != undefined)
        {
            switch(a_item.type)
            {
                case "inputNumber":
                {
                    return this.inputNumber(a_item.id,
                                            a_item.name,
                                            a_item.value,
                                            a_item.unit,
                                            a_item.min,
                                            a_item.max,
                                            a_item.jCodeGroup,
                                            a_item.jCodeId,
                                            a_item.function,
                                            a_item.windowData);
                }
                break;
                case "input":
                {
                    return this.input(  a_item.id,
                                        a_item.name,
                                        a_item.value,
                                        a_item.jCodeGroup,
                                        a_item.jCodeId,
                                        a_item.function,
                                        a_item.windowData,
                                        a_item.length);
                }
                break;
                case "inputBig":
                {
                    return this.inputBig(  a_item.id,
                                        a_item.name,
                                        a_item.value,
                                        a_item.jCodeGroup,
                                        a_item.jCodeId,
                                        a_item.function,
                                        a_item.windowData,
                                        a_item.length);
                }
                break;
                case "disabledInput":
                {
                    // return this.disabledInput(a_item.id, a_item.name, a_item.value, a_item.unit);

                    return this.disabledInput(a_item.id,
                                                a_item.name,
                                                a_item.value,
                                                a_item.unit,
                                                a_item.min,
                                                a_item.max,
                                                a_item.jCodeGroup,
                                                a_item.jCodeId)
                }
                break;
                case "button":
                {
                    return this.button(a_item.id, a_item.name, a_item.function, a_item.windowData);
                }
                break;
                case "instantButton":
                {
                    return this.instantButton(a_item.id, a_item.name, a_item.functionDown, a_item.functionUp, a_item.windowData);
                }
                break;
                case "buttonGroup":
                {
                    return this.buttonGroup(a_item.groupName,
                                            a_item.groupId,
                                            a_item.ids,
                                            a_item.names,
                                            a_item.selected,
                                            a_item.jCodeGroup,
                                            a_item.jCodeId,
                                            a_item.function,
                                            a_item.windowData);
                }
                break;
                case "buttonGroupLarge":
                {
                    return this.buttonGroupLarge(   a_item.groupName,
                                                    a_item.groupId,
                                                    a_item.ids,
                                                    a_item.names,
                                                    a_item.selected,
                                                    a_item.jCodeGroup,
                                                    a_item.jCodeId,
                                                    a_item.function,
                                                    a_item.windowData);
                }
                break;
                case "line":
                {
                    return this.line(a_item.id);
                }
                break;
                break;
                case "toggle":
                {
                    return this.toggle(a_item.id, a_item.name, a_item.value, a_item.jCodeGroup, a_item.jCodeId ,a_item.function, a_item.windowData);
                }
                break;
                case "loginSelect":
                {
                    return this.loginSelect(a_item.id, a_item.name, a_item.options, a_item.function, a_item.windowData);
                }
                break;
                case "loginPassword":
                {
                    return this.loginPassword(a_item.id, a_item.name, a_item.function, a_item.windowData);
                }
                break;
                case "inputLarge":
                {
                    return this.inputLarge(a_item.id, a_item.name, a_item.maxLength, a_item.function, a_item.windowData);
                }
                break;
                case "whiteLoader":
                {
                    return this.whiteLoader(a_item.id, a_item.text);
                }
                break;
                case "message":
                {
                    return this.message(a_item.id, a_item.text);
                }
                break;
                case "succesMessage":
                {
                    return this.succesMessage(a_item.id, a_item.text);
                }
                break;
                case "messageLeft":
                {
                    return this.messageLeft(a_item.id, a_item.text);
                }
                break;
                case "errorMessage":
                {
                    return this.errorMessage(a_item.id, a_item.text);
                }
                break;
                case "errorMessageLeft":
                {
                    return this.errorMessageLeft(a_item.id, a_item.text);
                }
                break;
                case "select":
                {
                    return this.select( a_item.id,
                                        a_item.name,
                                        a_item.options,
                                        a_item.values,
                                        a_item.selected,
                                        a_item.jCodeGroup,
                                        a_item.jCodeId,
                                        a_item.function,
                                        a_item.windowData);
                }
                break;
                case "checklist":
                {
                    return this.checklist( a_item.id,
                                        a_item.name,
                                        a_item.options,
                                        a_item.values,
                                        a_item.selected,
                                        a_item.maxHeight,
                                        a_item.function,
                                        a_item.windowData);
                }
                break;
                case "list":
                {
                    return this.list( a_item.id,
                                        a_item.name,
                                        a_item.options,
                                        a_item.values,
                                        a_item.types,
                                        a_item.selected,
                                        a_item.maxHeight,
                                        a_item.function,
                                        a_item.windowData);
                }
                break;
                case "sideBySide":
                {
                    return this.sideBySide(a_item.left, a_item.right, a_item.id);
                }
                break;
                case "feedTableStructure":
                {
                    return this.feedTableStructure(a_item.id, a_item.doseLimit);
                }
                break;
                case "loopConfiguration":
                {
                    return this.loopConfiguration(  a_item.id,
                                                    a_item.sensorName,
                                                    a_item.positiveText,
                                                    a_item.negativeText ,
                                                    a_item.positiveActuators,
                                                    a_item.negativeActuators,
                                                    a_item.function);
                }
                break;
                case "progressBar":
                {
                    return this.progressBar(a_item.id);
                }
                break;
                case "sensorOverviewItem":
                {
                    return this.sensorOverviewItem( a_item.id,
                                                    a_item.icon,
                                                    a_item.name,
                                                    a_item.unit,
                                                    a_item.inputEnabled,
                                                    a_item.start,
                                                    a_item.pause,
                                                    a_item.stop,
                                                    a_item.input,
                                                    // a_item.value,
                                                    // a_item.unit,
                                                    // a_item.min,
                                                    // a_item.max,
                                                    // a_item.function,
                                                    a_item.windowData);
                }
                break;
                case "factCalStructure":
                {
                    return this.factCalStructure(a_item.id);
                }
                break;
                case "factCalItem":
                {
                    return this.factCalItem(a_item.id, a_item.name, a_item.pH, a_item.temperature, a_item.lowGain, a_item.highGain, a_item.alternate);
                }
                break;
                case "mfcItem":
                {
                    return this.mfcItem(a_item.id,
                                        a_item.name,
                                        a_item.value,
                                        a_item.status,
                                        a_item.min,
                                        a_item.max,
                                        a_item.jCodeGroup,
                                        a_item.jCodeId,
                                        a_item.function,
                                        a_item.windowData);
                }
                break;
                case "stepperDirection":
                {
                    return this.stepperDirection(   a_item.groupName,
                                                    a_item.groupId,
                                                    a_item.ids,
                                                    a_item.names,
                                                    a_item.selected,
                                                    a_item.toggleValue,
                                                    a_item.function,
                                                    a_item.windowData);
                }
                break;
                case "decimalList":
                {
                    return this.decimalList( a_item.id,
                                            a_item.name,
                                            a_item.options,
                                            a_item.values,
                                            a_item.itemIds,
                                            a_item.min,
                                            a_item.max,
                                            a_item.maxHeight,
                                            a_item.function,
                                            a_item.windowData);
                }
                break;
                case "logView":
                {
                    return this.logView(a_item.id, a_item.text);
                }
                break;
                case "actuatorOverviewItem":
                {
                    return this.actuatorOverviewItem( a_item.id,
                                                    a_item.icon,
                                                    a_item.name,
                                                    a_item.value,
                                                    a_item.doseValue,
                                                    a_item.unit);
                }
                break;
                case "outputOverviewItem":
                {
                    return this.outputOverviewItem( a_item.sensorId,
                                                    a_item.actuatorId,
                                                    a_item.actuators);
                }
                break;
                case "manualIOStructure":
                {
                    return this.manualIOStructure(a_item.id);
                }
                break;
                case "manualIOItem":
                {
                    return this.manualIOItem(a_item.id, a_item.values);
                }
                break;
                case "chart":
                {
                    return this.chart(a_item.id);
                }
                break;
                case "scrollArea":
                {
                    return this.scrollArea(a_item.id, a_item.maxHeight, a_item.items);
                }
                break;
                default:
                {
                    return this.error("type not specified");
                }
            }

        }
        else
        {
            return this.error("type not specified");
        }
    };

    // Convert an item array with item objects to elements
    this.convertItemsToElements = function(a_items)
    {
        if(a_items == undefined)
        {
            return this.errorMessage("Unable to convert items");
        }
        var content = $("<div></div>");
        for(var i = 0; i < a_items.length; i++)
        {
            content.append(this.addItem(a_items[i]));
        }
        return content.children();
    };

    // When an item can't be created, missing argument etc
    this.error = function (a_id)
    {
        console.log("[Error] creating element " + a_id);
        if(developing.verbose != undefined && developing.verbose == true)
        {
            var row         = $("<div class='row'></div>");
            var itemText    = $("<div class='item error'>Error creating window element " + a_id + "</div>");
            row.append(itemText);
            return row;
        }
    }

    this.sideBySide = function(a_left, a_right, a_id)
    {
        var parentElement   = $("<div id='item_"+a_id+"' class='columnRow'></div>");
        var leftColumn      = $("<div class='column'></div>");
        var rightColumn     = $("<div class='column'></div>");

        var left            = this.addItem(a_left);
        var right           = this.addItem(a_right);

        leftColumn.append(left);
        rightColumn.append(right);

        parentElement.append(leftColumn);
        parentElement.append(rightColumn);
        return parentElement;
    }
    //#########################################################################
    // Items
    this.input = function(a_id, a_text, a_value, a_jCodeGroup, a_jCodeId, a_func, a_windowData, a_length)
    {
        // jcodegroup and jcodeid are allowed to be missing
        if(a_id == undefined || a_value == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        var maxLength = "maxlength=''";
        if(undefined != a_length)
        {
            maxLength = "maxlength='" + a_length + "'";
        }

        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var itemText    = $("<div class='item text'>" + a_text + "</div>");
        var limitNames  = $("<div class='item limitNames'><div class='max'></div><div class='min'></div></div>");
        var limits      = $("<div class='item limits'><div class='max'></div><div class='min'></div></div>");

        var inputField  = $("<div class='item inputField'><input id='"+ a_id +"'type='text' value='"+ a_value +"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"' "+maxLength+"></input></div>");
        var unit        = $("<div class='item unit'></div>");


        inputField.keyup({id:id, windowData:a_windowData},a_func);

        row.append(itemText);
        row.append(limitNames);
        row.append(limits);
        row.append(inputField);
        row.append(unit);

        return row;
    };

    this.inputBig = function(a_id, a_text, a_value, a_jCodeGroup, a_jCodeId, a_func, a_windowData, a_length)
    {
        // jcodegroup and jcodeid are allowed to be missing
        if(a_id == undefined || a_value == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        var maxLength = "maxlength=''";
        if(undefined != a_length)
        {
            maxLength = "maxlength='" + a_length + "'";
        }

        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var itemText    = $("<div class='item textInputBig'>" + a_text + "</div>");
        // var limitNames  = $("<div class='item limitNames'><div class='min'></div><div class='max'></div></div>");
        // var limits      = $("<div class='item limits'><div class='max'></div><div class='min'></div></div>");

        var inputField  = $("<div class='item inputFieldBig'><input id='"+ a_id +"'type='text' value='"+ a_value +"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"' "+maxLength+"></input></div>");
        // var unit        = $("<div class='item unit'></div>");


        inputField.keyup({id:id, windowData:a_windowData},a_func);

        row.append(itemText);
        // row.append(limitNames);
        // row.append(limits);
        row.append(inputField);
        // row.append(unit);

        return row;
    };

    this.inputNumber = function(a_id, a_text, a_value, a_unit, a_min, a_max, a_jCodeGroup, a_jCodeId, a_func , a_windowData)
    {
        // jcodegroup and jcodeid are allowed to be missing
        if(a_id == undefined || a_value == undefined || a_unit == undefined || a_min == undefined || a_max == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var itemText    = $("<div class='item text'>" + a_text + "</div>");
        var limitNames  = $("<div class='item limitNames'><div class='max'>Max</div><div class='min'>Min</div></div>");
        var limits      = $("<div class='item limits'><div class='max'>: "+ a_max +"</div><div class='min'>: "+ a_min +"</div></div>");
        var inputField  = $("<div class='item inputField'><input id='"+ a_id +"' min='"+ a_min +"' max='"+ a_max +"' type='text' value='"+ a_value +"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"'></input></div>");
        var unit        = $("<div class='item unit'>"+ a_unit +"</div>");


        inputField.keyup({id:id, windowData:a_windowData},a_func);

        row.append(itemText);
        row.append(limitNames);
        row.append(limits);
        row.append(inputField);
        row.append(unit);

        return row;
    };

    this.disabledInput = function(a_id, a_text, a_value, a_unit, a_min, a_max, a_jCodeGroup, a_jCodeId)
    {
        if(a_id == undefined || a_text == undefined|| a_value == undefined || a_unit == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var itemText    = $("<div class='item text'>" + a_text + "</div>");
        var limitNames  = $("<div class='item limitNames'><div class='max'><div class='min'></div></div></div>");
        var limits      = $("<div class='item limits'><div class='max'></div><div class='min'></div></div>");
        if(undefined != a_min && undefined != a_max)
        {
            limitNames  = $("<div class='item limitNames'><div class='max'>Max</div><div class='min'>Min</div></div>");
            limits      = $("<div class='item limits'><div class='max'>: "+ a_max +"</div><div class='min'>: "+ a_min +"</div></div>");
        }
        var inputField  = $("<div class='item inputField'><input id='"+ a_id +"' min='"+ a_min +"' max='"+ a_max +"' type='text' value='"+ a_value +"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"' disabled></input></div>");
        var unit        = $("<div class='item unit'>"+ a_unit +"</div>");

        row.append(itemText);
        row.append(limitNames);
        row.append(limits);
        row.append(inputField);
        row.append(unit);

        return row;
    };

    this.button = function(a_id, a_text, a_func, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        var row     = $("<div class='row' id='item_"+a_id+"'></div>");
        var item    = $("<div class='item button'></div>");
        var button  = $("<button id='"+ a_id +"' class='commandButton'>" + a_text + "</button>");

        button.click({id:id, windowData:a_windowData},a_func);

        item.append(button);
        row.append(item);

        return row;
    };

    this.instantButton = function(a_id, a_text, a_funcDown, a_funcUp, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_funcDown == undefined || a_funcUp == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        var row     = $("<div class='row' id='item_"+a_id+"'></div>");
        var item    = $("<div class='item button'></div>");
        var button  = $("<button id='"+ a_id +"' class='commandButton'>" + a_text + "</button>");

        button.mousedown({id:id, windowData:a_windowData},a_funcDown);
        button.mouseup({id:id, windowData:a_windowData},a_funcUp);
        button.mouseleave({id:id, windowData:a_windowData},a_funcUp);

        item.append(button);
        row.append(item);

        return row;
    };

    this.buttonGroup = function(a_groupName, a_groupId, a_ids, a_names, a_selected, a_jCodeGroup, a_jCodeId, a_func, a_windowData)
    {
        if(a_groupName == undefined || a_groupId == undefined || a_ids == undefined || a_names == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_ids);
        }
        if(a_ids.length != a_names.length)
        {
            return this.error("id's length and names length do not match")
        }

        var row       = $("<div class='row' id='item_"+a_groupId+"'></div>");
        var itemText    = $("<div class='item buttonGroupText'>" + a_groupName + "</div>");
        var buttonGroup     = $("<div class='item buttonGroup' id='"+a_groupId+"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"'></div>")

        for(var i = 0; i < a_names.length; i++)
        {
            var classes = "commandButton";
            if(a_selected == a_ids[i])
            {
                classes += " selected";
            }
            var button  = $("<button id='"+ a_ids[i] +"' class='"+ classes +"' style='width:"+(90/a_names.length)+"%'>" + a_names[i] + "</button>");
            button.click({id:id, windowData:a_windowData},a_func);
            buttonGroup.append(button);
        }

        row.append(itemText);
        row.append(buttonGroup);

        return row;
    };

    this.buttonGroupLarge = function(a_groupName, a_groupId, a_ids, a_names, a_selected, a_jCodeGroup, a_jCodeId, a_func, a_windowData)
    {
        if(a_groupName == undefined || a_groupId == undefined || a_ids == undefined || a_names == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_ids);
        }
        if(a_ids.length != a_names.length)
        {
            return this.error("id's length and names length do not match")
        }

        var parentElement   = $("<div id='item_"+a_groupId+"'></div>")
        var buttonTitleRow  = $("<div class='row titleBar'><div class='item'>"+a_groupName+"</div></div>");
        var buttonRow       = $("<div class='row noMarginTop'></div>");
        var buttonGroup     = $("<div class='item buttonGroup' id='"+a_groupId+"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"'></div>")

        // console.log(a_names.length/3);


        for(var i = 0; i < a_names.length; i++)
        {
            var classes = "commandButton";
            if(a_selected == a_ids[i])
            {
                classes += " selected";
            }
            var button  = $("<button id='"+ a_ids[i] +"' class='"+ classes +"' >" + a_names[i] + "</button>");
            button.click({id:id, windowData:a_windowData},a_func);
            buttonGroup.append(button);
        }

        parentElement.append(buttonTitleRow);
        buttonRow.append(buttonGroup);
        parentElement.append(buttonRow);

        return parentElement;
    };

    this.line = function(a_id)
    {
        if(a_id == undefined)
        {
            return this.error(a_id);
        }
        return $("<hr id='item_"+a_id+"'></hr>");
    };

    // this.space = function()
    // {
    //     return $("<hr class='space'></hr>")
    // };

    this.toggle = function(a_id, a_text, a_value, a_jCodeGroup, a_jCodeId, a_func, a_windowData)
    {
        if(a_id == undefined || a_value == undefined || a_text == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        var checked = "";
        if(a_value > 0)
        {
            checked = "checked";
        }

        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var itemText    = $("<div class='item toggleText'>" + a_text + "</div>");
        var toggleDiv   = $("<div class='item'></div>");
        var toggle      = $("<div class='onoffswitch'></div>");
        var checkbox    = $("<input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='"+a_id+"' "+checked+" jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"'>");
        var label       = $("<label class='onoffswitch-label' for='"+a_id+"'><span class='onoffswitch-inner'></span><span class='onoffswitch-switch'></span></label>");

        checkbox.change({id:id, windowData:a_windowData}, a_func);

        toggle.append(checkbox);
        toggle.append(label);
        toggleDiv.append(toggle);
        row.append(itemText);
        // row.append(label);
        row.append(toggleDiv);
        return row;
    };

    this.loader = function(a_text)
    {
        if(a_text == undefined)
        {
            a_text = "Loading";
        }
        var container   = $("<div class='loadingContainer'></div>");
        var loaderRow   = $("<div class='loadingRow '><div class='loadingCell'><div class='loader'></div></div></div>");
        var textRow     = $("<div class='loadingRow '><div class='loadingText'>"+a_text+"</div></div>");
        var loader      = $("")

        // loaderRow.append(loader);
        container.append(loaderRow);
        container.append(textRow)
        return container;
    };

    this.whiteLoader = function(a_id, a_text)
    {
        if(a_id == undefined)
        {
            return this.error(a_id);
        }
        if(a_text == undefined)
        {
            a_text = "Loading";
        }
        var row         = $("<div class='row' id='"+a_id+"'></div>");
        var container   = $("<div class='loadingContainer'></div>");
        var loaderRow   = $("<div class='loadingRow '><div class='loadingCell'><div class='loader'></div></div></div>");
        var textRow     = $("<div class='loadingRow '><div class='loadingText'>"+a_text+"</div></div>");
        var loader      = $("")

        // loaderRow.append(loader);
        container.append(loaderRow);
        container.append(textRow)
        row.append(container);
        return row;
    };

    this.loginSelect = function(a_id, a_text, a_options, a_func, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_options == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }

        var parentElement   = $("<div id='item_"+a_id+"'></div>")
        var selectTitleRow  = $("<div class='row titleBar'><div class='item'>"+a_text+"</div></div>");
        var selectRow       = $("<div class='row noMarginTop'></div>");
        var selectDiv       = $("<div class='item loginSelect'></div>");
        var select          = $("<select id='"+a_id+"'></select>");

        // select.append($("<option value='-1'>Select</option>"));
        for(var i = 0; i < a_options.length; i++)
        {
            var option = $("<option value='"+i+"'>"+a_options[i]+"</option>");
            // option.change(a_func);
            select.append(option);
        }
        select.change(a_func);

        selectDiv.append(select);
        selectRow.append(selectDiv);
        parentElement.append(selectTitleRow);
        parentElement.append(selectRow);

        return parentElement;
    };

    this.loginPassword = function(a_id, a_text, a_func, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }

        var parentElement   = $("<div id='item_"+a_id+"'></div>");
        var inputTitleRow   = $("<div class='row titleBar'><div class='item'>"+a_text+"</div></div>");
        var inputRow        = $("<div class='row noMarginTop'></div>");
        // var inputDiv       = $("<div class='item loginSelect'></div>")
        // var input           = $("<select id='"+a_id+"'></select>");
        var input           = $("<div class='item loginInput'><input id='"+ a_id +"'type='password'></input></div>");

        input.keyup({id:id, windowData:a_windowData},a_func);

        inputRow.append(input);
        // inputRow.append(inputDiv);
        parentElement.append(inputTitleRow);
        parentElement.append(inputRow);

        return parentElement;
    };

    this.inputLarge = function(a_id, a_text, a_maxLength, a_func, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }

        var maxLength = "maxlength=''";
        if(undefined != a_maxLength)
        {
            maxLength = "maxlength='" + a_maxLength + "'";
        }

        var parentElement   = $("<div id='item_"+a_id+"'></div>");
        var inputTitleRow   = $("<div class='row titleBar'><div class='item'>"+a_text+"</div></div>");
        var inputRow        = $("<div class='row noMarginTop'></div>");
        // var inputDiv       = $("<div class='item loginSelect'></div>")
        // var input           = $("<select id='"+a_id+"'></select>");
        var input           = $("<div class='item inputLarge'><input id='"+ a_id +"' type='text' "+maxLength+"></input></div>");

        input.keyup({id:id, windowData:a_windowData},a_func);

        inputRow.append(input);
        // inputRow.append(inputDiv);
        parentElement.append(inputTitleRow);
        parentElement.append(inputRow);

        return parentElement;
    };

    this.errorMessage = function(a_id, a_text)
    {
        if(a_id == undefined || a_text == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='"+a_id+"'></div>");
        var itemText    = $("<div class='item errorMessage'>" + a_text + "</div>");

        row.append(itemText);

        return row;
    };

    this.message = function(a_id, a_text)
    {
        if(a_id == undefined || a_text == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='"+a_id+"'></div>");
        var itemText    = $("<div class='item message'>" + a_text + "</div>");

        row.append(itemText);

        return row;
    };

    this.succesMessage = function(a_id, a_text)
    {
        if(a_id == undefined || a_text == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='"+a_id+"'></div>");
        var itemText    = $("<div class='item succesMessage'>" + a_text + "</div>");

        row.append(itemText);

        return row;
    };

    this.messageLeft = function(a_id, a_text)
    {
        if(a_id == undefined || a_text == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='"+a_id+"'></div>");
        var itemText    = $("<div class='item messageLeft'>" + a_text + "</div>");

        row.append(itemText);

        return row;
    };

    this.errorMessageLeft = function(a_id, a_text)
    {
        if(a_id == undefined || a_text == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='"+a_id+"'></div>");
        var itemText    = $("<div class='item errorMessageLeft'>" + a_text + "</div>");

        row.append(itemText);

        return row;
    };

    this.select = function(a_id, a_text, a_options, a_values, a_selected, a_jCodeGroup, a_jCodeId, a_func, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_options == undefined || a_values == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        if(a_options.length != a_values.length)
        {
            return this.error("Options's length and values length do not match")
        }
        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var itemText    = $("<div class='item selectText'>" + a_text + "</div>");

        var selectDiv       = $("<div class='item select'></div>")
        var select          = $("<select id='"+a_id+"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"' original='"+a_selected+"'></select>");

        // select.append($("<option value='-1'>Select</option>"));
        for(var i = 0; i < a_options.length; i++)
        {
            var selected = "";
            if(a_selected == a_values[i])
            {
                selected = "selected";
            }
            var option = $("<option value='"+a_values[i]+"' "+selected+">"+a_options[i]+"</option>");
            // option.change(a_func);
            select.append(option);
        }
        select.change(a_func);

        selectDiv.append(select);
        row.append(itemText);
        row.append(selectDiv);

        return row;
    };

    this.checklist = function(a_id, a_text, a_options, a_values, a_selected, a_maxHeight, a_func, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_options == undefined || a_values == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        if(a_options.length != a_values.length)
        {
            return this.error("Options's length and values length do not match")
        }
        if(a_maxHeight == undefined)
        {
            a_maxHeight = "350px";
        }

        var parentElement   = $("<div id='item_"+a_id+"' class='margin2px'></div>");
        var titleRow        = $("<div class='row checklistTitleRow'><div class='item checklistTitle'>"+a_text+"</div></div>");
        var checklistRow    = $("<div class='row noMarginTop'></div>");
        var checklistDiv    = $("<div class='checklist' style='max-height:" + a_maxHeight + ";'></div>");

        for(var i = 0; i < a_options.length; i++)
        {
            var checklistItem = $("<div class='checklistItem'><input type='checkbox'></input>"+a_options[i]+"</div>");

            if(a_selected.indexOf(a_values[i]) > -1)
            {
                checklistItem = $("<div class='checklistItem checklistItemSelected'><input type='checkbox' checked=true></input>"+a_options[i]+"</div>");
            }

            checklistItem.click(a_func);
            checklistDiv.append(checklistItem);
        }

        checklistRow.append(checklistDiv);
        parentElement.append(titleRow);
        parentElement.append(checklistRow);
        return parentElement;
    };

    this.feedTableStructure = function(a_id, a_doseLimit)
    {
        if(a_id == undefined)
        {
            return this.error(a_id);
        }

        var parentElement   = $("<div id='item_"+a_id+"'></div>");
        var row             = $("<div class='row'></div>");
        var table           = $("<table class='feedTable'></table>");
        var tableHeader     = $("<thead><tr><th>Name</th><th class='alignRight'>Duration</th><th class='alignRight'>Flow</th><th>Type</th></tr></thead>");
        if(a_doseLimit)
        {
            tableHeader = $("<thead><tr><th class='doseLimitWidth'>Name</th><th class='doseLimitWidth alignRight'>Duration</th><th class='doseLimitWidth alignRight'>Flow</th><th class='doseLimitWidth'>Type</th><th class='doseLimitWidth alignRight'>Dose Limit</th></tr></thead>");
        }

        var tableBody       = $("<tbody id='table_content_" + a_id + "'></tbody>");

        table.append(tableHeader);
        table.append(tableBody);
        row.append(table);
        parentElement.append(row);
        return parentElement;
    };

    this.feedTableItem = function(a_id, a_name, a_duration, a_flow, a_type, a_doseLimit, a_alternate, a_func)
    {
        if(a_id == undefined || a_name == undefined || a_duration == undefined || a_flow == undefined || a_type == undefined || a_func == undefined)
        {
            return this.error(a_id);
        }

        var alternate = "feedCell";
        var width = "";
        if(a_alternate)
        {
            alternate = "feedCellAlternate";
        }
        if(a_doseLimit != undefined)
        {
            width = "doseLimitWidth";
        }

        var tableRow        = $("<tr id='"+a_id+"' class='"+alternate+"'></tr>");

        var nameCell        = $("<td class='"+width+"'>" + a_name + "</td>");
        var durationCell    = $("<td class='"+width+" alignRight'>" + a_duration + "</td>");
        var flowCell        = $("<td class='"+width+" alignRight'>" + a_flow + "</td>");
        var typeCell        = $("<td class='"+width+"'>" + a_type + "</td>");
        var doseLimitCell   = $("<td class='"+width+" alignRight'>" + a_doseLimit + "</td>");

        tableRow.append(nameCell);
        tableRow.append(durationCell);
        tableRow.append(flowCell);
        tableRow.append(typeCell);
        if(a_doseLimit != undefined)
        {
            tableRow.append(doseLimitCell)
        }

        tableRow.click(a_func);

        return tableRow;
    };

    this.loopConfiguration = function(a_id, a_sensorName, a_positiveText, a_negativeText, a_positiveActuators, a_negativeActuators, a_func)
    {
        if(a_id == undefined || a_sensorName == undefined || a_positiveActuators == undefined || a_negativeActuators == undefined || a_func == undefined)
        {
            return this.error(a_id);
        }

        var parentElement   = $("<div id='item_"+a_id+"' class='margin2px'></div>");
        var titleRow        = $("<div class='row checklistTitleRow'><div class='item checklistTitle'>Loop configuration:</div></div>");
        var configRow       = $("<div class='row noMarginTop'></div>");
        var table           = $("<table class='loopConfigTable'></table>");
        var positiveText    = $("<tr><td class='loopConfigLabel'><div class='prefix'> </div><div class='text'>" + a_positiveText + "</div></td></tr>");
        var sensor          = $("<tr><td class='loopConfigSensor'><div class='prefix'> </div><div class='text'>" + a_sensorName + "</div></td></tr>");
        var negativeText    = $("<tr><td class='loopConfigLabel'><div class='prefix'> </div><div class='text'>" + a_negativeText + "</div></td></tr>");
        var emptyRow        = $("<tr><td class='empty'> </td></tr>");

        if(a_positiveText != undefined)
        {
            for(var i = 3; i >= 0; i--)
            {
                var actuatorName = "";
                var actuatorId = "";
                var empty = "empty";
                var type = "";
                if(a_positiveActuators[i] != undefined)
                {
                    if(lookup.getSensorId(a_positiveActuators[i].name) > -1)
                    {
                        actuatorId = lookup.getSensorId(a_positiveActuators[i].name);
                        actuatorName = sensorData.name(actuatorId).str;
                        type = "type='sensor'";
                    }
                    else
                    {
                        actuatorId = lookup.getActuatorId(a_positiveActuators[i].name);
                        actuatorName = actuatorData.name(actuatorId).str;
                        type = "type='actuator'";
                    }

                    empty = "filledSlot";
                }
                var actuator = $("<tr id='positive_" + i + "'><td class='" + empty + "'><div class='prefix'><img src='images/arrowup.png'></img></div><div class='text' itemid='"+actuatorId+"' "+type+">"+actuatorName+"</div></td></tr>");
                actuator.click(a_func);
                table.append(actuator);
            }
            table.append(positiveText);
        }
        table.append(sensor);
        if(a_negativeText != undefined)
        {
            table.append(negativeText);
            for(var i = 0; i < 4; i++)
            {
                var actuatorName = "";
                var actuatorId = "";
                var empty = "empty";
                if(a_negativeActuators[i] != undefined)
                {
                    if(lookup.getSensorId(a_negativeActuators[i].name) > -1)
                    {
                        actuatorId = lookup.getSensorId(a_negativeActuators[i].name);
                        actuatorName = sensorData.name(actuatorId).str;
                        type = "type='sensor'";
                    }
                    else
                    {
                        actuatorId = lookup.getActuatorId(a_negativeActuators[i].name);
                        actuatorName = actuatorData.name(actuatorId).str;
                        type = "type='actuator'";
                    }
                    empty = "filledSlot";
                }
                var actuator = $("<tr id='negative_" + i + "'><td class='" + empty + "'><div class='prefix'><img src='images/arrowdown.png'></img></div><div class='text' itemid='"+actuatorId+"' "+type+">"+actuatorName+"</div></td></tr>")
                actuator.click(a_func);
                table.append(actuator);
            }
        }

        configRow.append(table);
        parentElement.append(titleRow);
        parentElement.append(configRow);

        return parentElement;
    };

    this.list = function(a_id, a_text, a_options, a_values, a_types, a_selected, a_maxHeight, a_func, a_windowData)
    {
        if(a_id == undefined || a_text == undefined || a_options == undefined || a_values == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        if(a_options.length != a_values.length)
        {
            return this.error("Options's length and values length do not match")
        }
        if(a_maxHeight == undefined)
        {
            a_maxHeight = "350px";
        }

        var parentElement   = $("<div id='item_"+a_id+"' class='margin2px'></div>");
        var titleRow        = $("<div class='row checklistTitleRow'><div class='item checklistTitle'>"+a_text+"</div></div>");
        var checklistRow    = $("<div class='row noMarginTop'></div>");
        var checklistDiv    = $("<div class='checklist' style='max-height:" + a_maxHeight + ";'></div>");

        for(var i = 0; i < a_options.length; i++)
        {
            if(a_options[i] != undefined)
            {
                var classes = "listItem";
                if(a_selected == i)
                {
                    classes += " listItemOriginal listItemSelected";
                }
                var type ="";
                if(a_types != undefined)
                {
                    type = "type='"+a_types[i]+"'";
                }

                var checklistItem = $("<div class='" + classes + "'><div class='listText' itemid='"+a_values[i]+"' "+type+">"+a_options[i]+"</div></div>");

                checklistItem.click(a_func);
                checklistDiv.append(checklistItem);
            }
        }

        checklistRow.append(checklistDiv);
        parentElement.append(titleRow);
        parentElement.append(checklistRow);
        return parentElement;
    };

    this.progressBar = function(a_id)
    {
        if(a_id == undefined)
        {
            return this.error(a_id);
        }
        var row                 = $("<div class='row' id='item_"+a_id+"'></div>");
        var progressBar         = $("<div class='item progressBar'></div>");
        var progressbackground  = $("<div class='progressBackground'></div>");
        var progress            = $("<div class='progress' id='"+a_id+"'></div>");

        progressbackground.append(progress);
        progressBar.append(progressbackground);
        row.append(progressBar);

        return row;
    };

    this.sensorOverviewItem = function(a_id, a_icon, a_text, a_unit, a_inputEnabled, a_start, a_pause, a_stop, a_input, a_windowData, a_length)
    {
        // jcodegroup and jcodeid are allowed to be missing
        // if(a_id == undefined || a_value == undefined || a_func == undefined || a_windowData == undefined)
        // {
        //     return this.error(a_id);
        // }
        var maxLength = "maxlength=''";
        if(undefined != a_length)
        {
            maxLength = "maxlength='" + a_length + "'";
        }

        var row         = $("<div class='row sensorOverviewItem borderGray' id='sensorOverviewItem_"+a_id+"'></div>");
        var itemIcon    = $("<div class='item sensorOverviewIcon' sensorid='"+a_id+"'><img src='" + a_icon + "'></img></div>");
        var itemText    = $("<div class='item sensorOverviewText' sensorid='"+a_id+"'>" + a_text + "</div>");
        var itemValue    = $("<div class='item sensorOverviewValue' sensorid='"+a_id+"'></div>");
        // var limitNames  = $("<div class='item limitNames'><div class='min'></div><div class='max'></div></div>");
        // var limits      = $("<div class='item limits'><div class='max'></div><div class='min'></div></div>");
        var inputClass = "";
        if(!a_inputEnabled)
        {
            inputClass = "hidden";
        }
        var inputField  = $("<div class='item sensorOverviewInput '></div>");
        var input       = $("<input readonly='readonly' class='"+inputClass+" cursorPointer'  sensorId='"+ a_id +"'type='text' value='' "+maxLength+"></input>");
        var unit        = $("<div class='item sensorOverviewUnit'>"+a_unit+"</div>");
        var buttons     = $("<div class='item sensorOverviewButtons'></div>");
        var start        = $("<button class='item start' sensorid='"+a_id+"'></button>");
        // var pause       = $("<button class='item pause' sensorid='"+a_id+"'></button>");
        var stop        = $("<button class='item stop' sensorid='"+a_id+"'></button>");

        input.on("focus", a_input);

        start.on("click", a_start);
        // pause.on("click", a_pause);
        stop.on("click", a_stop);
        // pause.prop("disabled", true);
        stop.prop("disabled", true);

        const clickSensor = function()
        {
            wMan.loadWindow( "sensor", "windowwithtabs", a_id );
            $("#topNavigationPanel .selected").removeClass("selected");
            $("#leftPanelBottom .selected").removeClass("selected");
            $("#leftPanelTop").html("");
        };

        itemIcon.on("click", clickSensor );
        itemText.on("click", clickSensor );
        itemValue.on("click", clickSensor );

        buttons.append(start);
        // buttons.append(pause);
        buttons.append(stop);

        row.append(itemIcon);
        row.append(itemText);
        row.append(itemValue);

        inputField.append(input);

        row.append(inputField);
        row.append(unit);
        row.append(buttons);

        return row;
    };

    this.factCalStructure = function(a_id)
    {
        if(a_id == undefined)
        {
            return this.error(a_id);
        }
        var parentElement   = $("<div id='item_"+a_id+"'></div>");
        var row             = $("<div class='row'></div>");
        var table           = $("<table class='factCalTable'></table>");
        var tableHeader     = $("<thead><tr><th> </th><th>pH</th><th>Temperature</th><th>dO₂ Low Gain</th><th>dO₂ High Gain</th></tr></thead>");


        var tableBody       = $("<tbody id='table_content_" + a_id + "'></tbody>");

        table.append(tableHeader);
        table.append(tableBody);
        row.append(table);
        parentElement.append(row);
        return parentElement;
    };

    this.factCalItem = function(a_id, a_name, a_pH, a_temperature, a_lowGain, a_highGain, a_alternate)
    {
        if(a_id == undefined || a_name == undefined || a_pH == undefined || a_temperature == undefined || a_lowGain == undefined || a_highGain == undefined)
        {
            return this.error(a_id);
        }

        var alternate = "";
        if(a_alternate)
        {
            alternate = "factCellAlternate";
        }

        var tableRow        = $("<tr id='"+a_id+"' class='"+alternate+"'></tr>");

        var nameCell        = $("<td>" + a_name + "</td>");
        var pHCell          = $("<td>" + a_pH + "</td>");
        var tempCell        = $("<td>" + a_temperature + "</td>");
        var lowGainCell     = $("<td>" + a_lowGain + "</td>");
        var highGainCell    = $("<td>" + a_highGain + "</td>");

        tableRow.append(nameCell);
        tableRow.append(pHCell);
        tableRow.append(tempCell);
        tableRow.append(lowGainCell);
        tableRow.append(highGainCell);

        return tableRow;
    };

    this.mfcItem = function( a_id, a_text, a_value, a_status, a_min, a_max, a_jCodeGroup, a_jCodeId, a_func, a_windowData )
    {
        if(a_id == undefined || a_value == undefined || a_min == undefined || a_max == undefined || a_jCodeGroup == undefined || a_jCodeId == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var itemText    = $("<div class='item text'>" + a_text + "</div>");
        var limitNames  = $("<div class='item limitNames'><div class='max'>Max</div><div class='min'>Min</div></div>");
        var limits      = $("<div class='item limits'><div class='max'>: "+ a_max +"</div><div class='min'>: "+ a_min +"</div></div>");
        var inputField  = $("<div class='item inputField'><input id='"+ a_id +"' min='"+ a_min +"' max='"+ a_max +"' type='text' value='"+ a_value +"' jcodegroup='"+ a_jCodeGroup +"' jcodeid='"+ a_jCodeId +"'></input></div>");
        var unit        = $("<div class='item mfcStatus'>"+ a_status +"</div>");


        inputField.keyup({id:id, windowData:a_windowData},a_func);

        row.append(itemText);
        row.append(limitNames);
        row.append(limits);
        row.append(inputField);

        row.append(unit);

        return row;
    };

    this.stepperDirection = function(a_groupName, a_groupId, a_ids, a_names, a_selected, a_toggleValue, a_func, a_windowData)
    {
        if(a_groupName == undefined || a_groupId == undefined || a_ids == undefined || a_names == undefined || a_toggleValue == undefined || a_func == undefined || a_windowData == undefined)
        {
            return this.error(a_ids);
        }
        if(a_ids.length != a_names.length)
        {
            return this.error("id's length and names length do not match")
        }

        var row       = $("<div class='row' id='item_"+a_groupId+"'></div>");
        var itemText    = $("<div class='item buttonGroupTextStepper'>" + a_groupName + "</div>");
        var buttonGroup     = $("<div class='item buttonGroup buttonGroupStepper' id='"+a_groupId+"'></div>")

        for(var i = 0; i < a_names.length; i++)
        {
            var classes = "commandButton";
            if(a_selected == a_ids[i])
            {
                classes += " selected";
            }
            var button  = $("<button id='"+ a_ids[i] +"' class='"+ classes +"' style='width:"+(90/a_names.length)+"%'>" + a_names[i] + "</button>");
            button.click({id:id, windowData:a_windowData},a_func);
            buttonGroup.append(button);
        }

        var checked = "";
        if(a_toggleValue > 0)
        {
            checked = "checked";
        }

        var allowUser   = $("<div class='item buttonGroupTextStepper alignRight'>Allow User</div>");
        var toggleDiv   = $("<div class='item'></div>");
        var toggle      = $("<div class='onoffswitch'></div>");
        var checkbox    = $("<input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='checkbox_"+a_groupId+"' "+checked+">");
        var label       = $("<label class='onoffswitch-label' for='checkbox_"+a_groupId+"'><span class='onoffswitch-inner'></span><span class='onoffswitch-switch'></span></label>");

        checkbox.change({id:"checkbox"+a_groupId, windowData:a_windowData}, a_func);

        toggle.append(checkbox);
        toggle.append(label);
        toggleDiv.append(toggle);

        row.append(itemText);
        row.append(buttonGroup);
        row.append(allowUser);
        row.append(toggleDiv);

        return row;
    };

    this.decimalList = function(a_id, a_text, a_options, a_values, a_itemIds, a_min, a_max, a_maxHeight, a_func, a_windowData)
    {
        if(a_id == undefined ||
            a_text == undefined ||
            a_options == undefined ||
            a_values == undefined ||
            a_itemIds == undefined ||
            a_min == undefined ||
            a_max == undefined ||
            a_func == undefined ||
            a_windowData == undefined)
        {
            return this.error(a_id);
        }
        if(a_options.length != a_values.length || a_options.length != a_itemIds.length)
        {
            return this.error("Options's length and values length do not match")
        }
        if(a_maxHeight == undefined)
        {
            a_maxHeight = "350px";
        }

        var parentElement   = $("<div id='item_"+a_id+"' class='margin2px'></div>");
        var titleRow        = $("<div class='row checklistTitleRow'><div class='item checklistTitle'>"+a_text+"</div></div>");
        var checklistRow    = $("<div class='row noMarginTop'></div>");
        var checklistDiv    = $("<div class='checklist' style='max-height:" + a_maxHeight + ";'></div>");

        for(var i = 0; i < a_options.length; i++)
        {
            if(a_options[i] != undefined)
            {
                var classes = "listItem";
                // if(a_selected == i)
                // {
                //     classes += " listItemOriginal listItemSelected";
                // }
                var checklistItem   = $("<div class='" + classes + "'><div class='item listTextDecimalList' >"+a_options[i]+"</div></div>");
                var inputField      = $("<div class='item inputFieldDecimalList'><input type='text' id='"+a_id+a_itemIds[i]+"' itemid='"+a_itemIds[i]+"' value='"+ a_values[i] +"' min='0' max='4'></input></div>");
                inputField.keyup({id:a_itemIds[i], windowData:a_windowData},a_func);
                // checklistItem.click(a_func);
                checklistItem.append(inputField);
                checklistDiv.append(checklistItem);
            }
        }

        checklistRow.append(checklistDiv);
        checklistRow
        parentElement.append(titleRow);
        parentElement.append(checklistRow);
        return parentElement;
    };

    this.logView = function(a_id, a_text)
    {
        if(a_id == undefined || a_text == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='logView' id='"+a_id+"'></div>");
        var itemText    = $("<div class='item messageLeft'>" + a_text + "</div>");

        row.append(itemText);

        return row;
    };

    this.actuatorOverviewItem = function(a_id, a_icon, a_text, a_value, a_doseValue, a_unit)
    {
        if(a_id == undefined || a_text == undefined || a_icon == undefined || a_value == undefined || a_doseValue == undefined )
        {
            return this.error(a_id);
        }

        var row             = $("<div class='row actuatorOverviewItem borderGray' id='actuatorOverviewItem_"+a_id+"'></div>");
        var itemIcon        = $("<div class='item actuatorOverviewIcon' actuatorid='"+a_id+"'><img src='" + a_icon + "'></img></div>");
        var itemText        = $("<div class='item actuatorOverviewText' actuatorid='"+a_id+"'>" + a_text + "</div>");
        var itemValue       = $("<div class='item actuatorOverviewValue' actuatorid='"+a_id+"'>"+a_value+"</div>");
        var itemDoseValue   = $("<div class='item actuatorOverviewDoseValue' actuatorid='"+a_id+"'>"+a_doseValue+"</div>");

        // var inputField  = $("<div class='item sensorOverviewInput '></div>");
        var unit        = $("<div class='item actuatorOverviewUnit'>"+a_unit+"</div>");
        var doseUnit    = $("<div class='item actuatorOverviewUnit'>"+a_unit.split("/")[0]+"</div>");


        const clickActuator = function()
        {
            wMan.loadWindow( "actuator", "windowwithtabs", a_id );
            $("#topNavigationPanel .selected").removeClass("selected");
            $("#leftPanelBottom .selected").removeClass("selected");
            $("#leftPanelTop").html("");
        };

        itemIcon.on("click", clickActuator);
        itemText.on("click", clickActuator);
        itemValue.on("click",clickActuator);


        row.append(itemIcon);
        row.append(itemText);
        row.append(itemValue);
        // row.append(limitNames);
        // row.append(limits);
        // inputField.append(input);
        // row.append(inputField);
        row.append(unit);
        row.append(itemDoseValue);
        row.append(doseUnit);
        // row.append(buttons);

        return row;
    };


    this.outputOverviewItem = function(a_sensorId, a_actuatorId, a_actuators)
    {
        if(a_sensorId != undefined)
        {

            var $row = $("<div class='row outputOverviewItem'></div>");
            a_actuators.sort(function(a, b){ return (a.position < b.position) ? 1 : ((b.position < a.position) ? -1 : 0); });
            // console.log(a_actuators);
            for(var i = 0; i < a_actuators.length; i++)
            {
                var firstOrLast = false;
                if(i == 0 ||  i == (a_actuators.length - 1))
                {
                    firstOrLast = true;
                }

                if(a_actuators[i].position == -1)
                {

                    $row.append(createSensorItem(a_sensorId));
                    $row.append(createActuatorItem(a_actuators[i].position, a_actuators[i].id, a_actuators[i].type, firstOrLast));
                }
                else if(a_actuators[i].position == 1 && i == (a_actuators.length - 1))
                {
                    $row.append(createActuatorItem(a_actuators[i].position, a_actuators[i].id, a_actuators[i].type, true));
                    $row.append(createSensorItem(a_sensorId));
                }
                else
                {
                    $row.append(createActuatorItem(a_actuators[i].position, a_actuators[i].id, a_actuators[i].type, firstOrLast));
                }

            // console.log(a_actuators[i].name);
            // $row.append($("<div class='row'>"+a_actuators[i].name+"</div>"))
            }

            return $row;
        }
        else if(a_actuatorId != undefined)
        {

            var $row = $("<div class='row outputOverviewItem'></div>");
            $row.append(createActuatorItem(0, a_actuatorId, "actuator", true))
            return $row;
        }
        else
        {
            return this.error("outputOverviewItem");
        }
    };

    this.manualIOStructure = function(a_id)
    {
        if(a_id == undefined)
        {
            return this.error(a_id);
        }
        var parentElement   = $("<div id='item_"+a_id+"'></div>");
        var row             = $("<div class='row'></div>");
        var table           = $("<table class='manualIOTable'></table>");
        var tableHeader     = $("<thead><tr><th> </th><th>0000</th><th>0002</th><th>0004</th><th>0006</th><th>0008</th><th>000A</th><th>000C</th><th>000E</th></tr></thead>");


        var tableBody       = $("<tbody id='table_content_" + a_id + "'></tbody>");

        table.append(tableHeader);
        table.append(tableBody);
        row.append(table);
        parentElement.append(row);
        return parentElement;
    };

    this.manualIOItem = function(a_id, a_values, a_alternate, a_cellFunction)
    {
        if(a_id == undefined || a_values == undefined || a_values.length != 9)
        {
            return this.error(a_id);
        }

        var alternate = "";
        if(a_alternate)
        {
            alternate = "factCellAlternate";
        }

        var tableRow        = $("<tr id='"+a_id+"' class='"+alternate+"'></tr>");
        var addresssOffset  = 1;
        for(var i = 0; i < 9; i++)
        {
            var cell = $("<td addressoffset='" + addresssOffset + "' base='" + a_values[0] + "'>" + a_values[i] + "</td>");
            if(i != 0)
            {
                cell.on("click",a_cellFunction);
                addresssOffset++;
            }
            tableRow.append(cell);
        }
        return tableRow;
    };

    this.chart = function(a_id)
    {
        if(a_id == undefined)
        {
            return this.error(a_id);
        }
        var row         = $("<div class='row' id='item_"+a_id+"'></div>");
        var chart       = $("<canvas class='item chart' id='"+a_id+"' height='360px' width='100%'></canvas>");

        row.append(chart);

        return row;
    };

    this.scrollArea = function(a_id, a_maxHeight, a_items)
    {
        var parentElement   = $("<div id='item_"+a_id+"' class='scrollArea' style='max-height:" + a_maxHeight + ";'></div>");
        // var leftColumn      = $("<div class='column'></div>");
        // var rightColumn     = $("<div class='column'></div>");

        // var left            = this.addItem(a_left);
        // var right           = this.addItem(a_right);

        // leftColumn.append(left);
        // rightColumn.append(right);
        //
        // parentElement.append(leftColumn);
        // parentElement.append(rightColumn);
        for(var i=0; i < a_items.length; i++)
        {
            parentElement.append(this.addItem(a_items[i]));
        }
        return parentElement;
    }

    // ####### Helpers
    const createSensorItem = function(a_sensorId)
    {
        var sensorId        = a_sensorId;
        var sensorName      = sensorData.name(sensorId).str;
        var $overviewRow    = $("<div class='overviewRow'></div>");
        var $sensorImage    = $("<div class='item sensorImage sensor'><img src='"+lookup.getSensorImageUrl(sensorId)+"'></img></div>");
        var $sensor         = $("<div class='item sensorName sensor'>"+sensorName+"</div>");
        var $actuator       = $("<div class='item emptyActuator sensor'></div>");
        var $output         = $("<div class='item output sensor' id='outputSensor"+sensorId+"'></div>");
        var $unit           = $("<div class='item outputUnit sensor'>%</div>");

        const clickSensor = function()
        {
            wMan.loadWindow( "sensor", "windowwithtabs", sensorId );
            $("#topNavigationPanel .selected").removeClass("selected");
            $("#leftPanelBottom .selected").removeClass("selected");
            $("#leftPanelTop").html("");
        };

        $overviewRow.click("on", clickSensor);

        $overviewRow.append($sensorImage);
        $overviewRow.append($sensor);
        $overviewRow.append($actuator);
        $overviewRow.append($output);
        $overviewRow.append($unit);

        return $overviewRow;
    };

    const createActuatorItem = function(a_position, a_actuatorId, a_type, a_firstOrLast)
    {
        var direction = "<img src='images/minus.png'></img>";
        var borderClass = "";
        var polarity = "";
        if(a_position < 0)
        {
            borderClass = "borderBottom";
            direction = "<img src='images/arrowdown.png'></img>";
            polarity = "n";
        }
        else if(a_position > 0)
        {
            direction = "<img src='images/arrowup.png'></img>";
            borderClass = "borderTop";
            polarity = "p";
        }
        if(a_firstOrLast)
        {
            borderClass = "";
        }



        var actuatorId = a_actuatorId;
        var actuatorName = "";
        var unit = "";
        var elementId;
        var clickAction;

        const clickActuator = function()
        {
            wMan.loadWindow( "actuator", "windowwithtabs", actuatorId );
            $("#topNavigationPanel .selected").removeClass("selected");
            $("#leftPanelBottom .selected").removeClass("selected");
            $("#leftPanelTop").html("");
        };

        const clickSensor = function()
        {
            wMan.loadWindow( "sensor", "windowwithtabs", actuatorId );
            $("#topNavigationPanel .selected").removeClass("selected");
            $("#leftPanelBottom .selected").removeClass("selected");
            $("#leftPanelTop").html("");
        };

        if(a_type == "sensor")
        {
            actuatorName = sensorData.name(actuatorId).str;
            clickAction = clickSensor;
            elementId ="outputExternalLoop"+actuatorId+polarity;
            unit = "%"
        }
        else
        {
            actuatorName = actuatorData.name(actuatorId).str;
            if(actuatorData.polarity(actuatorId).num == 0)
            {
                polarity = "";
            }
            unit = actuatorData.unit(actuatorId).str;
            clickAction = clickActuator;
            elementId ="outputActuator"+actuatorId+polarity;
        }

        var $overviewRow    = $("<div class='overviewRow'></div>");
        var $sensorImage    = $("<div class='item sensorImage actuator'></div>");
        var $sensor         = $("<div class='item emptySensor actuator'></div>");
        var $actuator       = $("<div class='item actuatorName actuator " + borderClass + "'>"+direction + " " +actuatorName+"</div>");
        var $output         = $("<div class='item output actuator " + borderClass + "' id='"+elementId+"'></div>");
        var $unit           = $("<div class='item outputUnit actuator " + borderClass + "'>"+unit+"</div>");

        $overviewRow.click("on", clickAction);

        $overviewRow.append($sensorImage);
        $overviewRow.append($sensor);
        $overviewRow.append($actuator);
        $overviewRow.append($output);
        $overviewRow.append($unit);

        return $overviewRow;
    };


};

