
const show_payment2_description = () => {
    const description = document.querySelector('.show_method2_description')
    description.style.display = 'block'
    document.querySelector('#input_method_1').checked = false
}

const description = document.querySelector('.show_method2_description')
const methodChooses = document.querySelectorAll('.payment__methodChoose')


methodChooses[0].addEventListener('click', () => {
    methodChooses[1].querySelector('input').checked = false
    description.style.display = 'none'

})

methodChooses[1].addEventListener('click', () => {
    methodChooses[0].querySelector('input').checked = false
    description.style.display = 'block'
})


const hideError = (ele) => {
    ele.style.opacity = '0'
    setTimeout(() => {
        ele.style.display = 'none'
    },250)
}