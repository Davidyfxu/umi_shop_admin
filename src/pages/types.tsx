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

export interface OriginFileObj {
  uid: string;
  key: string;
  url: string;
}

export interface Xhr {}

export interface FileType {
  uid: string;
  key: string;
  url: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: OriginFileObj;
  status: string;
  response: string;
  xhr: Xhr;
  thumbUrl: string;
}

export interface GoodsAddType {
  category_id: number | number[];
  title: string;
  description: string;
  price: number;
  stock: number;
  cover: string;
  details: string;
  cover_url?: string;
}
