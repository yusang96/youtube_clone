export interface IVideo {
    etag: string;
    id : string;
    weeklyStatistics : {
        viewCount : string;
    };
    snippet : {
        title : string;
        channelId : string;
        channelTitle : string;
        publishedAt : string;
        resourceId : {
            videoId : string;
        }
        thumbnails : {
            medium : {
                url : string
            },
            maxres : {
                url : string
            },
            standard : {
                url : string
            }
        }
    },
    contentDetails : {
        duration : string
    }
    statistics : {
        viewCount : string;
    }
}