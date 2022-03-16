import React from 'react'

const Footer = () => {
   const year = new Date().getFullYear();
   return (
      <div className='footer'>Copyright &copy; { year }</div>
   )
}

export default Footer