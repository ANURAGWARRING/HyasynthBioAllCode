function dataTools(a_mainData)
{
    var data = a_mainData
    var updateList = new Array();
    this.updateList = updateList;

    function update(ptr)
    {
        for(var index = 0; index < ptr.updateList.length; ++index)
        {
            data.updateData(ptr.updateList[index].address);
        }
    };

    var timer = setInterval(update, 1000, this);

    this.dataReturn = function (a_data)
    {
        var obj = new Object();
        obj.str = String(a_data);
        obj.num = Number(a_data);
        return obj;
    };

    this.dataHandling = function (a_address, a_data)
    {
        if (null != a_address && undefined != a_address && null != a_data && undefined != a_data)
        {
            data.setData(a_address, a_data);
        }
    };

    this.dataUpdateHandling = function (a_address, a_update)
    {
        if (null != a_address && undefined != a_address && null != a_update && undefined != a_update)
        {
            if(a_update.add)
            {
                var found = false;
                var index = 0;
                for(var check = 0; check < updateList.length; ++check)
                {
                    if (compareIntegerArrays(a_address, updateList[check].address))
                    {
                        found = true;
                        index = check;
                        break;
                    }
                }
                if (found)
                {
                    found = false;
                    for(var check = 0; check < updateList[index].callers.length; ++check)
                    {
                        if(a_update.caller == updateList[index].callers[check])
                        {
                            found = true;
                            break;
                        }
                    }
                    if(!found)
                    {
                        updateList[index].callers.push(a_update.caller);
                    }
                }
                else
                {
                    var obj = new Object();
                    obj.address = a_address;
                    obj.callers = new Array();
                    obj.callers.push(a_update.caller);
                    updateList.push(obj);
                }
            }
            else
            {
                var found = false;
                var index = 0;
                for(var check = 0; check < updateList.length; ++check)
                {
                    if (compareIntegerArrays(a_address, updateList[check].address))
                    {
                        found = true;
                        index = check;
                        break;
                    }
                }
                if (found)
                {
                    for(var check = 0; check < updateList[index].callers.length; ++check)
                    {
                        if(a_update.caller == updateList[index].callers[check])
                        {
                            updateList[index].callers.splice(check, 1);
                            if(!updateList[index].callers.length)
                            {
                                updateList.splice(index, 1);
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    function compareIntegerArrays(arr1, arr2)
    {
        if (arr1.length == arr2.length)
        {
            for (var check = 0; check < arr1.length; ++check)
            {
                if (arr1[check] != arr2[check])
                {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
}

function convertSVG()
{
    jQuery('img.unconverted').each(
        function()
        {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL,
                function (data)
                {
                    // Get the SVG tag, ignore the rest
                    var $svg = jQuery(data).find('svg');

                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined')
                    {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined')
                    {
                        imgClass = imgClass.replace('unconverted', '');
                        $svg = $svg.attr('class', imgClass+' converted');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');

                    $svg.children().each(
                        function()
                        {
                            var $elem = jQuery(this);
                            $elem.css("stroke", "");
                        }
                    );
                    var $eventData = $._data($img.get(0), "events");
                    if(null != $eventData && undefined != $eventData)
                    {
                        $svg.click($eventData.click[0].data, $eventData.click[0].handler)
                    }
                    // Replace image with new SVG
                    $img.replaceWith($svg);
                }
            );
        }
    );
}

