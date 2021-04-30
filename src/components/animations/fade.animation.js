import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

export const FadeInView = ({ duration = 1500, ...props }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, //animation goes from initial value up in the 'useRef' declaration to this value. Here, that is 0 to 1.
            duration: duration,
            useNativeDriver: true
        }).start()
    }, [fadeAnim, duration])

    return (
        <Animated.View //special animatable view
            style={{
                ...props.style,
                opacity: fadeAnim, //Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    )
}