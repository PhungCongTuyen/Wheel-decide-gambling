import React from "react";
import "./App.css";
import Routes from "./routes";
import MainLayout from "./layouts";
import {
  ACTION_TYPE,
  Actions,
  Profile,
  ProfileContext,
  ProfileDispatchContext,
} from "./context";
import Navbar from "./layouts/Navbar";

const profileReducer = (state: Profile, action: Actions) => {
  const { type, payload } = action;
  let nextState = { ...state };
  switch (type) {
    case ACTION_TYPE.INIT:
      nextState = !!payload ? { ...payload } : ({} as Profile);
      return nextState;
    case ACTION_TYPE.INCREASE_WIN:
      nextState.stats.win = nextState.stats.win + 1;
      return nextState;
    case ACTION_TYPE.INCREASE_LOSE:
      nextState.stats.lose = nextState.stats.lose + 1;
      return nextState;
    default:
      return state;
  }
};

function App() {
  const [profile, dispatch] = React.useReducer(profileReducer, {} as Profile);

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispatch}>
        <Navbar />
        <MainLayout>
          <Routes />
        </MainLayout>
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

export default App;
