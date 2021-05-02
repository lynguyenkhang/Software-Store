function generateID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const changeNumberToString = intPrice => {
    let result = '';
    let stringPrice = `${intPrice}`
    const length = stringPrice.length
    for (let i = 1; i < length + 1; i++) {
        if (i % 3 === 0 && i !== length) {
            result = `.${stringPrice[length - i]}` + result
        } else result = `${stringPrice[length - i]}` + result
    }
    return `${result} đ`
}


const changePriceStrToNumber = str => {
    if (str === "Giá liên hệ") return 0

    let result = str.slice(0, str.length - 2)
    while (result.indexOf('.') > -1) {
        result = result.replace('.', '');
    }
    return parseInt(result);
}