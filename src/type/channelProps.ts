export interface IChannel {
    id : string;
    brandingSettings : {
        image : {
            bannerExternalUrl : string;
        }
    }
    snippet : {
        title : string;
        description : string;
        thumbnails : {
            default : {
                url : string;
            }
            medium : {
                url : string;
            }
            high : {
                url : string;
            }
        }
    }
    statistics : {
        subscriberCount : string
    }
}