
const updateTotalPrice = (priceStr, quantity ) => {
    let totalPriceEle = document.querySelector('.Navigation__cartPageTotalPrice')
    let totalPrice = changePriceStrToNumber(totalPriceEle.innerText)
    let priceProduct = changePriceStrToNumber(priceStr)
    totalPrice = totalPrice + priceProduct * quantity
    totalPriceEle.innerText = changeNumberToString(totalPrice)
  }

const updateTotalQuantity = changedQuantity => {
    let volumeIcons = document.querySelectorAll('.Navigation__volumeCart')
    let totalQuantity = parseInt(volumeIcons[0].innerText)
    totalQuantity = totalQuantity + changedQuantity

    volumeIcons[0].innerText = totalQuantity
    volumeIcons[1].innerText = totalQuantity
    volumeIcons[0].style.transform = 'scale(1.8)'
    volumeIcons[1].style.transform = 'scale(1.8)'
    setTimeout(() => {
        volumeIcons[0].style.transform = 'scale(1)'
        volumeIcons[1].style.transform = 'scale(1)'
    },500)

}

const updateIndexRemoveElement = (li, index) => {
    const removeEle = li.querySelector(".Navigation__cartProductImgBox")
    const originalText = removeEle.innerHTML
    const separateIndex1 = originalText.indexOf("(")
    const leftKeptStr = originalText.slice(0, separateIndex1 + 1)
    const separateIndex2 = originalText.indexOf(")")
    const rightKeptStr = originalText.slice(separateIndex2)
    removeEle.innerHTML = `${leftKeptStr}${index}${rightKeptStr}`
}


const updateIndexChangeVolumeElement = (li, index) => {
    const chosenEle = li.querySelector('.Navigation__cartVolumeBox')
    const originalText = chosenEle.innerHTML

    const separateIndex1 = originalText.indexOf("('")
    const separateIndex2 = originalText.indexOf("',")
    const separateIndex3 = originalText.indexOf("('", separateIndex1 + 1)
    const separateIndex4 = originalText.indexOf("',", separateIndex2 + 1)

    const keptStr1 = originalText.slice(0, separateIndex1 + 2)
    const keptStr2 = originalText.slice(separateIndex2, separateIndex3 + 2)
    const keptStr3 = originalText.slice(separateIndex4)

    chosenEle.innerHTML = `${keptStr1}${index}${keptStr2}${index}${keptStr3}`
}

const removeProductInCart = () => {
    let cartEle = document.querySelectorAll('.Navigation__cartPageContent li')
    cartEle = [...cartEle]
    // cartEle = [...cartEle.slice(0, position), ...cartEle.slice(position + 1)]
    cartEle = cartEle.filter(li => li.style.display !== 'none')
    
    let cartText = '';
    cartEle.map((li,index) => {
        updateIndexRemoveElement(li, index)
        updateIndexChangeVolumeElement(li, index)
        cartText = cartText + `<li>${li.innerHTML}</li>`
    })

    document.querySelector('.Navigation__cartPageContent').innerHTML = cartText

}

const updateCart = (position, calculation) => {
    let chosenEle = document.querySelectorAll('.Navigation__cartPageContent li')[position];
    let volumeBox = chosenEle.querySelector('.Navigation__cartVolume')
    let priceProduct = chosenEle.querySelector('p:last-child').innerText
    let numberInProduct = parseInt(volumeBox.innerText)
  
    switch(calculation){
      case 'descrease':
        if(numberInProduct > 1) {
          volumeBox.innerText = numberInProduct - 1;
          updateTotalQuantity(-1)
          updateTotalPrice(priceProduct, -1)
        }
        break;
      case 'increase':
        volumeBox.innerText = numberInProduct + 1;
        updateTotalQuantity(1)
        updateTotalPrice(priceProduct, 1)
        break;
      case 'remove':
        updateTotalQuantity(numberInProduct * -1)
        updateTotalPrice(priceProduct, numberInProduct * -1)
        chosenEle.style.display = 'none';
        removeProductInCart()
        break;
    }

}



const changeVolumeInCart = (position, calculation) => {
    updateCart(position, calculation)
  
    // update data in server
    axios({
      method: 'patch',
      url: `/api/products/changeVolume`,
      data: {
        "position": position,
        "calculation": calculation
      }
    })
    .then()
    .catch(err => console.log(err))
}


const removeProduct = position => {
    updateCart(position, 'remove')
    axios({
      method: 'delete',
      url: `/api/products/deleteOneProduct`,
      data: { "position": position}})
    .then()
    .catch(err => console.log(err))
}
