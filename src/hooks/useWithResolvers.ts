import { useRef } from 'react';

const withResolvers = <S>() => {
  const {
   promise,
   resolve,
   reject, 
  } = Promise.withResolvers<S>();
  return {
    promise,
    resolve,
    reject,
  };
};

/**
 * @function useWithResolvers
 * @description 等待成功的异步
 * @returns 
 */
export default function useWithResolvers<S>() {
  const promise = useRef(withResolvers<S>());
  return {
    promise: promise.current.promise,
    resolve: (value: S) => {
      promise.current?.resolve?.(value);
      promise.current = withResolvers<S>();
    },
    reject: promise?.current.reject,
  };
}
