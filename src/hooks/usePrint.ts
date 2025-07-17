
/**
 * @function askPrint
 * @param element 内容
 */
export default function askPrint(element: HTMLElement) {
  // const fragment =  document.createDocumentFragment();
  const iframe = document.createElement('iframe');
  const win = iframe.contentWindow;
  win?.document?.open();
  win?.document?.close();
  iframe.append(element);
  win?.focus();
  win?.print();
}