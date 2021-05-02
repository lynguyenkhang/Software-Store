
const pluckAttribute_iPhone = (({ colors, name, model }, attribute) => {
    let choosenColor;
    colors.map(item => {
        if (item.name === attribute) choosenColor = Object.create(item)
    })
    return {
        "name": name,
        "attribute": attribute,
        "model": model,
        "img": choosenColor.img,
        "price": choosenColor.price
    }
})

const pluckAttribute_Macbook = (({ colors, name, model }, attribute) => {
    let choosenColor;
    colors.map(item => {
        if (item.name === attribute) choosenColor = Object.create(item)
    })
    return {
        "name": name,
        "attribute": attribute,
        "model": model,
        "img": choosenColor.img[0],
        "price": choosenColor.price
    }
})


const pluckAttribute_AirPods = ({ name, model, img, price }) => {
    return {
        "name": name,
        "model": model,
        "img": img[0],
        "price": price
    }
}


const pluckAttribute_AppleWatch = (({ sizes, img, name, model }, attribute) => {
    let choosenSize;
    sizes.map(item => {
        const condition = item.size.indexOf(attribute) > -1
        if (condition) choosenSize = Object.create(item)
    })

    return {
        "name": name,
        "attribute": attribute,
        "model": model,
        "img": img[0],
        "price": choosenSize.price
    }
})





module.exports.pluckAttribute_iPhone = pluckAttribute_iPhone;
module.exports.pluckAttribute_Macbook = pluckAttribute_Macbook;
module.exports.pluckAttribute_AirPods = pluckAttribute_AirPods;
module.exports.pluckAttribute_AppleWatch = pluckAttribute_AppleWatch;