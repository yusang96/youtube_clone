export interface ISearched {
    etag: string;
    id : {
        videoId : string;
    }
    snippet : {
        title : string;
        channelId : string;
        channelTitle : string;
        publishedAt : string;
        resourceId : {
            videoId : string;
        }
    }
    statistics : {
        viewCount : string;
    }
}