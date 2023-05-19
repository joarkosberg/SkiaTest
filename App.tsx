import {Canvas, useFont, Text as SkText} from '@shopify/react-native-skia';
import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.spacer} />
      <Text style={styles.title}>Skia Test</Text>
      <View style={styles.spacer} />
      <TestComponent />
    </SafeAreaView>
  );
}

const exampleValues = [
  {
    title: '123',
  },
  {
    title: '54321',
  },
  {
    title: '6543221',
  },
  {
    title: '4',
  },
];

function TestComponent(): JSX.Element {
  const title = useSharedValue<string>(exampleValues[0].title);

  return (
    <>
      <View style={styles.row}>
        {exampleValues.map((value, index) => {
          return (
            <Button
              key={index}
              title={`Value ${index}`}
              onPress={() => {
                title.value = value.title;
              }}
            />
          );
        })}
      </View>
      <View style={styles.spacer} />
      <AnimatedText title={title} />
    </>
  );
}

type AnimatedTextProps = {
  title: SharedValue<string>;
};

const robotoFont = require('./Roboto-Regular.ttf');

function AnimatedText({title}: AnimatedTextProps): JSX.Element {
  const titleFontSize = 24;
  const lineHeight = titleFontSize * 1.4;
  const offsetMultiplier = 1.2;
  const titleFont = useFont(robotoFont, titleFontSize);

  const animatedStyle = useAnimatedStyle(() => {
    const newSize =
      (titleFont?.getTextWidth(title.value) ?? 0) * offsetMultiplier;
    return {
      width: newSize,
      height: lineHeight,
    };
  });

  return (
    <View style={styles.row}>
      <Animated.View style={animatedStyle}>
        <Canvas
          style={{
            flex: 1,
          }}>
          <SkText text={title} font={titleFont} y={titleFontSize} x={0} />
        </Canvas>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  spacer: {
    height: 22,
  },
});

export default App;
