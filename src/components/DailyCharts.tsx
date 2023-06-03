import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { AppDispatch } from '../store/store'
import { IVideo } from '../type/videoProps'
import axios from 'axios'
import moment from 'moment'

const DailyCharts = () => {
  const apiKey = process.env.REACT_APP_API_KEY
  // const dispatch = useDispatch<AppDispatch>()
  // const todayLists = JSON.parse(localStorage.getItem('todayData') as string) || [] ;
  // const prevLists = JSON.parse(localStorage.getItem('prevData') as string) || [] ;
  // useEffect(() => {
  //   db.collection('PrevData').get().then((result) => {
  //     const list = result.docs.map(doc => ({
  //       ...doc.data()
  //     }))
  //     console.log(list);
  //   })
  // },[])
  const [previousViewCount, setPreviousViewCount] = useState(0);
  const [currentViewCount, setCurrentViewCount] = useState(0);
  const [viewCountIncrease, setViewCountIncrease] = useState(0);

  useEffect(() => {
    // 이전 주의 조회수를 가져옵니다.
    const previousViewCount = getPreviousViewCountFromDatabase();
    setPreviousViewCount(previousViewCount);

    // 현재 주의 조회수를 가져옵니다.
    fetchCurrentViewCount();
  }, []);

  async function fetchCurrentViewCount() {
    try {
      const videoId = 'UFDqEbhn8ng'; // 조회수를 확인할 동영상의 ID
      const apiKey = process.env.REACT_APP_API_KEY; // 본인의 YouTube API 키로 대체해주세요

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
      );

      const video = response.data.items[0];
      const currentViewCount = parseInt(video.statistics.viewCount);
      setCurrentViewCount(currentViewCount);

      // 조회수의 증가량을 계산합니다.
      const viewCountIncrease = currentViewCount - previousViewCount;
      setViewCountIncrease(viewCountIncrease);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  function getPreviousViewCountFromDatabase() {
    // 서버 또는 데이터베이스에서 이전 주의 조회수를 가져옵니다.
    // 적절한 방법으로 이전 주의 조회수를 조회하여 반환합니다.
    // 예를 들어, 파일이나 데이터베이스에 저장되어 있는 경우 해당 값을 읽어올 수 있어야 합니다.
    return 5000; // 이전 주의 조회수 예시
  }

  return (
    <div>
      <p>이전 주의 조회수: {currentViewCount - previousViewCount}</p>
    </div>
  );
}

export default DailyCharts