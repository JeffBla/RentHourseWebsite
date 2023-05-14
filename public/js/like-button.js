function likeBtnClick(likeIconId, rentInfoId){
    let likeIcon = document.getElementById(likeIconId);
    if(likeIcon.classList.contains('bi-heart-fill')){
        requestUnlike(likeIconId, rentInfoId);
    }else if(likeIcon.classList.contains('bi-heart')){
        requestLike(likeIconId, rentInfoId);
    }
    
}

function requestLike(likeIconId, rentInfoId){
    $.ajax({
        type: "POST",
        url: "/like/check",
        data: {rent_info_id : rentInfoId},
        success: function (data) {
            //console.log(data);
            if(data == true){
                let likeIcon = document.getElementById(likeIconId);
                likeIcon.classList.remove('bi-heart');
                likeIcon.classList.add('bi-heart-fill');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // Code to execute on error
          console.log("Error: ", errorThrown);
        },
    });
}

function requestUnlike(likeIconId, rentInfoId){
    $.ajax({
        type: "DELETE",
        url: "/like/uncheck",
        data: {rent_info_id : rentInfoId},
        success: function (data) {
            if(data == true){
                let likeIcon = document.getElementById(likeIconId);
                likeIcon.classList.remove('bi-heart-fill');
                likeIcon.classList.add('bi-heart');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // Code to execute on error
          console.log("Error: ", errorThrown);
        },
    });
}