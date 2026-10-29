const navigationRef = {
    current: null,
};

export const setNavigation = (navigate) => {
    navigationRef.current = navigate;
};

export const navigateTo = (path) => {
    navigationRef.current?.(path);
};
