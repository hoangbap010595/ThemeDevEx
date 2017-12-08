
var AjaxConfig = {
    timeout: 60 * 60000
}
var UC = [];
var DevExConfig = {
    formatDate: {
        date: "dd-MM-yyyy"
        , time: "HH:mm:ss"
        , datetime: "dd-MM-yyyy HH:mm:ss"
    }
    , formatNumber: {
        int: "N0"
        , double: "N2"
        , float: "N2"
    }
}
$(function () {
});

/*******Create Control********/
function createDevExAutoComplete(allData) {
    var ctrID = "#" + allData.ctrID;
    var autoComplete = $(ctrID).dxAutocomplete({
        dataSource: allData.dataSource,
        placeholder: allData.placeholder,
        valueExpr: allData.valueExpr, //field
        searchExpr: allData.searchExpr //["field 1", "field 2"]
        , showClearButton: true
        , width: allData.width || "auto"
    });
    UC[allData.ctrID] = cbb;
}
function createDevExButton(allData) {
    var ctrID = "#" + allData.ctrID;
    $(ctrID).dxButton({
        text: allData.text // text
        , type: allData.type || "" // "danger" | "normal" | "back" | "danger" | "success"
        , onClick: allData.onClick // function
        , useSubmitBehavior: allData.submit || false
        , width: allData.width || "auto"
    });
}
function createDevExCheckBox(allData) {
    var ctrID = "#" + allData.ctrID;
    $(ctrID).dxCheckBox({
        text: allData.text // text
        , value: allData.value || false
        , disabled: allData.disabled
        , onValueChanged: allData.onValueChanged // function
    });
}
function createDevExDateBox(allData) {
    var ctrID = "#" + allData.ctrID;
    var dateBox = $(ctrID).dxDateBox({
        value: allData.value || new Date(),
        type: allData.type || "date" // "time" , "datetime"
         , max: allData.max
         , min: allData.min
        , formats: DevExConfig.formatDate.date
    });
    UC[allData.ctrID] = dateBox;
}
function createDevExFileUpload(allData) {
    var ctrID = "#" + allData.ctrID;
    $(ctrID).dxFileUploader({
        multiple: allData.multiple || false
        , accept: allData.accept
        , name: allData.name || ""
    });
    //var files = $(allData.ctrID).dxFileUploader("option", "value");
}
function createDevExNumberBox(allData) {
    var ctrID = "#" + allData.ctrID;
    var number = $(ctrID).dxNumberBox({
        value: allData.value,
        min: allData.min,
        max: allData.max
        ,format: allData.format
        ,showSpinButtons: allData.showSpinButtons || false
        ,readOnly: allData.readOnly || false
        ,onKeyPress: allData.onKeyPress
        ,onValueChanged: allData.onValueChanged

    });
    UC[allData.ctrID] = number;
}
function createDevExTextBox(allData) {
    var ctrID = "#" + allData.ctrID;
    var textBox = $(ctrID).dxTextBox({
        name: allData.name
        , mode: allData.mode //"email", "tel" or "url"
        , readOnly: allData.readOnly || false
        , onKeyPress: allData.onKeyPress // function
        , maxLength: allData.maxLength //
        , onValueChanged: allData.onValueChanged
    });
    if (allData.valid) {
        textBox.dxValidator({
            validationRules: [
                { type: "required", message: allData.message }
            ]
        });
    }
    UC[allData.ctrID] = textBox;
}
function createDevExTextBoxMask(allData) {
    var ctrID = "#" + allData.ctrID;
    var textBox = $(ctrID).dxTextBox({
        name: allData.name
        , mode: allData.mode //"email", "tel" or "url"
        , readOnly: allData.readOnly || false
        , onKeyPress: allData.onKeyPress
        , mask: allData.mask
        , maskRules: allData.maskRules || {}
        , maskInvalidMessage: "Giá trị nhập vào không chính xác."
        , useMaskedValue: true
    });
    if (allData.valid) {
        textBox.dxValidator({
            validationRules: [
                { type: "required", message: allData.message }
            ]
        });
    }
    UC[allData.ctrID] = textBox;
}
function createDevExToast(allData) {
    var ctrID = "#" + allData.ctrID;
    DevExpress.ui.notify({
        message: allData.message,
        type: allData.type || "info", //info", "warning", "error" or "success"
        displayTime: 2222,
        closeOnClick: true
    });
}
function createDevExDropDownBox(allData) {
    var ctrID = "#" + allData.ctrID;
    var cbb = $(ctrID).dxDropDownBox({
        value: allData.value,
        valueExpr: allData.valueExpr,
        displayExpr: allData.displayExpr,
        dataSource: allData.dataSource,
        contentTemplate: allData.contentTemplate
    });
    UC[allData.ctrID] = cbb;
}
function createDevExSelectBox(allData) {
    var ctrID = "#" + allData.ctrID;
    var cbb = $(ctrID).dxSelectBox({
        value: allData.value,
        valueExpr: allData.valueExpr,
        displayExpr: allData.displayExpr,
        dataSource: allData.dataSource,
        onValueChanged: allData.onValueChanged
    });
    UC[allData.ctrID] = cbb;
}
function createDevExGridView(allData) {
    var ctrID = "#" + allData.ctrID;
    var url = allData.url;
    var datatable = $(ctrID).dxDataGrid({
        dataSource: new DevExpress.data.ODataStore({
            url: "https://js.devexpress.com/Demos/DevAV/odata/Products",
            key: "Product_ID",
            onLoaded: function () {
                // Event handling commands go here
            }

        })
        , columns: allData.columns
        , paging: {
            pageSize: 10
        },
        scrolling: {
            mode: "infinite"
        },
        sorting: {
            mode: "multiple"
        },
        columnsAutoWidth: true,
        columnChooser: {
            enabled: true
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        "export": {
            enabled: allData.export.enabled || true,
            fileName: allData.export.fileName || "ExportData",
            allowExportSelectedData: true
        },
    });

    getDataObject({
        url: allData.url
        , filter: allData.filter
        , onSuccess: function (data) {
            datatable.dataSource
        }
        , onError: function () {

        }
    })


    UC[allData.ctrID] = datatable;
}

function getDataObject(allData) {
    var t = AjaxConfig;
    var onSuccess = allData.onSuccess;
    var onError = allData.onError;
    var url2 = allData.url;
    var filter = allData.filter || {};
    var urlType = jQuery.type(url2);
    if (urlType == "object") {
        var jsonFilter = ConvertDataToJsonString({ data: filter });
        filter = deepCopy({ data: url2 });
        delete filter.url;
        filter.jsonFilter = jsonFilter;
        url2 = url2.url;
    } else
        allData.type = allData.type || "GET";
    var a = $.ajax({
        type: allData.type || "post"
        , headers: allData.headers
        , url: url2
        , data: JSON.stringify(filter)
        , contentType: allData.contentType || "application/json; charset=utf-8"
        , datatype: allData.datatype || "json"
        , traditional: true
        , timeout: t.timeout
	    , async: true
        , success: function (data) {
            a.abort();
            if (onSuccess != null) { onSuccess(data); }
        }
        , error: function (x, e) {
            a.abort();
            if (onError != null) { onError(x, e); }
            var d = getError({ x: x, e: e });
            d.icon = "error";
            d.title = d.status;
            alert(d);
        }
    });
}
function alert(allData) {
    // DevExpress.ui.dialog.alert("message", "title");
    var icon = allData.icon || "";//"error", "success", "info", "warning"
    var title = allData.title || "Thông báo";
    var message = allData.message || "";
    if (message == "") {
        icon = "success";
        message = allData;
    }
    var btnOk = allData.OkText || "Xác nhận";
    swal(title, message, icon, { buttons: btnOk });
}
function alertConfirm(allData) {
    var icon = allData.icon || "info";//"error", "success", "info", "warning"
    var title = allData.title || "Thông báo";
    var message = allData.message || "";
    var btn = { ok: allData.OkText || "Xác nhận", cancel: allData.CancelText || "Hủy bỏ" };
    swal({ title: title, text: message, icon: icon, buttons: btn, dangerMode: true })
        .then((value) => {
            switch (value) {
                case "ok":
                    allData.fnExecute;
                    break;
                case "cancel":
                    break;
            }
        });
}
function getError(allData) {
    var x = allData.x;
    var e = allData.e;
    var statusText = x.statusText;
    var d = {
        title: e
        , status: x.status.toString()
        , message: statusText
    };
    return d;
}
function ConvertDataToJsonString(allData) {
    var data = allData.data;
    if (data == null || data.length == 0) { return ""; }
    var jsonString = JSON.stringify(data);
    jsonString = htmlEncode({ htmlText: jsonString });

    return jsonString;
}
function ConvertDataToXmlString(allData) {
    var data = allData.data;
    var IsEncode = true;
    if (allData.IsEncode != null) { IsEncode = allData.IsEncode; }

    if (data == null || data.length == 0) { return ""; }
    var xmlString = "";
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        xmlString += "<row";
        for (var key in item) {
            //var ot = "<" + key + ">";
            //var ct = "</" + key + ">";
            //xmlString += ot + item[key] + ct;
            xmlString += " " + key + "=\"" + item[key] + "\"";
        }
        xmlString += "/>";
    }
    if (IsEncode) {
        xmlString = htmlEncode({ htmlText: xmlString });
    }

    return xmlString;
}
function htmlEncode(allData) {
    var htmlText = allData.htmlText;
    var htmlReturn = $('<div/>').text(htmlText).html();
    return htmlReturn;
}
function htmlDecode(allData) {
    var htmlText = allData.htmlText;
    var htmlReturn = $('<div/>').html(htmlText).text();
    return htmlReturn;
}
function deepCopy(allData) {
    var data = allData.data;
    if (data == null) { return []; }
    var jsonString = JSON.stringify(data);
    var newData = JSON.parse(jsonString);

    return newData;
}
function parseDate(jsonDate) {
    var re = /-?\d+/;
    var m = re.exec(jsonDate);
    if (m == null)
        return "";
    var date = new Date(parseInt(m[0]));
    return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
}
function parseDateTime(jsonDate) {
    var re = /-?\d+/;
    var m = re.exec(jsonDate);
    if (m == null)
        return "";
    var date = new Date(parseInt(m[0]));
    return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
//Kiểm tra Email
function validateEmail2(emails) {
    var myEmails = emails.split(";");

    var isValid = false;
    var re = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    var n = myEmails.length;
    for (var i = 0; i < n; i++) {
        var myEmail = myEmails[i];
        if (!(i == n - 1 && myEmail.length == 0)) {
            isValid = re.test(myEmail);
            if (!isValid) {
                break;
            }
        }
    }
    return isValid;
}
//Nhập số không nhập chữ
function keypressNumberOnly(allData) {
    $(allData.ctrID).keypress(function (event) {
        var regex = new RegExp(/[0-9]/g);
        var key = event.key;
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });
}