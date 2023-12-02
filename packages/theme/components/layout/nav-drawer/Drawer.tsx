import React from 'react'
import {Box} from '@primer/react'
import {AnimatePresence, motion} from 'framer-motion'
import {FocusOn} from 'react-focus-on'

export function Drawer({isOpen, onDismiss, children}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          // These event handlers fix a bug that caused links below the fold
          // to be unclickable in macOS Safari.
          // Reference: https://github.com/theKashey/react-focus-lock/issues/79
          onMouseDown={event => event.preventDefault()}
          onClick={(event: React.MouseEvent<HTMLElement>) => (event.target as HTMLElement).focus()}
        >
          <FocusOn returnFocus={true} onEscapeKey={() => onDismiss()}>
            <Box
              key="overlay"
              as={motion.div}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{type: 'tween'}}
              onClick={() => onDismiss()}
              sx={{top: 0, right: 0, bottom: 0, left: 0, bg: 'rgba(0, 0, 0, 0.5)', position: 'fixed', zIndex: 1}}
            />

            <Box
              key="drawer"
              as={motion.div}
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{type: 'tween', duration: 0.2}}
              style={{zIndex: 1}}
              sx={{width: 300, top: 0, right: 0, bottom: 0, bg: 'gray.0', position: 'fixed'}}
            >
              {children}
            </Box>
          </FocusOn>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
