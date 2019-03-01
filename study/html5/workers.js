self.onmessage = function(ev){
    //console.log("work线程");
    console.log(ev.data[0]+ev.data[1]);
    postMessage(ev.data[0]+ev.data[1]);

};