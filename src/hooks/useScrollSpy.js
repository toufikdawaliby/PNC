import { useState, useEffect, useCallback } from 'react'

export const useScrollSpy = (sectionIds, offset = 80) => {
  const [activeSection, setActiveSection] = useState('')

  const handleScroll = useCallback(() => {
    const scrollPos = window.scrollY + offset

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i])
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(sectionIds[i])
        return
      }
    }
    setActiveSection('')
  }, [sectionIds, offset])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return activeSection
}
