import { jest } from "@jest/globals";
import {
  CartItem,
  CartState,
  Product,
  ProductShortInfo,
} from "../../src/common/types";
import { AxiosResponse } from "axios";
import { ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

export const getMockStore = (
  mockData?: any,
  methodName?: string,
  mockLocalStorage?: { [key: number]: CartItem }
) => {
  const basename = "/";

  let myLocalStorage = new Map();
  const LOCAL_STORAGE_CART_KEY = "example-store-cart";

  class CartApiMock {
    getState(): CartState {
      try {
        const json = myLocalStorage.get(LOCAL_STORAGE_CART_KEY);
        return (JSON.parse(json) as CartState) || {};
      } catch {
        return {};
      }
    }

    setState(cart: CartState) {
      myLocalStorage.set(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }
  }
  const api = new ExampleApi(basename);

  if (mockData && methodName) {
    const mockMethod = jest
      .fn<() => Promise<AxiosResponse<Product | ProductShortInfo[], any>>>()
      .mockResolvedValue(mockData);

    (api as any)[methodName] = mockMethod;
  }

  const cart = new CartApiMock();
  if (mockLocalStorage) {
    cart.setState(mockLocalStorage);
  }
  const store = initStore(api, cart);

  return { store, api, cart };
};
