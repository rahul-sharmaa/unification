<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Grand_Report.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/fonts/style.css" rel="stylesheet" />
    <link href="../css/fonts/font-awesome.min.css" rel="stylesheet" />
    <link href="../vendor/bootstrap/v3/bootstrap.min.css" rel="stylesheet" />
    <link href="../vendor/bootstrap/v4/bootstrap-grid.css" rel="stylesheet" />
    <link href="../css/style.css" rel="stylesheet" />
</head>
<body>

    <!-- HEADER -->
    <header>
        <div class="header js-header js-dropdown">
            <div class="container">
                <div class="header__user">
                    <div class="header__user-btn" id="divuser" data-dropdown-btn="user">
                    </div>

                    <nav class="dropdown dropdown--design-01" data-dropdown-list="user">
                        <div>
                            <div class="dropdown__icons">
                                <a href="dashboard.aspx" class="tooltips"><i class="fa fa-dashboard"></i><span class="tooltiptext">Dashboard</span></a>
                                <a href="login.aspx" class="tooltips"><i class="icon-Logout"></i><span class="tooltiptext">Logout</span></a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <form id="form1" runat="server">
                <div>

                    <div class="col-sm-12">
                        <div class="create__section">
                            <div class="row" style="padding: 2% 0;">
                                <div class="col-md-2">
                                    <label class="create__label" for="category">Select Source</label>
                                </div>
                                <div class="col-md-4">
                                    <select id="Select1" onchange="selectionchange()">
                                        <option>Select</option>
                                        <option>Oracle</option>
                                        <%--<option>SQL Server</option>--%>
                                        <option>Excel</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="div_orcl" class=" col-md-12 hide ">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="create__section">
                                    <label class="create__label" for="txt_Host">HOST *</label>
                                    <input id="txt_Host" class="form-control" type="text" value="localhost" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="create__section">
                                    <label class="create__label" for="txt_Port">PORT *</label>
                                    <input id="txt_Port" class="form-control" type="text" value="1521" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="create__section">
                                    <label class="create__label" for="txt_Sid">SID *</label>
                                    <input id="txt_Sid" class="form-control" type="text" value="orcl" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="create__section">
                                    <label class="create__label" for="txt_Table">Table *</label>
                                    <input id="txt_Table" class="form-control" type="text" value="DEMO_DATA" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="create__section">
                                    <label class="create__label" for="txt_Userid">User Id *</label>
                                    <input id="txt_Userid" class="form-control" type="text" value="sijo" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="create__section">
                                    <label class="create__label" for="pwd_Pass">Password *</label>
                                    <input id="pwd_Pass" class="form-control" type="password" value="pwd4sijo" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="create__footer">
                                <label class="create__btn-create btn btn--type-02" onclick="cntOracle(null);">Connect</label>
                            </div>
                        </div>
                    </div>

                    <div id="div_excel" class="col-md-12 hide">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="create__section">
                                    <label class="create__label" for="fle_Excel">Select File</label>
                                    <input id="fle_Excel" type="file" accept=".xlsx, .xls" />
                                    <label class="hide" for="fle_Excel" id="lblflName"></label>
                                    <label class="hide" for="fle_Excel" id="lblcolnum"></label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="create__footer">
                                    <label class="create__btn-create btn btn--type-02" onclick="savefile(null);">Upload</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="div_sql" class="col-md-12 hide">
                        <%-- <div class="row">
                    <div>
                        <label class="create__label" for="category">Data Sourc</label>
                        <input id="txt_Hosst" type="text" />
                    </div>
                    <div>
                        <label class="create__label" for="category">PORT</label>
                        <input id="txt_Port" type="text" />
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label class="create__label" for="category">SID</label>
                        <input id="txt_Sid" type="text" />
                    </div>
                    <div>
                        <label class="create__label" for="category">User Id</label>
                        <input id="txt_Userid" type="text" />
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label class="create__label" for="category">Password</label>
                        <input id="pwd_Pass" type="password" />
                    </div>
                </div>--%>
                    </div>

                    <div id="div_sheetlist" class="hide">
                        <div class="col-md-12">
                            <div class="create__section">
                                <div class="row" style="padding: 2% 0;">
                                    <div class="col-md-2">
                                        <label class="create__label" for="category">Select Sheet</label>
                                    </div>
                                    <div class="col-md-4">
                                        <select id="sheetSelect1" onchange="sheetChange('sheetSelect1')">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div id="div_Headlist" class="col-md-6 hide">
                        </div>
                        <div id="div_reff" class="col-md-6 hide">
                            <ul id="ulHeadList" class="list" style="float: right;text-align: left;">  
                                <li style="padding: 2% 0;"> <span><label class="th_blue" >&nbsp;&nbsp;&nbsp;&nbsp; </label></span><span>&nbsp;&nbsp;Further measures</span></li> 
                                <li style="padding: 2% 0;"> <span><label class="th_green" >&nbsp;&nbsp;&nbsp;&nbsp;</label></span><span>&nbsp;&nbsp;Target / principal measure</span></li> 
                                <li style="padding: 2% 0;"> <span><label class="th_red" >&nbsp;&nbsp;&nbsp;&nbsp;</label></span><span>&nbsp;&nbsp;Influencing factors</span></li> 
                            </ul>                            
                        </div>
                    </div>

                    <div id="div_Report" class="col-md-12">
                        <%--<asp:GridView ID="GridView1" runat="server"></asp:GridView>--%>
                    </div>
                </div>
            </form>
        </div>
    </main>
    <div class="col-lg-12 hover hide" id="divhover">
        <div class="hoverdiv" style="">
            <div class="loader"></div>
        </div>
    </div>
</body>
<script src="jquery/jquery-3.4.1.min.js"></script>
<script src="jquery/bootstrap.min.js"></script>
<script src="jquery/test.js"></script>
</html>
