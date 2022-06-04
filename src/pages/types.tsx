import type { Key } from 'react';

export interface UserInfo {
  id: 1;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  is_locked: number;
  avatar?: string;
  avatar_url?: string;
  openid?: number;
  phone?: string;
}

export interface CreateUserType {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserType {
  name: string;
  email: string;
}

export interface FilterUser {
  name?: string;
  email?: string;
  phone?: number;
}

export interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: Key) => boolean;
  cancelEditable: (rowKey: Key) => boolean;
}

export interface GoodsItem {
  id: number;
  title: string;
  category_id: number;
  user_id: number;
  description: string;
  price: number;
  stock: number;
  sales: number;
  cover: string;
  cover_url: string;
  pics?: any;
  pics_url: any[];
  details: string;
  is_on: number;
  is_recommend: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  pid: number;
  name: string;
  level: number;
  status: number;
  children?: Category[];
}
