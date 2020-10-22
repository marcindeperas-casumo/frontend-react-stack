//@flow
import * as React from "react";
import * as R from "ramda";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { ProfileIcon } from "Components/ProfileIcon";

const bubbleTypes = Object.freeze({
  none: "none",
  profileIcon: "profileIcon",
});

const bubbleIcons = Object.freeze({
  [bubbleTypes.none]: null,
  [bubbleTypes.profileIcon]: ProfileIcon,
});

export type SumoIconContextType = {
  updateProps: (iconId: string, data: Object) => void,
  addIcon: (
    iconId: string,
    icon: React.Component<*, *> | React.StatelessFunctionalComponent<*>
  ) => string,
  removeIcon: (iconId: string, done?: () => void) => void,
  hasIcon: (iconId: string) => boolean,
  primaryIcon: ?React.Component<*, *> | ?React.StatelessFunctionalComponent<*>,
  primaryIconType: string,
  primaryIconProps: Object,
  secondaryIcon:
    | ?React.Component<*, *>
    | ?React.StatelessFunctionalComponent<*>,
  secondaryIconType: string,
  secondaryIconProps: Object,
  isTransitionRunning: boolean,
};

export const SumoIconContext = React.createContext<SumoIconContextType>({
  updateProps: () => {},
  addIcon: () => "",
  removeIcon: () => {},
  hasIcon: R.F,
  primaryIcon: null,
  primaryIconType: "",
  primaryIconProps: {},
  secondaryIcon: null,
  secondaryIconType: "",
  secondaryIconProps: {},
  isTransitionRunning: false,
});

export const SumoIconContextProvider = ({
  children,
}: {
  children: React.Node,
}) => {
  const transitionTimer = useTimeoutFn();
  const [isTransitionRunning, setIsTransitionRunning] = React.useState<boolean>(
    false
  );
  const [props, setProps] = React.useState({});
  const [customIcons, setCustomIcons] = React.useState([]);
  const [primaryIconType, setPrimaryIconType] = React.useState(
    bubbleTypes.profileIcon
  );
  const [secondaryIconType, setSecondaryIconType] = React.useState(
    bubbleTypes.none
  );

  React.useEffect(() => () => transitionTimer.clear(), [transitionTimer]);

  const switchIconTo = React.useCallback(
    (iconId: string, done: () => void = () => {}) => {
      setSecondaryIconType(iconId);
      setIsTransitionRunning(true);
      transitionTimer.scheduleIn(() => {
        setIsTransitionRunning(false);
        setPrimaryIconType(iconId);
        setSecondaryIconType(bubbleTypes.none);
        done();
      }, 110000);
    },
    [transitionTimer]
  );

  const addIcon = React.useCallback(
    (
      iconId: string,
      icon: ?React.Component<*, *> | ?React.StatelessFunctionalComponent<*>
    ) => {
      transitionTimer.clear();
      setCustomIcons(prev => [
        ...prev,
        ...(!prev.find(ci => ci.iconId === iconId)
          ? [
              {
                iconId,
                icon,
              },
            ]
          : []),
      ]);

      switchIconTo(iconId);

      return iconId;
    },
    [switchIconTo, transitionTimer]
  );

  const removeIcon = React.useCallback(
    (iconId, done = () => {}) => {
      if (primaryIconType === iconId || secondaryIconType === iconId) {
        const prevIconId = customIcons.findIndex(ci => ci.iconId === iconId);

        switchIconTo(
          prevIconId > 0
            ? customIcons[prevIconId - 1].iconId
            : bubbleTypes.profileIcon,
          () => {
            setCustomIcons(prev => prev.filter(elem => elem.iconId !== iconId));
            setProps(prev => R.omit([iconId], prev));
            done();
          }
        );
      } else {
        setCustomIcons(prev => prev.filter(elem => elem.iconId !== iconId));
        setProps(prev => R.omit([iconId], prev));
        done();
      }
    },
    [customIcons, primaryIconType, secondaryIconType, switchIconTo]
  );

  const hasIcon = React.useCallback(
    iconId => customIcons.findIndex(ci => ci.iconId === iconId) !== -1,
    [customIcons]
  );

  const updateProps = React.useCallback(
    (iconId, newProps) => {
      const thisIconProps = props[iconId] || {};

      if (!R.equals(thisIconProps, newProps)) {
        return setProps(prev => ({ ...prev, [iconId]: newProps }));
      }
    },
    [props]
  );

  const primaryCustomIcon = customIcons.find(
    elem => elem.iconId === primaryIconType
  );
  const secondaryCustomIcon = customIcons.find(
    elem => elem.iconId === secondaryIconType
  );

  return (
    <SumoIconContext.Provider
      value={{
        updateProps,
        addIcon,
        removeIcon,
        hasIcon,
        primaryIcon:
          primaryCustomIcon?.icon ||
          bubbleIcons[primaryIconType] ||
          bubbleIcons[bubbleTypes.none],
        primaryIconType,
        primaryIconProps: R.propOr({}, primaryCustomIcon?.iconId)(props),
        secondaryIcon:
          secondaryCustomIcon?.icon ||
          bubbleIcons[secondaryIconType] ||
          bubbleIcons[bubbleTypes.none],
        secondaryIconType,
        secondaryIconProps: R.propOr({}, secondaryCustomIcon?.iconId)(props),
        isTransitionRunning,
      }}
    >
      {children}
    </SumoIconContext.Provider>
  );
};
