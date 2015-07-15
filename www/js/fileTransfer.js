//First step check parameters mismatch and checking network connection if available call    download function
function DownloadFile() {
    //Parameters mismatch check
    var URL = "http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/koala_thumb.jpg";
    var Folder_Name = "GrundigImages";
    var File_Name = "image2";

    if (URL == null && Folder_Name == null && File_Name == null) {

        return;
    } else {
        //checking Internet connection availablity
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE) {

            return;
        } else {

            download(URL, Folder_Name, File_Name);
            //If available download function call
        }
    }
}

//Second step to get Write permission and Folder Creation

function download(URL, Folder_Name, File_Name) {
    
    /*
    var URL = "http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/koala_thumb.jpg";
    var Folder_Name = "GrundigImage";
    var File_Name = "kola";*/

    //step to request a file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

    function fileSystemSuccess(fileSystem) {
        var download_link = encodeURI(URL);
        ext = download_link.substr(download_link.lastIndexOf('.') + 1);
        //Get extension of URL

        var directoryEntry = fileSystem.root;
        // to get root path of directory
        directoryEntry.getDirectory(Folder_Name, {
            create : true,
            exclusive : false
        }, onDirectorySuccess, onDirectoryFail);
        // creating folder in sdcard
        var rootdir = fileSystem.root;
        var fp = rootdir.toURL();
        // Returns Fulpath of local directory

        fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext;
        // fullpath and name of the file which we want to give
        // download function call

        console.log(fp);
        filetransfer(download_link, fp);
    }

    function onDirectorySuccess(parent) {
        // Directory created successfuly
    }

    function onDirectoryFail(error) {
        //Error while creating directory
        alert("Unable to create new directory: " + error.code);
    }

    function fileSystemFail(evt) {
        //Unable to access file system
        alert(evt.target.error.code);
    }

};

//Third step for download a file into created folder

function filetransfer(download_link, fp) {
    var fileTransfer = new FileTransfer();
    // File download function with URL and local path
    fileTransfer.download(download_link, fp, function(entry) {
        alert("download complete: " + entry.fullPath);

    }, function(error) {
        //Download abort errors or download failed errors
        alert("download error source " + error.source);
        alert("download error target " + error.target);
        alert("upload error code" + error.code);
    });
};