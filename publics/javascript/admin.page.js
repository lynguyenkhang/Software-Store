const TablesButton = document.querySelectorAll("#TablesButton > button")
const ModelTables = document.querySelectorAll(".admin__tableContainer")

TablesButton.forEach( (model, index) => {
    model.addEventListener('click', e => {

        for(let i = 0; i < TablesButton.length; i++){
            const buttonEle = TablesButton[i].classList
            const tableEle = ModelTables[i].classList
            buttonEle.remove('active')
            buttonEle.add('text-dark')
            tableEle.add('d-none')
        }

        const classes = e.toElement.classList
        classes.add('active')
        classes.toggle('text-dark')
        ModelTables[index].classList.remove('d-none')

        let modelName = ModelTables[index].querySelector('h1').innerText
        modelName = modelName === 'Phụ kiện' ? 'Accessories' : modelName.trim().replace(' ','')
        filterModels(modelName)
    })
})



const filterModels = modelName => {
    const productArr = [...document.querySelectorAll(`#${modelName}TableBox > tbody tr`)]
    const inputs = [...document.querySelectorAll(`#${modelName}FilterBox input`)]
    inputs.map(input => {
        input.addEventListener('input', e => {
            productArr.map(tr => {
                const model = tr.querySelector('td:nth-child(2)')
                tr.classList.remove('d-none')
                const condition1 = e.target.value !== 'all'
                const condition2 = model.innerText !== e.target.value
                if(condition1 && condition2){
                    tr.classList.add('d-none')
                }
            })
        })
    })
}

filterModels('iPhone')

const deleteProduct = (id) => {
    const confirm = window.confirm('Bạn có chắc xoá sản phẩm chứ ?')
    if(confirm){
        axios.delete(`/admin/api/deleteProduct/${id}`)
        .then(() => {
            const element = document.getElementById(id)
            element.classList.add("d-none");
        })
        .catch(err => console.log(err))
    }
}