document.addEventListener('DOMContentLoaded', () => {
    const blacklistIcon = document.querySelector('.blacklist-1-icon');
    const menu = document.createElement('div');
    menu.classList.add('menu');

    const sachCap3Item = createMenuItem('Sách Cấp 3', '../Sachcap3/sachcap3.html');
    const sachThieuNhiItem = createMenuItem('Sách Thiếu Nhi', '../Sachthieunhi/sachthieunhi.html');
    const sachKinhDoanhItem = createMenuItem('Sách Kinh Doanh', '../Sachkinhdoanh/sachkinhdoanh.html');
    const sachNgoaiNguItem = createMenuItem('Sách Ngoại Ngữ', '../Sachngoaingu/sachngoaingu.html');

    menu.appendChild(sachCap3Item);
    menu.appendChild(sachThieuNhiItem);
    menu.appendChild(sachKinhDoanhItem);
    menu.appendChild(sachNgoaiNguItem);

    menu.style.display = 'none';
    document.body.appendChild(menu);

    blacklistIcon.addEventListener('click', () => {
        if (menu.style.display === 'none') {
            menu.style.display = 'block';
            const iconRect = blacklistIcon.getBoundingClientRect();
            menu.style.top = `${iconRect.bottom}px`;
            menu.style.left = `${iconRect.left}px`; 
        } else {
            menu.style.display = 'none';
        }
    });

    function createMenuItem(text, link) {
        const item = document.createElement('a');
        item.href = link;
        item.textContent = text;
        return item;
    }
});