export interface IUserObj {
    userObj? : {
        displayName? : string;
        updateProfile? : {
            displayName? : string
        } | any
    }
    refreshUser():void;
}