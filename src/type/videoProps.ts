export interface IVideo {
    etag: string;
    id : string;
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