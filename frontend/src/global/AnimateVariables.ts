import { stagger, type Variants } from "motion/react"

export const delayVariant: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: stagger(0.15)},
    },
    exit: {
        transition: {delayChildren: stagger(0.15)},
    },
}

export const translateVariant: Variants = {
    hidden: { translateX: -100, opacity: 0 },
    visible: {
        translateX: 0,
        opacity: 1,
        transition: { duration: 0.2 },
    },
    exit: {
        translateX: 100,
        opacity: 0,
        transition: { duration: 0.2 },
    },
}
