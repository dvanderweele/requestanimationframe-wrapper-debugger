import { simple } from 'requestanimationframe-wrapper-debugger'

const logoOne = document.querySelector('#logo-one')

let angle = 0

const cbOne = dt => {
  dt /= 1000
  angle += dt * 360
  if (angle > 360) angle -= 360
  console.log(angle)
  logoOne.setAttribute('style', `transform:rotate(${angle}deg)`)
}

const looper1 = simple({
  limit: 5000,
  loopFunction: cbOne
})

looper1.start()
