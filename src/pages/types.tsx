import { Key } from 'react';

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
