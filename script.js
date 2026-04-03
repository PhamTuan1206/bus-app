document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const btnCheckout = document.getElementById('btn-go-checkout');

    // 1. TẠO GHẾ (Sửa lỗi image_3c56da.png)
    if (grid) {
        grid.innerHTML = ''; 
        for (let i = 1; i <= 16; i++) {
            const s = document.createElement('div');
            s.className = 'seat';
            s.innerText = 'A' + i;
            s.onclick = function() {
                this.classList.toggle('selected');
                updateSeatInfo();
            };
            grid.appendChild(s);
        }
    }

    // 2. XỬ LÝ THANH TOÁN (Sửa lỗi image_3cbc19.png)
    if (btnCheckout) {
        btnCheckout.onclick = () => {
            const currentSelected = document.querySelectorAll('.seat.selected');
            if (currentSelected.length === 0) {
                alert('Vui lòng chọn ít nhất 1 ghế!');
                return;
            }

            const seatsList = Array.from(currentSelected).map(s => s.innerText);
            
            // Lấy tên chuyến đi từ localStorage (Nhớ sửa ở routes.html như tôi đã chỉ)
            const tripName = localStorage.getItem('selectedTrip') || "Hà Nội - Hà Giang";
            
            document.getElementById('step-selection').style.display = 'none';
            document.getElementById('step-checkout').style.display = 'block';
            
            document.getElementById('display-trip-name').innerText = tripName;
            document.getElementById('final-seats').innerText = seatsList.join(', ');
            document.getElementById('final-price').innerText = (seatsList.length * 450000).toLocaleString() + 'đ';
        };
    }
});

function updateSeatInfo() {
    const selected = document.querySelectorAll('.seat.selected');
    const count = document.getElementById('count');
    if (count) {
        count.innerText = selected.length > 0 ? selected.length + " ghế (" + Array.from(selected).map(s => s.innerText).join(', ') + ")" : "Chưa chọn";
    }
}