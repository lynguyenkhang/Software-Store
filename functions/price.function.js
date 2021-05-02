const changeNumberToString = (intPrice) => {
    let result = '';
    let stringPrice =  JSON.stringify(intPrice)
    const length = stringPrice.length
    for(let i = 1; i < length + 1; i++ ){
        if(i % 3 === 0 && i !== length){
            result = `.${stringPrice[length - i]}` + result
        } else result = `${stringPrice[length - i]}` + result
    }
    return `${result} đ`
}

const changePriceToString_iPhone = arr => {
    return arr.map(({_id, name, model, home, colors}) => {
        const newColors = colors.map(color => {
            const {price} = color
            let newPrice = isNaN(price) ? price : changeNumberToString(price)
            return {...color, price: newPrice}
        })
        return { 
            _id, name, model, home, colors: [...newColors]
        }
    })
}

const changePriceToString_Watch = arr => {
    return  arr.map(({_id, img, sizes, name, model, home}) => {
        let newSizes = sizes.map(({size, price}) => {
            let newPrice = isNaN(price) ? price : changeNumberToString(price)
            return {"size": size, "price": newPrice}
        })
        return {
            _id,name, img, model, home, "sizes": newSizes,
        }
    })
}

const changePriceToString_AirPods = arr => {
    return  arr.map(({img, price, name, model}) => {
        let newPrice = isNaN(price) ? price : changeNumberToString(price)
        return {
            "img": img,
            "price": newPrice,
            "name": name,
            "model": model
        }
    })
}





const changePriceToString_iPhoneProduct = ({_id ,name, model, colors}) => {
    let newColors = colors.map(({name, img, price}) => {
        let newPrice = isNaN(price) ? price : changeNumberToString(price)
        return {"name": name, "img": img, "price": newPrice}
    })
    return {"_id": _id,"name": name, "model" : model, "colors": newColors}
}


const changePriceToString_AppleWatchProduct = ({_id,name, model, img, sizes}) => {
    let newSizes = sizes.map(({size, price}) => {
        let newPrice = isNaN(price) ? price : changeNumberToString(price)
        return {"size": size, "price": newPrice}
    })
    return {"_id": _id, "name": name, "model": model, "img": img, "sizes": newSizes}
}

const changePriceToString_AirPodsProduct = ({_id, name, model, img, price}) => {
        let newPrice = isNaN(price) ? price : changeNumberToString(price)
    return {"_id": _id, "name": name, "model": model, "img": img, "price": newPrice}
}




const changePriceToString_Products = arr => {
    return arr.map(product => {
        const price = product.price
        let newPrice = isNaN(price) ? price : changeNumberToString(price)
        const result =  {...product._doc, price: newPrice}
        return result;
    })
}



module.exports.changePriceToString_Products = changePriceToString_Products;
module.exports.changeNumberToString = changeNumberToString;
