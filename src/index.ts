import { useFetchFn } from './hooks';

export * from './hooks';

useFetchFn<{ name:string }>(async (data) => {
  console.log(data.name);
  return {
    data: {

    },
    code: 200,
    message: ''
  }
});