
import { useRequest } from 'ahooks';
import { message as info } from 'antd';

type FetchReturn = ReturnType<typeof useRequest>;

type FetchFn<F> = F;

type FetchOptions<F> = {

  /**
   * 代表请求成功的状态码
   * 默认 200
  */
  code?: number | string;

  message?: {
    /**
     * 成功提示语
     */
    success?: string;
    /**
     * 错误提示语
     */
    error?: string;
    /**
     * loading 等待提示语
     */
    loading?: string;
  } | string;

  /**
   * 自定义请求成功且状态码匹配执行
   * @param data 
   * @returns 
   */
  onSuccess?: (data) => void;
  /**
   * 自定义处理错误
   */
  onError?: (error: BaseError) => void;
}
/**
 * @function useFetch
 * @param fn 接口函数
 * @param options 消息配置项
 * @returns 
 */
export default function useFetchFn<F, S extends FetchFn<F>>(
  fn: F,
  options?: FetchOptions<S>,
): FetchReturn {

  if (typeof fn !== 'function') throw new Error('fn is not a function');

  const key = 'create' + Math.random();

  // const determine = useDetermine();

  const {
    message,
    onSuccess: successFn,
    onError,
    code = 200,
  } = options ?? {};


  const {
    success = '请求成功',
    error = '请求失败',
    loading = '请求中'
  } = typeof message === 'string' ?
      {
        success: message + '成功',
        error: message + '失败',
        loading: message + '中',
      } :
      message ?? {};

  const run = useRequest(
    async (...args) => {
      info.open({
        key,
        content: loading,
        type: 'loading',
        duration: 0,
      });
      try {
        // ing.onChange(true);
        const take = await fn(...args);
        if (take.code == code) {
          successFn?.(take.data);
          await info.open({
            key,
            content: success,
            type: 'success',
          });
        } else {
          onError?.(take);
          await info.open({
            key,
            content: error,
            type: 'error',
          });
        }
        // info.destroy(key);
        // ing.onChange(false)
        return take
      } catch (err) {
        if (typeof onError === 'function') return onError(err as BaseError);
        // if (err instanceof AxiosError) {
        //   if (err?.code === 'ECONNABORTED') {
        //     await info.open({
        //       key,
        //       content: '请求超时',
        //       type: 'error',
        //     });
        //   }
        // } else {
        //   await info.open({
        //     key,
        //     content: error,
        //     type: 'error',
        //   });
        // }
        await info.open({
          key,
          content: error,
          type: 'error',
        });
        return err;
        // info.destroy(key);
        // ing.onChange(false)
      }
    },
    {
      manual: true,
    }
  )
  return run;
}