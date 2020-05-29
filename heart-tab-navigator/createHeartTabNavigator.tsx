import * as React from 'react';
import {
  createNavigator,
  createSwitchNavigator,
  NavigationComponent,
  NavigationScreenProp,
  NavigationRoute,
} from 'react-navigation';

import {NavigationView, TabIconProps} from './NavigationView';
import {Router} from './Router';
import {StackNavigationOptions} from 'react-navigation-stack/lib/typescript/src/vendor/types';

// Generate keys for unamed based routes for tab and modal
let uniqueBaseId: string = `id-${Date.now()}`;
let uuidCount: number = 0;

function generateKey(): string {
  return `${uniqueBaseId}-${uuidCount++}`;
}

interface TabModalNavigator {
  tabRoutes: {
    [routeName: string]: {
      screen: NavigationComponent<
        StackNavigationOptions,
        NavigationScreenProp<NavigationRoute>
      >;
      tabIcon: ({}: TabIconProps) => React.ReactElement;
      tabLabel: string;
    };
  };
  tabKey?: string;
  modalComponent: NavigationComponent<
    StackNavigationOptions,
    NavigationScreenProp<NavigationRoute>
  >;
  modalKey?: string;
}

function createHeartTabNavigator({
  tabRoutes,
  modalComponent,
  modalKey = generateKey(),
  tabKey = generateKey(),
}: TabModalNavigator) {
  const routeConfigMap = {
    [tabKey]: createSwitchNavigator(tabRoutes),
    [modalKey]: modalComponent,
  };

  const config = {
    tabItems: tabRoutes,
    modalKey,
    tabKey,
  };

  const router = Router(routeConfigMap, config);

  return createNavigator(
    (navigatorProps) => <NavigationView {...navigatorProps} />,
    router,
    config,
  );
}

export default createHeartTabNavigator;
