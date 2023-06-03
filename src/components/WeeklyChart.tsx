import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { start } from 'repl';

const WeeklyChart = () => {
  const [monthly , setMonthly] = useState([])
  const [accessToken, setAccessToken] = useState<string>('');
  const [popup, setPopup] = useState<any>();
  const [code , setCode] = useState('');
  // const channelId = 'UC0E8YC4Jw27mu4eQhQk02_w'
  // const client_id = '1038948197615-4mhfcblo5djv05j0dbkpli0b5mf3utp7.apps.googleusercontent.com'
  // const client_secret = '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'
  const apikey =process.env.REACT_APP_API_KEY
  const channelId = 'MINE'
  const client_id = '1023793768951-ogt0g1ar3d84bvrn293asr9i4n5b30pa.apps.googleusercontent.com'
  const client_secret = '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'
  const redirectUri = 'http://localhost:3000/oauth2callback'
  const scope= "https://www.googleapis.com/auth/yt-analytics.readonly"
  const getAuthUrl =`https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&redirect_uri=${redirectUri}&client_id=${client_id}&prompt=consent&response_type=code&access_type=offline&key=${apikey}`;
  const handlePopup = async () => {
    setPopup(window.open(getAuthUrl, '_blank', 'width=500,height=600'))
    // const response = await fetch(getAuthUrl)
    // console.log(response)
  }

  useEffect(() => {
    if (!popup) {
      return;
    }
    const timer = setInterval( async () => {
      if (!popup) {
        timer && clearInterval(timer);
        return;
      }
      const currentUrl = popup.location.href;
      if (!currentUrl) {
        return;
      }
      const searchParams = new URL(currentUrl).searchParams;
      const code = searchParams.get('code');
      if (code) {
        popup.close();
        const requestBody = `code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
        });
        const tokens = await response.json();
        const accessToken = tokens.access_token;
        setAccessToken(accessToken)
        console.log(tokens)
      }}, 500)},[popup]);
  useEffect(() => {
    if (accessToken)
    {      
      const getAnalytics = async () => {
        const startDate = encodeURIComponent('2023-03-01T00:00:00Z');
        const endDate = encodeURIComponent('2023-03-20T23:59:59Z');
        const analyticsUrl = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==${channelId}&metrics=views&dimensions=day&startDate=2023-03-01&endDate=2023-03-27`;
        const response = await fetch(analyticsUrl, {
          method : 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response)
        const data = await response.json()
        setMonthly(data.rows)
      }
      getAnalytics()
    }
  },[accessToken])
  const sum = monthly.reduce((acc, curr) => acc + curr[1], 0);
  return (
      <div>
        asdsadasda
        <button onClick={handlePopup}>인증 코드 얻기</button>
        <h1>{sum}</h1>
      </div>
    );
  };
export default WeeklyChart