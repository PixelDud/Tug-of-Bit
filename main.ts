input.onPinPressed(TouchPin.P0, function () {
    paused = 1
    if (team == 1) {
        team = 0
        basic.showString("Set team to 0.")
        paused = 0
    } else if (team == 0) {
        team = 1
        basic.showString("Set team to 1.")
        paused = 0
    }
})
radio.onReceivedNumber(function (receivedNumber) {
    tug = receivedNumber
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    paused = 1
    if (admin == 1) {
        tug = 10
        radio.sendNumber(tug)
        paused = 0
    }
})
input.onPinPressed(TouchPin.P1, function () {
    paused = 1
    if (admin == 1) {
        admin = 0
        basic.showString("Set admin to 0.")
        paused = 0
    } else if (admin == 0) {
        admin = 1
        basic.showString("Set admin to 1.")
        paused = 0
    }
})
input.onGesture(Gesture.Shake, function () {
    paused = 0
    if (team == 0) {
        tug += 1
        radio.sendNumber(tug)
    } else if (team == 1) {
        tug += -1
        radio.sendNumber(tug)
    }
})
let tug = 0
let team = 0
let admin = 0
let paused = 0
radio.setGroup(0)
radio.setTransmitPower(7)
paused = 0
admin = 0
team = 0
basic.showString("Welcome to Tug of War!")
basic.forever(function () {
    while (paused == 0) {
        led.plotBarGraph(
        tug,
        20
        )
    }
})
