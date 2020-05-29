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

// Generate keys for unamed based routes for tab and modal
let uniqueBaseId: string = `id-${Date.now()}`;
let uuidCount: number = 0;

function generateKey(): string {
  return `${uniqueBaseId}-${uuidCount++}`;
}

interface TabModalNavigator {
  tabRoutes: {
    [routeName: string]: {
      screen: NavigationComponent<any, NavigationScreenProp<NavigationRoute>>;
      tabIcon: ({}: TabIconProps) => React.ReactElement;
      tabLabel: string;
    };
  };
  tabKey?: string;
  modalComponent: NavigationComponent<
    any,
    NavigationScreenProp<NavigationRoute>
  >;
  modalKey?: string;
  tabButtonComponent?: () => React.ReactElement;
}

export function createModalTabNavigator({
  tabRoutes,
  modalComponent,
  modalKey = generateKey(),
  tabKey = generateKey(),
  tabButtonComponent,
}: TabModalNavigator) {
  const routeConfigMap = {
    [tabKey]: createSwitchNavigator(tabRoutes),
    [modalKey]: modalComponent,
  };

  const config = {
    tabItems: tabRoutes,
    modalKey,
    tabKey,
    tabButtonComponent,
  };

  const router = Router(routeConfigMap, config);

  return createNavigator(
    (navigatorProps) => <NavigationView {...navigatorProps} />,
    router,
    config,
  );
}
