import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reveal: fades + slides an element in once, when it scrolls into view.
 * Respects prefers-reduced-motion by rendering with no animation at all.
 */
export function Reveal({
  children,
  as = 'div',
  className,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  delay = 0,
  duration = 0.5,
  amount = 0.2,
  once = true,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (shouldReduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const offset = 24
  const initial = { opacity: 0 }
  if (direction === 'up') initial.y = offset
  if (direction === 'down') initial.y = -offset
  if (direction === 'left') initial.x = offset
  if (direction === 'right') initial.x = -offset

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/**
 * StaggerGroup + StaggerItem: animate a list/grid of children in sequence
 * as the group scrolls into view, instead of all at once.
 */
export function StaggerGroup({
  children,
  as = 'div',
  className,
  staggerDelay = 0.08,
  amount = 0.15,
  once = true,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (shouldReduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({
  children,
  as = 'div',
  className,
  direction = 'up',
  duration = 0.45,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (shouldReduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const offset = 20
  const hidden = { opacity: 0 }
  if (direction === 'up') hidden.y = offset
  if (direction === 'down') hidden.y = -offset
  if (direction === 'left') hidden.x = offset
  if (direction === 'right') hidden.x = -offset

  return (
    <MotionTag
      className={className}
      variants={{
        hidden,
        visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
