"use client"

import {useEffect, useState} from "react";
export const timezonesDataAccessPoint = '/api/timezones';

export enum LOADING_STATE {
  INITIALISED = 'INITIALISED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum ERROR_CONDITIONS {
  TypeError = "TypeError",
  GENERAL = "General",
  Status404 = "NotFound",
}
export const ERROR_MESSAGES = {
  [ERROR_CONDITIONS.TypeError] : 'Network error: Could not fetch the list of timezones.',
  [ERROR_CONDITIONS.Status404] : '404 - Resource was not found.',
  [ERROR_CONDITIONS.GENERAL] : 'General error: Please try again later.',
}

const mapErrorMessage = (err) => {
  const condition = err.name ? ERROR_CONDITIONS[err.name] : ERROR_CONDITIONS[`Status${err.status}`] ;
  return ERROR_MESSAGES[condition || ERROR_CONDITIONS.GENERAL] ;
}

const Timezones = () => {
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIALISED);
  const [error, setError] = useState(null);
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const getTimezone = async () => {
      try {
        const resp = await fetch(timezonesDataAccessPoint);
        if (resp.ok) {
          return [null, await resp.json()];
        }
        return [{status: resp.status, statusText: resp.statusText}, null];
      } catch (ex) {
        return [ex, null];
      }
    }

    getTimezone()
      .then(([err, timezones]) => {
        if (! err){
          setTimezones(timezones);
          setLoadingState(LOADING_STATE.SUCCESS);
        } else {
          console.log('error', err);
          setLoadingState(LOADING_STATE.FAIL);
          setError(mapErrorMessage(err));
        }
      })
  }, []);

  const listClasses = ['timezone-listing', `loading-state-${loadingState}`];

  return <section>
    <ul id="timezones-list" className={listClasses.join(' ')}>
      { loadingState === LOADING_STATE.FAIL ? <li> {error} </li> : [] }
      {timezones.map(tz => <li key={tz}>{tz}</li>)}
    </ul>
  </section>;
}

export default Timezones;