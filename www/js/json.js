var URLs = [];
var grids;
var deviceName;
var STATUS_OK = 100;
var BASE_URL = "http://192.168.0.204:8080";
//"https://dl.dropboxusercontent.com/u/1403240/staj/metadata.json";
var METADATA_URL = BASE_URL + "/cam";
var TAKE_PICTURE_URL = BASE_URL + "/refresh";

//default grids
grids = [{
    id : 0,
    url:'http://placehold.it/150x150',
    srcImage : 'http://placehold.it/150x150',
    srcShelf : 'img/Shelf4_1.png',
    title : 'Images',
}, {
    id : 1,
    url:'http://placehold.it/150x150',
    srcImage : 'http://placehold.it/150x150',
    srcShelf : 'img/Shelf4_2.png',
}, {
    id : 2,
    url:'http://placehold.it/150x150',
    srcImage : 'http://placehold.it/150x150',
    srcShelf : 'img/Shelf4_3.png',
}, {
    id : 3,
    url:'http://placehold.it/150x150',
    srcImage : 'http://placehold.it/150x150',
    srcShelf : 'img/Shelf4_4.png',
}];
$(document).ready(function() {
    JSONProcess();

});

function JSONProcess() {

    $.getJSON(METADATA_URL, function(data) {
        //get device name
        deviceName = data.deviceName;
        //get camera count
        var raspiCamCount = data.raspiCamCount;
        var usbCamCount = data.usbCamCount;
        
        for (var i = 0; i < usbCamCount; i++) {
            //get urls
            URLs[i] = data.cams[i].url;
/*
            URLs[0] = "http://1.bp.blogspot.com/-pPAGNyln86Y/Uindkpv87kI/AAAAAAAAI4I/pbUilrlqoOg/s1600/Tulips2.jpg";
            URLs[1] = "http://www.steves-digicams.com/sdc-classic/qv2300/samples/07220016.jpg";
            URLs[2] = "http://drop.ndtv.com/albums/BUSINESS/geneva2013/laferrari-700.jpg";
            URLs[3] = "http://www.personal-view.com/talks/uploads/FileUpload/39/5efeafb5213ce3433d0b2fc7fe72cb.jpg";
*/
            //update grids
            grids[i].srcImage = URLs[i];
            grids[i].url = URLs[i];
            grids[0].title = deviceName;
            //set filename
            var fileName = "image";
            var index = i.toString();
            fileName = fileName + index;
 
            //download  file
            
            //download( URLs[i], "GrundigImages", fileName);
       /*
             var image = "file:///storage/emulated/0//GrundigImages/image";
             var index = grids[i].id.toString();
             image += index;
             image += ".jpg";
             grids[i].srcImage = image;*/
        }

    });
}

function getTimeStamp() {
    var d = new Date();
    var n = d.getTime();
    return n;
}

function clearContent(id) {
    alert("Clear");
    //  grids[0].srcImage = 'http://placehold.it/150x150';

    document.getElementById(id).innerHTML = "";
    alert("done");

}