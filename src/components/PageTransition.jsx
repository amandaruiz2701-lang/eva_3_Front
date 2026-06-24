import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      exit={fadeUp.exit}
      transition={fadeUp.transition}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition