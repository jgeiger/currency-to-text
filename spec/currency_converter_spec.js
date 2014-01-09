describe("CurrencyConverter", function() {
  describe("converting the input value", function() {
    describe("without decimal digits", function() {
      it("with a non-zero single digit", function() {
        var expected = "Seven and 00/100 dollars";
        var converter = new CurrencyConverter("7");
        expect(converter.toText()).toEqual(expected);
      });

      it("with a zero single digit", function() {
        var expected = "Zero and 00/100 dollars";
        var converter = new CurrencyConverter("0");
        expect(converter.toText()).toEqual(expected);
      });
    });

    describe("with decimal places", function() {
      describe("converting the thousands place value", function() {
        it("with a really big number", function() {
          var expected = "One billion one hundred eleven million one hundred twelve thousand five hundred twenty-four and 04/100 dollars";
          var converter = new CurrencyConverter("1111112524.04");
          expect(converter.toText()).toEqual(expected);
        });

        it("with more than ten thousand", function() {
          var expected = "Twelve thousand five hundred twenty-four and 04/100 dollars";
          var converter = new CurrencyConverter("12524.04");
          expect(converter.toText()).toEqual(expected);
        });

        it("without a zero hundreds place", function() {
          var expected = "Two thousand five hundred twenty-four and 04/100 dollars";
          var converter = new CurrencyConverter("2524.04");
          expect(converter.toText()).toEqual(expected);
        });

        it("with a zero hundreds place", function() {
          var expected = "Two thousand twenty-three and 04/100 dollars";
          var converter = new CurrencyConverter("2023.04");
          expect(converter.toText()).toEqual(expected);
        });

        it("with a zero hundreds and tens place", function() {
          var expected = "Two thousand three and 04/100 dollars";
          var converter = new CurrencyConverter("2003.04");
          expect(converter.toText()).toEqual(expected);
        });

        it("with a zero hundreds, tens and ones place", function() {
          var expected = "Two thousand and 04/100 dollars";
          var converter = new CurrencyConverter("2000.04");
          expect(converter.toText()).toEqual(expected);
        });
      });

      describe("converting the hundereds place value", function() {
        it("without a zero tens place", function() {
          var expected = "Five hundred fifty-two and 00/100 dollars";
          var converter = new CurrencyConverter("552.00");
          expect(converter.toText()).toEqual(expected);
        });

        it("with a zero tens place", function() {
          var expected = "Five hundred two and 00/100 dollars";
          var converter = new CurrencyConverter("502.00");
          expect(converter.toText()).toEqual(expected);
        });

        it("with a zero tens and ones place", function() {
          var expected = "Five hundred and 00/100 dollars";
          var converter = new CurrencyConverter("500.00");
          expect(converter.toText()).toEqual(expected);
        });
      });

      describe("converting the tens place value", function() {
        describe("with a non-teen number", function() {
          it("converts a non-ten base number", function() {
            var expected = "Ninety-nine and 15/100 dollars";
            var converter = new CurrencyConverter("99.15");
            expect(converter.toText()).toEqual(expected);
          });

          it("converts a ten base number", function() {
            var expected = "Twenty and 15/100 dollars";
            var converter = new CurrencyConverter("20.15");
            expect(converter.toText()).toEqual(expected);
          });
        });

        it("with a teen number", function() {
          var expected = "Fifteen and 15/100 dollars";
          var converter = new CurrencyConverter("15.15");
          expect(converter.toText()).toEqual(expected);
        });
      });

      describe("converting the ones place value", function() {
        it("with a non-zero ones digit", function() {
          var expected = "Seven and 77/100 dollars";
          var converter = new CurrencyConverter("7.77");
          expect(converter.toText()).toEqual(expected);
        });

        it("with a zero ones digit", function() {
          var expected = "Zero and 77/100 dollars";
          var converter = new CurrencyConverter("0.77");
          expect(converter.toText()).toEqual(expected);
        });
      });

      it("with a decmimal with too many trailing zeros", function() {
        var expected = "Zero and 77/100 dollars";
        var converter = new CurrencyConverter("0.7700");
        expect(converter.toText()).toEqual(expected);
      });
    });
  });
});
