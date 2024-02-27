import * as React from 'react';

const useDebounce = (val, offset) => {
    const [debouncedVal, setDebouncedVal] = React.useState(val)

    React.useEffect(() => {
        const timeoutRef = setTimeout(() => {
            setDebouncedVal(val);
            // console.log(val)
        }, offset);
        
        return () => {
            clearTimeout(timeoutRef)
        }
    }, [val, offset])

    return debouncedVal;
}

export default useDebounce;