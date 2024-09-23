// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserLock, faUserXmark, faClipboardUser, faUserPen, faArrowRightFromBracket, faPaperclip, faTrash, faMicrophone, faUserMinus, faXmark, faEllipsisVertical, faPlus, faCheck, faMagnifyingGlass, faClockRotateLeft, faUserGroup, faUserPlus, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = true

library.add(faUserLock, faUserXmark, faClipboardUser, faUserPen, faArrowRightFromBracket, faPaperclip, faTrash, faMicrophone, faUserMinus, faXmark, faEllipsisVertical, faPlus, faCheck, faMagnifyingGlass, faClockRotateLeft, faUserGroup, faUserPlus, faLocationArrow)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
