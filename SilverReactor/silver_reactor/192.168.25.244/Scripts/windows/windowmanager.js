function windowManager()
{
    var currentWindow;
    // var tabs;
    // var selectedTab     = 0;
    // var visibleTabIndex = 0;

    this.loadWindow = function( a_target, a_type, a_itemId, event )
    {

        var newWindow;
        var windowSupported = true;
        var jQueries = [];
        var callbackFunction = loadMainPanel;
        switch( a_type )
        {
            case "fullwindow":
            {
                switch( a_target )
                {
                    case "synoptic":
                    {
                        newWindow = new synoptic();
                    }
                    break;
                    default:
                    {
                        windowSupported = false;
                        if(developing.verbose)
                        {
                            console.log("[Dev][wMan] Full window " + a_target + "  not supported");
                        }
                    }
                    break;
                }
            }
            break;
            case "windowwithtabs":
            {
                if(a_itemId == undefined)
                {
                    a_itemId = Number(event.target.getAttribute("itemid"));
                }
                newWindow = new windowWithTabs( a_target, a_itemId );
            }
            break;
            default:
            {
                windowSupported = false;
                if(developing.verbose)
                {
                    console.log("[Dev][wMan] Window Type " + a_target + "  not supported");
                }
            }
            break;
        }
        if(windowSupported)
        {
            if(currentWindow)
            {
                currentWindow.cleanUp();
            }
            currentWindow = newWindow;
            currentWindow.init( loadMainPanel );
            if(!mainData.isConnected())
            {
                $("#mainPanel").empty();
            }
        }
    };

    var loadMainPanel = function()
    {
        $("#mainPanel").empty();
        $("#mainPanel").append(currentWindow.buildUp());

        if(currentWindow.afterLoad != undefined)
        {
            currentWindow.afterLoad();
        }
    };
};

