input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    if (admin == 1) {
        tug = tugMax / 2
        radio.sendValue("tug", tug)
        play = 1
        radio.sendValue("play", play)
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "joined" && admin == 1) {
        radio.sendValue("tug", tug)
        radio.sendValue("play", play)
    }
})
input.onGesture(Gesture.Shake, function () {
    if (team == 0) {
        tug += -1
        radio.sendValue("tug", tug)
    } else if (team == 1) {
        tug += 1
        radio.sendValue("tug", tug)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "tug") {
        tug = value
    } else if (name == "play") {
        play = value
    }
})
let tug = 0
let tugMax = 0
let play = 0
let team = 0
let admin = 0
radio.setGroup(255)
radio.setTransmitPower(7)
admin = 0
team = 1
play = 0
tugMax = 20
if (admin == 1) {
    tug = tugMax / 2
} else {
    radio.sendString("joined")
}
basic.forever(function () {
    if (play == 1) {
        if (tug == 0) {
            basic.showString("Darkness wins!")
            if (team == 0) {
                basic.showIcon(IconNames.Happy)
            } else {
                basic.showIcon(IconNames.Sad)
            }
        } else if (tug == tugMax) {
            basic.showString("Light wins!")
            if (team == 0) {
                basic.showIcon(IconNames.Sad)
            } else {
                basic.showIcon(IconNames.Happy)
            }
        } else {
            led.plotBarGraph(
            tug,
            tugMax
            )
        }
    }
})
