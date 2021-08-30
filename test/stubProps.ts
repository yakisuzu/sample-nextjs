import { MessageType } from "@/components/Notice";

export const showProgress = <T extends unknown>(
  f: () => Promise<T>
): Promise<T> => f();
export const showMessage = (type: MessageType, message: string): void => {};
