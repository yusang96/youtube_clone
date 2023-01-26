export interface IVideo {
    etag: string;
    id : string;
    snippet : {
        title : string;
        channelId : string;
        channelTitle : string;
        publishedAt : string;
        thumbnails : {
            medium : {
                url : string
            }
        }
    }
    statistics : {
        viewCount : string;
    }
}