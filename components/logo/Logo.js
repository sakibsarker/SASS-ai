import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const Logo = () => {
  return (
    <div className="text-3xl text-center py-4 font-heading">
      Blog Generator
      <FontAwesomeIcon icon={faBrain} className="text-2xl text-yellow-300 px-1"/>
      </div>
  )
}
