import React from 'react'

const Spinner = ({ show, children }) => {
    return (
        <>
            {
                show ? <div className='text-center'>
                    <div className='spinner-border text-primary m-3'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
                    : <>{children}</>
            }
        </>
    )
}

export default Spinner