function saveStory() {
    console.log("edited");
}

function showStory(data) {
    console.log('data', data);
}

function loadStory(cname) {
    console.log("loadStory", cname);

    var url = '/loadStory?cname' + cname;

    $.ajax({
      url: url,
      data: {},
      success: showStory,
    });

}
