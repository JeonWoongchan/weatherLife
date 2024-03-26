import { useState, useEffect } from 'react';

const useInnerWidth = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleScroll = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return {innerWidth};
};

export default useInnerWidth;