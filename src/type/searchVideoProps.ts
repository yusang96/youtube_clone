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
    }
    statistics : {
        viewCount : string;
    }
}