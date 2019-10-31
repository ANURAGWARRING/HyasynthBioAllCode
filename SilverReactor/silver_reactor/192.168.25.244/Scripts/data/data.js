function dataStorage()
{
    //#########################################################################
    // Websocket Connection Functions
    const webSocketOpen = function (a_data)
    {
        // console.log(webSocket);
        connectivityStats.connected.push(getTimeDate());
        connected = true;
        if(wasConnected)
        {
            atReconnectedFunction();
        }
        else if(atConnectedFunction != null)
        {
            atConnectedFunction();
            wasConnected = true;
        }
        else if(developing.verbose)
        {
            console.log("[Dev] Connected but no atConnected function specified");
        }

        console.log('[Info] Connected ('+webSocket.url+')');
    };
    // this.webSocketOpen = webSocketOpen;

    const webSocketClose = function (a_data)
    {
        if(connected != false)
        {
            connectivityStats.disconnected.push(getTimeDate());
            callbackList = new Array(MAXCALLBACKS);
            callbackCounter = 0;
            console.log('[Info] Disconnected from '+webSocket.url);
            if(developing.verbose)
            {
                console.log(a_data);
            }
        }
        if(wasConnected)
        {
            if(atDisconnectedFunction != null)
            {
                // console.log("trying disconnected function");
                atDisconnectedFunction()
            }
            else
            {
                var wi = new windowItems();
                overlay.html(wi.convertItemsToElements([{type:"message", id:"disconnectedMessage", text: "<b>Disconnected, trying to reconnect</b>"},
                                                    {type: "whiteLoader", id:"loader", text:""}]));
                overlay.show();
            }
        }
        connected = false;
        User.setLevel();
    };
    var testing = false;
    const webSocketMessage = function (a_data)
    {
        var convert = String.fromCharCode.apply(null, new Uint8Array(a_data.data));
        var dataIn = convert.split('\r');
        for (var loop = 0; loop < dataIn.length; ++loop) {
            if (dataIn[loop] != null && dataIn[loop] != "") {
                var address = [];
                var data = [];
                if (dataIn[loop].indexOf('E') < 0 || (dataIn[loop].indexOf('A') > -1) && (dataIn[loop].indexOf('A') < dataIn[loop].indexOf('E')))
                {
                    data[0] = dataIn[loop].substr(0, dataIn[loop].indexOf('A'));
                    data[0] = data[0].substr(1, data[0].length - 1);
                    data[1] = dataIn[loop].substr(dataIn[loop].indexOf('A') + 1, dataIn[loop].length - 1 - dataIn[loop].indexOf('A'));
                    address = data[0].split('.').map(Number);

                    // if(compareAddresses([0,0,0], address)){
                    //     console.log("legacy")
                    // }

                    storeData(address, data[1]);
                    executeCallback(address, data[1]);
                }
                else
                {
                    if(developing.jcodes)
                    {
                        console.log('[Dev] ' + dataIn[loop]);
                    }
                }
            }
        }

    };

    const webSocketError = function (a_data)
    {
        if(developing.verbose)
        {
            console.log("[Dev] WebSocketError:");
            console.log(a_data);
        }
        // if(webSocket.readyState == 3)
        // {
        //     webSocket.onclose();
        // }
    };

    const isConnected = function ()
    {
        return connected;
    };
    this.isConnected = isConnected;

    const checkConnection = function()
    {
        // console.log("Checking connection")
        window.clearTimeout(timeoutTimer);
        timeoutTimer = null;
        switch(webSocket.readyState)
        {
            case 0: // connecting
            {
                // console.log("Connecting");
                if(!wasConnected)
                {
                    if(atDisconnectedFunction != null)
                    {
                        // console.log("trying disconnected function");
                        atDisconnectedFunction()
                    }
                    else
                    {
                        var wi = new windowItems();
                        overlay.html(wi.convertItemsToElements([{type:"message", id:"noConnectionMessage", text: "<b>Not connected, trying to connect</b>"},
                                                            {type: "whiteLoader", id:"loader", text:""}]));
                        overlay.show();
                    }

                }
                timeoutTimer = setTimeout(checkConnection, checkConnectionInterval);
            }
            break;
            case 1: // Open
            {
                // console.log("Am Open");
                // in this case onopen function was missed
                if(!connected)
                {
                    // console.log("Opening again");
                    webSocketOpen();
                }
                else
                {
                    if(overlay.isVisible() && $("#noConnectionMessage").length > 0)
                    {
                        overlay.hide();
                    }
                }
                timeoutTimer = setTimeout(checkConnection, checkConnectionInterval);
            }
            break;
            case 2: // closing
            {
                // console.log("Closing");
                timeoutTimer = setTimeout(checkConnection, checkConnectionInterval);
            }
            break;
            case 3: // Closed
            {
                // console.log("Closed so connecting again");
                connect(ipAddress);
            }
            break;
            default:
            {
                // console.log("Weird state");
                timeoutTimer = setTimeout(checkConnection, checkConnectionInterval);
            }
            break;

        }
    }

    const connect = function (a_ip, a_function, a_reconnect, a_disconnect)
    {
        ipAddress = a_ip;
        if(atConnectedFunction == null && a_function != undefined)
        {
            atConnectedFunction = a_function;
        }
        if(atReconnectedFunction == null && a_reconnect != undefined)
        {
            atReconnectedFunction = a_reconnect;
        }
        if(atDisconnectedFunction == null && a_disconnect != undefined)
        {
            atDisconnectedFunction = a_disconnect;
        }
        if(!connected)
        {
            if(timeoutTimer == null)
            {
                timeoutTimer = setTimeout(checkConnection, checkConnectionInterval);
            }
            if (webSocket != null && webSocket != undefined)
            {
                webSocket.close();
                delete webSocket;
                webSocket = null;
            }
            webSocket = new WebSocket('ws://' + ipAddress + '/');
            if (webSocket != null && webSocket != undefined)
            {
                webSocket.binaryType = 'arraybuffer';
                webSocket.onopen     = webSocketOpen;
                webSocket.onclose    = webSocketClose;
                webSocket.onmessage  = webSocketMessage;
                webSocket.onerror    = webSocketError;
            }
        }
    };
    this.connect = connect;

    const disconnect = function()
    {
        window.clearTimeout(timeoutTimer);
        timeoutTimer = null;
        connected = false;
        wasConnected = false;
        // callbackList = undefined;
        if(webSocket != null || webSocket != undefined)
        {
            console.log('[Info] Disconnected from '+webSocket.url);
            webSocket.close();
        }

        delete webSocket;
        webSocket = null;
    };
    this.disconnect = disconnect;

    const handleSystemDisconnect = function(a_address, a_data)
    {
        var newIP = hex2ip(a_data);
        var newURL = "http://" + newIP + "/";
        console.log(a_data);
        console.log("[Info] System disconnect message received");
        console.log("[Info] New IP: " + newIP);

        if(newURL != window.location.href && newIP != "0.0.0.0")
        {
            disconnect();
            var wi = new windowItems();
            overlay.html(wi.convertItemsToElements([{type:"message", id:"disconnectedMessage", text: "<b>The IP-Address was changed or a backup file with a different IP-Address was imported</b>"},
                                                    {type:"message", id:"disconnectedMessage", text: "<b>An attempt will be made to reconnect to the new IP-Address: " + newIP + "</b>"},
                                                    {type: "whiteLoader", id:"loader", text:"<b>Reconnecting</b>"}]));
            overlay.show();

            setTimeout(function(){window.location.href = newURL;}, 20000);
        }
    };

    this.showConnectivityStats = function()
    {
        console.log("Connected (" + connectivityStats.connected.length + "): \t\t\tDisconnected (" + connectivityStats.disconnected.length + "):");

        var end;
        if(connectivityStats.connected.length > connectivityStats.disconnected.length)
        {
            var end = connectivityStats.connected.length;
        }
        else
        {
            var end = connectivityStats.disconnected.length;
        }

        for(var i = 0; i < end; i++)
        {
            var string = "";
            if(connectivityStats.connected[i] == undefined)
            {
                string += "\t\t\t";
            }
            else
            {
                string += connectivityStats.connected[i] + "\t";
            }
            if(connectivityStats.disconnected[i] == undefined)
            {
                string += "\t\t\t";
            }
            else
            {
                string += connectivityStats.disconnected[i] + "\t";
            }
            console.log(string);
        }
    };

    //#########################################################################
    // JCode related functions
    const webSocketSend = function (a_data)
    {
        if (webSocket != null)
        {
            var data = new Uint8Array(a_data.length);
            for (var index = 0; index < a_data.length; ++index)
            {
                data[index] = a_data.charCodeAt(index);
            }
            if(webSocket.readyState == webSocket.OPEN) // Open
            {
                webSocket.send(data, { binary: true });
                return true;
            }
        }
        return false;
    };

    const expandDataBase = function (a_address)
    {
        if (null == dataBase || undefined == dataBase)
        {
            dataBase = new Object();
            dataBase.items = new Array();
            dataBase.callbacks = new Array();
            dataBase.data = null;
        }
        var walker = dataBase.items;
        for (var index = 0; index < a_address.length; ++index)
        {
            while ((a_address[index] + 1) > walker.length)
            {
                var obj = new Object();
                obj.items = new Array();
                obj.callbacks = new Array();
                obj.data = null;
                walker.push(obj);
            }
            walker = walker[a_address[index]].items;
        }
    }

    const storeData = function (a_address, a_data)
    {
        if (null == a_address || undefined == a_address || null == a_data || undefined == a_data)
        {
            return false;
        }

        expandDataBase(a_address);

        var walker = dataBase.items;
        for (var index = 0; index < a_address.length; ++index)
        {
            walker = walker[a_address[index]].items;
        }
        walker.data = a_data;
        return true;
    };

    const callback = function(a_address, a_data)
    {
        if (null == a_address || undefined == a_address || null == a_data || undefined == a_data)
        {
            return false;
        }

        expandDataBase(a_address);

        var walker = dataBase.items;
        var indexWalker = 0;
        for (indexWalker = 0; indexWalker < (a_address.length - 1); ++indexWalker)
        {
            walker = walker[a_address[indexWalker]].items;
        }
        walker = walker[a_address[indexWalker]];

        for(var index = 0; index < walker.callbacks.length; ++index)
        {
            walker.callbacks[index](a_address, a_data);
        }
        return true;
    };

    this.returnDataBase = function ()
    {
        return dataBase;
    };

    this.getData = function (a_address)
    {
        if (null == a_address || undefined == a_address)
        {
            return null;
        }

        expandDataBase(a_address);

        var walker = dataBase.items;
        for (var index = 0; index < a_address.length; ++index)
        {
            walker = walker[a_address[index]].items;
        }
        return walker.data;
    };

    this.setData = function (a_address, a_data)
    {
        if (null == a_address || undefined == a_address || null == a_data || undefined == a_data)
        {
            return false;
        }

        var str = 'J';
        for (var length = 0; length < a_address.length; ++length)
        {
            str += a_address[length];
            if((length + 1) < a_address.length)
            {
                str += '.';
            }
        }
        str += 's' + a_data + '\r';
        return webSocketSend(str);
    };

    this.updateData = function (a_address)
    {
        if (null == a_address || undefined == a_address)
        {
            return false;
        }

        var str = 'J';
        for (var length = 0; length < a_address.length; ++length)
        {
            str += a_address[length];
            if((length + 1) < a_address.length)
            {
                str += '.';
            }
        }
        str += 'S\r';
        return webSocketSend(str);
    };

    this.dataCount = function (a_address)
    {
        if (null == a_address || undefined == a_address)
        {
            return false;
        }

        expandDataBase(a_address);

        var walker = dataBase.items;
        var indexWalker = 0;
        for (indexWalker = 0; indexWalker < a_address.length; ++indexWalker)
        {
            walker = walker[a_address[indexWalker]].items;
        }
        return walker.length;
    };

    //#########################################################################
    // Callback related functions
    const registerCallback = function(a_func, a_address)
    {
        for(var i = 0; i < MAXCALLBACKS; i++)
        {
            if(callbackList[i] == undefined)
            {
                var address = [0, 0, i+CALLBACKOFFSET];
                if(a_address != undefined)
                {
                    address = a_address;
                }

                callbackList[i] = {func:a_func, address:address};
                callbackCounter++;
                return {address: address, func:a_func};
            }
        }
        return;
    };
    this.registerCallback = registerCallback;

    const executeCallback = function(a_address, a_data)
    {
        for(var i = 0; i < MAXCALLBACKS; i++)
        {
            if(callbackList[i] != undefined && callbackList[i] != "To be deleted" && compareAddresses(callbackList[i].address, a_address))
            {
                callbackList[i].func(a_address, a_data);
            }
        }
        return;
    };

    // Remove a callback
    const remCallback = function(a_callback)
    {
        if(a_callback == undefined)
        {
            return false;
        }
        for(var i = 0; i < MAXCALLBACKS; i++){
            if(callbackList[i] != undefined && callbackList[i] != "To be deleted" && compareAddresses(callbackList[i].address, a_callback.address))
            {
                if(a_callback.func == callbackList[i].func)
                {
                    // Keep the callback address occupied for a while to ensure
                    // no other callback can be assigned to this address before
                    // the controller answers
                    callbackList[i] = "To be deleted";
                    setTimeout(function()
                    {
                        if(callbackList[i] == "To be deleted")
                        {
                            callbackList[i] = undefined;
                            callbackCounter--;
                            if(developing.callbackCounter)
                            {
                                console.log("[Dev][Callback Counter] " + callbackCounter);
                            }
                        }
                        else if(developing.callbacks){
                            console.log("[Dev][Callbacks] To be deleted is trying to be removed")
                        }
                    }, CALLBACKOCCUPATION);
                    // a_callback = undefined;
                    delete a_callback;
                    return true;
                }
            }
        }
        if(developing.callbacks)
        {
            console.log("[Dev][Callbacks] Failed to remove callback [" + a_callback.address + "] " + a_callback.func.name);
        }
        // a_callback = undefined;
        delete a_callback;
        return false;
    };
    this.remCallback = remCallback;


    // Remove a list of callbacks
    const remCallbacks = function(a_addresses){
        var keys = Object.keys(a_addresses);
        var failedCounter = 0;
        for(var i = 0; i < keys.length; i++)
        {
            var succes = remCallback(a_addresses[keys[i]]);
            if(!succes)
            {
                failedCounter++;
            }
        }
    };
    this.remCallbacks = remCallbacks;

    // Returns a list of callbacks assigned to a certain address
    const getCallbacksAssigned = function(a_address)
    {
        var list = [];
        for(var i = 0; i < MAXCALLBACKS; i++)
        {
            if(callbackList[i] != undefined && compareAddresses(callbackList[i].address, a_address))
            {
                list.push( callbackList[i].address + " - " + callbackList[i].func.name);
            }
        }
        return list;
    };
    this.getCallbacksAssigned = getCallbacksAssigned;

    const getCallbacksFunc = function(a_address)
    {
        var list = [];
        for(var i = 0; i < MAXCALLBACKS; i++)
        {
            if(callbackList[i] != undefined && compareAddresses(callbackList[i].address, a_address))
            {
                list.push( callbackList[i].address + " - " + callbackList[i].func);
            }
        }
        return list;
    };
    this.getCallbacksFunc = getCallbacksFunc;

    const printCallbackList = function()
    {
        for(var i = 0; i < MAXCALLBACKS; i++)
        {
            var entry = padNumber(i, 5) + " - ";
            if(callbackList[i] != undefined && callbackList[i] != "To be deleted")
            {
                entry += "[";
                for(var j = 0; j < callbackList[i].address.length; j++)
                {
                    entry += callbackList[i].address[j];
                    if(j != callbackList[i].address.length - 1)
                    {
                        entry += ", ";
                    }
                }
                entry += "] - " + callbackList[i].func.name;
                console.log(entry);
            }
            else if(callbackList[i] == "To be deleted")
            {
                entry += "To be deleted";
                console.log(entry);
            }

        }
    };
    this.printCallbackList = printCallbackList;

    const padNumber = function(a_number, a_width)
    {
        a_number = a_number + '';
        return a_number.length >= a_width ? a_number: new Array(a_width - a_number.length + 1).join("0") + a_number;
    };

    // Helper function to basically compare arrays
    const compareAddresses = function(a_addressA, a_addressB){
        if(a_addressA == undefined || a_addressB == undefined){
            // console.log("test");
            return false;
        }
        if(a_addressA.length == a_addressB.length){
            for(var i = 0;i < a_addressA.length; i++){
                if(a_addressA[i] != a_addressB[i]){
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    };

    // Legacy add callback function
    const addCallback = function (a_address, a_func)
    {
        return registerCallback(a_func, a_address);
        // if (null == a_address || undefined == a_address || null == a_func || undefined == a_func)
        // {
        //     return false;
        // }
        //
        // expandDataBase(a_address);
        //
        // var walker = dataBase.items;
        // var indexWalker = 0;
        // for (indexWalker = 0; indexWalker < (a_address.length - 1); ++indexWalker)
        // {
        //     walker = walker[a_address[indexWalker]].items;
        // }
        // walker = walker[a_address[indexWalker]];
        //
        // var found = false;
        // for(var index = 0; index < walker.callbacks.length; ++index)
        // {
        //     if(a_func == walker.callbacks[index])
        //     {
        //         found = true;
        //         break;
        //     }
        // }
        // if(!found)
        // {
        //     walker.callbacks.push(a_func);
        //     return true;
        // }
        // return false;
    };
    this.addCallback = addCallback;

    // Legacy remove callback function
    this.removeCallback = function(a_address, a_func)
    {
        remCallback({address:a_address, func:a_func})
        // if (null == a_address || undefined == a_address || null == a_func || undefined == a_func)
        // {
        //     return false;
        // }
        //
        // expandDataBase(a_address);
        //
        // var walker = dataBase.items;
        // var indexWalker = 0;
        // for (indexWalker = 0; indexWalker < (a_address.length - 1); ++indexWalker)
        // {
        //     walker = walker[a_address[indexWalker]].items;
        // }
        // walker = walker[a_address[indexWalker]];
        //
        // for(var index = 0; index < walker.callbacks.length; ++index)
        // {
        //     if(a_func == walker.callbacks[index])
        //     {
        //         walker.callbacks.splice(index, 1);
        //         return true;
        //     }
        // }
    };

    this.testSend = function ()
    {
        return webSocketSend('J0.0S\r');
    };

    //#########################################################################
    // Helpers
    const getTimeDate = function()
    {
        var d    = new Date();
        timeDate = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2) + " - " + ('0' + d.getDate()).slice(-2) + "-" + (d.getMonth() + 1) + "-" +  d.getFullYear();
        // console.log(timeDate);
        return timeDate;
    };

    const setIntentionalIPChange = function(a_value)
    {
        intentionalIPChange = a_value;
    };

    const hex2ip = function(a_hex)
    {
        var ip = parseInt(a_hex, 16);
        return ((ip >> 24) & 0x0FF) + '.' + ((ip >> 16) & 0x0FF) + '.' + ((ip >> 8) & 0x0FF) + '.' + (ip & 0x0FF);
    };

    //#########################################################################
    // Initialisation

    var webSocket               = null;
    var connected               = false;
    var dataBase                = null;
    var timeoutTimer            = null;
    var checkConnectionInterval = 2000;
    var atConnectedFunction     = null;
    var atReconnectedFunction   = null;
    var atDisconnectedFunction  = null;
    var wasConnected            = false;
    var ipAddress;
    var intentionalIPChange     = false;
    var connectivityStats       = {connected:[],disconnected:[]};
    const MAXCALLBACKS          = 5000;
    const CALLBACKOFFSET        = 20;
    const CALLBACKOCCUPATION    = 1000;
    var callbackCounter         = 0;
    var callbackList            = new Array(MAXCALLBACKS);

    // set callback for systemDisconnect
    var address = [0, 86]; //systemDisconnect
    // registeredCallbacks.push([address, handleSystemDisconnect]);
    addCallback(address, handleSystemDisconnect);

};
var mainData = new dataStorage();

