"use client";

import React, { use, createContext, useState, useReducer } from "react";
// Types
import { IProduct } from "@/api/data";

const definitionError = (): null => {
  throw new Error('Please make sure "<ShopProvider>" component is wrapping your application.');
};

export interface IFilters {
  tag: string[];
  category: string[];
  color: string[];
}

export interface ISort {
  price: "high" | "low" | undefined;
  popular: "most" | "best" | "newest" | undefined;
}

interface ICart extends IProduct {
  quantity?: number;
}

interface ShopContextProps {
  quickView: IProduct[];
  setQuickView: React.Dispatch<React.SetStateAction<IProduct[]>>;
  cart: ICart[];
  setCart: React.Dispatch<React.SetStateAction<ICart[]>>;
  sort: ISort;
  setSort: React.ActionDispatch<[next: Partial<ISort>]>;
  filters: IFilters;
  setFilters: React.ActionDispatch<[next: Partial<IFilters>]>;
}

export const ShopContext = createContext<ShopContextProps>({
  quickView: [],
  setQuickView: definitionError,
  cart: [],
  setCart: definitionError,
  sort: {
    price: undefined,
    popular: undefined
  },
  setSort: definitionError,
  filters: {
    category: [],
    color: [],
    tag: []
  },
  setFilters: definitionError
});

export const useShop = (): ShopContextProps => use(ShopContext);

export default function ShopProvider({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [cart, setCart] = useState<ICart[]>([]);
  const [quickView, setQuickView] = useState<IProduct[]>([]);

  // Reducer to filters the products
  const [filters, setFilters] = useReducer(
    (prev: IFilters, next: Partial<IFilters>) => {
      return { ...prev, ...next };
    },
    { tag: [], category: [], color: [] }
  );

  // Reducer to sort the products
  const [sort, setSort] = useReducer(
    (prev: ISort, next: Partial<ISort>) => {
      return { ...prev, ...next };
    },
    { price: undefined, popular: "newest" }
  );

  return (
    <ShopContext
      value={{ quickView, setQuickView, cart, setCart, filters, setFilters, sort, setSort }}
    >
      {children}
    </ShopContext>
  );
}
