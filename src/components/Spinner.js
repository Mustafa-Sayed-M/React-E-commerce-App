import React from 'react'
import { BarLoader } from 'react-spinners'

function Spinner() {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <BarLoader className='text-center' color="#1d006f" />
        </div>
    )
}

export default Spinner;