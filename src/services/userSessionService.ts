const generateRandomUsername = (): string => {
    const number = Math.floor(Math.random() * 9999) + 1;
    return `User_${number}`;
};

const generateRandomAvatar = (): string => {
    const grayValue = Math.floor(Math.random() * (220 - 16 + 1)) + 16;
    const color = `#${grayValue.toString(16).repeat(3)}`;
    return JSON.stringify({color, initials: 'U'});
};

export const getSessionUser = (): {username: string; avatar: string} => {
    const sessionKey = 'commentSessionUser';
    const sessionUser = sessionStorage.getItem(sessionKey);

    if (!sessionUser) {
        const username = generateRandomUsername();
        const avatar = generateRandomAvatar();
        const userData = {username, avatar};
        sessionStorage.setItem(sessionKey, JSON.stringify(userData));
        return userData;
    }

    return JSON.parse(sessionUser);
};
