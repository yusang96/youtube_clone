interface profileProps {
    displayName? : string;
}

export interface IUser {
    isLogin? :boolean;
    displayName? :string ;
    uid? : string;
    updateProfile? : (props:profileProps) => void
    userObj? : {
        displayName? : string;
    }
    refreshUser? : () => void;
}