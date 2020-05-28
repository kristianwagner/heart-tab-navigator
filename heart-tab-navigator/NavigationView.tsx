import React, {useState} from 'react';
import {StyleSheet, View, Animated, Dimensions, Text} from 'react-native';
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

  const [svgMorphDriver] = useState(new Animated.Value(0));
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

  const lineDataUnder = [
    {
      x: 0,
      y: 80,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: centerPoint - 80 - 1,
      y: 0,
    },
    {
      x: centerPoint - 80,
      y: 0,
    },
    {
      x: centerPoint - 57,
      y: 10,
    },
    {
      x: centerPoint - 36,
      y: circleTotal - 10 + 50,
    },
    {
      x: centerPoint - 8,
      y: circleTotal - 2 + 55,
    },
    {
      x: centerPoint + 8,
      y: circleTotal - 2 + 55,
    },
    {
      x: centerPoint + 36,
      y: circleTotal - 10 + 50,
    },
    {
      x: centerPoint + 57,
      y: 10,
    },
    {
      x: centerPoint + 80,
      y: 0,
    },
    {
      x: centerPoint + 80 + 5,
      y: 0,
    },
    {
      x: windowWidth - 1,
      y: 0,
    },
    {
      x: windowWidth,
      y: 0,
    },
    {
      x: windowWidth,
      y: 1,
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
      y: 1,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: centerPoint - 80 - 1,
      y: 0,
    },
    {
      x: centerPoint - 80,
      y: 0,
    },
    {
      x: centerPoint - 57,
      y: 2,
    },
    {
      x: centerPoint - 33,
      y: circleTotal - 10,
    },
    {
      x: centerPoint - 9,
      y: circleTotal - 2,
    },
    {
      x: centerPoint + 9,
      y: circleTotal - 2,
    },
    {
      x: centerPoint + 33,
      y: circleTotal - 10,
    },
    {
      x: centerPoint + 57,
      y: 2,
    },
    {
      x: centerPoint + 80,
      y: 0,
    },
    {
      x: centerPoint + 80 + 5,
      y: 0,
    },
    {
      x: windowWidth - 1,
      y: 0,
    },
    {
      x: windowWidth,
      y: 0,
    },
    {
      x: windowWidth,
      y: 1,
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
      y: 1,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: centerPoint - 200 - 5,
      y: 0,
    },
    {
      x: centerPoint - 200,
      y: 0,
    },
    {
      x: centerPoint - 87,
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
      x: centerPoint + 87,
      y: 0,
    },
    {
      x: centerPoint + 200,
      y: 0,
    },
    {
      x: centerPoint + 200 + 5,
      y: 0,
    },
    {
      x: windowWidth - 1,
      y: 0,
    },
    {
      x: windowWidth,
      y: 0,
    },
    {
      x: windowWidth,
      y: 1,
    },
    {
      x: windowWidth,
      y: 80,
    },
  ];

  const lineDataInverted = [
    {
      x: 0,
      y: 80,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: centerPoint - 200 - 1,
      y: 0,
    },
    {
      x: centerPoint - 200,
      y: 0,
    },
    {
      x: centerPoint - 87,
      y: -2,
    },
    {
      x: centerPoint - 24,
      y: -(circleTotal - 10),
    },
    {
      x: centerPoint - 10,
      y: -(circleTotal - 1),
    },
    {
      x: centerPoint + 10,
      y: -(circleTotal - 1),
    },
    {
      x: centerPoint + 24,
      y: -(circleTotal - 10),
    },
    {
      x: centerPoint + 87,
      y: -2,
    },
    {
      x: centerPoint + 200,
      y: 0,
    },
    {
      x: centerPoint + 200 + 5,
      y: 0,
    },
    {
      x: windowWidth - 1,
      y: 0,
    },
    {
      x: windowWidth,
      y: 0,
    },
    {
      x: windowWidth,
      y: 1,
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
    .curve(d3.curveBasis);

  const linePathUnder = lineConstructor(lineDataUnder);
  const linePath = lineConstructor(lineData);
  const linePathTop = lineConstructor(lineDataTop);
  const linePathInverted = lineConstructor(lineDataInverted);

  const lineInterpolate = svgMorphDriver.interpolate({
    inputRange: [-0.3, 0, 0.25, 0.7],
    outputRange: [linePathUnder, linePath, linePathTop, linePathInverted],
  });

  const handlePanGesture = (event) => {
    const panState = event.nativeEvent.state;
    const translationY = event.nativeEvent.translationY;
    const panPercent = -translationY / 800;

    // Gesture is active
    if (panState === State.ACTIVE) {
      // Start moving the modal if above 0.3 percent
      if (panPercent > 0.3) {
        const modalPercent = (panPercent - 0.3) / 2;
        modalDriver.setValue(modalPercent);
      }

      if (!modalOpen) {
        svgMorphDriver.setValue(panPercent);
      }

      if (modalOpen) {
        svgMorphDriver.setValue(panPercent / 6);
      }

      if (modalOpen && panPercent < -0.3) {
        const delta = panPercent + 0.3;
        const modalPercent = 1 + delta / 4;
        modalDriver.setValue(modalPercent);
      }
    }

    // Gesture has ended
    if (panState === State.END || panState === State.CANCELLED) {
      if (panPercent > 0.3 && !modalOpen) {
        navigation.navigate('/heart');
      } else {
        navigation.navigate('/tab');
      }

      Animated.spring(svgMorphDriver, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
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
              <View style={{marginTop: -120}}>
                <Svg
                  height={200}
                  width={windowWidth}
                  viewBox={`0 -100 ${windowWidth} 180`}>
                  <AnimatedPath
                    d={lineInterpolate}
                    fill="white"
                    strokeWidth="3"
                  />
                  {/* {lineData.map((point) => {
                    return (
                      <Circle
                        r={5}
                        fill="red"
                        cx={scaleX(point.x)}
                        cy={scaleX(point.y)}
                      />
                    );
                  })} */}
                </Svg>
              </View>

              <Animated.View
                style={[
                  styles.tabContent,
                  {
                    opacity: modalDriver.interpolate({
                      inputRange: [-1, 0, 0.1],
                      outputRange: [1, 1, 0],
                    }),
                  },
                ]}>
                <View style={styles.tabLeft}>
                  <View style={styles.tabItem}>
                    <View style={styles.tabItemIcon} />
                    <Text numberOfLines={1} style={styles.tabText}>
                      Spil
                    </Text>
                  </View>
                  <View style={styles.tabItem}>
                    <View style={styles.tabItemIcon} />
                    <Text numberOfLines={1} style={styles.tabText}>
                      Mine kuponer
                    </Text>
                  </View>
                </View>
                <View style={styles.tabCenter} />
                <View style={styles.tabRight}>
                  <View style={styles.tabItem}>
                    <View style={styles.tabItemIcon} />
                    <Text numberOfLines={1} style={styles.tabText}>
                      Vindertal
                    </Text>
                  </View>
                  <View style={styles.tabItem}>
                    <View style={styles.tabItemIcon} />
                    <Text numberOfLines={1} style={styles.tabText}>
                      Scan Kupon
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </View>

            <Animated.View
              style={[
                styles.heartButton,
                {
                  transform: [
                    {
                      translateY: svgMorphDriver.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -250],
                      }),
                    },
                    {
                      scale: svgMorphDriver.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.5],
                      }),
                    },
                  ],
                },
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
    marginBottom: 16,
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

  tabContent: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    right: 0,
    left: 0,
    height: 80,
  },

  tabLeft: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  tabCenter: {
    width: 100,
  },
  tabRight: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemIcon: {
    height: 32,
    width: 32,
    borderRadius: 6,
    backgroundColor: '#ECECEC',
  },
  tabText: {
    color: '#000',
    fontSize: 10,
    marginTop: 6,
  },
});
