function overlayManager()
{
    this.show = function(a_function)
    {
        if(a_function != undefined)
        {
            $("#overlay").slideDown(OVERLAYTRANSITIONTIME, a_function);
        }
        else
        {
            $("#overlay").slideDown(OVERLAYTRANSITIONTIME);
        }
    };

    this.hide = function(a_function)
    {
        if(a_function != undefined)
        {
            $("#overlay").slideUp(OVERLAYTRANSITIONTIME, a_function);
        }
        else
        {
            $("#overlay").slideUp(OVERLAYTRANSITIONTIME);
        }
    };

    this.html = function(a_content)
    {
        $("#overlay .card").html(a_content);
    };

    this.isVisible = function()
    {
        return $("#overlay").is(":visible");
    }


    const OVERLAYTRANSITIONTIME = 500;
};

