function showhide(idx, mode) {
    var myButtonClasses = document.getElementById(idx).classList;
    if (myButtonClasses.contains("hidden")) {
        myButtonClasses.remove("hidden");
    }
    if (mode === "h")
        document.getElementById(idx).className += " hidden ";
}

function isNotnull(ele, eid) {
    if ($("#" + ele.id).val() == '') {
        $("#" + ele.id).focus();
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
    }
    else {
        showhide(eid, "h");
        $("#" + eid).text("");
    }
}

function isnumber(ele, len) {
    $("#" + ele.id).keypress(function (e) {
        if (e.which < 48 || e.which > 57) {
            return false;
        }
        else if ($("#" + ele.id).val().length > len) {
            return false;
        }
        else {
            remove0at0(ele.id);
            return true;
        }

    });
}

function createCookie(name, value) {
    document.cookie = name + "=" + value + "" + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }

    }
    return null;
}

function remove0at0(ele) {
    if ($('#' + ele).val().indexOf('0') == 0 && $('#' + ele).val().indexOf('.') !== 1)
        $('#' + ele).val($('#' + ele).val().substring(0, 0));
}

function issame(ele, compid, eid) {
    if ($("#" + ele.id).val() != $("#" + compid).val()) {
        $("#" + compid).focus();
        showhide(eid, "s");
    }
    else {
        showhide(eid, "h");
    }
}

function isEmail(ele, eid) {
    email = $("#" + ele.id).val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        $("#" + ele.id).focus();
        showhide(eid, "s");
        $("#" + eid).text("Please enter a valid email.");
    }
    else {
        showhide(eid, "h");
        $("#" + eid).text("");
    }
}

function isWeb(ele, eid) {
    var url = $("#" + ele.id).val();
    if (url.length > 0) {
        url_validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (!url_validate.test(url)) {
            $("#" + ele.id).focus();
            showhide(eid, "s");
            $("#" + eid).text("Please enter a valid Web url.");
        }
        else {
            showhide(eid, "h");
            $("#" + eid).text("");
        }
    }
    else {
        showhide(eid, "h");
        $("#" + eid).text("");
    }
}

function checkusername(ele, eid) {
    isNotnull(ele, eid);
    if ($("#" + ele.id).val() == '') {
        $("#" + ele.id).focus();
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
    }
    else {
        avlusername($("#" + ele.id).val(), eid);
    }
}

function avlusername(ele, eid) {
    showhide('divhover', 's');
    var list = {
        firstname: null
        , lastname: null
        , email: null
        , mobile: null
        , username: ele
        , password: null
    };
    $.ajax({
        type: "POST",
        url: "signup.aspx/webavlusername",
        contentType: "application/json; charset=utf-8",
        data: '{ "list":' + JSON.stringify(list) + '}',
        dataType: "json",
        success: function (response) {
            if (response.d == 0) {
                showhide(eid, "h");
                $("#" + eid).text("");
                $("#lblerrorusernameavl").text("0");
            }
            else {
                $("#" + ele.id).focus();
                showhide(eid, "s");
                $("#" + eid).text("is not available.");
                $("#lblerrorusernameavl").text("1");
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            location.reload();
        }
    });
    showhide('divhover', 'h');
}

function togglediv(ele) {
    showhide('divuserdetail', 'h');
    showhide('divcontact', 'h');
    showhide('divaddress', 'h');
    showhide(ele, 's');
    if (ele == 'divuserdetail')
        getuserdata();
    else if (ele == 'divcontact')
        getusercontact();
    else if (ele == 'divaddress')
        getuseraddress();
}

function loginclick() {
    if ($("#txtusername").val() == '') {
        eid = "lblerrorusername";
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
        alert("Please fill out all required fields.");
    }
    else if ($("#txtpassword").val() == '') {
        eid = "lblerrorpassword";
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
        alert("Please fill out all required fields.");
    }
    else {
        var code = $("#txtusername").val() + "," + $("#txtpassword").val();
        $.ajax({
            type: "POST",
            url: "login.aspx/webloginclick",
            data: '{code: "' + code + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == 1) {
                    window.location.replace("../index.aspx");
                }
                else {
                    alert("Username or Password is incorrect.");
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
            }
        });
    }
}

function getuser() {
    var code = '';
    $.ajax({
        type: "POST",
        url: "login.aspx/webgetuser",
        data: '{code: "' + code + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d == 'No Data') {
                window.location.replace("../login.aspx");
            }
            else {
                var firstchar = (response.d).charAt(0).toUpperCase();
                listtr = "<img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar'><label id='lbluserdisplayname'>" + response.d + "</label><i class='icon-Arrow_Below'></i>";
                $("#divuser").empty();
                $("#divuser").append(listtr);
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            window.location.replace("../login.aspx");
        }
    });
}

function savesignup() {
    showhide('divhover', 's');
    if ($("#txtfirstname").val() == "") {
        eid = "lblerrorfirstname";
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
        alert("Please fill out all required fields.");
    }
    else if ($("#txtEmail").val() == '') {
        eid = "lblerroremail";
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
        alert("Please fill out all required fields.");
    }
    else if ($("#txtmobile").val() == '') {
        eid = "lblerrormobile";
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
        alert("Please fill out all required fields.");
    }
    else if ($("#txtusername").val() == '') {
        eid = "lblerrorusername";
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
        alert("Please fill out all required fields.");
    }
    else if ($("#lblerrorusernameavl").text() == '1') {
        eid = "lblerrorusername";
        showhide(eid, "s");
        $("#" + eid).text("is not available.");
        alert("User name is not available.");
    }
    else if ($("#txtpassword").val() == '') {
        eid = "lblerrorpassword";
        showhide(eid, "s");
        $("#" + eid).text("Please fill out this field.");
        alert("Please fill out all required fields.");
    }
    else if ($("#txtpassword").val() != $("#txtconfirmpassword").val()) {
        eid = "lblerrorconfirmpassword";
        showhide(eid, "s");
        alert("Your password and confirmation password do not match.");
    }
    else if ($("#chcterms").prop("checked") != true) {
        eid = "lblerrorterms";
        showhide(eid, "s");
        $("#" + eid).text("Please agree to the terms and conditions.");
        alert("Please fill out all required fields.");
    }
    else {
        var list = {
            firstname: $("#txtfirstname").val()
            , lastname: $("#txtlastname").val()
            , email: $("#txtEmail").val()
            , mobile: $("#txtmobile").val()
            , username: $("#txtusername").val()
            , password: $("#txtpassword").val()
            , userid: $("#lbluser").text()
            , contactid: $("#lblcontact").text()
            , loginid: $("#lbllogin").text()
        };
        $.ajax({
            type: "POST",
            url: "signup.aspx/websavesignup",
            contentType: "application/json; charset=utf-8",
            data: '{ "list":' + JSON.stringify(list) + '}',
            dataType: "json",
            success: function (response) {
                if ((response.d).length > 0) {
                    var ret = response.d.split(",");
                    if (ret[1] < 1 || ret[2] < 1) {
                        $("#lbluser").text(ret[0]);
                        if (ret[2] > 0) {
                            $("#lblcontact").text(ret[2]);
                            alert("Somthing went worng with email/mobile, Please try again.");
                        }
                        if (ret[1] > 0) {
                            $("#lbllogin").text(ret[1]);
                            alert("Somthing went worng with username/password, Please try again.");
                        }
                    }
                    else {
                        alert("Account created successfully");
                        window.location.replace("../login.aspx");
                    }
                }
                else {
                    alert("Somthing went worng, Please try again.");
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
            }
        });
    }
    showhide('divhover', 'h');
}

function serchtag(ele) {
    var arr = ele.split(',');
    showhide(arr[1], 'h');
    var sertext = $("#" + arr[0]).val();
    if (sertext.length >= 1) {
        $.ajax({
            type: "POST",
            url: "index.aspx/webserchtag",
            data: '{code: "' + sertext + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if ((response.d).length > 0)
                    filltaglist(response.d, arr[1], arr[0], arr[2]);
                else {
                    $("#" + arr[1]).empty();
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
            }
        });
    }
    else
        getposts('0');
}

function filltaglist(ele, Searchul, txtid, searchtype) {
    var listtr = "";
    for (i = 0; i < ele.length; i++) {
        listtr = listtr + "<li id='" + ele[i].tag_type_id + "' onclick=getSearchtag('" + ele[i].tag_type_id + "_" + ele[i].tag_type + "_" + txtid + "_" + Searchul + "_" + searchtype + "')>" + ele[i].tag_type + "</li>";
    }
    $("#" + Searchul).empty();
    $("#" + Searchul).append(listtr);
    showhide(Searchul, 's');
}

function getSearchtag(ele) {
    var arr = ele.split('_');
    if (arr[4] == 2) {
        var listtr = "";
        listtr = $("#divsubtag").html();
        var dt = new Date();
        var tgcode = arr[0] + dt.getMinutes() + dt.getSeconds();
        listtr = listtr + "<label id='lbl" + tgcode + "' class='bg-ef429e'>" + arr[1] + "<i class='fa fa-times' aria-hidden='true' onclick=delsubtag('lbl" + tgcode + "')></i></label>";
        $("#divsubtag").empty();
        $("#divsubtag").append(listtr);
        showhide(arr[3], 'h');
        $("#" + arr[3]).empty();
    }
    else {
        $("#lblh" + arr[2]).text(arr[0]);
        $("#" + arr[2]).val(arr[1]);
        $("#" + arr[2]).focus();
        showhide(arr[3], 'h');
        $("#" + arr[3]).empty();
        if (arr[4] == 0) {
            getposts('0');
        }

    }
}

function delsubtag(ele) {
    $("label").remove("#" + ele);
}

function serchmaster(ele) {
    var arr = ele.split(',');
    var sertext = "";
    showhide(arr[1], 'h');
    $.ajax({
        type: "POST",
        url: "dashboard.aspx/webserchmaster",
        data: '{code: "' + sertext + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ((response.d).length > 0)
                fillmasterlist(response.d, arr[1], arr[0]);
            else {
                $("#" + arr[1]).empty();
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
        }
    });
}

function fillmasterlist(ele, Searchul, txtid) {
    var listtr = "";
    for (i = 0; i < ele.length; i++) {
        listtr = listtr + "<li id='" + ele[i].master_type_id + "' onclick=getSearchmaster('" + ele[i].master_type_id + "_" + ele[i].master_type + "_" + txtid + "_" + Searchul + "')>" + ele[i].master_type + "</li>";
    }
    $("#" + Searchul).empty();
    $("#" + Searchul).append(listtr);
    showhide(Searchul, 's');
}

function getSearchmaster(ele) {
    var arr = ele.split('_');
    $("#lblh" + arr[2]).text(arr[0]);
    $("#" + arr[2]).val(arr[1]);
    $("#" + arr[2]).focus();
    showhide(arr[3], 'h');
    $("#" + arr[3]).empty();
}

function serchpost(ele) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    //if ($("#txtsearchpost").val().length > 3)
    if (keycode == '13')
        getposts('0');
}

function getposts(ele) {
    showhide('divhover', 's');
    var code = $("#txtsearchpost").val() + "," + ele + "," + $("#txttag").val();
    $.ajax({
        type: "POST",
        url: "index.aspx/webgetpostlist",
        data: '{code: "' + code + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ((response.d).length > 0)
                fillpostlist(response.d);
            else {
                $("#posts__body").empty();
                alert("No post found");
                showhide('divhover', 'h');
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            showhide('divhover', 'h');
        }
    });
}

function fillpostlist(ele) {
    var listtr = "";
    var classch = "";
    for (i = 0; i < ele.length; i++) {
        if (i % 2 == 0) {
            listtr = listtr + "<div class='posts__item bg-f2f4f6'>";
        }
        else {
            listtr = listtr + "<div class='posts__item'>";
        }

        if (ele.length / 2 > i)
            classch = 'dropdown--reverse-y';


        listtr = listtr + "<div class='posts__section-left' onclick=getsingletopic('" + ele[i].post_id + "')>";
        listtr = listtr + "<div class='posts__topic'>";
        listtr = listtr + "<div class='posts__content'>";
        listtr = listtr + " <a href='#'> <h3>" + ele[i].title + "</h3> </a>";
        listtr = listtr + "<p>" + ele[i].body_content + "</p></div ></div >";
        listtr = listtr + "<div class='posts__category'> <a href='#' class='category'>" + ele[i].tag_type + "</a></div ></div > ";
        listtr = listtr + "<div class='posts__section-right'><div class='posts__users js-dropdown'>";
        var arr = ele[i].last_user_ids.split(',');
        var arr1 = ele[i].last_user_display_names.split(',');
        for (j = 0; j < arr.length; j++) {
            var firstchar = arr1[j].charAt(0).toUpperCase();
            listtr = listtr + "<div id='" + arr[j] + "' onclick=getpersonbyid('" + arr[j] + "_" + ele[i].tag_type_id + "_" + i + "_" + j + ",0')><label class='avatar hovlabel'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar' data-dropdown-btn='user-" + arr[j] + "_" + ele[i].tag_type_id + "_" + i + "_" + j + "'></label>";
            listtr = listtr + "<div class='posts__users-dropdown dropdown dropdown--user " + classch + "' id='posts__users-dropdown_" + arr[j] + "_" + ele[i].tag_type_id + "_" + i + "_" + j + "'  data-dropdown-list='user-" + arr[j] + "_" + ele[i].tag_type_id + "_" + i + "_" + j + "'></div></div>";
        }
        listtr = listtr + "</div>";
        listtr = listtr + "<div class='posts__replies'>" + ele[i].comment_count + "</div>";
        listtr = listtr + "<div class='posts__views'>" + ele[i].view_count + "</div>";
        listtr = listtr + "<div class='posts__activity'>" + ele[i].activity + "</div>";
        listtr = listtr + "</div ></div >";
    }
    $("#posts__body").empty();
    $('#posts__body').append(listtr);
    showhide('divhover', 'h');
}

function getpersonbyid(ele, foo) {

    var divid = "posts__users-dropdown_" + ele;
    $(".posts__body .posts__users-dropdown").removeClass("dropdown--open");
    $.ajax({
        type: "POST",
        url: "index.aspx/webtagvoteuser",
        data: '{code: "' + ele + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if ((response.d).length > 0) {
                fillpersonbyid(response.d, divid);
                if (foo != 0)
                    $("#" + divid).addClass("dropdown--open");
            }
            else {
                $("#" + divid).empty();
                alert("Somthing went worng, Please try again.");
                $(".posts__body .posts__users-dropdown").removeClass("dropdown--open");
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            $(".posts__body .posts__users-dropdown").removeClass("dropdown--open");
        }
    });
}

function fillpersonbyid(ele, divid) {
    var listtr = "";
    var firstchar = (ele[0].display_name).charAt(0).toUpperCase();
    listtr = listtr + "<div class='dropdown__user'><a href='#' class='dropdown__user-label bg-218380'>" + firstchar + "</a>";
    listtr = listtr + "<div class='dropdown__user-nav'></div>";
    listtr = listtr + "<div class='dropdown__user-info'><a href='#'>" + ele[0].display_name + "</div>";
    listtr = listtr + "<p style='text-align: center;'>Joined " + ele[0].created_date + "</p></div>";
    listtr = listtr + "<div class='dropdown__user-icons'>Points</div>";
    listtr = listtr + "<div class='dropdown__user-statistic' style='padding-bottom: 30px;'><div class='col-md-6'>Category &nbsp; </br> <span>" + ele[0].tag_bounty + "</span></div>";
    listtr = listtr + "<div lass='col-md-6'>Total &nbsp; </br> <span>" + ele[0].total_bounty + "</span></div></div></div>";
    $("#" + divid).empty();
    $("#" + divid).append(listtr);
}

function getperson() {
    var ele = "0_0";
    $.ajax({
        type: "POST",
        url: "index.aspx/webtagvoteuser",
        data: '{code: "' + ele + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if ((response.d).length > 0) {
                fillperson(response.d);
            }
            else {
                alert("Somthing went worng, Please try again.");
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
        }
    });
}

function fillperson(ele) {
    var listtr = "";
    var uid = 0;
    var uid1 = 0;
    for (i = 0; i < ele.length; i++) {

        if (i == ele.length - 1)
            uid1 = 0;
        else
            uid1 = ele[i + 1].userid;

        if (uid1 == ele[i].userid && uid == ele[i].userid) {
            listtr = listtr + "<div class='pricing-table '>";
            listtr = listtr + "<h2 class='pricing-table__header'>" + ele[i].display_name + "<p style='font-size: 12px'>Active from : " + ele[i].created_date + "</h2>";
            listtr = listtr + "<h3 class='pricing-table__price'>" + ele[i].total_bounty + "</h3>";
            listtr = listtr + "<ul class='pricing-table__list'>";
            if (ele[i].tag_name.length > 0)
                listtr = listtr + "<li><label style='float: left'>" + ele[i].tag_name + "</label><label style='float: right'>" + ele[i].tag_bounty + "</label> </li>";
            uid = ele[i].userid;
        }
        else if (uid == ele[i].userid) {
            listtr = listtr + "<li><label style='float: left'>" + ele[i].tag_name + "</label><label style='float: right'>" + ele[i].tag_bounty + "</label> </li>";
            uid = ele[i].userid;
        }
        else {
            if (uid != 0)
                listtr = listtr + "<li></li></ul></div >";
            listtr = listtr + "<div class='pricing-table '>";
            listtr = listtr + "<h2 class='pricing-table__header'>" + ele[i].display_name + "<p style='font-size: 12px'>Active from : " + ele[i].created_date + "</p></h2>";
            listtr = listtr + "<h3 class='pricing-table__price'>" + ele[i].total_bounty + "</h3>";
            listtr = listtr + "<ul class='pricing-table__list'>";
            if (ele[i].tag_name.length > 0)
                listtr = listtr + "<li><label style='float: left'>" + ele[i].tag_name + "</label><label style='float: right'>" + ele[i].tag_bounty + "</label> </li>";
            uid = ele[i].userid;
        }
    }
    listtr = listtr + "<li></li></ul></div >";
    $("#user_table").empty();
    $("#user_table").append(listtr);
}

function cancelnewpost() {
    location.reload();
}

function newpost(filename, pages) {
    cktext = CKEDITOR.instances['txtdescription'].getData();
    if (cktext.length > 0 && $("#lblhtxttagtopic").text().length > 0) {
        var listtr = "";
        $('#divsubtag .bg-ef429e').each(function (i, obj) {
            listtr = listtr + $(this).text() + ', ';
        });
        var list = {
            post_id: $("#lblpostid").text()
            , post_type_id: $("#lblposttype").text()
            , parent_post_id: $("#lblparentpostid").text()
            , title: $("#txttitle").val()
            , tag_type_id: $("#lblhtxttagtopic").text()
            , sub_tags: listtr
            , body_content: cktext
            , last_editor_display_name: $("#lbluserdisplayname").text()
            , file_name: filename
            , sub_parent_post: $("#lblsubparentpostid").text()
        };

        $.ajax({
            type: "POST",
            url: "create-topic.aspx/websavenewpost",
            contentType: "application/json; charset=utf-8",
            data: '{"list": ' + JSON.stringify(list) + '}',
            dataType: "json",
            success: function (response) {
                if (response.d > 0) {
                    alert("Post created successfully");
                    if (pages != null)
                        getsinglepost(pages);
                    else
                        window.location.replace("../index.aspx");
                }
                else {
                    alert("Somthing went worng, Please try again. 1");
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
            }
        });
    }
    else {
        alert("please fill all the fields");
    }
    showhide('divhover', 'h');
}

function fileuploder(pages) {
    var files = $("#fileInput").get(0).files;
    var formData = new FormData();
    formData.append('file', files[0]);
    $.ajax({
        type: 'post',
        url: 'Handler1.ashx',
        data: formData,
        success: function (status) {
            if (status != 'error') {
                if (status == "filechk") {
                    showhide('divhover', 'h');
                    alert("Only .csv or .zip file are allowed");
                }
                else {
                    showhide('divhover', 'h');
                    newpost(status, pages);
                }
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            showhide('divhover', 'h');
            alert("Whoops something went wrong!");
        }
    });
}

function savenewpost(pages) {
    var postids = null;
    showhide('divhover', 's');
    if (pages == '0') {
        postids = $("#lblparentpostid").text();
    }
    var fileName = $("#fileInput").val();
    if (fileName) {
        fileuploder(postids);
    }
    else {
        newpost(null, postids);
    }
}

function getsingletopic(ele) {
    createCookie("spcookie", ele);
    window.location.replace("../single-topic.aspx");
}

function getsinglepost(ele) {
    showhide('divhover', 's');
    showhide('divpostlst', 's');
    showhide('divpostcrt', 'h');
    $.ajax({
        type: "POST",
        url: "single-topic.aspx/webgetsinglepost",
        data: '{code: "' + ele + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ((response.d).length > 0) {
                fillsinglepost(response.d);
            }
            else {
                alert("Somthing went worng, Please try again.");
                window.location.replace("../index.aspx");
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
        }
    });
}

function fillsinglepost(ele) {
    var listtr = "";
    var edlisttr = "";
    var anslisttr = "";
    var cmtlisttr = "";
    var subtag = "";
    var expression = "";
    var ediscnt = 0;
    var anscnt = 0;
    var cmtcnt = 0;
    classch = 'dropdown--reverse-y';
    $("#divpostsubtag").empty();
    if (ele[0].sub_tags != null) {
        subtag = ele[0].sub_tags.split(',');
        for (j = 0; j < subtag.length; j++) {
            
            if ((subtag[j]).length > 1)
                listtr = listtr + "<label id='lbl15522171' class='bg-ef429e'>" + subtag[j] + "</label>";
        }
        $('#divpostsubtag').append(listtr);
    }
    $('#hposttitle').html(ele[0].title);
    $('#txttitle').val(ele[0].title);
    $("#lblparentpostid").text(ele[0].post_id);
    $('#aposttag').html(ele[0].tag_type);
    $("#lblhtxttagtopic").text(ele[0].tag_type_id);
    listtr = "";
    var firstchar = ele[0].displayname;
    firstchar = firstchar.charAt(0).toUpperCase();
    listtr = listtr + "<div class='topic__head'> <div class='topic__avatar posts__body'>";


    //<a href='#' class='avatar'>";
    //listtr = listtr + "<img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar'></a>
    listtr = listtr + "<div id='" + ele[0].user_id + "' onclick=getpersonbyid('" + ele[0].user_id + "_" + ele[0].tag_type_id + "_" + 0 + "_" + 0 + ",1')><label class='avatar hovlabel'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar' data-dropdown-btn='user-" + ele[0].user_id + "_" + ele[0].tag_type_id + "_" + 0 + "_" + 0 + "'></label>";
    listtr = listtr + "<div class='posts__users-dropdown dropdown dropdown--user " + classch + "' id='posts__users-dropdown_" + ele[0].user_id + "_" + ele[0].tag_type_id + "_" + 0 + "_" + 0 + "' data-dropdown-list='user-" + ele[0].user_id + "_" + ele[0].tag_type_id + "_" + 0 + "_" + 0 + "'></div></div>";

    //listtr = listtr + "<div id='1' onclick='getpersonbyid('1_69_0_0')'><label class='avatar hovlabel'><img src='css/fonts/icons/avatars/S.svg' alt='avatar' data-dropdown-btn='user-1_69_0_0' class='dropdown__btn--open'></label><div class='posts__users-dropdown dropdown dropdown--user dropdown--reverse-y dropdown--open' id='posts__users-dropdown_1_69_0_0' data-dropdown-list='user-1_69_0_0' style=''><div class='dropdown__user'><a href='#' class='dropdown__user-label bg-218380'>S</a><div class='dropdown__user-nav'></div><div class='dropdown__user-info'><a href='#'>sijo</a><p>Joined 24 Apr, 2019</p></div><div class='dropdown__user-icons'>Points</div><div class='dropdown__user-statistic'><div class='col-md-6'>Category <br> <span>1</span></div><div lass='col-md-6'>Total <br> <span>1</span></div></div></div></div></div>";

    listtr = listtr + " </div>";
    listtr = listtr + "<div class='topic__caption'><div class='topic__name'>";
    listtr = listtr + "<a href='#'>" + ele[0].displayname + "</a></div > ";
    listtr = listtr + "<div class='topic__date tooltips'><span class='tooltiptext'>Posted on</span><i class='icon-Watch_Later'></i>" + ele[0].created_date + "</div></div></div>";
    listtr = listtr + "<div class='topic__content'><div class='topic__text'><p>" + ele[0].body_content + "</p></div>";
    listtr = listtr + "<div class='topic__footer'><div class='topic__footer-likes'>";
    listtr = listtr + "<div class='tooltips'> <span class='tooltiptext'>Answers</span><label><i class='icon-Reply_Empty'></i></label > <span>" + ele[0].answer_count + "</span></div> ";
    listtr = listtr + "<div class='tooltips'> <span class='tooltiptext'>Comments</span><label><i class='icon-Pencil'></i></label > <span>" + ele[0].commentcount + "</span></div > ";
    listtr = listtr + "<div class='tooltips'> <span class='tooltiptext'>View</span><label><i class='icon-Emoticon'></i></label> <span>" + ele[0].view_count + "</span></div > ";
    listtr = listtr + "<div class='tooltips' onclick='addfavorite(" + ele[0].post_id + ");'> <span class='tooltiptext'>Likes</span><label ><i class='icon-Favorite_Topic'></i></label> <span>" + ele[0].favorite_count + "</span></div> ";
    listtr = listtr + "<div class='tooltips' onclick='addvote(" + ele[0].post_id + "," + ele[0].user_id + ",1);'> <span class='tooltiptext'>Up votes</span><label ><i class='icon-Upvote'></i></label> <span>" + ele[0].upvote + "</span></div> ";
    listtr = listtr + "<div class='tooltips' onclick='addvote(" + ele[0].post_id + "," + ele[0].user_id + ",2);'> <span class='tooltiptext'>Down Votes</span><label ><i class='icon-Downvote'></i></label> <span>" + ele[0].downvote + "</span></div> ";
    if (ele[0].file_name != null && ele[0].file_name.length > 0) {
        listtr = listtr + "<div class='tooltips'> <span class='tooltiptext'>Download</span> <a href='" + ele[0].file_name + "'><i class='icon-Share_Topic'></i></a > <span>Download</span></div > ";
    }
    listtr = listtr + "</div><div class='topic__footer-share'><label class='tooltips' onclick='newpostsingle(2);'><i class='icon-Pencil'></i><span class='tooltiptext'>Edit</span></label><label class='tooltips' onclick='newpostsingle(3);'><i class='icon-Reply_Fill'></i><span class='tooltiptext'>Answer</span></label></div></div ></div> ";

    for (i = 1; i < ele.length; i++) {
        expression = ele[i].post_type_id;
        firstchar = ele[i].displayname;
        firstchar = firstchar.charAt(0).toUpperCase();
        switch (expression) {
            case "2":
                edlisttr = edlisttr + "<div class='topic'><div class='topic__head'><div class='topic__avatar posts__body'>";
                //edlisttr = edlisttr + "<a href='#' class='avatar'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar'></a>
                edlisttr = edlisttr + "<div id='" + ele[i].user_id + "' onclick=getpersonbyid('" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + ",1')><label class='avatar hovlabel'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar' data-dropdown-btn='user-" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "'></label>";
                edlisttr = edlisttr + "<div class='posts__users-dropdown dropdown dropdown--user " + classch + "' id='posts__users-dropdown_" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "' data-dropdown-list='user-" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "'></div></div>";
                edlisttr = edlisttr + "</div > ";
                edlisttr = edlisttr + "<div class='topic__caption'><div class='topic__name'><a href='#'>" + ele[i].displayname + "</a></div>";
                edlisttr = edlisttr + "<div class='topic__date tooltips'><span class='tooltiptext'>Posted on</span><i class='icon-Watch_Later'></i>" + ele[i].created_date + "</div></div></div>";
                edlisttr = edlisttr + "<div class='topic__content'><div class='topic__text'><p>" + ele[i].body_content + "</p></div>";
                edlisttr = edlisttr + "<div class='topic__footer'><div class='topic__footer-likes'>";
                edlisttr = edlisttr + "<div class='tooltips' onclick='addfavorite(" + ele[i].post_id + ");'> <span class='tooltiptext'>Likes</span><label ><i class='icon-Favorite_Topic'></i></label> <span>" + ele[i].favorite_count + "</span></div > ";
                edlisttr = edlisttr + "<div class='tooltips' onclick='addvote(" + ele[i].post_id + "," + ele[i].user_id + ",1);'> <span class='tooltiptext'>Up votes</span><label ><i class='icon-Upvote'></i></label> <span>" + ele[i].upvote + "</span></div > ";
                edlisttr = edlisttr + "<div class='tooltips' onclick='addvote(" + ele[i].post_id + "," + ele[i].user_id + ",2);'> <span class='tooltiptext'>Down Votes</span><label ><i class='icon-Downvote'></i></label> <span>" + ele[i].downvote + "</span></div>";
                if (ele[i].file_name != null && ele[i].file_name.length > 0)
                    edlisttr = edlisttr + "<div class='tooltips'> <span class='tooltiptext'>Download</span> <a href='" + ele[i].file_name + "'><i class='icon-Share_Topic'></i></a > <span>Download</span></div></div> </div></div ></div>";
                else
                    edlisttr = edlisttr + "</div> </div></div ></div>";
                ediscnt = ediscnt + 1;
                break;

            case "3":
                anslisttr = anslisttr + "<div class='topic'><div class='topic__head'><div class='topic__avatar posts__body'>";
                //anslisttr = anslisttr + "<a href='#' class='avatar'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar'></a>
                anslisttr = anslisttr + "<div id='" + ele[i].user_id + "' onclick=getpersonbyid('" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + ",1')><label class='avatar hovlabel'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar' data-dropdown-btn='user-" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "'></label>";
                anslisttr = anslisttr + "<div class='posts__users-dropdown dropdown dropdown--user " + classch + "' id='posts__users-dropdown_" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "' data-dropdown-list='user-" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "'></div></div>";
                anslisttr = anslisttr + "</div > ";
                anslisttr = anslisttr + "<div class='topic__caption'><div class='topic__name'><a href='#'>" + ele[i].displayname + "</a></div>";
                anslisttr = anslisttr + "<div class='topic__date tooltips'><span class='tooltiptext'>Posted on</span><i class='icon-Watch_Later'></i>" + ele[i].created_date + "</div></div></div>";
                anslisttr = anslisttr + "<div class='topic__content'><div class='topic__text'><p>" + ele[i].body_content + "</p></div>";
                anslisttr = anslisttr + "<div class='topic__footer'><div class='topic__footer-likes'>";
                anslisttr = anslisttr + "<div class='tooltips' onclick='addfavorite(" + ele[i].post_id + ");'> <span class='tooltiptext'>Likes</span><label ><i class='icon-Favorite_Topic'></i></label> <span>" + ele[i].favorite_count + "</span></div> ";
                anslisttr = anslisttr + "<div class='tooltips' onclick='addvote(" + ele[i].post_id + "," + ele[i].user_id + ",1);'> <span class='tooltiptext'>Up votes</span><label ><i class='icon-Upvote'></i></label> <span>" + ele[i].upvote + "</span></div> ";
                anslisttr = anslisttr + "<div class='tooltips' onclick='addvote(" + ele[i].post_id + "," + ele[i].user_id + ",2);'> <span class='tooltiptext'>Down Votes</span><label ><i class='icon-Downvote'></i></label> <span>" + ele[i].downvote + "</span></div > ";
                if (ele[i].file_name != null && ele[i].file_name.length > 0)
                    anslisttr = anslisttr + "<div class='tooltips'> <span class='tooltiptext'>Download</span> <a href='" + ele[i].file_name + "'><i class='icon-Share_Topic'></i></a > <span>Download</span></div></div > </div></div ></div >";
                else
                    anslisttr = anslisttr + "</div > </div></div ></div > ";
                anscnt = anscnt + 1;
                break;

            case "4":
                cmtlisttr = cmtlisttr + "<div class='topic'><div class='topic__head'><div class='topic__avatar posts__body'>";
                //cmtlisttr = cmtlisttr + "<a href='#' class='avatar'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar'></a></div>";
                cmtlisttr = cmtlisttr + "<div id='" + ele[i].user_id + "' onclick=getpersonbyid('" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + ",1')><label class='avatar hovlabel'><img src='css/fonts/icons/avatars/" + firstchar + ".svg' alt='avatar' data-dropdown-btn='user-" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "'></label>";
                cmtlisttr = cmtlisttr + "<div class='posts__users-dropdown dropdown dropdown--user " + classch + "' id='posts__users-dropdown_" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "' data-dropdown-list='user-" + ele[i].user_id + "_" + ele[0].tag_type_id + "_" + i + "_" + 0 + "'></div></div>";
                cmtlisttr = cmtlisttr + "</div > ";
                cmtlisttr = cmtlisttr + "<div class='topic__caption'><div class='topic__name'><a href='#'>" + ele[i].displayname + "</a></div>";
                cmtlisttr = cmtlisttr + "<div class='topic__date tooltips'><span class='tooltiptext'>Posted on</span><i class='icon-Watch_Later'></i>" + ele[i].created_date + "</div></div></div>";
                cmtlisttr = cmtlisttr + "<div class='topic__content'><div class='topic__text'><p>" + ele[i].body_content + "</p></div>";
                cmtlisttr = cmtlisttr + "<div class='topic__footer'><div class='topic__footer-likes'>";
                cmtlisttr = cmtlisttr + "<div class='tooltips' onclick='addfavorite(" + ele[i].post_id + ");'> <span class='tooltiptext'>Likes</span><label ><i class='icon-Favorite_Topic'></i></label> <span>" + ele[i].favorite_count + "</span></div > ";
                cmtlisttr = cmtlisttr + "<div class='tooltips' onclick='addvote(" + ele[i].post_id + "," + ele[i].user_id + ",1);'> <span class='tooltiptext'>Up votes</span><label ><i class='icon-Upvote'></i></label> <span>" + ele[i].upvote + "</span></div > ";
                cmtlisttr = cmtlisttr + "<div class='tooltips' onclick='addvote(" + ele[i].post_id + "," + ele[i].user_id + ",2);'> <span class='tooltiptext'>Down Votes</span><label ><i class='icon-Downvote'></i></label> <span>" + ele[i].downvote + "</span></div >";
                if (ele[i].file_name != null && ele[i].file_name.length > 0)
                    cmtlisttr = cmtlisttr + "<div class='tooltips'> <span class='tooltiptext'>Download</span> <a href='" + ele[i].file_name + "'><i class='icon-Share_Topic'></i></a > <span>Download</span></div></div> </div></div ></div>";
                else
                    cmtlisttr = cmtlisttr + "</div> </div></div ></div>";
                cmtcnt = cmtcnt + 1;
                break;

        }
    }

    $("#divposts").empty();
    $('#divposts').append(listtr);
    $("#lblcntedits").text(ediscnt > 0 ? (ediscnt > 1 ? (ediscnt + " Edits") : (ediscnt + " Edit")) : "");
    $("#diveidtposts").empty();
    $('#diveidtposts').append(edlisttr);
    $("#lblcntans").text(anscnt > 0 ? (anscnt > 1 ? (anscnt + " Answers") : (anscnt + " Answer")) : "");
    $("#divansposts").empty();
    $('#divansposts').append(anslisttr);
    $("#lblcntcmt").text(cmtcnt > 0 ? (cmtcnt > 1 ? (cmtcnt + " Comments") : (cmtcnt + " Comment")) : "");
    $("#divcomtposts").empty();
    $('#divcomtposts').append(cmtlisttr);
    showhide('divhover', 'h');
}

function newpostsingle(ele) {
    showhide('divpostlst', 'h');
    showhide('divpostcrt', 's');
    $("#lblposttype").text(ele);
}

function addfavorite(ele) {
    showhide('divhover', 's');
    $.ajax({
        type: "POST",
        url: "single-topic.aspx/webaddfavorite",
        contentType: "application/json; charset=utf-8",
        data: '{code: "' + ele + '" }',
        dataType: "json",
        success: function (response) {
            if (response.d == -1) {
                getsinglepost($("#lblparentpostid").text());
            }
            else {
                alert("Somthing went worng, Please try again.");
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
        }
    });
    showhide('divhover', 'h');
}

function addvote(ele, user, typ) {
    showhide('divhover', 's');
    var list = {
        post_id: ele
        , voted_to: user
        , parent_post_id: $("#lblparentpostid").text()
        , vote_type_id: typ
        , tag_type_id: $("#lblhtxttagtopic").text()
    };
    $.ajax({
        type: "POST",
        url: "single-topic.aspx/webaddvote",
        contentType: "application/json; charset=utf-8",
        data: '{ "list":' + JSON.stringify(list) + '}',
        dataType: "json",
        success: function (response) {
            if (response.d == 2) {
                getsinglepost($("#lblparentpostid").text());
            }
            else {
                alert("You can't vote for yourself");
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
        }
    });
    showhide('divhover', 'h');
}

function getuserdata() {
    showhide('divhover', 's');

    $("#lbluid").text("0");
    $("#txtusercode").val("");
    $("#txtusertype").val("");
    $("#lblusertype").text("2");
    $("#txtcreatedon").val("");
    $("#txtname1").val("");
    $("#txtname2").val("");
    $("#txtdisplayname").val("");
    $("#txtusername").val("");
    $("#txtpassword").val("");
    $("#txtage").val("");
    $("#txtwebsite").val("");
    $("#txtlastuse").val("");
    $("#txtdescription").val("");
    $("#txtttlpoints").val("");

    var sertext = "";
    $.ajax({
        type: "POST",
        url: "dashboard.aspx/webgetuserdata",
        data: '{code: "' + sertext + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ((response.d).length > 0) {
                filluserdata(response.d);
            }
            else {
                alert("Somthing went worng, Please try again.");
                window.location.replace("../login.aspx");
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            window.location.replace("../login.aspx");
        }
    });
}

function filluserdata(ele) {
    $("#lbluid").text(ele[0].user_id);
    $("#txtusercode").val(ele[0].user_code);
    $("#txtusertype").val(ele[0].user_type);
    $("#lblusertype").text(ele[0].type_id);
    $("#txtcreatedon").val(ele[0].created_date);
    $("#txtname1").val(ele[0].name1);
    $("#txtname2").val(ele[0].name2);
    $("#txtdisplayname").val(ele[0].display_name);
    $("#txtusername").val(ele[0].username);
    $("#txtpassword").val(ele[0].login_password);
    $("#txtage").val(ele[0].age);
    $("#txtwebsite").val(ele[0].website_url);
    $("#txtlastuse").val(ele[0].lastaccessdate);
    $("#txtdescription").val(ele[0].description);
    $("#txtttlpoints").val(ele[0].total_bounty);
    showhide('divhover', 'h');
}

function saveuserdetail() {
    if ($("#txtname1").val().length > 0 && $("#txtusername").val().length > 0 && $("#txtpassword").val().length > 0) {
        cktext = CKEDITOR.instances['txtdescription'].getData();
        var list = {
            user_id: $("#lbluid").text()
            , user_code: $("#txtusercode").val()
            , name1: $("#txtname1").val()
            , name2: $("#txtname2").val()
            , user_type: $("#lblusertype").text()
            , description: cktext
            , age: $("#txtage").val()
            , display_name: $("#txtdisplayname").val()
            , website_url: $("#txtwebsite").val()
            , reputation: $("#txtusername").val()
            , viewers: $("#txtpassword").val()

        };
        $.ajax({
            type: "POST",
            url: "dashboard.aspx/websaveuserdetail",
            contentType: "application/json; charset=utf-8",
            data: '{ "list":' + JSON.stringify(list) + '}',
            dataType: "json",
            success: function (response) {
                if (response.d > 0) {
                    alert("User details updated successfully");
                    getuserdata();
                }
                else {
                    alert("Somthing went worng, Please try again.");
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
            }
        });
    }
    else {
        alert("please fill all the fields");
    }
    showhide('divhover', 'h');
}

function getusercontact() {
    showhide('divhover', 's');
    $("#txtmastertypecont").val("");
    $("#lblhtxtmastertypecont").text("0");
    $("#txtEmail").val("");
    $("#txtphone").val("");
    $("#txtmobile1").val("");
    $("#txtmobile2").val("");
    $("#lblhcontid").text("0");
    var sertext = "";
    $.ajax({
        type: "POST",
        url: "dashboard.aspx/webgetusercontact",
        data: '{code: "' + sertext + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //if ((response.d).length > 0) {
            fillusercontact(response.d);
            //}
            //else {
            //    alert("Somthing went worng, Please try again.");
            //}
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            window.location.replace("../login.aspx");
        }
    });
}

function fillusercontact(ele) {
    var listtr = "";
    if (ele.length > 0)
        for (i = 0; i < ele.length; i++) {
            listtr = listtr + "<tr id='tr" + i + "'><td>" + i + 1 + "<label class='hidden' id='lblcontid" + i + "'>" + ele[i].contact_id + "</label></td>";
            listtr = listtr + "<td id='tdemail" + i + "'>" + ele[i].email + "</td>";
            listtr = listtr + "<td id='tdphone" + i + "'>" + ele[i].phone + "</td>";
            listtr = listtr + "<td id='tdmobile1" + i + "'>" + ele[i].mobile1 + "</td>";
            listtr = listtr + "<td id='tdmobile2" + i + "'>" + ele[i].mobile2 + "</td>";
            listtr = listtr + "<td id='tdtype" + i + "'>" + ele[i].master_type + "</td><td class='hidden' id='lbltypid" + i + "'>" + ele[i].master_id + "</td>";
            listtr = listtr + "<td><label class='create__btn - cansel btn' onclick='fillcontactdetail(" + i + ");'>Edit</label></td></tr>";
        }
    $("#tblcontact").find("tr:gt(0)").remove();
    $('#tblcontact').append(listtr);
    showhide('divhover', 'h');
}

function fillcontactdetail(ele) {
    $("#lblhcontid").text($("#lblcontid" + ele).text());
    $("#txtmastertypecont").val($("#tdtype" + ele).text());
    $("#lblhtxtmastertypecont").text($("#lbltypid" + ele).text());
    $("#txtEmail").val($("#tdemail" + ele).text());
    $("#txtphone").val($("#tdphone" + ele).text());
    $("#txtmobile1").val($("#tdmobile1" + ele).text());
    $("#txtmobile2").val($("#tdmobile2" + ele).text());
}

function savecontactdetail() {
    if ($("#txtEmail").val().length > 0 && $("#txtmobile1").val().length > 0) {
        var list = {
            user_id: $("#lbluid").text()
            , contact_id: $("#lblhcontid").text()
            , master_type: $("#lblhtxtmastertypecont").text()
            , email: $("#txtEmail").val()
            , phone: $("#txtphone").val()
            , mobile1: $("#txtmobile1").val()
            , mobile2: $("#txtmobile2").val()
        };
        $.ajax({
            type: "POST",
            url: "dashboard.aspx/websavecontactdetail",
            contentType: "application/json; charset=utf-8",
            data: '{ "list":' + JSON.stringify(list) + '}',
            dataType: "json",
            success: function (response) {
                if (response.d > 0) {
                    alert("Contact updated successfully");
                    getusercontact();
                }
                else {
                    alert("Somthing went worng, Please try again.");
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
            }
        });
    }
    else {
        alert("please fill all the fields");
    }
    showhide('divhover', 'h');
}

function getuseraddress() {
    showhide('divhover', 's');
    $("#lblhadsid").text("0")
    $("#txtmastertypeadrs").val("0");
    $("#lblhtxtmastertypeadrs").text("");
    $("#txtaffiliation").val("");
    $("#txtline1").val("");
    $("#txtline2").val("");
    $("#txtdistrict").val("");
    $("#txtstate").val("");
    $("#txtcountry").val("");
    $("#txtpostcode").val("");
    var sertext = "";
    $.ajax({
        type: "POST",
        url: "dashboard.aspx/webgetuseraddress",
        data: '{code: "' + sertext + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //if ((response.d).length > 0) {
            filluseraddress(response.d);
            //}
            //else {
            //    alert("Somthing went worng, Please try again.");
            //}
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            window.location.replace("../login.aspx");
        }
    });
}

function filluseraddress(ele) {
    var listtr = "";
    if (ele.length > 0)
        for (i = 0; i < ele.length; i++) {
            listtr = listtr + "<tr id='tr" + i + "'><td>" + i + 1 + "</td><td class='hidden' id='lbladsid" + i + "'>" + ele[i].address_id + "</td>";
            listtr = listtr + "<td id='tdline1" + i + "'>" + ele[i].line1 + "</td><td class='hidden' id='lblline2" + i + "'>" + ele[i].line2 + "</td>";
            listtr = listtr + "<td id='tddistrict" + i + "'>" + ele[i].district + "</td>";
            listtr = listtr + "<td id='tdstates" + i + "'>" + ele[i].states + "</td><td class='hidden' id='lblcountry" + i + "'>" + ele[i].country + "</td>";
            listtr = listtr + "<td id='tdpostcode" + i + "'>" + ele[i].post_code + "</td><td class='hidden' id='lblaffiliation" + i + "'>" + ele[i].affiliation + "</td>";
            listtr = listtr + "<td id='tdtypea" + i + "'>" + ele[i].master_type + "</td><td class='hidden' id='lbltypida" + i + "'>" + ele[i].master_id + "</td>";
            listtr = listtr + "<td><label class='create__btn - cansel btn' onclick='filladdressdetail(" + i + ");'>Edit</label></td></tr>";
        }
    $("#tbladdress").find("tr:gt(0)").remove();
    $('#tbladdress').append(listtr);
    showhide('divhover', 'h');
}

function filladdressdetail(ele) {
    $("#lblhadsid").text($("#lbladsid" + ele).text());
    $("#txtmastertypeadrs").val($("#tdtypea" + ele).text());
    $("#lblhtxtmastertypeadrs").text($("#lbltypida" + ele).text());
    $("#txtaffiliation").val($("#lblaffiliation" + ele).text());
    $("#txtline1").val($("#tdline1" + ele).text());
    $("#txtline2").val($("#lblline2" + ele).text());
    $("#txtdistrict").val($("#tddistrict" + ele).text());
    $("#txtstate").val($("#tdstates" + ele).text());
    $("#txtcountry").val($("#lblcountry" + ele).text());
    $("#txtpostcode").val($("#tdpostcode" + ele).text());
}

function saveaddressdetail() {
    if ($("#lblhtxtmastertypeadrs").text().length > 0 && $("#txtline1").val().length > 0) {
        var list = {
            user_id: $("#lbluid").text()
            , address_id: $("#lblhadsid").text()
            , master_type: $("#lblhtxtmastertypeadrs").text()
            , line1: $("#txtline1").val()
            , line2: $("#txtline2").val()
            , district: $("#txtdistrict").val()
            , states: $("#txtstate").val()
            , country: $("#txtcountry").val()
            , post_code: $("#txtpostcode").val()
            , affiliation: $("#txtaffiliation").val()
        };
        $.ajax({
            type: "POST",
            url: "dashboard.aspx/websaveaddressdetail",
            contentType: "application/json; charset=utf-8",
            data: '{ "list":' + JSON.stringify(list) + '}',
            dataType: "json",
            success: function (response) {
                if (response.d > 0) {
                    alert("Contact updated successfully");
                    getuseraddress();
                }
                else {
                    alert("Somthing went worng, Please try again.1");
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
            }
        });
    }
    else {
        alert("please fill all the fields");
    }
    showhide('divhover', 'h');
}

function test() {

    var SECWidget = SEC.widget("sourcecode_widget");
    var iFrameDOM = $("iframe#sourcecode_widget").contents();
    iFrameDOM.find(".ace_text-layer").css("display", "none");
    //$("#sourcecode_widget").contents().find("#widget_form_editor").css("background-color", "#BADA55");
    alert($("#sourcecode_widget").contents().find("#widget_form_editor").html());
    $("#sourcecode_widget").contents().find("#footer").css("display", "none");

    //SECWidget.config({
    //    code: {
    //        compiler: 28,
    //        source: "#!/bin/bash\n\necho test",
    //        input: "",
    //    }
    //});
}