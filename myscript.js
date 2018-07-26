/*Requirements
1. On click of 'Filter' button, adds a row of inputs fields with just two fields showing as long as all 'Filter by' options hasn't been selected by user already in previous row(s)
2. A new row cannot be added if any of the required fields in the previous row is empty
3. Selected 'Filter by' option determines which list of options get populated in the 'Conditions' field
4. Selected 'Filter by' option determines the type of the third input field to show to user
5.In adding a new row, the users selection in the previous row shouldn't be affected and all three input fields should display to the user
6.A new row's 'Filter by' option list shouldn't contain what has been selected already/should be disabled.*/
//
/*New Implementation*/
$(document).ready(function () {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    const employeeList = [
        { pkId: 1, empName: "Prince Jah" }, { pkId: 2, empName: "Daniel Ababio" },
        { pkId: 3, empName: "Lash Pixel" }, { pkId: 4, empName: "Theophilus Paintsil" }, { pkId: 5, empName: "Misty Clench" }, 
        { pkId: 6, empName: "Don Somad" }, { pkId: 7, empName: "Princess Abigail" }, { pkId: 8, empName: "Charlotte Diva" }, 
        { pkId: 9, empName: "Jojo Duncan" }, { pkId: 10, empName: "Patapizzy Chan" }, { pkId: 11, empName: "More Fire" },
        { pkId: 12, empName: "Nana Adwoa" }, { pkId: 13, empName: "Peaches Way" }, { pkId: 14, empName: "Bobo Shanti" },
        { pkId: 15, empName: "Jay Paps" }, { pkId: 16, empName: "Lawrence Day" }, { pkId: 17, empName: "Emily Watson" },
        { pkId: 18, empName: "Franca Duboir" }, { pkId: 19, empName: "Riri Shades" }, { pkId: 20, empName: "Samuel Swag" }, 
        { pkId: 21, empName: "Oranda Orleans" },{ pkId: 22, empName: "Maame Serwaa" }, { pkId: 23, empName: "Kojo Poku" },
        { pkId: 24, empName: "Evandy Matters" },{ pkId: 25, empName: "Lyon Hart" }, { pkId: 26, empName: "James Halliday" },
        { pkId: 27, empName: "Easter Yung" },{ pkId: 28, empName: "Sally Mondel" }, { pkId: 29, empName: "Ricardo Evans" }, 
        { pkId: 30, empName: "Michael Jackson" }
    ];
    var filterBy = [
        { id: 1, filter: 'Employee ID' },
        { id: 2, filter: 'Employee Type' },
        { id: 3, filter: 'Salary Grade' },
        { id: 4, filter: 'Division' },
        { id: 5, filter: 'Department' }
    ];
    var conditions = [
        { id: 1, condition: 'EQUAL TO' },
        { id: 2, condition: 'NOT EQUAL TO' },
        { id: 3, condition: 'LIKE' },
        { id: 4, condition: 'NOT LIKE' },
        { id: 5, condition: 'IN' }
    ];
    var newConditions = [
        { id: 3, condition: 'LIKE' },
        { id: 4, condition: 'NOT LIKE' },
        { id: 5, condition: 'IN' }
    ];
    var selectedFilterBy = [];
    var selectedFilterText = "",
      selectedFilterValue,
      options,selectedFilterInput1;

    const display = $("#employeeName");
    const totalEmployees = employeeList.length;
    var factor = (100 / totalEmployees);

    var rowCount = 0;

    $('#btnFilter').on('click', function (event) {

        $("#dynamic")
            .css("width", 0 * factor + "%")
            .attr("aria-valuenow", parseInt(0 * factor))
            .text(parseInt(0 * factor) + "%")
            .removeClass("progress-bar-success")
            .addClass("progress-bar-info");

        display.html(`N/A`);

        $("#startTimeVal").text(`N/A`);

        $("#endTimeVal").text(`N/A`);

        ++rowCount;

        selectedFilterValue = $(".row")
            .find(".filterBy")
            .last()
            .find("option:selected")
            .val() || null;

        if (selectedFilterValue && (selectedFilterBy.length <= (filterBy.length - 1))) {
          selectedFilterBy.push(selectedFilterValue);
        }
        //console.log(selectedFilterBy);
        
        if (selectedFilterBy.length <= (filterBy.length - 1)) {
          if ($("#parentBody")
              .parsley()
              .validate() === true) {
              $("#table-data").append(`<tr id="tableRow-${rowCount}">
                                    <td>
                                        <select class="form-control input-sm filterBy" name="txtFilterByName-${rowCount}" id="filterId-${rowCount}" data-filter-id ="${rowCount}"
                                            required></select>
                                    </td>
                                    <td>
                                        <select id = "conditionID-${rowCount}" data-condition-id ="${rowCount}" class="form-control input-sm conditions" name="cboConditionName-${rowCount}"required></select>
                                    </td>
                                    <td>
                                        <div id = "txtValID-${rowCount}">
                                            <input class="form-control input-sm txtInputVal" name="txtInputName-${rowCount}" id = "txtValInputID-${rowCount}" type="text" disabled/>
                                        </div>
                                        
                                        <div id="multipleSelect-${rowCount}">
                                            <select class="multiple-select2 form-control" name="multiSelectName-${rowCount}" multiple="multiple">
                                                <optgroup label="Alaskan/Hawaiian Time Zone">
                                                <option value="AK">Alaska</option>
                                                <option value="HI">Hawaii</option>
                                                </optgroup>

                                                <optgroup label="Pacific Time Zone">
                                                <option value="CA">California</option>
                                                <option value="NV">Nevada</option>
                                                <option value="OR">Oregon</option>
                                                <option value="WA">Washington</option>
                                                </optgroup>

                                                <optgroup label="Mountain Time Zone">
                                                <option value="AZ">Arizona</option>
                                                <option value="CO">Colorado</option>
                                                <option value="ID">Idaho</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="UT">Utah</option>
                                                <option value="WY">Wyoming</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="btn btn-circle btn-xs btn-danger btnRemove" data-table-row-id = "${rowCount}">
                                            <i class="fa fa-close"></i>
                                        </span>
                                    </td>
                                </tr>`);

              $(`#txtValInputID-${rowCount}`).autocomplete({
                minLength: 2,
                autoFocus: true,
                source: function(request, response) {
                  response(
                    $.map(employeeList, function(item) {
                      return {
                        id: item.pkId,
                        value: item.empName,
                        label: item.empName
                      };
                    })
                  );
                }
               
              });

              $(".multiple-select2").select2({
                  placeholder: "Select a state"
              });

            $(`#multipleSelect-${rowCount}`).addClass("hide");
            
            $(`#filterId-${rowCount}`)
              .find("option")
              .remove();
            var filterOptions = '<option selected disabled value="">Select a filter </option>';
            filterOptions = filterBy.reduce(function(
              htmlString,
              filterItem
            ) {
                
              if (selectedFilterBy.includes(filterItem.id.toString())) {
                return `${htmlString}<option disabled id="filter-option-${
                  filterItem.id
                }" value="${filterItem.id}">${filterItem.filter}</option>`;
              }
              return `${htmlString}<option id="filter-option-${
                filterItem.id
              }" value="${filterItem.id}">${filterItem.filter}</option>`;
            },
            filterOptions);
            $(`#filterId-${rowCount}`).append(filterOptions);
            // console.log($(".filterBy option:disabled"));
          }
        } else {
          event.preventDefault();
          toastr["warning"]("Filter options exhausted!", "Message");
        }
    });

    $(document).on('change', `.filterBy`, function () {
        selectedFilterInput1 = $(this).find('option:selected').text();
        
        var filterUniqID = $(this).attr("data-filter-id");
        
        // console.log($(this)
        //     .closest(".conditions")
        //     .find("option"));
        $(`#conditionID-${filterUniqID}`)
          .find("option")
          .remove();
        if (selectedFilterInput1.toLowerCase() != 'employee id') {
          options = '<option selected disabled value="">Select a condition </option>';
          $(newConditions).each(function(_, elem) {
            options += `<option value="${elem.id}"> ${elem.condition} </option>`;
          });
          console.log(selectedFilterInput1.toLowerCase());
            $(`#conditionID-${filterUniqID}`).append(options);
        } else {
          options = '<option selected disabled value="-1">Select a condition </option>';
          $(conditions).each(function(_, elem) {
            options += `<option value="${elem.id}">${elem.condition}</option>`;
          });
          
            $(`#conditionID-${filterUniqID}`).append(options);
            
        }
        

    });

    $(document).on('change', '.conditions', function () {
         selectedFilterText = $(this).parent().prev().children('.filterBy').find('option:selected').text();
         var selectedConditionText = $(this).find('option:selected').text();
         selectedConditionText = selectedConditionText.toLowerCase().trim();
        console.log(typeof (selectedConditionText)); 

        var conditionUniqID = $(this).attr("data-condition-id");

        if ((selectedConditionText == "in") && (selectedFilterText.toLowerCase() != "employee id")) {
          $(`#txtValID-${conditionUniqID}`).addClass("hide");
          $(`#multipleSelect-${rowCount}`).removeClass("hide");
        } 
        else {
            //alert(selectedConditionText);
          $(`#txtValInputID-${conditionUniqID}`).prop("disabled", false);
        }
    });

    $(document).on('click', '.btnRemove', function () {
        var tableRowID = $(this).attr("data-table-row-id");
        $(`#tableRow-${tableRowID}`).remove();
    });

    $(document).on("click", "#btnClear", function() {

        $("#formPayRun .multiple-select2").val('').trigger('change');

        $("#formPayRun")[0].reset();

        $("#formPayRun")
            .parsley()
            .reset();
    });

    function getFormData(formId) {
        return $('#' + formId).serializeArray().reduce(function (obj, item) {
            var name = item.name,
                value = item.value;

            if (obj.hasOwnProperty(name)) {
                if (typeof obj[name] == "string") {
                    obj[name] = [obj[name]];
                    obj[name].push(value);
                } else {
                    obj[name].push(value);
                }
            } else {
                obj[name] = value;
            }
            return obj;
        }, {});
    }

    $('#btnRunPay').on('click', function () {

        var tempDate = new Date();

        if ($("#formPayRun").parsley().validate() === true && ($('#parentBody').children().length) > 0) {
            
            var result = getFormData("formPayRun");

            $("#startTimeVal").text(tempDate.toLocaleTimeString());
            
            console.log(result);

            selectedFilterBy = [];

            $(".btnRemove").hide();

            $("#formPayRun").find(":input:not(:disabled), select:not(:disabled)").prop("disabled", true);
            if (employeeList) {

                var current_progress = 0;
                var interval = setInterval(function () {
                    //console.log(employeeList[current_progress]["empName"]);
                    var employee = employeeList[current_progress]["empName"];
                    if (employee === undefined) {
                        clearInterval(interval);
                    } else {
                        display.html(`${employee} &nbsp;<small> (${++current_progress}/${totalEmployees})</small>`);
                        $("#dynamic")
                          .css("width", current_progress * factor + "%")
                          .attr("aria-valuenow", parseInt(current_progress * factor))
                          .text(parseInt(current_progress * factor) + "%");
                        if (current_progress >= totalEmployees)
                         clearInterval(interval);
                        if (current_progress === totalEmployees)
                         $("#dynamic")
                           .removeClass("progress-bar-info")
                           .addClass("progress-bar-success")
                             .text(parseInt(current_progress * factor) + "%");

                        toastr["info"]("Pay Run Ongoing. Please wait!", "Message");

                        if ($("#dynamic").attr("aria-valuenow") == "100") {
                          newDate = new Date();
                          $("#endTimeVal").text(newDate.toLocaleTimeString());

                            toastr["success"]("Pay Run Complete!", "Message");
                            
                            $("#formPayRun")
                              .find(":input:disabled, select:disabled")
                              .prop("disabled", false);

                            $("#formPayRun")[0].reset();

                            $("#formPayRun")
                              .parsley()
                              .reset();

                            $("#table-data")
                              .children()
                              .remove();

                            rowCount = 0;
                            
                        }
                    }
                }, 500);
            }


        } else{
            toastr["error"]("Cannot ran pay without any selected Filters/Pay Period!", "Message");
        }

    });


});