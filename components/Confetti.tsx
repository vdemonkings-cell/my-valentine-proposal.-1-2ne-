import React from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent: React.FC = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <Confetti width={width} height={height} />;
};

export default ConfettiComponent;