const changePrice = value => {
    let priceList = document.querySelectorAll('.products__priceProduct')
    priceList = [...priceList]
    const activePrice = 'products__showPriceProduct'
    priceList.map((item, index) => {
        if(index == value) item.classList.add(activePrice)
        else item.classList.remove(activePrice)
    })
}

const changePriceMacbook = value => {
    let priceList = document.querySelectorAll('.products__priceProduct')
    let colorsList = document.querySelectorAll('.products__colorProductLineMacbook')
    let containers = document.querySelectorAll('.products__macbookContainer')
    priceList = [...priceList]
    colorsList = [...colorsList]
    containers = [...containers]


    const activePrice = 'products__showPriceProduct'
    const activeColor = 'products__colorProductLineMacbookActive'
    const activeContainer = 'products__macbookContainerActive'


    for(let index = 0; index < priceList.length; index++){
        if(index == value) {
            colorsList[index].classList.add(activeColor)
            priceList[index].classList.add(activePrice)
            containers[index].classList.add(activeContainer)
        } else {
            colorsList[index].classList.remove(activeColor)
            priceList[index].classList.remove(activePrice)
            containers[index].classList.remove(activeContainer)
        }
    }
}

const readMore = () => {
    const Btn = document.querySelector('.products__readMoreBtn')
    const box = document.querySelector('.products__sideBarContent')
    const content = box.firstElementChild;
    const blur = document.querySelector('.products__blurBar')
    const iconBtn = Btn.firstElementChild
    const nameBtn = Btn.lastElementChild

    const height = 100;

    if(box.clientHeight === height) {
        blur.style.display = `none`
        iconBtn.innerText = `arrow_upward`
        nameBtn.innerText = 'Thu gọn' 
        box.style.height = `${content.clientHeight + 20}px`
    } else {
        blur.style.display = `block`
        iconBtn.innerText = `arrow_downward`
        nameBtn.innerText = 'Xem thêm' 
        box.style.height = `${height}px`
    }
}

const changeVolume = type => {
    const volumeEl = document.getElementById('products__volume')
    let volume = parseInt(volumeEl.innerText);
    switch(type){
        case 'add':
            volume = volume + 1;
            volumeEl.innerText = volume;
            break;
        case 'subtract':
            if(volume > 1){
                volume = volume - 1;
                volumeEl.innerText = volume;
            }
            break;
    }
}

const customizeAttribute = (category, attribute) => {
    let result;
    switch(category){
      case 'Apple Watch':
        result = `Kích cỡ: ${attribute}`; break;
      case 'Accessories':
      case 'AirPods':
        result = ''; break;
      default:
        result = `Màu: ${attribute}`; break;
    }
    return result;
}

const getAttributeByCategory = category => {
    let attribute;
    switch(category){
        case "Apple Watch":
            const eles = document.querySelectorAll('.products__colorProductLine')
            if(eles[0].firstElementChild.checked){
                attribute = eles[0].lastElementChild.innerText.slice(0,4)
            } else attribute = eles[1].lastElementChild.innerText.slice(0,4)
            break;
        case "Accessories":
        case "AirPods": attribute = ''; break;
        case "Macbook": attribute = document.querySelector(".products__colorProductLineMacbookActive").innerText.trim(); break;
        default: attribute = document.querySelector('.swiper-pagination-bullet-active').innerText.trim(); break;
    }
    return attribute
}

const addNewProductInCart = product => {
    const { imageLink, category, name, priceStr, volume} = product
    const index = document.querySelectorAll('.Navigation__cartPageContent > li').length
    const addedText = `<li><div class="Navigation__cartProductImgBox"><img class="Navigation__cartProductImg" src=${imageLink}><div onClick="removeProduct('${index}')">Xoá</div></div><div class="Navigation__cartProductInfo"><a href="/products/${category}/${name}">${name}</a><p>${priceStr}</p></div><div class="Navigation__cartVolumeBox"><span class="material-icons" onClick="changeVolumeInCart('${index}', 'descrease')">remove</span><span class="Navigation__cartVolume">${volume}</span><span class="material-icons" onClick="changeVolumeInCart('${index}', 'increase')">add</span></div></li>`
    const cartEle = document.querySelector('.Navigation__cartPageContent')
    cartEle.innerHTML = cartEle.innerHTML + addedText
}

const addProductInCart = (category, productID) => {

    const imageURL = document.querySelector(".swiper-slide-active").style.backgroundImage
    const imageLink = imageURL.slice(5, imageURL.length - 2)
    const volume = parseInt(document.getElementById('products__volume').innerText)

    const name = document.querySelector(".products__nameProduct").innerText
    const priceStr = document.querySelector(".products__showPriceProduct").innerText

    const newProduct = {
        imageLink, category,
        name, priceStr, volume,
    }
    console.log(newProduct)

    let duplicatedProductIndex = -1
    const productEles = document.querySelectorAll('.Navigation__cartPageContent > li')
    productEles.forEach((li, index) => {
        const productName = li.querySelector(".Navigation__cartProductInfo a").innerText
        if(productName === name) duplicatedProductIndex = index
    })

    if(duplicatedProductIndex > -1){
        const chosenEle = productEles[duplicatedProductIndex]
        const volumeBox = chosenEle.querySelector('.Navigation__cartVolume')
        volumeBox.innerText = parseInt(volumeBox.innerText) + volume
    } else {
        addNewProductInCart(newProduct)
    }

    updateTotalPrice(priceStr, volume)
    updateTotalQuantity(volume)
    showCartPage()

    return {
        "category": category,
        "productID": productID,
        "volume": volume,
    }
}

const buyProduct = (category, productID) => {
    const update = addProductInCart(category, productID)
    axios({
        method: 'patch',  
        url: `/api/cart`,
        data: update
    })
    .then()
    .catch(err => console.log(err))
}
