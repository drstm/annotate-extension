imageName = urlToFetch.split("/")[urlToFetch.split("/").length - 1]
ele = $("img[src*='"+imageName +"'")
a = $(ele).position()


console.log("img[src*='"+imageName +"']")
console.log(a)

var overlay = jQuery("<div style='position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: #000;filter:alpha(opacity=50);-moz-opacity:0.1;-khtml-opacity: 0.1;opacity: 0.1;z-index: 10000;' id='overlay'> </div>");
  overlay.appendTo(document.body)

my_bb = jQuery("<div style='border: 3px dotted #ff0;position: absolute; ' id='my_bb' hidden></div>")
my_bb.appendTo(overlay)
var div = document.getElementById('my_bb'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
function reCalc() { //This will restyle the div
    var x3 = Math.min(x1,x2); //Smaller X
    var x4 = Math.max(x1,x2); //Larger X
    var y3 = Math.min(y1,y2); //Smaller Y
    var y4 = Math.max(y1,y2); //Larger Y
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
}
onmousedown = function(e) {
    div.hidden = 0; //Unhide the div
    x1 = e.clientX; //Set the initial X
    y1 = e.clientY; //Set the initial Y
    reCalc();
};
onmousemove = function(e) {
    x2 = e.clientX; //Update the current position X
    y2 = e.clientY; //Update the current position Y
    reCalc();
};
onmouseup = function(e) {
    div.hidden = 1; //Hide the div
    annotation = prompt("Please annotate this image")
    console.log(x1,y1)
    console.log(x2,y2)
    console.log("image position")
    console.log(a)
    console.log(annotation)
    $('#overlay').remove()
    metadata = {
        "image_url": urlToFetch,
        "bounding_poly": [x1, x2, y1, y2],
        "annotation": annotation,
        "left": a.left,
        "top": a.top
    }

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:7000/save_image",
        data: JSON.stringify(metadata, null, '\t'),
        contentType: 'application/json;charset=UTF-8',
        success: function(){ console.log('a')},
        dataType: "json"
      });

    // rremove overlay 
};