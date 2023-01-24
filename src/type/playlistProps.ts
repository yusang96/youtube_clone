import { IVideo } from "./videoProps";

export interface IPlaylist {
    onVideoClick : () => void;
    videos : IVideo[]
    video : {
        id :string
        snippet : {
            publishedAt : string
            title : string
            channelTitle : string
            thumbnails : {
                medium : {
                    url : string
                }
            }
        }
        statistics : {
            viewCount : string
        }
    }
}