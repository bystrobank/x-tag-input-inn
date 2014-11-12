(function () {

    function validate(value, needlength) {
        var checkResult, sum, mask10, mask12, cnt, rem, rem1, inn11, rem2;
        checkResult = false;
        if (parseInt(value, 10)) {
            sum = 0;
            mask10 = [31, 29, 23, 19, 17, 13, 7, 5, 3];
            mask12 = [41, 37, 31, 29, 23, 19, 17, 13, 7, 5, 3];
            if (value.length === 10 && (!needlength || needlength === value.length)) {
                for (cnt = 0; cnt < 9; cnt++) {
                    sum += value.substr(cnt, 1) * mask10[cnt];
                }
                rem = 11 - (sum % 11);
                if (rem > 9) {
                    rem = 0;
                }
                checkResult = (value.substr(9) === rem) ? true : false;
            } else if (value.length === 12 && (!needlength || needlength === value.length)) {
                for (cnt = 0; cnt < 10; cnt++) {
                    sum += value.substr(cnt, 1) * mask12[cnt + 1];
                }
                rem1 = 11 - (sum % 11);
                if (rem1 > 9) {
                    rem1 = 0;
                }
                inn11 = value.substr(0, 10) + rem1;
                sum = 0;
                for (cnt = 0; cnt < 11; cnt++) {
                    sum += inn11.substr(cnt, 1) * mask12[cnt];
                }
                rem2 = 11 - (sum % 11);
                if (rem2 > 9) {
                    rem2 = 0;
                }
                checkResult = (value.substr(10) === rem1.toString() + rem2.toString()) ? true : false;
            }
        }
        return checkResult;
    }

    xtag.addEvent(document, 'change:delegate(input[data-x-tag=x-tag-input-inn])', function (e) {
        var checkResult = validate(this.value,parseInt(this.getAttribute("size"),10));
        var error = checkResult ? '':'Неверная контрольная сумма ИНН';
        this.setCustomValidity(error);
    });

})();