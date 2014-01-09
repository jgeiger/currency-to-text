describe("events", function() {
  it("outputs text string on submit", function() {
    jasmine.getFixtures().fixturesPath = "../";
    loadFixtures('index.html');
    $("#currency").val("123");
    $("#convert-form").submit();
    var expected = "One hundred twenty-three and 00/100 dollars";
    expect($("#converted")).toHaveText(expected);
  });

  it("alerts with missing value", function() {
    jasmine.getFixtures().fixturesPath = "../";
    loadFixtures('index.html');
    $("#currency").val("");
    $("#convert-form").submit();
    var expected = "Please enter a value.";
    expect($("#converted")).toHaveText(expected);
  });
});
