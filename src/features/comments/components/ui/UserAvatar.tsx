type UserAvatarProps = {
    avatar: string;
    username: string;
    timestamp: string;
};

function UserAvatar({avatar, username, timestamp}: UserAvatarProps) {
    const avatarData = JSON.parse(avatar);

    return (
        <div className="flex items-center gap-2">
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{backgroundColor: avatarData.color}}
            >
                {avatarData.initials}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-800">
                    {username}
                </span>
                <span className="text-xs text-neutral-500">{timestamp}</span>
            </div>
        </div>
    );
}

export default UserAvatar;
