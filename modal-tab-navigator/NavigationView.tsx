import React, {useState, ReactElement, FunctionComponent} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import {
  SceneView,
  NavigationDescriptor,
  NavigationInjectedProps,
} from 'react-navigation';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

import * as d3 from 'd3';

import {Svg, Path} from 'react-native-svg';
import {
  TouchableOpacity,
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const window = Dimensions.get('window');
const windowWidth = window.width;
const windowHeight = window.height;

export interface TabIconProps {
  isSelected: boolean;
}

type TabIcon = ({}: TabIconProps) => ReactElement;

type NavigationViewProps = {
  descriptors: {[key: string]: NavigationDescriptor};
  navigationConfig: {
    tabItems: {
      [key: string]: {
        screen: any;
        tabIcon: TabIcon;
        tabLabel: any;
      };
    };
    tabKey: string;
    modalKey: string;
    tabButtonComponent?: () => React.ReactElement;
  };
  screenProps?: unknown;
} & NavigationInjectedProps;

interface TabItem {
  isSelected: boolean;
  key: string;
  routeName: string;
  icon: TabIcon;
  label: string;
}

const defaultIcon: FunctionComponent<TabIconProps> = ({isSelected}) => {
  const borderColor = isSelected ? '#3d05b5' : '#EFEFEF';
  return (
    <View
      style={[
        styles.tabItemIcon,
        {
          borderColor,
        },
      ]}
    />
  );
};

export const NavigationView = (props: NavigationViewProps) => {
  const {navigation, descriptors, screenProps, navigationConfig} = props;
  const state = navigation?.state;
  const routes = state.routes;
  const tabHeight = 80;
  const circleRadius = 40;
  const circleMargin = 12;
  const circleOuterRadius = circleRadius + circleMargin;
  const centerPoint = windowWidth / 2;
  const tabItemConfig = navigationConfig.tabItems;

  // Get base keys for tab and modal
  const tabKey = navigationConfig.tabKey;
  const modalKey = navigationConfig.modalKey;

  // Calculate top inset
  const iosTopInset =
    StaticSafeAreaInsets.safeAreaInsetsTop === 0
      ? 20
      : StaticSafeAreaInsets.safeAreaInsetsTop;
  const androidTopInset = StatusBar.currentHeight;
  const topInset = (Platform.OS === 'ios' ? iosTopInset : androidTopInset) || 0;

  // Calculate bottom inset
  const safeAreaBottom = StaticSafeAreaInsets.safeAreaInsetsBottom;
  const bottomInset = safeAreaBottom > 0 ? safeAreaBottom - 24 : 0;
  const modalMarginTop = topInset + circleOuterRadius;

  // Create tab items
  const tabObject = routes.find((route) => route.key === tabKey);
  const tabRoutes = tabObject?.routes ?? [];
  const selectedTabIndex = tabObject?.index;
  const tabItems: TabItem[] = tabRoutes.map((route, index) => {
    const isSelected = index === selectedTabIndex;
    const itemConfig = tabItemConfig[route.key];
    const itemLabel = itemConfig?.tabLabel ?? route?.routeName ?? '';
    return {
      icon: itemConfig.tabIcon || defaultIcon,
      label: itemLabel,
      isSelected,
      routeName: route.routeName,
      key: route.key,
    };
  });

  // Split tabs into left and right
  const numberOfTabs = tabItems.length;
  const leftTabItems = tabItems.slice(0, Math.ceil(numberOfTabs / 2));
  const rightTabItems = tabItems.slice(
    Math.ceil(numberOfTabs / 2),
    numberOfTabs,
  );

  // Create svg morph drivers
  const [svgMorphDriver] = useState(new Animated.Value(0));
  const [modalDriver] = useState(new Animated.Value(0));
  const modalOpen = state.index === 1;

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

  const tab = descriptors[tabKey] ?? {};
  const modal = descriptors[modalKey];

  const lineDataPullDown = [
    {
      x: 0,
      y: tabHeight,
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
      y: circleOuterRadius - 10 + 50,
    },
    {
      x: centerPoint - 8,
      y: circleOuterRadius - 2 + 55,
    },
    {
      x: centerPoint + 8,
      y: circleOuterRadius - 2 + 55,
    },
    {
      x: centerPoint + 36,
      y: circleOuterRadius - 10 + 50,
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
      x: centerPoint + 80 + 1,
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
      y: tabHeight,
    },
  ];

  const lineDataStart = [
    {
      x: 0,
      y: tabHeight,
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
      y: circleOuterRadius - 10,
    },
    {
      x: centerPoint - 9,
      y: circleOuterRadius - 2,
    },
    {
      x: centerPoint + 9,
      y: circleOuterRadius - 2,
    },
    {
      x: centerPoint + 33,
      y: circleOuterRadius - 10,
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
      y: tabHeight,
    },
  ];

  const lineDataFlat = [
    {
      x: 0,
      y: tabHeight,
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
      y: tabHeight,
    },
  ];

  const lineDataUp = [
    {
      x: 0,
      y: tabHeight,
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
      y: -(circleOuterRadius - 10),
    },
    {
      x: centerPoint - 10,
      y: -(circleOuterRadius - 1),
    },
    {
      x: centerPoint + 10,
      y: -(circleOuterRadius - 1),
    },
    {
      x: centerPoint + 24,
      y: -(circleOuterRadius - 10),
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
      y: tabHeight,
    },
  ];

  const scaleX = d3
    .scaleLinear()
    .domain([0, windowWidth])
    .range([0, windowWidth]);
  const scaleY = d3.scaleLinear().domain([0, tabHeight]).range([0, tabHeight]);

  interface LinePoint {
    x: number;
    y: number;
  }
  const createLine = (data: LinePoint[]) => {
    const lineConstructor = d3
      .line<LinePoint>()
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y))
      .curve(d3.curveBasis);
    return lineConstructor(data) || '';
  };

  const linePathPullDown = createLine(lineDataPullDown);
  const linePathStart = createLine(lineDataStart);
  const linePathFlat = createLine(lineDataFlat);
  const linePathPullUp = createLine(lineDataUp);

  const lineInterpolate = svgMorphDriver.interpolate({
    inputRange: [-0.3, 0, 0.25, 0.7],
    outputRange: [
      linePathPullDown,
      linePathStart,
      linePathFlat,
      linePathPullUp,
    ],
  });

  const handlePanGesture = (
    event: PanGestureHandlerStateChangeEvent | PanGestureHandlerGestureEvent,
  ) => {
    const panState = event.nativeEvent.state;
    const translationY = event.nativeEvent.translationY;
    const panPercent = -translationY / windowHeight;

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
    if (
      panState === State.END ||
      panState === State.CANCELLED ||
      panState === State.FAILED
    ) {
      if (panPercent > 0.3 && !modalOpen) {
        navigation.navigate(modalKey);
      } else {
        navigation.navigate(tabKey);
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
                  outputRange: [windowHeight, 0, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate(tabKey);
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            height: windowHeight - modalMarginTop,
            transform: [
              {
                translateY: modalDriver.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [
                    windowHeight,
                    windowHeight - tabHeight - bottomInset,
                    modalMarginTop,
                  ],
                }),
              },
            ],
          },
        ]}>
        {/* Absolute View to hide overlay when modal overextends shen animating springs */}
        <View style={styles.bottomUnderlay} />

        <PanGestureHandler
          onHandlerStateChange={handlePanGesture}
          onGestureEvent={handlePanGesture}>
          <View style={styles.modalHeader}>
            <View style={styles.headerSvgContainer}>
              {/*
                Move svg up with margin top
                so the svg can invert upwards
                without being cut off when it goes negative
                This is also why viewbox Y (second value) is set to the same as margin top to offset it
              */}
              <View style={{marginTop: -tabHeight}} pointerEvents="none">
                <Svg
                  height={180}
                  width={windowWidth}
                  viewBox={`0 -${tabHeight} ${windowWidth} 180`}>
                  <AnimatedPath
                    d={lineInterpolate}
                    fill="white"
                    strokeWidth="3"
                  />
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
                  {leftTabItems.map((item) => (
                    <View style={styles.tabItem} key={item.key}>
                      <TouchableOpacity
                        style={styles.tabItemTouchable}
                        onPress={() => {
                          navigation.navigate(item.key);
                        }}>
                        {item.icon({isSelected: item.isSelected})}
                        <Text numberOfLines={1} style={styles.tabText}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <View
                  style={[
                    styles.tabCenter,
                    // set width dynamically to get space for tab labels on small screens
                    // Optimized for 4 tabs as this is the most common use case
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      width: windowWidth < 400 ? 100 : 110,
                    },
                  ]}
                />
                <View style={styles.tabRight}>
                  {rightTabItems.map((item) => (
                    <View style={styles.tabItem} key={item.key}>
                      <TouchableOpacity
                        style={styles.tabItemTouchable}
                        onPress={() => {
                          navigation.navigate(item.key);
                        }}>
                        {item.icon({isSelected: item.isSelected})}
                        <Text numberOfLines={1} style={styles.tabText}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
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
                        outputRange: [1, 1.75],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.heartTouchable}
                onPress={() => {
                  if (!modalOpen) {
                    navigation.navigate(modalKey);
                  } else {
                    navigation.navigate(tabKey);
                  }
                }}>
                {navigationConfig.tabButtonComponent ? (
                  navigationConfig.tabButtonComponent?.()
                ) : (
                  <View style={styles.heartIcon} />
                )}
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
    flex: 1,
    top: 0,
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
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  heartTouchable: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScreen: {
    backgroundColor: '#FFF',
    flex: 1,
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
    paddingLeft: 4,
  },
  tabCenter: {
    width: 100,
  },
  tabRight: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 4,
  },
  tabItem: {
    flex: 1,
    height: '100%',
  },
  tabItemIcon: {
    height: 32,
    width: 32,
    borderRadius: 6,
    backgroundColor: '#ECECEC',
    borderWidth: 2,
  },
  tabText: {
    color: '#000',
    fontSize: 10,
    marginTop: 6,
  },
  tabItemTouchable: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomUnderlay: {
    position: 'absolute',
    height: 100,
    width: '100%',
    backgroundColor: '#FFF',
    bottom: -100,
  },
});
