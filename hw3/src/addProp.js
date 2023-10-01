import React from 'react';

const addProp = (WrappedComponent) => {
    return (props) => {
        return <WrappedComponent {...props} newProp="This is a new prop!" />;
    }
}

export default addProp;
