import React, { useRef, useState, useEffect } from 'react';
import Message from '../Message/Message';
import arrowIcon from '../../../../../assets/img/chats/arrow-down.svg';

const Messages = ({ messages }) => {

    const [showButton, setShowButton] = useState(false);
    const containerRef = useRef();

    function scrollToBottom() {
        if (containerRef.current) {
            const element = containerRef.current;
            const scrollHeight = element.scrollHeight;
            const scrollTop = element.scrollTop;
            const clientHeight = element.clientHeight;

            const targetScrollTop = scrollHeight - clientHeight;
            const duration = 300; // Длительность анимации в миллисекундах
            const startTime = performance.now();

            function animateScroll(currentTime) {
                const elapsedTime = currentTime - startTime;
                const scrollTo = easeInOutCubic(elapsedTime, scrollTop, targetScrollTop - scrollTop, duration);
                element.scrollTo(0, scrollTo);

                if (elapsedTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
            }

            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }

            requestAnimationFrame(animateScroll);
        }
    }

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        const scrollDifference = scrollHeight - (scrollTop + clientHeight);
        setShowButton(!(scrollDifference <= 100));
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className='container2_mobile' id="chat" ref={containerRef} onScroll={handleScroll}>
            {messages.map((message, i) => <div key={i}><Message message={message} /></div>)}
            {showButton && <div id='scroll-button' className='btn_toBottom' onClick={scrollToBottom}><img src={arrowIcon} alt="arrow-down"></img></div>}
        </div>
    )
}

export default Messages;