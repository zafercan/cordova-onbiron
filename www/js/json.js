function JSONProcess() {
    $.getJSON("https://dl.dropboxusercontent.com/u/1403240/staj/metadata.json", function(data) {
        deviceName = data.deviceName;
        var raspiCamCount = data.raspiCamCount;

        for (var i = 0; i < raspiCamCount; i++) {
            URLs[i] = data.cams[i].url;
            
            URLs[0] = "http://www.personal-view.com/talks/uploads/FileUpload/39/5efeafb5213ce3433d0b2fc7fe72cb.jpg";
            URLs[1] = "http://www.personal-view.com/talks/uploads/FileUpload/39/5efeafb5213ce3433d0b2fc7fe72cb.jpg";
            URLs[2] = "http://1.bp.blogspot.com/-pPAGNyln86Y/Uindkpv87kI/AAAAAAAAI4I/pbUilrlqoOg/s1600/Tulips2.jpg";
            URLs[3] = "http://www.steves-digicams.com/sdc-classic/qv2300/samples/07220016.jpg";
            grids[i].srcImage = URLs[i];
            grids[0].title = deviceName;
            var fileName = "image";
            var index = i.toString();
            fileName = fileName + index;
            download(URLs[i], "GrundigImages", fileName);
        }

    });
}

function getTimeStamp() {
    return Date.now;
}

var URLs = [];
var grids;
var deviceName;
grids = [{
    id : 0,
    srcImage : 'http://placehold.it/150x150',
    srcRaf : 'img/raf4_1.png',
    title : 'Images',
}, {
    id : 1,
    srcImage : 'http://placehold.it/150x150',
    srcRaf : 'img/raf4_2.png',
}, {
    id : 2,
    srcImage : 'http://placehold.it/150x150',
    srcRaf : 'img/raf4_3.png',
}, {
    id : 3,
    srcImage : 'http://placehold.it/150x150',
    srcRaf : 'img/raf4_4.png',
}];
$(document).ready(function() {
    JSONProcess();

});

function clearContent(id) {
    alert("Clear");
    //  grids[0].srcImage = 'http://placehold.it/150x150';

    document.getElementById(id).innerHTML = "";
    alert("done");

}