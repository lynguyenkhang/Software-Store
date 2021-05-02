
const changeMetaTitleToSEO = url => {
    let result = "Le Anh Store chuyên cung cấp thiết bị điện tử như smartphone, laptop,..."
  
    if(url.indexOf('categories') > -1){
      const index = url.lastIndexOf('/')
      const category = decodeURI(url.slice(index + 1))
      result = `Mua online ${category} chính hãng -  Trả góp 0%. Bảo hành 1 đổi 1 trong 7 ngày đầu tiên.`
    }
  
    if(url.indexOf('models') > -1){
      const index = url.lastIndexOf('/')
      const model = decodeURI(url.slice(index + 1))
      result = `Mua online các sản phẩm dòng ${model} chính hãng -  Trả góp 0%. Bảo hành 1 đổi 1 trong 7 ngày đầu tiên.`  
    }
  
    if(url.indexOf('products') > -1){
      const index = url.lastIndexOf('/')
      const product = decodeURI(url.slice(index + 1))
      result = `Mua online các sản phẩm dòng ${product} chính hãng -  Trả góp 0%. Bảo hành 1 đổi 1 trong 7 ngày đầu tiên.`  
      
    }
    return result
  }
  
module.exports.changeMetaTitleToSEO = changeMetaTitleToSEO