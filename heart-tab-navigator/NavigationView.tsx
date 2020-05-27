import React, {useState} from 'react';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {SceneView} from 'react-navigation';

import * as d3 from 'd3';

import {Svg, Path, Circle} from 'react-native-svg';
import {
  TouchableOpacity,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const window = Dimensions.get('window');
const windowWidth = window.width;

export const NavigationView = (props) => {
  const {navigation, descriptors, screenProps} = props;
  const state = navigation?.state;
  const routes = state.routes;

  const [driver] = useState(new Animated.Value(0));

  const [modalDriver] = useState(new Animated.Value(0));

  const modalOpen = routes.length === 2;

  if (modalOpen) {
    Animated.spring(modalDriver, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.spring(modalDriver, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  const tabKey = routes[0]?.key;
  const tab = descriptors[tabKey] ?? {};

  const modalKey = routes[1]?.key;
  const modal = descriptors[modalKey];

  const circleRadius = 40;
  const circleMargin = 12;
  const circleTotal = circleRadius + circleMargin;
  const centerPoint = windowWidth / 2;

  // const lineData = [
  //   {
  //     x: 0,
  //     y: 80,
  //   },
  //   {
  //     x: 0,
  //     y: 0,
  //   },
  //   {
  //     x: centerPoint - 80,
  //     y: 0,
  //   },
  //   {
  //     x: centerPoint - 60,
  //     y: 8,
  //   },
  //   {
  //     x: centerPoint - 38,
  //     y: 36,
  //   },
  //   {
  //     x: centerPoint - 13,
  //     y: circleTotal,
  //   },
  //   {
  //     x: centerPoint + 13,
  //     y: circleTotal,
  //   },
  //   {
  //     x: centerPoint + 40,
  //     y: 36,
  //   },
  //   {
  //     x: centerPoint + 60,
  //     y: 8,
  //   },
  //   {
  //     x: centerPoint + 80,
  //     y: 0,
  //   },
  //   {
  //     x: windowWidth,
  //     y: 0,
  //   },
  //   {
  //     x: windowWidth,
  //     y: 80,
  //   },
  // ];

  const lineData2 = [
    {
      x: 0,
      y: 80,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: centerPoint - 80,
      y: 0,
    },
    {
      x: centerPoint - 60,
      y: 8,
    },
    {
      x: centerPoint - 40,
      y: circleTotal - 20,
    },
    {
      x: centerPoint - 22,
      y: circleTotal - 4,
    },
    {
      x: centerPoint,
      y: circleTotal,
    },
    {
      x: centerPoint + 20,
      y: circleTotal - 4,
    },
    {
      x: centerPoint + 40,
      y: circleTotal - 20,
    },
    {
      x: centerPoint + 60,
      y: 8,
    },
    {
      x: centerPoint + 80,
      y: 0,
    },
    {
      x: windowWidth,
      y: 0,
    },
    {
      x: windowWidth,
      y: 80,
    },
  ];

  const lineData = [
    {
      x: 0,
      y: 80,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: centerPoint - 80,
      y: 0,
    },
    {
      x: centerPoint - 60,
      y: 8,
    },
    {
      x: centerPoint - 31,
      y: circleTotal - 10,
    },
    {
      x: centerPoint - 12,
      y: circleTotal - 1,
    },
    {
      x: centerPoint + 12,
      y: circleTotal - 1,
    },
    {
      x: centerPoint + 31,
      y: circleTotal - 10,
    },
    {
      x: centerPoint + 60,
      y: 8,
    },
    {
      x: centerPoint + 80,
      y: 0,
    },
    {
      x: windowWidth,
      y: 0,
    },
    {
      x: windowWidth,
      y: 80,
    },
  ];

  const lineDataTop = [
    {
      x: 0,
      y: 80,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: centerPoint - 80,
      y: 0,
    },
    {
      x: centerPoint - 60,
      y: 0,
    },
    {
      x: centerPoint - 31,
      y: 0,
    },
    {
      x: centerPoint - 12,
      y: 0,
    },
    {
      x: centerPoint + 12,
      y: 0,
    },
    {
      x: centerPoint + 31,
      y: 0,
    },
    {
      x: centerPoint + 60,
      y: 0,
    },
    {
      x: centerPoint + 80,
      y: 0,
    },
    {
      x: windowWidth,
      y: 0,
    },
    {
      x: windowWidth,
      y: 80,
    },
  ];

  const scaleX = d3
    .scaleLinear()
    .domain([0, windowWidth])
    .range([0, windowWidth]);
  const scaleY = d3.scaleLinear().domain([0, 60]).range([0, 60]);
  const lineConstructor = d3
    .line()
    .x((d) => scaleX(d.x))
    .y((d) => scaleY(d.y))
    .curve(d3.curveCatmullRom);

  const linePath = lineConstructor(lineData);
  const linePathTop = lineConstructor(lineDataTop);

  const lineInterpolate = driver.interpolate({
    inputRange: [0, 0.35],
    outputRange: [linePath, linePathTop],
  });

  const handlePanGesture = (event) => {
    const state = event.nativeEvent.state;
    const percent = 1 - event.nativeEvent.absoluteY / 800;

    if (state === State.ACTIVE) {
      driver.setValue(percent);
    }

    if (state === State.END) {
      if (percent > 0.3 && !modalOpen) {
        navigation.navigate('/heart');
      } else {
        navigation.navigate('/tab');
      }
      Animated.spring(driver, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tab && (
          <SceneView
            screenProps={screenProps}
            navigation={tab.navigation}
            component={tab?.getComponent()}
          />
        )}
      </View>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: modalDriver.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.6],
            }),
            transform: [
              {
                translateY: modalDriver.interpolate({
                  inputRange: [0, 0.001, 1],
                  outputRange: [1000, 0, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('/tab');
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [
              {
                translateY: modalDriver.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [1000, 800, 100],
                }),
              },
            ],
          },
        ]}>
        <PanGestureHandler
          onHandlerStateChange={handlePanGesture}
          onGestureEvent={handlePanGesture}>
          <View style={styles.modalHeader}>
            <View style={styles.headerSvgContainer}>
              <Svg
                height={80}
                width={windowWidth}
                viewBox={`0 0 ${windowWidth} 80`}>
                <AnimatedPath
                  d={lineInterpolate}
                  fill="white"
                  strokeWidth="3"
                />
                {/* {lineData.map((point) => (
                  <Circle
                    r="3"
                    cx={scaleX(point.x)}
                    cy={scaleY(point.y)}
                    fill="red"
                  />
                ))} */}
              </Svg>
            </View>

            <Animated.View
              style={[
                styles.heartButton,
                {
                  transform: [
                    {
                      translateY: driver.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -250],
                      }),
                    },
                    {
                      scale: driver.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.5],
                      }),
                    },
                  ],
                },
                ,
              ]}>
              <TouchableOpacity
                style={styles.heartTouchable}
                onPress={() => {
                  if (!modalOpen) {
                    navigation.navigate('/heart');
                  } else {
                    navigation.navigate('/tab');
                  }
                }}>
                <View style={styles.heartIcon} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </PanGestureHandler>
        <View style={styles.modalScreen}>
          <SceneView
            screenProps={screenProps}
            navigation={modal?.navigation}
            component={modal?.getComponent?.() ?? View}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#213fd9',
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    top: 0,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // backgroundColor: '#FFF',
    // borderWidth: 1,
    // borderColor: 'lightgrey',
  },
  modalHeader: {
    height: 80,
    width: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: -40,
    height: 80,
    width: 80,
    left: '50%',
    marginLeft: -40,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  heartTouchable: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScreen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000',
  },
  touchable: {
    height: '100%',
    width: '100%',
  },

  headerSvgContainer: {
    height: '100%',
    width: '100%',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },

  heartIcon: {
    height: 32,
    width: 32,
    borderRadius: 6,
    backgroundColor: '#fcd303',
  },
});
