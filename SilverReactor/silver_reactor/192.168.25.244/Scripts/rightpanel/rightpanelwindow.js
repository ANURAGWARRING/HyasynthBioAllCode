function rightPanelWindow()
{
    const tabClick = function (data)
    {
        if (undefined != windowBody && null != windowBody)
        {
            windowBody.cleanUp();
            delete windowBody;
            windowBody = null;
        }
        switch(data.data.data)
        {
            case 0:
            {
                $(".rightPanel").empty();
                $("#rightTab0").attr('class', "tableCell tab selected");
                $("#rightTab1").attr('class', "tableCell tab");
                $("#rightTab2").attr('class', "tableCell tab");
                $(".rightPanel").append(wi.loader("Loading data"));

                windowBody = new rightPanelSensors();
            }
            break;
            case 1:
            {
                $("#rightTab0").attr('class', "tableCell tab");
                $("#rightTab1").attr('class', "tableCell tab selected");
                $("#rightTab2").attr('class', "tableCell tab");
                $(".rightPanel").empty();
                $(".rightPanel").append(wi.loader("Loading data"));

                windowBody = new rightPanelActuators();
            }
            break;
            case 2:
            {
                $("#rightTab0").attr('class', "tableCell tab");
                $("#rightTab1").attr('class', "tableCell tab");
                $("#rightTab2").attr('class', "tableCell tab selected");
                $(".rightPanel").empty();
                $(".rightPanel").append(wi.loader("Loading data"));

                windowBody = new rightPanelOutput();
            }
            break;

        }
        windowBody.init(loadPage);
    };

    const addTab = function (a_name, a_selected, a_id)
    {
        var row = $('<div class="tableCell tab" id="rightTab' + a_id + '">' + a_name + '</div>');
        row.click({data: a_id}, tabClick);
        if (a_selected)
        {
            row.addClass("selected");
        }
        tabRow.append(row);
    }

    this.setup = function()
    {
        $("#rightTab0").click();
    }

    const loadPage = function()
    {
        $(".rightPanel").html(windowBody.buildUp());
        windowBody.setState();
    }

    const doneInitAct = function()
    {
        page = windowBody.buildUp();
        $(".rightPanel").empty();
        while(page.children().length)
        {
            $(".rightPanel").append(page.children()[0]);
        }
        windowBody.draw();
    }

    const doneInitCntrl = function()
    {
        page = windowBody.buildUp();
        $(".rightPanel").empty();
        while(page.children().length)
        {
            $(".rightPanel").append(page.children()[0]);
        }
        windowBody.draw();
    }

    var main = $('<div></div>');
    var blank = $('<div class=" rightPanelSpace"><div class="tableCell"></div></div>');
    var tabRow = $('<div class=" rightPanelTabs"></div>');
    var body = $('<div class="rightPanel"></div>');
    var windowBody = null;
    var page = null;
    var wi = new windowItems(-1);
    var selected = 0;

    addTab('Sensors', true, 0);
    addTab('Actuators', false, 1);
    addTab('Output', false, 2);

    main.append(blank);
    main.append(tabRow);
    main.append(body);

    // Load the window skeleton
    $("#rightPanelWindow").html(main.children());

    return this;
};

