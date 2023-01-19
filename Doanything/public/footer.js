let footerHTML = /*html*/ `
    <div class="footerContent">
        <ul>
            <li>條款</li>
            <li>Cookie</li>
            <li>私隱條例</li>
        </ul>
        <ul>
            <li>目錄</li>
            <li>關於我們</li>
            <li>搜索工作</li>
            <li>發佈工作</li>
        </ul>
        <ul>
            <li>地址</li>
            <li>2715-16, 27/F, One Midtown, 11 海盛路, 荃灣</li>
        </ul>
        <ul>
            <li>電話</li>
            <li>+852-9720 1234</li>
        </ul>
        <ul>
            <li>營業時間</li>
            <li>09:00 - 18:00</li>
        </ul>
    </div>
    <div class="footerMedia">
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-github"></i>
        <i class="fa-brands fa-whatsapp"></i>
    </div>
    <div class="footerCopyright mt-1"><i class="fa-regular fa-copyright"></i>Doany. All rights reserved.</div>
`
let footer = document.querySelector('.footerContainer')
function loadFooter() {
    footer.innerHTML = footerHTML
}
loadFooter()

