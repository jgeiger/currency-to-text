$(function() {
  $("#convert-form").submit(function(event) {
    var output = "Please enter a value.",
    currencyValue = $("#currency").val(),
    converter;

    if (currencyValue) {
      converter = new CurrencyConverter(currencyValue);
      output = converter.toText();
    }

    $("#converted").text(output);
    event.preventDefault();
  });
});
