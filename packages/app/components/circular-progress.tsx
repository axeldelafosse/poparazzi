import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  size: number;
  strokeWidth: number;
  progress: Readonly<Animated.SharedValue<number>>;
  showOverlay?: boolean;
  strokeColor?: string;
};

// Progress goes from 0 to 1
const CircularProgress = ({
  size,
  strokeWidth,
  progress,
  showOverlay,
  strokeColor = 'rgba(255, 255, 255, 0.2)'
}: Props) => {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = r * 2 * Math.PI;
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * progress.value
  }));

  return (
    <>
      <Svg
        width={size}
        height={size}
        style={styles.container}
        viewBox={`0 0 ${size} ${size}`}
      >
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={r}
          stroke="white"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          animatedProps={animatedProps}
        />
      </Svg>

      {showOverlay && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            width: size,
            height: size,
            borderRadius: 50,
            borderColor: 'black',
            borderWidth: 0.5
          }}
        >
          <Svg width={size} height={size} viewBox="0 0 250 250" fill="none">
            <Path d="M133 30.5H110L103.5 1H136L133 30.5Z" fill="black" />
            <Path
              d="M177.5 43.5L195.5 57L218.5 39L193 14.5L177.5 43.5Z"
              fill="black"
            />
            <Path
              d="M244 87.5L218.5 99L223.5 121L249 118L244 87.5Z"
              fill="black"
            />
            <Path
              d="M244 175L215.5 166L206.5 187L227 201.5L244 175Z"
              fill="black"
            />
            <Path
              d="M99.5 248.5L106.5 225L82.5 218L73 240.5L99.5 248.5Z"
              fill="black"
            />
            <Path
              d="M11.5 182.5L35 169L47 190.5L24 207.5L11.5 182.5Z"
              fill="black"
            />
            <Path d="M24 127H0.5V96L29.5 103L24 127Z" fill="black" />
            <Path
              d="M29.5 43.5L50 62.5L67 46.5L50 21.5L29.5 43.5Z"
              fill="black"
            />
            <Path
              d="M158.5 248.5L149 225L170.5 215L184 240.5L158.5 248.5Z"
              fill="black"
            />
            <Path d="M133 30.5H110L103.5 1H136L133 30.5Z" stroke="black" />
            <Path
              d="M177.5 43.5L195.5 57L218.5 39L193 14.5L177.5 43.5Z"
              stroke="black"
            />
            <Path
              d="M244 87.5L218.5 99L223.5 121L249 118L244 87.5Z"
              stroke="black"
            />
            <Path
              d="M244 175L215.5 166L206.5 187L227 201.5L244 175Z"
              stroke="black"
            />
            <Path
              d="M99.5 248.5L106.5 225L82.5 218L73 240.5L99.5 248.5Z"
              stroke="black"
            />
            <Path
              d="M11.5 182.5L35 169L47 190.5L24 207.5L11.5 182.5Z"
              stroke="black"
            />
            <Path d="M24 127H0.5V96L29.5 103L24 127Z" stroke="black" />
            <Path
              d="M29.5 43.5L50 62.5L67 46.5L50 21.5L29.5 43.5Z"
              stroke="black"
            />
            <Path
              d="M158.5 248.5L149 225L170.5 215L184 240.5L158.5 248.5Z"
              stroke="black"
            />
          </Svg>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }]
  }
});

export { CircularProgress };
