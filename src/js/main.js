window.addEventListener('DOMContentLoaded', function () {

    swipeView()
    chat()
    clock()

    function clock() {
        const elClock = document.querySelector('#clock')

        setInterval(() => {
            const date = new Date().toLocaleString('ru', {hour: '2-digit', minute: '2-digit', second: '2-digit' })

            elClock.innerHTML = date
        }, 1000);
    }

    function chat() {
        const form = document.querySelector('#chat-form')
        const bodyMsg = (text) => ( `<div class="chat__msg">${text}</div>` )
        const chatMsgs = document.querySelector('.chat__masseges')

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const msg = form.querySelector('#form-msg')

            console.log(msg.value)

            chatMsgs.insertAdjacentHTML('beforeend', bodyMsg(msg.value.replace(/([^>])\n+/g, '$1<br/>')))
            chatMsgs.scrollTo({top: chatMsgs.scrollHeight})
            
            form.reset()
        })
    }
    
    function swipeView() {
        const content = document.querySelector('.content')
        const contentItems = content.querySelectorAll('.content__item')
        let currentItem = 0
        const totalItems = contentItems.length

        let Xstart = 0
        let Xmove = 0
        let distance = 0
        let viewDist = 0
        let transX = content.style.transform.replace(/[^\-.\d]/g,"") || 0


        content.addEventListener('touchstart', touchStart)
        

        function touchStart(e) {
            Xstart = e.changedTouches[0].clientX
            transX = content.style.transform.replace(/[^\-.\d]/g,"") || 0

            Ystart = e.changedTouches[0].clientY

            content.addEventListener('touchmove', touchMove)
            content.addEventListener('touchend', touchEnd)
        }

        function touchMove(e) {
            Xmove = e.changedTouches[0].clientX
            distance = Xmove - Xstart

            //start проверки и прерывания на горизонтальные или вертикальные свайпы
            Ymove = e.changedTouches[0].clientY
            Ydist = Ymove - Ystart
            if (Math.abs(Ydist) > 0  && Math.abs(Ydist) >= Math.abs(distance)) {
                content.style.transform = `translateX(${transX}%)`
                return content.removeEventListener('touchmove', touchMove)
            }

            distance > 0 ? e.preventDefault() : null
            //end проверки и прерывания на горизонтальные или вертикальные свайпы

            //start произвольный сдвиг не более 50пикс
            viewDist = distance
            distance > 50 ? viewDist = 50 : null
            viewDist < -50 ? viewDist = -50 : null
            //end произвольный сдвиг не более 50пикс
            
            content.style.transform = `translateX(calc(${transX}% + ${viewDist}px))`
        }

        function touchEnd(e) {
            const distForSwipe = window.getComputedStyle(contentItems[0]).width.replace(/[^\-.\d]/g,"") * 0.3
            const distForBackSwipe = distForSwipe * -1

            if (distance < 0 && distance < distForBackSwipe) { //swipe to left - go right
                currentItem++
            } else if (distance > 0 && distance > distForSwipe) { //swipe to right - go left
                currentItem--
            }

            currentItem < 0 ? currentItem = 0 : currentItem >= totalItems ? currentItem = totalItems - 1 : null

            content.style.transform = `translateX(${currentItem * -100}%)`
        }
    }

});