def on_pin_pressed_p0():
    global paused, team
    paused = 1
    if team == 1:
        team = 0
        basic.show_string("Set team to 0.")
        paused = 0
    elif team == 0:
        team = 1
        basic.show_string("Set team to 1.")
        paused = 0
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def on_received_number(receivedNumber):
    global tug
    tug = receivedNumber
radio.on_received_number(on_received_number)

def on_logo_long_pressed():
    global paused, tug
    paused = 1
    if admin == 1:
        tug = 10
        radio.send_number(tug)
        paused = 0
input.on_logo_event(TouchButtonEvent.LONG_PRESSED, on_logo_long_pressed)

def on_pin_pressed_p1():
    global paused, admin
    paused = 1
    if admin == 1:
        admin = 0
        basic.show_string("Set admin to 0.")
        paused = 0
    elif admin == 0:
        admin = 1
        basic.show_string("Set admin to 1.")
        paused = 0
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)

def on_gesture_shake():
    global tug, paused
    if team == 0:
        tug += 1
        radio.send_number(tug)
    elif team == 1:
        tug += -1
        radio.send_number(tug)
    paused = 0
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

tug = 0
team = 0
admin = 0
paused = 0
radio.set_group(0)
radio.set_frequency_band(83)
radio.set_transmit_power(7)
paused = 0
admin = 0
team = 0
basic.show_string("Welcome to Tug of War!")

def on_forever():
    if paused == 0:
        led.plot_bar_graph(tug, 20)
basic.forever(on_forever)
