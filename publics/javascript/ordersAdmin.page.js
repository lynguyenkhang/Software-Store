const alert = document.querySelector('.OrdersAmin__alert');
const closeBtn = document.querySelector('.OrdersAdmin__closeErrorIcon');

closeBtn.addEventListener('click', () => {
    const alert = document.querySelector('.OrdersAmin__alert');
    const condition = alert.classList.contains('d-none')
    if (!condition) {
        alert.style.opacity = '0'
        setTimeout(() => {
            alert.classList.add('d-none');
        }, 250)
    }
})


const updateBtns = document.querySelectorAll(".updateStatusBtn");

[...updateBtns].map((btn, index) => {
    btn.addEventListener('click', () => {
        const orderID = document.querySelectorAll(".orderIDBox")[index].innerText;
        const chosenStatus = document.querySelectorAll(".chosenStatusBox")[index].value;
        axios({
            method: 'post',
            url: `api/updateOrderStatus/${orderID}`,
            data: {
                "newStatus": chosenStatus,
            }
        })
            .then(res => {
                const alert = document.querySelector('.OrdersAmin__alert');
                alert.querySelector('span').innerText = res.data;
                alert.style.opacity = '1'
                setTimeout(() => {
                    alert.classList.remove('d-none');
                }, 250)
            })
            .catch(err => console.log(err))
    })
})


// xoa san pham
const deleteOrder = (id) => {
    const confirm = window.confirm('Bạn có chắc xoá sản phẩm chứ ?')

    if (confirm) {
        axios.delete(`/admin/api/deleteOrder/${id}`)
            .then(() => {
                const element = document.getElementById(id)
                element.classList.add("d-none");
            })
            .catch(err => console.log(err))
    }
}