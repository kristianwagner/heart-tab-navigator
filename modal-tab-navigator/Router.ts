import {SwitchRouter} from 'react-navigation';

export const Router = (routeConfigs: any, config: any) => {
  config = {...config};
  config.resetOnBlur = false;
  config.backBehavior = 'initialRoute';

  const switchRouter = SwitchRouter(routeConfigs, config);
  return switchRouter;
};
