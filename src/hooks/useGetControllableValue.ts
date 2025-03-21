import { useCallback, useRef, useState } from "react";

type Options<S> = {
  value?: S;
  defaultValue?: S;
  onChange?: (value: S) => void;
}

type ReturnOptinos<S> = [
  S,
  (value: S) => void,
  () => S | void,
]

/**
 * @function useGetControllableValue
 * @description 可获取最新值的，基本使用与 ahooks 的 useControllableValue 一致
 * @param {Options} optinos 配置项
 * @param {Options['value']} optinos.value 组件值
 * @param {Options['defaultValue']} optinos.defaultValue 默认值
 * @param {Options['onChange']} optinos.onChange 值改变时的回调
 * @returns {[Options['value'], (value: Options['value']) => void]}
 */
export default function useGetControllableValue<S>(
  optinos: Options<S>
): ReturnOptinos<S> {

  const {
    value: stateValue,
    defaultValue,
    onChange,
  } = optinos;

  const latestValue = useRef(stateValue ?? defaultValue);

  const [value, setValue] = useState(stateValue ?? defaultValue);

  const onGetValue = useCallback(() => latestValue?.current, []);


  const onSetValue = (value: S) => {
    latestValue.current = value;
    if (onChange) {
      onChange?.(value);
    } else {
      setValue(value)
    }
  }



  return [value, onSetValue, onGetValue];
}