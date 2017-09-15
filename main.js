var form  = document.getElementById('myForm');

form.addEventListener('submit',saveBookmark);

function saveBookmark(e){
    e.preventDefault();
    // console.log(1);
    var siteName  = document.getElementById('siteName').value;
    var siteURL  = document.getElementById('siteURL').value;
    if(!validationForm(siteName,siteURL)){
        return false;
    }

    //Validation
   

    var bookmark = {
        name: siteName,
        url: siteURL
    }
    //Test if bookmarks is null
    if(localStorage.getItem('bookmarks')===null){

        //Init Array of bookmarks
        var bookmarks = [];
        // Add to Array
        bookmarks.push(bookmark);
        //Set Item to Local Storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    else{
        //get item from Local Starage
       var bookmarks=JSON.parse(localStorage.getItem('bookmarks')) ;
       //Add bookmark to Array 
       bookmarks.push(bookmark)
        //Re-Set to Local Storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    //clear the Form 
 document.getElementById('myForm').reset();

    //Re-show the bookmarks
    showBookmarks();

    // document.getElementById('myForm').reset();
    // console.log(bookmark);
   /*  // Local Storage
    localStorage.setItem('test','Hello World'); 
    console.log('Get from local storage : '+ localStorage.getItem('test'));
    localStorage.removeItem('test'); 
    console.log('Get from local storage : '+ localStorage.getItem('test'));
 */

}
function deleteBookmark(url){
    // console.log(url);

    var bookmarks=JSON.parse(localStorage.getItem('bookmarks')) ;
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){
            //Remove from Array
            bookmarks.splice(i,1);
        }
    }
      //Re-Set to Local Storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   
    showBookmarks();
  
  }



    //Save bookmarks to Ouputresult and show in Body
function showBookmarks(){
    //Get bookmarks from Local Storage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks')) ;
    // console.log(bookmarks);

    //Get output result for bookmarks
    var bookmarksResult =document.getElementById('bookmarksResults');
    //Build Output Bookmarks
    bookmarksResult.innerHTML='';
    for(var i=0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

       bookmarksResult.innerHTML +=  '<div class="well">'+
                                        '<h3>'+name+
                                        '<a id="newBookmarkResult" class="btn btn-default "target = "_blank" href = "'+url+'" >Visit</a>  '+
                                        '<a id="newBookmarkResult" class="btn btn-danger " href = "#" onclick = deleteBookmark(\''+url+'\')>Delete</a>  '+
                                        '</h3>'+
                                        '</div>';
    }

  }
  function validationForm(siteName,siteURL){
    if(!siteName||!siteURL){
        alert('Please fill the form')
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
  }
 
  