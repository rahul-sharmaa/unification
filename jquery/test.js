function showhide(idx, mode) {
    var myButtonClasses = document.getElementById(idx).classList;
    if (myButtonClasses.contains("hide")) {
        myButtonClasses.remove("hide");
    }
    if (mode === "h")
        document.getElementById(idx).className += " hide ";
}

function selectionchange() {
    showhide('divhover', 's');
    hideSheet_Head();
    var seltxt = $("#Select1").select().val();
    switch (seltxt) {
        case "Oracle":
            showhide("div_orcl", "s");
            showhide("div_excel", "h");
            showhide("div_sql", "h");
            break;
        case "Excel":
            showhide("div_orcl", "h");
            showhide("div_excel", "s");
            showhide("div_sql", "h");
            break;
        case "SQL Server":
            showhide("div_orcl", "h");
            showhide("div_excel", "h");
            showhide("div_sql", "s");
            break;
        default:
            showhide("div_orcl", "h");
            showhide("div_excel", "h");
            showhide("div_sql", "h");
    }
    showhide('divhover', 'h');
}

function hideSheet_Head() {
    showhide("div_sheetlist", "h");
    showhide("div_Headlist", "h");
    showhide("div_reff", "h");
    $("#div_Headlist").empty();
    $("#sheetSelect1").empty();
    $("#div_Report").empty();
}

function savefile() {
    showhide('divhover', 's');
    hideSheet_Head();
    var files = $("#fle_Excel").get(0).files;
    var formData = new FormData();
    formData.append('file', files[0]);
    var choice = {};
    choice.url = "fileHandler.ashx";
    choice.type = "POST";
    choice.data = formData;
    choice.contentType = false;
    choice.processData = false;
    choice.success = function (result) {
        if (result == "filechk") {
            showhide('divhover', 'h');
            alert("Only .csv or .xls or .xlsx file are allowed");
        }
        else {
            fileDetail(result);
        }

    };
    choice.error = function (err) {
        showhide('divhover', 'h');
        alert(err.statusText);
    };
    $.ajax(choice);
    event.preventDefault();
}

function fileDetail(fileName) {
    $.ajax({
        type: "POST",
        url: "index.aspx/webfileDetail",
        data: '{fileName: "' + fileName + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d[0].key != "Error")
                if (response.d[0].key == "Sheet") {
                    fillSheet(response.d);
                    showhide('divhover', 'h');
                }
                else {
                    fillHead(response.d);
                    showhide('divhover', 'h');
                }
            else {
                alert(response.d[0].vale);
                showhide('divhover', 'h');
            }
        },
        failure: function (response) {
            alert(response.d[0].vale);
            showhide('divhover', 'h');
        }
    });
}

function fillSheet(ele) {
    var listtr = "";
    for (i = 0; i < ele.length; i++)
        if (ele[i].key == "Sheet")
            listtr = listtr + " <option id='" + i + "'>" + ele[i].vale + "</option>";
    $("#lblflName").text(ele[0].fileName);
    $("#sheetSelect1").empty();
    $("#sheetSelect1").append(listtr);
    showhide('divhover', 'h');
    showhide("div_sheetlist", "s");
}

function sheetChange(ele) {
    showhide('divhover', 's');
    var list = {
        vale: $("#" + ele).select().val()
        , fileName: $("#lblflName").text()
    };
    $.ajax({
        type: "POST",
        url: "index.aspx/webgetHead",
        data: '{ "list":' + JSON.stringify(list) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d[0].key != "Error") {
                fillHead(response.d);
                showhide('divhover', 'h');
            }
            else {
                alert(response.d[0].vale);
                showhide('divhover', 'h');
            }
        },
        failure: function (response) {
            alert(response.d[0].vale);
            showhide('divhover', 'h');
        }
    });
}

var numDtType = "byte, decimal , double, int16, int32, int64, sbyte, single, uint16, uint32, uint64, integer, long, currency, number";

function fillHead(ele) {
    var listtr = "";
    listtr = listtr + "  <div class='topic__list'><ul id=ulHeadList class='list'>  <li> <span></span><span> <input id='chkColAll' type='checkbox' onchange='chkChangeall();' value='All'></span>  <span>All</span></li>";//&nbsp;&nbsp;
    for (i = 0; i < ele.length; i++) {
        if (ele[i].key == "Head") {
            var dtType = ele[i].DType.split(".");
            if ((numDtType.includes(dtType[1])) == true || (numDtType.includes(dtType)) == true)
                listtr = listtr + " <li> <span><input type='radio' id='rdoAvg" + i + "' name='rdoHeadNum' value='" + ele[i].vale + "' onchange='rdoAvgchange(" + i + ");'> </span>  <span><input id='chkCol" + i + "' type='checkbox' onchange='chkChange(" + i + ");' value='" + ele[i].vale + "'></span>  <span>" + ele[i].vale + "</span></li>";
            else
                listtr = listtr + " <li> <span><input type='radio' id='rdoAvg" + i + "' name='rdoHeadDis' value='" + ele[i].vale + "' onchange='rdoDicchange(" + i + ");'> </span>  <span><input id='chkCol" + i + "' type='checkbox' onchange='chkChange(" + i + ");' value='" + ele[i].vale + "'></span>  <span>" + ele[i].vale + "</span></li>";
        }
    }
    $("#lblflName").text(ele[0].fileName);
    listtr = listtr + " </ul></div> <label class='create__btn-create btn btn--type-03' style='margin: 1% 0;' onclick='genReport(null);'>Report</label>";
    $("#div_Headlist").empty();
    $("#div_Headlist").append(listtr);
    showhide('divhover', 'h');
    showhide("div_Headlist", "s");
}

function rdoAvgchange(ele) {
    $("#chkCol" + ele).prop("checked", false);
    $("input[name='rdoHeadDis']").prop("checked", false);
}

function rdoDicchange(ele) {
    $("#chkCol" + ele).prop("checked", false);
    $("input[name='rdoHeadNum']").prop("checked", false);
    $("#chkColAll").prop("checked", false);
}

function chkChange(ele) {
    $("#rdoAvg" + ele).prop("checked", false);
    $("#chkColAll").prop("checked", false);
}

function chkChangeall() {
    var colName = $("#ulHeadList").find("input:checkbox").map(function () {
        return this.value;
    }).get().toString().split(',');
    for (i = 1; i < colName.length; i++) {
        var k = i - 1;
        $("#chkCol" + k).prop("checked", false);
    }
    $("input[name='rdoHeadDis']").prop("checked", false);
}

function genReport() {
    showhide('divhover', 's');
    var seltxt = $("#Select1").select().val();
    var selFlag = "";
    var selVal = "";
    if ($("input[name='rdoHeadDis']:checked").val() != null) {
        selFlag = "dic";
        selVal = $("input[name='rdoHeadDis']:checked").val();
    }
    else {
        selFlag = "avg";
        selVal = $("input[name='rdoHeadNum']:checked").val();
    }
    if (selVal != null)
        switch (seltxt) {
            case "Oracle":
                genorclReport(selVal, selFlag);
                break;
            case "Excel":
                genxlReport(selVal, selFlag);
                break;
            case "SQL Server":
                break;
            default:
                alert("Please select data source");
                break;
        }
    else {
        alert("Please select target columns");
        showhide('divhover', 'h');
    }
}

function genxlReport(selVal, selFlag) {
    showhide('divhover', 's');
    var sheet;
    var colName = $("#ulHeadList").find("input:checkbox:checked").map(function () {
        return this.value;
    }).get().toString();
    colName = colName.length > 0 ? colName : "";
    if ($('#sheetSelect1 option').length < 1)
        sheet = "";
    else
        sheet = $("#sheetSelect1").select().val();

    var list = {
        sheet: sheet
        , selCol: colName
        , selAvgCol: selVal
        , fileName: $("#lblflName").text()
        , selFlag: selFlag
    };
    $.ajax({
        type: "POST",
        url: "index.aspx/webgenReport",
        data: '{ "list":' + JSON.stringify(list) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != null && !(response.d.includes("Error"))) {
                readJson(response.d, selVal);//prntReoport(response.d);
            }
            else {
                alert(response.d);
                showhide('divhover', 'h');
            }
        },
        failure: function (response) {
            alert("Somthing went worng, Please try again.");
            showhide('divhover', 'h');
        }
    });
}

function prntReoport(ele, filename, trgVal) {
    var arr_from_json = JSON.parse(ele);
    var listHead = "";
    var listtr = "";
    listHead = listHead + "<table class='table' id='tblrpt'> <thead class='thead-light'><tr><th scope='col'>#</th>";
    var keys = Object.keys(arr_from_json);
    var subKeys = "";
    var k = 0, colcnt = 0;
    var valu = "";
    for (i in keys) {
        k++;
        subKeys = Object.keys(arr_from_json[i]);
        listtr = listtr + "<tr class='non' id='trrpt" + k + "'> <th scope='row'>" + k + "</th>";
        colcnt = 0;
        for (j in subKeys) {
            if (i == 0) {
                if (subKeys[j] == "SUPPORT" || subKeys[j] == "LIFT")
                    listHead = listHead + "<th scope='col' class='th_blue'>" + subKeys[j] + "</br><input id='txtcolsearch" + colcnt + "' class='form-control' type='text' value='' Placeholder='Search' onchange='txtcolSearch()'/></th>";
                else if (subKeys[j] == "CONDITIONAL_PROBABILITY" || subKeys[j] == trgVal || subKeys[j].includes("AVG_") || subKeys[j] == "CONFIDENCE")
                    listHead = listHead + "<th scope='col' class='th_green'>" + subKeys[j] + "</br><input id='txtcolsearch" + colcnt + "' class='form-control' type='text' value='' Placeholder='Search' onchange='txtcolSearch()'/></th>";
                else
                    listHead = listHead + "<th scope='col' class='th_red'>" + subKeys[j] + "</br><input id='txtcolsearch" + colcnt + "' class='form-control' type='text' value='' Placeholder='Search' onchange='txtcolSearch()'/></th>";

            }
            if (arr_from_json[i][subKeys[j]] == null)
                valu = "";
            else
                valu = arr_from_json[i][subKeys[j]];
            listtr = listtr + "<td>" + valu + "</td>";
            colcnt = colcnt + 1;
        }
        listtr = listtr + "</tr>";
    }
    listHead = listHead + "</tr></thead><tbody>";
    listHead = listHead + listtr + "</tbody> </table >";
    $("#div_Report").empty();
    $("#div_Report").append(listHead);
    $("#lblcolnum").text(colcnt);
    showhide('divhover', 'h');
    showhide("div_reff", "s");
    deleteFile(filename);
}

function cntOracle() {
    showhide('divhover', 's');
    if (
        $("#txt_Host").val().length > 0
        && $("#txt_Port").val().length > 0
        && $("#txt_Sid").val().length > 0
        && $("#txt_Table").val().length > 0
        && $("#txt_Userid").val().length > 0
        && $("#pwd_Pass").val().length > 0) {

        var list = {
            Host: $("#txt_Host").val()
            , Port: $("#txt_Port").val()
            , Sid: $("#txt_Sid").val()
            , Table: $("#txt_Table").val()
            , Userid: $("#txt_Userid").val()
            , Pass: $("#pwd_Pass").val()
        };
        $.ajax({
            type: "POST",
            url: "index.aspx/webcntOracle",
            data: '{ "list":' + JSON.stringify(list) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d[0].key != "Error")
                    fillHead(response.d);
                else {
                    alert(response.d[0].vale);
                    showhide('divhover', 'h');
                }
            },
            failure: function (response) {
                alert(response.d[0].vale);
                showhide('divhover', 'h');
            }
        });
    }
    else {
        alert("Please fill all fields. ");
        showhide('divhover', 'h');
    }
}

function genorclReport(selVal, selFlag) {
    var colName = $("#ulHeadList").find("input:checkbox:checked").map(function () {
        return this.value;
    }).get().toString();
    colName = colName.length > 0 ? colName : "";
    if (
        $("#txt_Host").val().length > 0
        && $("#txt_Port").val().length > 0
        && $("#txt_Sid").val().length > 0
        && $("#txt_Table").val().length > 0
        && $("#txt_Userid").val().length > 0
        && $("#pwd_Pass").val().length > 0) {

        var list = {
            Host: $("#txt_Host").val()
            , Port: $("#txt_Port").val()
            , Sid: $("#txt_Sid").val()
            , Table: $("#txt_Table").val()
            , Userid: $("#txt_Userid").val()
            , Pass: $("#pwd_Pass").val()
            , selAvgCol: selVal
            , selCol: colName
            , selFlag: selFlag
        };
        $.ajax({
            type: "POST",
            url: "index.aspx/webgenorclReport",
            data: '{ "list":' + JSON.stringify(list) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d != null && !(response.d.includes("Error"))) {
                    readJson(response.d, selVal);//prntReoport(response.d);
                }
                else {
                    alert(response.d);
                    showhide('divhover', 'h');
                }
            },
            failure: function (response) {
                alert("Somthing went worng, Please try again.");
                showhide('divhover', 'h');
            }
        });

    }
    else {
        alert("Please fill all fields. ");
        showhide('divhover', 'h');
    }
}

function readJson(ele, selVal) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ele, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        prntReoport(xmlhttp.responseText, ele, selVal);
    }
}

function deleteFile(ele) {
    var fileName = ele.split('/');
    $.ajax({
        type: "POST",
        url: "index.aspx/webdeleteFile",
        data: '{fileName: "' + fileName[1] + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //alert(response.d);
        },
        failure: function (response) {
            //alert(response);
        }
    });
}

function txtcolSearch() {
    var colcnt = $("#lblcolnum").text();
    var searchtxt = "";
    var table = document.getElementById("tblrpt");
    var tr = table.getElementsByTagName("tr"); var td, txtValue;
    for (x = 1; x < tr.length; x++) {
        var myButtonClasses = document.getElementById("trrpt" + x).classList;
        if (myButtonClasses.contains("hide")) {
            myButtonClasses.remove("hide");
        }
    }
    for (var i = 0; i < colcnt; i++) {
        searchtxt = $("#txtcolsearch" + i).val();
        if (searchtxt != null && searchtxt.trim().length > 0)
            for (j = 1; j < tr.length; j++) {
                var myButtonClasses = document.getElementById("trrpt" + j).classList;
                if (myButtonClasses.contains("hide")) {
                }
                else {
                    td = tr[j].getElementsByTagName("td")[i];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.indexOf(searchtxt) > -1) {

                        } else {
                            document.getElementById("trrpt" + j).className += " hide ";
                        }
                    }
                }
            }
    }
}



//{
//    var choice = {};
//    choice.url = "Handler2.ashx";
//    choice.type = "POST";
//    choice.data = fromdata;
//    choice.dataType = json;
//    choice.contentType = application/json; charset=utf-8;
//    choice.success = function (result) { alert(result); };
//    choice.error = function (err) { alert(err.statusText); };
//    $.ajax(choice);
//    event.preventDefault();}


