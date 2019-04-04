const isAuth = () => window.localStorage.getItem('token')

const navigationGuard = (to, from, next) => {
  if (to.name === 'login' && isAuth()) {
    return next({ name: from.name })
  }

  if (to.name !== 'login' && to.meta.isPublic) {
    return next()
  }

  if (to.name !== 'login' && !isAuth()) {
    return next({ name: 'login' })
  }
  next()
}

export default navigationGuard
