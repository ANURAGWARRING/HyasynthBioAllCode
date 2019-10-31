function timePicker(a_inputId, a_onClose)
{
    var attachedInputId = a_inputId;
    var valueBeforeFocus;
    var maxLimits       = [23, 59, 59];
    var minLimits       = [0, 0, 0];
    var decimals        = [2, 2, 2];

    this.create = function(a_time)
    {
        // var time =  $("#"+standardItems.newTime.id).val().split(":");
        var date = new Date();
        var time = a_time;
        if(time == undefined)
        {
            time = [date.getHours().toString(),
                    date.getMinutes().toString(),
                    "00"];
        }
        time = addZeros(time);

        if($("#timePickerDialog").length == 0)
        {
            var timePicker = $( "<div id='timePickerDialog' class='timePicker'>" +
                                    "<div class='table'>"+
                                        "<div class='timeBox hours'>"+
                                            "<div class='button'><span class='chevron' timeset='hours' direction='up'></span></div>"+
                                            "<div class='timePickerInputfield'><input id='timePickerHours' type='number' value='" + time[0] + "'></div>"+
                                            "<div class='button'><span class='chevron down' timeset='hours' direction='down'></span></div>"+
                                        "</div>"+
                                        "<div class='timeBox seperator'>:</div>"+
                                        "<div class='timeBox minutes'>"+
                                            "<div class='button'><span class='chevron' timeset='minutes' direction='up'></span></div>"+
                                            "<div class='timePickerInputfield'><input id='timePickerMinutes' type='number'value='" + time[1] + "'></div>"+
                                            "<div class='button'><span class='chevron down' timeset='minutes' direction='down'></span></div>"+
                                        "</div>"+
                                        "<div class='timeBox seperator'>:</div>"+
                                        "<div class='timeBox seconds'>"+
                                            "<div class='button'><span class='chevron' timeset='seconds' direction='up'></span></img></div>"+
                                            "<div class='timePickerInputfield'><input id='timePickerSeconds' type='number'  value='" + time[2] + "'></div>"+
                                            "<div class='button'><span class='chevron down' timeset='seconds' direction='down'></span></div>"+
                                        "</div>"+
                                        // "<div class='timeBox seperator seconds'>s</div>"+
                                    "</div>"+
                                "</div>");


            var decimalCopy = decimals.slice();
            decimalCopy.sort(function(a, b){return b - a});
            var width = ((decimalCopy[0] * 12.5) + 5).toString() + "px";
            timePicker.find(".timeBox").css("width",width);
            timePicker.find(".seperator").css("width", "20px");

            // Get the offset of the inputfield to which the timepicker is attached
            var offset = $("#" + attachedInputId).offset();
            // Set the right location of the timepicker
            timePicker.css({"top": offset.top + $("#" + attachedInputId).height() + 4,
                            "left": offset.left });

            // Remove the old timepicker if it is still there
            // $("#timePickerDialog").remove();

            // Attach the button click function to the up and down buttons on the timepicker
            timePicker.find(".button").on("click", buttonClick);
            timePicker.find("input").on("input", validateInput);
            timePicker.find("input").on("focus", selectAll);

            // Append the timepicker to the body
            $("body").append(timePicker);
            // Attach a click function to check clicks outside the timepicker
            $( document ).on( "mousedown", checkExternalClick );
            $( document ).on( "keyup", checkEnter );
            // Show the timepicker
            $("#timePickerDialog").show("fast", function(){
                $('#timePickerDialog').focus();
            });
        }
    };

    const checkExternalClick = function( event )
    {
        var $target = $(event.target);
        var $timePicker = $('#timePickerDialog');
        var timePickerId = "timePickerDialog";
        if ( $target[ 0 ].id !== timePickerId && $target.parents( "#" + timePickerId ).length === 0 && $target[ 0 ].id != "timePicker")
        {
            setNewTime();
            $timePicker.hide("fast", function(){
                $('#timePickerDialog').remove();
            });
            $( document ).off( "mousedown", checkExternalClick );
            $( document ).off( "keyup", checkEnter );
		}
    };

    const checkEnter = function ( event )
    {
        var $target = $(event.target);
        var $timePicker = $('#timePickerDialog');

        // enter
        if(event.which == 13)
        {
            $timePicker.hide("fast", function(){
                $('#timePickerDialog').remove();
            });
            $( document ).off( "mousedown", checkExternalClick );
            $( document ).off( "keyup", checkEnter );
        }
        // Escape key clicked
        else if(event.which == 27)
        {
            $timePicker.hide("fast", function(){
                $('#timePickerDialog').remove();
            });
            $( document ).off( "mousedown", checkExternalClick );
            $( document ).off( "keyup", checkEnter );
        }
    }

    const buttonClick = function( event )
    {
        var $target = $(event.target);
        if($target.prop('nodeName') == "DIV")
        {
            $target = $target.children().eq(0);
        }
        var timeSet = $target.attr("timeSet");
        var direction = $target.attr("direction");

        var action = 0;
        switch(direction)
        {
            case "up":
            {
                action = 1;
            }
            break;
            case "down":
            {
                action = -1;
            }
            break;
        }

        var $input;
        var value = 0;

        switch(timeSet)
        {
            case "hours":
            {
                $input = $("#timePickerHours");
                value = Number($input.val()) + action;

                if(value > maxLimits[0])
                {
                    value = minLimits[0];
                }
                else if (value < minLimits[0])
                {
                    value = maxLimits[0];
                }

                // if(value == maxLimits[0])
                // {
                //     $("#timePickerMinutes").val(getTimeInFormat(minLimits[1], 1));
                //     $("#timePickerSeconds").val(getTimeInFormat(minLimits[0], 1));
                // }
                // $input.val(value);
                value = value.toString();
                while(value.length < decimals[0])
                {
                    value = "0" + value;
                }
            }
            break;
            case "minutes":
            {
                hours = $("#timePickerHours").val();
                $input = $("#timePickerMinutes");

                value = Number($input.val()) + action;
                // if(hours == maxLimits[0])
                // {
                //     value = minLimits[1];
                // }
                // else
                // {
                    if(value > maxLimits[1])
                    {
                        value = minLimits[1];
                    }
                    else if (value < minLimits[1])
                    {
                        value = maxLimits[1];
                    }
                    // $input.val(value);
                // }
                value = value.toString();
                while(value.length < decimals[1])
                {
                    value = "0" + value;
                }
            }
            break;
            case "seconds":
            {
                hours = $("#timePickerHours").val();
                $input = $("#timePickerSeconds");
                value = Number($input.val()) + action;
                // if(hours == maxLimits[0])
                // {
                //     value = minLimits[0];
                // }
                // else
                // {
                    if(value > maxLimits[2])
                    {
                        value = minLimits[2];
                    }
                    else if (value < minLimits[2])
                    {
                        value = maxLimits[2];
                    }
                // }
                value = value.toString();
                while(value.length < decimals[2])
                {
                    value = "0" + value;
                }
            }
            break;
        }


        $input.val(value);
    };

    const setNewTime = function()
    {
        var time = [$("#timePickerHours").val(), $("#timePickerMinutes").val(), $("#timePickerSeconds").val()];
        var hours = time[0].toString();
        var minutes = time[1].toString();
        var seconds = time[2].toString();
        while(hours.length < decimals[0])
        {
            hours = "0" + hours;
        }
        while(minutes.length < decimals[1])
        {
            minutes = "0" + minutes;
        }
        while(seconds.length < decimals[2])
        {
            seconds = "0" + seconds;
        }
        $("#" + attachedInputId).val(hours + ":" + minutes + ":" + seconds);
        if(undefined != a_onClose)
        {
            a_onClose();
        }
    };

    const validateInput = function( event )
    {
        var timeSet = event.target.id.replace("timePicker", "").toLowerCase();
        var value   = $(this).val();
        // Regex to match only numbers
        var reg = /^\d+$/;
        // Check if only by manual edit numbers are inserted


        switch(timeSet)
        {
            case "hours":
            {
                if(!reg.test(value) || value.length > decimals[0])
                {
                    value = valueBeforeFocus;
                }
                else
                {
                    valueBeforeFocus = value;
                }
                if(value > maxLimits[0])
                {
                    value = maxLimits[0];
                }
                // while(value.length < decimals[0])
                // {
                //     value = "0" + value;
                // }
            }
            break;
            case "minutes":
            {
                if(!reg.test(value) || value.length > decimals[1])
                {
                    value = valueBeforeFocus;
                }
                else
                {
                    valueBeforeFocus = value;
                }
                if(value > maxLimits[1])
                {
                    value = maxLimits[1];
                }
                // while(value.length < decimals[1])
                // {
                //     value = "0" + value;
                // }
            }
            break;
            case "seconds":
            {
                if(!reg.test(value) || value.length > decimals[2])
                {
                    value = valueBeforeFocus;
                }
                else
                {
                    valueBeforeFocus = value;
                }
                if(value > maxLimits[2])
                {
                    value = maxLimits[2];
                }
                // while(value.length < decimals[2])
                // {
                //     value = "0" + value;
                // }
            }
            break;
        }
        $(this).val(value);
    };

    const selectAll = function()
    {
        valueBeforeFocus = $(this).val();
        $(this).select();
    }

    //#########################################################################
    // Helper functions
    const addZeros = function(a_timeArray)
    {
        for(var i in a_timeArray)
        {
            while(a_timeArray[i].length != decimals[i])
            {
                if(a_timeArray[i].length > decimals[i])
                {
                    break;
                }
                else
                {
                    a_timeArray[i] = "0" + a_timeArray[i];
                }
            }
        }
        return a_timeArray;
    };

    this.setMaxLimits = function(a_limits)
    {
        maxLimits = a_limits
    };

    this.setMinLimits = function(a_limits)
    {
        minLimits = a_limits
    };

    this.setDecimals = function(a_decimals)
    {
        decimals = a_decimals
    };

    const getTimeInFormat = function(a_value, a_index)
    {
        var value = a_value.toString();
        while(value.length < decimals[a_index])
        // if(value.length < decimals[a_index])
        {
            value = "0" + a_value;
        }
        return value;
    };
}

