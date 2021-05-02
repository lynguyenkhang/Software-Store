  // color  table:
  const colorTable = {
    "Yellow": "#f8d459",
    "Black": "#444748",
    "White": "#ffffff",
    "Red": "#b4082a",
    "Green": "#a6d9c5",
    "Purple": "#c8c1d3",
    "Gold": "Gold",
    "Green Midnight": "#015a29",
    "Silver": "Silver",
    "Gray": "Gray",
    "Blue": "#308aef"
  }



let mySwiper = new Swiper('.Home__banner', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 800,
    autoplay: {deplay: 100},
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
  })

  let width = window.innerWidth;
  var slides = 2;
  var space = 10;
  // if(width > 1200) slides = 5
  // else
  if(width > 992) slides = 4
  else if (width > 550 ) slides = 3
  // var space = width > ;

  var swiper = new Swiper('.Home__sliderSwiperContainer', {
    slidesPerView: slides,
    spaceBetween: 10,
    speed: 500,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


  var products_galleryThumbs = new Swiper('.products__galleryThumbs', {
    spaceBetween: 0,
    slidesPerView: 10,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });


  var products_galleryTop = new Swiper('.products__galleryTop', {
    spaceBetween: 0,
    speed: 800,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: products_galleryThumbs,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        let nameColor = document.getElementById(`color_${index}`).innerText
        const colorHex = colorTable[nameColor];
        const innerHTML = `<li class="products__colorProductLine ${className}" onClick=changePrice(${index})><div style="background-color: ${colorHex}"></div><span>${nameColor}</span></li>`
        return innerHTML
      },
    },
  });
  

