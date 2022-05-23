import React, { useState } from 'react'

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  function closeModal() {
    setIsModalOpen(false)
  }
  function openModal() {
    setIsModalOpen(true)
  }
  return {closeModal,openModal,isModalOpen}
}
