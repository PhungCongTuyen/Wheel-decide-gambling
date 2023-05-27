
import React from 'react';

export interface Profile {
    username: string;
    stats: {
      win: number;
      lose: number;
    };
  }
  
export type Actions = {
    type: ACTION_TYPE;
    payload?: Profile;
  };
  
export enum ACTION_TYPE {
  INIT = "INIT_PROFILE",
  INCREASE_WIN = "INCREASE_WIN",
  INCREASE_LOSE = "INCREASE_LOSE",
}
 
  
export const ProfileContext = React.createContext<Profile | null>(null);
export const ProfileDispatchContext = React.createContext<React.Dispatch<Actions>>(() => {});
  
export function useProfile() {
  return React.useContext(ProfileContext);
}

export function useProfileDispatch() {
  return React.useContext(ProfileDispatchContext);
}