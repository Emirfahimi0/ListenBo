import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeStorage = async (key: string, value: string) => {
  AsyncStorage.setItem(key, value);
};

export const getStorage = async (key: string) => {
  return AsyncStorage.getItem(key);
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};

export enum KEYS {
  AUTH_TOKEN = "AUTH_TOKEN",
}
