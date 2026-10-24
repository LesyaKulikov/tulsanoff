import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactsV1 } from '../components/ContactsVariants/ContactsV1'
import { ContactsV2 } from '../components/ContactsVariants/ContactsV2'
import { ContactsV3 } from '../components/ContactsVariants/ContactsV3'
import styles from './ContactsPreviewPage.module.css'

const VARIANTS = [
  { id: 'v1', label: 'Вариант 1 · Editorial', Component: ContactsV1 },
  { id: 'v2', label: 'Вариант 2 · Map Studio', Component: ContactsV2 },
  { id: 'v3', label: 'Вариант 3 · Concierge', Component: ContactsV3 },
] as const

export function ContactsPreviewPage() {
  const [active, setActive] = useState<(typeof VARIANTS)[number]['id']>('v1')
  const Active = VARIANTS.find((v) => v.id === active)!.Component

  return (
    <div className={styles.preview}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Active />
        </motion.div>
      </AnimatePresence>

      <div className={styles.switcher} role="tablist" aria-label="Варианты дизайна">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={active === v.id}
            className={active === v.id ? styles.tabActive : styles.tab}
            onClick={() => setActive(v.id)}
            data-test-id={`contacts-variant-${v.id}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}