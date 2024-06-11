// components/LayoutWrapper.js

import Navbar from '@/components/ui/navbar';


const LayoutWrapper = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default LayoutWrapper;
