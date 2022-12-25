import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider"


function IsMobile() {

    const { setScreenWidth } = useStateContext();
    function handleWindowSizeChange() {
        setScreenWidth(window.innerWidth); 
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {

            window.removeEventListener('resize', handleWindowSizeChange);
        } //eslint-disable-next-line
    }, []);


}

export default IsMobile