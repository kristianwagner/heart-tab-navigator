import * as React from 'react';
import {
  StackRouter,
  createNavigator,
  NavigationRouteConfigMap,
  NavigationStackRouterConfig,
  CreateNavigatorConfig,
} from 'react-navigation';
import {
  StackNavigationConfig,
  StackNavigationOptions,
  StackNavigationProp,
} from 'react-navigation-stack/src//vendor/types';
// import {StackView} from 'react-navigation-stack';
import {NavigationView} from './NavigationView';

function createHeartTabNavigator(
  routeConfigMap: NavigationRouteConfigMap<
    StackNavigationOptions,
    StackNavigationProp
  >,
  stackConfig: CreateNavigatorConfig<
    StackNavigationConfig,
    NavigationStackRouterConfig,
    StackNavigationOptions,
    StackNavigationProp
  > = {},
) {
  const router = StackRouter(routeConfigMap, stackConfig);

  return createNavigator(
    // TODO: don't have time to fix it right now
    // @ts-ignore
    (navigatorProps) => <NavigationView {...navigatorProps} />,
    router,
    stackConfig,
  );
}

export default createHeartTabNavigator;
